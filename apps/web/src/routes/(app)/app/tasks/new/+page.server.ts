import { schema } from '@opensource-startup-crm/database';
import { fail, redirect } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm';
import type { PageServerLoad, Actions } from './$types';
import { validateEnumOrDefault } from '$lib/data/enum-helpers';
import { TASK_STATUSES, TASK_PRIORITIES } from '@opensource-startup-crm/constants';

export const load: PageServerLoad = async ({ locals, url }) => {
    const user = locals.user!;
    const org = locals.org!;
    const db = locals.db

    const urlAccountId = url.searchParams.get('accountId');

    const users = await db
        .select({ id: schema.user.id, name: schema.user.name })
        .from(schema.user)
        .innerJoin(schema.member, eq(schema.member.userId, schema.user.id))
        .where(eq(schema.member.organizationId, org.id));

    const accounts = await db
        .select({ id: schema.crmAccount.id, name: schema.crmAccount.name })
        .from(schema.crmAccount)
        .where(eq(schema.crmAccount.organizationId, org.id));

    if (urlAccountId) {
        const accountExists = accounts.some(account => account.id === urlAccountId);
        if (!accountExists) {
            throw redirect(303, '/app/tasks/new');
        }
    }

    return { users, accounts };
}

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const user = locals.user!;
        const org = locals.org!;
        const db = locals.db

        const formData = await request.formData();

        const subject = formData.get('subject')?.toString();
        const status = validateEnumOrDefault(formData.get('status'), TASK_STATUSES, 'NOT_STARTED');
        const priority = validateEnumOrDefault(formData.get('priority'), TASK_PRIORITIES, 'NORMAL');
        const dueDateStr = formData.get('dueDate')?.toString();
        const ownerId = formData.get('ownerId')?.toString();
        let accountId = formData.get('accountId')?.toString();
        const description = formData.get('description')?.toString();

        console.log('Form data received:', { subject, status, priority, dueDateStr, ownerId, accountId, description });

        if (!subject) {
            return fail(400, {
                error: 'Subject is required.',
                subject, status, priority, dueDate: dueDateStr, ownerId, accountId, description
            });
        }
        if (!ownerId) {
            return fail(400, {
                error: 'Owner is required.',
                subject, status, priority, dueDate: dueDateStr, ownerId, accountId, description
            });
        }

        // Validate ownerId
        const [taskOwner] = await db
            .select({ id: schema.user.id })
            .from(schema.user)
            .innerJoin(schema.member, eq(schema.member.userId, schema.user.id))
            .where(and(eq(schema.user.id, ownerId!), eq(schema.member.organizationId, org!.id)));
        if (!taskOwner) {
            return fail(400, {
                error: 'Invalid owner selected or owner does not belong to this organization.',
                subject, status, priority, dueDate: dueDateStr, ownerId, accountId, description
            });
        }

        // Validate accountId if provided
        if (accountId && accountId !== "" && accountId !== "null") {
            const [taskAccount] = await db
                .select({ id: schema.crmAccount.id })
                .from(schema.crmAccount)
                .where(and(eq(schema.crmAccount.id, accountId!), eq(schema.crmAccount.organizationId, org.id)));
            if (!taskAccount) {
                return fail(400, {
                    error: 'Invalid account selected or account does not belong to this organization.',
                    subject, status, priority, dueDate: dueDateStr, ownerId, accountId, description
                });
            }
        } else {
            accountId = undefined;
        }

        const dueDate = dueDateStr ? new Date(dueDateStr) : null;

        try {
            const taskData = {
                id: crypto.randomUUID(),
                subject,
                status,
                priority,
                dueDate,
                description: description || null,
                ownerId: ownerId,
                createdById: user.id,
                organizationId: org.id,
                ...(accountId && { accountId })
            };

            console.log('Creating task with data:', taskData);

            const [task] = await db.insert(schema.task).values(taskData).returning();

            console.log('Task created successfully:', task);

            if (accountId) {
                throw redirect(303, `/app/accounts/${accountId}`);
            } else {
                throw redirect(303, '/app/tasks/list');
            }

        } catch (e) {
            if (e && typeof e === 'object' && 'status' in e && e.status === 303) {
                throw e;
            }

            console.error('Failed to create task:', e);
            return fail(500, {
                error: 'Failed to create task. Please try again.',
                subject, status, priority, dueDate: dueDateStr, ownerId, accountId, description
            });
        }
    }
};