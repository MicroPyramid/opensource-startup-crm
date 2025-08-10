import { fail, redirect, error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { schema } from '@opensource-startup-crm/database';
import { and, desc, eq } from 'drizzle-orm';
import { randomUUID } from 'crypto';
import { caseStatusOptions as statusOptions } from '$lib/data';

export const load: PageServerLoad = async ({ url, locals }) => {
  const org = locals.org!;
  const user = locals.user;
  const db = locals.db
  // Filters from query params
  const status = url.searchParams.get('status') || undefined;
  const assigned = url.searchParams.get('assigned') || undefined;
  const account = url.searchParams.get('account') || undefined;

  // Build filters for drizzle .where(and(...filters))
  const filters = [eq(schema.caseTable.organizationId, org.id) as any];
  if (status) filters.push(eq(schema.caseTable.status, status as any) as any);
  if (assigned) filters.push(eq(schema.user.name, assigned) as any);
  if (account) filters.push(eq(schema.crmAccount.name, account) as any);

  // Fetch all possible filter options
  const [allUsers, allAccounts] = await Promise.all([
    db.select({ id: schema.user.id, name: schema.user.name }).from(schema.user),
    db.select({ id: schema.crmAccount.id, name: schema.crmAccount.name }).from(schema.crmAccount)
  ]);

  // Optionally, define all possible statuses

  const cases = await db
    .select({
      id: schema.caseTable.id,
      subject: schema.caseTable.subject,
      status: schema.caseTable.status,
      description: schema.caseTable.description,
      dueDate: schema.caseTable.dueDate,
      priority: schema.caseTable.priority,
      owner: { id: schema.user.id, name: schema.user.name },
      account: { id: schema.crmAccount.id, name: schema.crmAccount.name }
    })
    .from(schema.caseTable)
    .leftJoin(schema.user, eq(schema.user.id, schema.caseTable.ownerId))
    .leftJoin(schema.crmAccount, eq(schema.crmAccount.id, schema.caseTable.accountId))
    .where(and(...filters))
    .orderBy(desc(schema.caseTable.createdAt));

  return { cases, allUsers, allAccounts, statusOptions };
};

export const actions: Actions = {
  create: async ({ request, locals }) => {
    const db = locals.db
    const form = await request.formData();
    const subject = form.get('title')?.toString().trim();
    const description = form.get('description')?.toString().trim();
    const accountId = form.get('accountId')?.toString();
    const dueDateValue = form.get('dueDate');
    const dueDate = dueDateValue ? new Date(dueDateValue.toString()) : null;
    const priority = form.get('priority')?.toString() || 'Medium';
    const ownerId = form.get('assignedId')?.toString();
    if (!subject || !accountId || !ownerId) {
      return fail(400, { error: 'Missing required fields.' });
    }
    const [created] = await db
      .insert(schema.caseTable)
      .values({
        id: randomUUID(),
        caseNumber: randomUUID(),
        subject,
        description,
        accountId: accountId as string,
        dueDate: dueDate,
        priority,
        ownerId: ownerId as string,
        organizationId: locals.org!.id
      })
      .returning();
    throw redirect(303, `/app/cases/${created.id}`);
  },
  update: async ({ request, params, locals }) => {
    const db = locals.db
    const form = await request.formData();
    const subject = form.get('title')?.toString().trim();
    const description = form.get('description')?.toString().trim();
    const accountId = form.get('accountId')?.toString();
    const dueDateValue = form.get('dueDate');
    const dueDate = dueDateValue ? new Date(dueDateValue.toString()) : null;
    const priority = form.get('priority')?.toString() || 'Medium';
    const ownerId = form.get('assignedId')?.toString();
    const caseId = form.get('caseId')?.toString();
    if (!subject || !accountId || !ownerId || !caseId) {
      return fail(400, { error: 'Missing required fields.' });
    }
    await db
      .update(schema.caseTable)
      .set({
        subject,
        description,
        accountId: accountId as string,
        dueDate: dueDate,
        priority,
        ownerId: ownerId as string
      })
      .where(and(eq(schema.caseTable.id, caseId), eq(schema.caseTable.organizationId, locals.org!.id)));
    throw redirect(303, `/app/cases/${caseId}`);
  },
  delete: async ({ request, locals }) => {
    const db = locals.db
    const form = await request.formData();
    const caseId = form.get('caseId')?.toString();
    if (!caseId) {
      return fail(400, { error: 'Case ID is required.' });
    }
    await db
      .delete(schema.caseTable)
      .where(and(eq(schema.caseTable.id, caseId), eq(schema.caseTable.organizationId, locals.org!.id)));
    throw redirect(303, '/app/cases');
  },
  comment: async ({ request, locals }) => {
    const db = locals.db
    const form = await request.formData();
    const body = form.get('body')?.toString().trim();
    const caseId = form.get('caseId')?.toString();
    if (!body || !caseId) return fail(400, { error: 'Comment and case ID are required.' });
    await db.insert(schema.comment).values({
      id: randomUUID(),
      body,
      authorId: locals.user!.id,
      organizationId: locals.org!.id,
      caseId
    });
    return { success: true };
  }
};
