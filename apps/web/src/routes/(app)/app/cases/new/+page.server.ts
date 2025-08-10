import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { schema } from '@opensource-startup-crm/database';
import { and, asc, eq } from 'drizzle-orm';
import { randomUUID } from 'crypto';
import { validateEnumOrNull } from '$lib/data/enum-helpers';
import { TASK_PRIORITIES, TASK_PRIORITY_OPTIONS } from '@opensource-startup-crm/constants';

export const load: PageServerLoad = async ({ locals, url }) => {
  const org = locals.org!;
  const db = locals.db

  const preSelectedAccountId = url.searchParams.get('accountId');
  const accounts = await db
    .select({ id: schema.crmAccount.id, name: schema.crmAccount.name })
    .from(schema.crmAccount)
    .where(eq(schema.crmAccount.organizationId, org.id))
    .orderBy(asc(schema.crmAccount.name));

  const users = await db
    .select({ id: schema.user.id, name: schema.user.name })
    .from(schema.member)
    .innerJoin(schema.user, eq(schema.user.id, schema.member.userId))
    .where(eq(schema.member.organizationId, org.id))
    .orderBy(asc(schema.user.name));

  return { accounts, users, preSelectedAccountId };
};

export const actions: Actions = {
  create: async ({ request, locals }) => {
    const org = locals.org!;
    const db = locals.db
    const form = await request.formData();
    const subject = form.get('title')?.toString().trim();
    const description = form.get('description')?.toString().trim();
    const accountId = form.get('accountId')?.toString();
    const dueDateValue = form.get('dueDate');
    const dueDate = dueDateValue ? new Date(dueDateValue.toString()) : null;
    const priority = validateEnumOrNull(form.get('priority'), TASK_PRIORITIES) || 'NORMAL';
    const ownerId = form.get('assignedId')?.toString();
    if (!subject || !accountId || !ownerId) {
      return fail(400, { error: 'Missing required fields.' });
    }

    // check if the ownerId is valid and related to the organization
    const [isValidOwner] = await db
      .select({ id: schema.member.id })
      .from(schema.member)
      .where(and(eq(schema.member.userId, ownerId), eq(schema.member.organizationId, org.id)));
    if (!isValidOwner) {
      return fail(400, { error: 'Invalid owner ID.' });
    }

    const [newCase] = await db
      .insert(schema.caseTable)
      .values({
        id: randomUUID(),
        caseNumber: randomUUID(),
        subject,
        description,
        accountId,
        dueDate,
        priority,
        ownerId,
        organizationId: org.id
      }).returning();

    throw redirect(303, `/app/cases/${newCase.id}`);
  }
};
