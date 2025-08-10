import { error, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { schema } from '@opensource-startup-crm/database';
import { and, asc, count, desc, eq, ilike, inArray, or } from 'drizzle-orm';

export const load: PageServerLoad = async ({ url, locals }) => {
    const db = locals.db
    try {
        const page = parseInt(url.searchParams.get('page') || '1');
        const limit = parseInt(url.searchParams.get('limit') || '20');
        const search = url.searchParams.get('search') || '';
        const ownerId = url.searchParams.get('owner') || '';

        const skip = (page - 1) * limit;

        const filters = [eq(schema.contact.organizationId, locals.org!.id)];
        if (ownerId) filters.push(eq(schema.contact.ownerId, ownerId));
        if (search) {
            const like = `%${search}%`;
            filters.push(
                or(
                    ilike(schema.contact.firstName, like),
                    ilike(schema.contact.lastName, like),
                    ilike(schema.contact.email, like),
                    ilike(schema.contact.phone, like),
                    ilike(schema.contact.title, like),
                    ilike(schema.contact.department, like)
                )!
            );
        }

        const rows = await db
            .select({
                id: schema.contact.id,
                firstName: schema.contact.firstName,
                lastName: schema.contact.lastName,
                email: schema.contact.email,
                phone: schema.contact.phone,
                title: schema.contact.title,
                department: schema.contact.department,
                createdAt: schema.contact.createdAt,
                ownerId: schema.contact.ownerId,
                ownerUserId: schema.user.id,
                ownerName: schema.user.name,
                ownerEmail: schema.user.email
            })
            .from(schema.contact)
            .leftJoin(schema.user, eq(schema.user.id, schema.contact.ownerId))
            .where(and(...filters))
            .orderBy(desc(schema.contact.createdAt))
            .limit(limit)
            .offset(skip);

        const contactIds = rows.map((r) => r.id);

        const relatedAccounts = contactIds.length
            ? await db
                .select({
                    contactId: schema.accountContactRelationship.contactId,
                    accountId: schema.crmAccount.id,
                    accountName: schema.crmAccount.name
                })
                .from(schema.accountContactRelationship)
                .innerJoin(
                    schema.crmAccount,
                    eq(schema.crmAccount.id, schema.accountContactRelationship.accountId)
                )
                .where(and(
                    inArray(schema.accountContactRelationship.contactId, contactIds),
                    eq(schema.crmAccount.organizationId, locals.org!.id)
                ))
            : [];

        const tasksByContact = new Map<string, number>();
        const eventsByContact = new Map<string, number>();
        const oppsByContact = new Map<string, number>();
        const casesByContact = new Map<string, number>();

        if (contactIds.length) {
            const tasks = await db
                .select({ contactId: schema.task.contactId })
                .from(schema.task)
                .where(and(inArray(schema.task.contactId, contactIds), eq(schema.task.organizationId, locals.org!.id)));
            for (const t of tasks) if (t.contactId) tasksByContact.set(t.contactId, (tasksByContact.get(t.contactId) || 0) + 1);

            const events = await db
                .select({ contactId: schema.event.contactId })
                .from(schema.event)
                .where(and(inArray(schema.event.contactId, contactIds), eq(schema.event.organizationId, locals.org!.id)));
            for (const e of events) if (e.contactId) eventsByContact.set(e.contactId, (eventsByContact.get(e.contactId) || 0) + 1);

            const oppLinks = await db
                .select({ contactId: schema.contactToOpportunity.contactId })
                .from(schema.contactToOpportunity)
                .innerJoin(
                    schema.opportunity,
                    eq(schema.opportunity.id, schema.contactToOpportunity.opportunityId)
                )
                .where(and(
                    inArray(schema.contactToOpportunity.contactId, contactIds),
                    eq(schema.opportunity.organizationId, locals.org!.id)
                ));
            for (const o of oppLinks) oppsByContact.set(o.contactId, (oppsByContact.get(o.contactId) || 0) + 1);

            const caseRows = await db
                .select({ contactId: schema.caseTable.contactId })
                .from(schema.caseTable)
                .where(and(inArray(schema.caseTable.contactId, contactIds), eq(schema.caseTable.organizationId, locals.org!.id)));
            for (const c of caseRows) if (c.contactId) casesByContact.set(c.contactId, (casesByContact.get(c.contactId) || 0) + 1);
        }

        const owners = await db
            .select({ id: schema.user.id, name: schema.user.name, email: schema.user.email })
            .from(schema.member)
            .innerJoin(schema.user, eq(schema.user.id, schema.member.userId))
            .where(eq(schema.member.organizationId, locals.org!.id))
            .orderBy(asc(schema.user.name));

        const [{ value: totalCount = 0 } = { value: 0 }] = await db
            .select({ value: count() })
            .from(schema.contact)
            .where(and(...filters));

        const accountsByContact = new Map<string, { id: string; name: string }[]>();
        for (const rel of relatedAccounts) {
            const list = accountsByContact.get(rel.contactId) || [];
            list.push({ id: rel.accountId, name: rel.accountName });
            accountsByContact.set(rel.contactId, list);
        }

        const contacts = rows.map((r) => ({
            id: r.id,
            firstName: r.firstName,
            lastName: r.lastName,
            email: r.email,
            phone: r.phone,
            title: r.title,
            department: r.department,
            createdAt: r.createdAt,
            owner: r.ownerUserId ? { id: r.ownerUserId, name: r.ownerName, email: r.ownerEmail } : null,
            relatedAccounts: (accountsByContact.get(r.id) || []).map((a) => ({ account: a })),
            _count: {
                tasks: tasksByContact.get(r.id) || 0,
                events: eventsByContact.get(r.id) || 0,
                opportunities: oppsByContact.get(r.id) || 0,
                cases: casesByContact.get(r.id) || 0
            }
        }));

        return {
            contacts,
            totalCount,
            currentPage: page,
            totalPages: Math.ceil(Number(totalCount) / limit),
            limit,
            search,
            ownerId,
            owners
        };
    } catch (err) {
        console.error('Error loading contacts:', err);
        throw error(500, 'Failed to load contacts');
    }
};

export const actions: Actions = {
    delete: async ({ request, locals }) => {
        const db = locals.db
        const org = locals.org!
        try {
            const data = await request.formData();
            const contactId = data.get('contactId')?.toString();
            if (!contactId) {
                return fail(400, { error: 'Contact ID is required' });
            }

            await db
                .delete(schema.contact)
                .where(and(eq(schema.contact.id, contactId), eq(schema.contact.organizationId, org.id)));

            return { success: true };
        } catch (err) {
            console.error('Error deleting contact:', err);
            throw error(500, 'Failed to delete contact');
        }
    }
};