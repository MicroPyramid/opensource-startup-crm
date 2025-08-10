import { error } from '@sveltejs/kit';
import { schema } from '@opensource-startup-crm/database';
import { and, asc, count, desc, eq, inArray } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, url }) => {
  const org = locals.org!;
  const db = locals.db;

  const page = parseInt(url.searchParams.get('page') || '1');
  const limit = parseInt(url.searchParams.get('limit') || '10');
  const sort = url.searchParams.get('sort') || 'name';
  const order = url.searchParams.get('order') || 'asc';
  const skip = (page - 1) * limit;

  try {
    const status = url.searchParams.get('status');

    const filters = [eq(schema.crmAccount.organizationId, org.id)];
    if (status === 'open') filters.push(eq(schema.crmAccount.isActive, true));
    if (status === 'closed') filters.push(eq(schema.crmAccount.isActive, false));

    const accounts = await db
      .select({ id: schema.crmAccount.id, name: schema.crmAccount.name, isActive: schema.crmAccount.isActive, ownerId: schema.crmAccount.ownerId, closedAt: schema.crmAccount.closedAt, industry: schema.crmAccount.industry, type: schema.crmAccount.type, website: schema.crmAccount.website, phone: schema.crmAccount.phone, street: schema.crmAccount.street, city: schema.crmAccount.city, state: schema.crmAccount.state, postalCode: schema.crmAccount.postalCode, country: schema.crmAccount.country, createdAt: schema.crmAccount.createdAt, annualRevenue: schema.crmAccount.annualRevenue })
      .from(schema.crmAccount)
      .where(and(...filters))
      .orderBy((order === 'asc' ? asc : desc)(schema.crmAccount.name))
      .limit(limit)
      .offset(skip);

    const accountIds = accounts.map((a) => a.id);

    const [owners, opportunities, relatedContacts, tasks] = await Promise.all([
      db
        .select({ id: schema.user.id, name: schema.user.name, email: schema.user.email, image: schema.user.image, accountId: schema.crmAccount.id })
        .from(schema.crmAccount)
        .leftJoin(schema.user, eq(schema.user.id, schema.crmAccount.ownerId))
        .where(inArray(schema.crmAccount.id, accountIds)),
      db
        .select({ id: schema.opportunity.id, stage: schema.opportunity.stage, amount: schema.opportunity.amount, accountId: schema.opportunity.accountId })
        .from(schema.opportunity)
        .where(inArray(schema.opportunity.accountId, accountIds)),
      db
        .select({ accountId: schema.accountContactRelationship.accountId, contactId: schema.contact.id, firstName: schema.contact.firstName, lastName: schema.contact.lastName, isPrimary: schema.accountContactRelationship.isPrimary, role: schema.accountContactRelationship.role })
        .from(schema.accountContactRelationship)
        .innerJoin(schema.contact, eq(schema.contact.id, schema.accountContactRelationship.contactId))
        .where(inArray(schema.accountContactRelationship.accountId, accountIds)),
      db
        .select({ id: schema.task.id, status: schema.task.status, accountId: schema.task.accountId })
        .from(schema.task)
        .where(inArray(schema.task.accountId, accountIds))
    ]);

    const ownerByAccount = new Map<string, { id: string | null; name: string | null; email: string | null; image?: string | null }>();
    for (const row of owners) {
      ownerByAccount.set(row.accountId, { id: row.id ?? null, name: row.name ?? null, email: row.email ?? null, image: row.image ?? null });
    }

    const oppByAccount = new Map<string, { id: string; stage: string; amount: any }[]>();
    for (const opp of opportunities) {
      const list = oppByAccount.get(opp.accountId) || [];
      list.push(opp);
      oppByAccount.set(opp.accountId, list);
    }

    const contactsByAccount = new Map<string, { id: string; firstName: string | null; lastName: string | null }[]>();
    for (const rc of relatedContacts) {
      const list = contactsByAccount.get(rc.accountId) || [];
      list.push({ id: rc.contactId, firstName: rc.firstName, lastName: rc.lastName });
      contactsByAccount.set(rc.accountId, list);
    }

    const tasksByAccount = new Map<string, { id: string; status: string | null }[]>();
    for (const t of tasks) {
      if (!t.accountId) continue;
      const list = tasksByAccount.get(t.accountId) || [];
      list.push({ id: t.id, status: t.status });
      tasksByAccount.set(t.accountId, list);
    }

    const [{ value: total = 0 } = { value: 0 }] = await db
      .select({ value: count() })
      .from(schema.crmAccount)
      .where(and(...filters));

    const mapped = accounts.map((account) => {
      const accountOpps = oppByAccount.get(account.id) || [];
      const accountContacts = contactsByAccount.get(account.id) || [];
      const accountTasks = tasksByAccount.get(account.id) || [];
      const openOppCount = accountOpps.filter((o) => !['CLOSED_WON', 'CLOSED_LOST'].includes(o.stage)).length;
      const totalOppValue = accountOpps.reduce((sum, o) => sum + (Number(o.amount) || 0), 0);
      const topContacts = accountContacts.slice(0, 3).map((c) => ({ id: c.id, name: `${c.firstName ?? ''} ${c.lastName ?? ''}`.trim() }));

      return {
        ...account,
        owner: ownerByAccount.get(account.id) || null,
        opportunityCount: accountOpps.length,
        contactCount: accountContacts.length,
        taskCount: accountTasks.length,
        openOpportunities: openOppCount,
        totalOpportunityValue: totalOppValue,
        topContacts
      };
    });

    return { accounts: mapped, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  } catch (err) {
    console.error('Error fetching accounts:', err);
    throw error(500, 'Failed to fetch accounts');
  }
};
