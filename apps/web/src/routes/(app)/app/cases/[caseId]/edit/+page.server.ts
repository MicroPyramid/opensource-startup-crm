import { fail, redirect, error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { schema } from '@opensource-startup-crm/database';
import { and, eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ params, locals }) => {
  const org = locals.org!;
  const caseId = params.caseId;
  const db = locals.db

  const [caseItem] = await db
    .select({
      id: schema.caseTable.id,
      subject: schema.caseTable.subject,
      description: schema.caseTable.description,
      status: schema.caseTable.status,
      dueDate: schema.caseTable.dueDate,
      priority: schema.caseTable.priority,
      owner: { id: schema.user.id, name: schema.user.name },
      account: { id: schema.crmAccount.id, name: schema.crmAccount.name }
    })
    .from(schema.caseTable)
    .leftJoin(schema.user, eq(schema.user.id, schema.caseTable.ownerId))
    .leftJoin(schema.crmAccount, eq(schema.crmAccount.id, schema.caseTable.accountId))
    .where(and(eq(schema.caseTable.id, caseId), eq(schema.caseTable.organizationId, org.id)));
  if (!caseItem) throw error(404, 'Case not found');
  // Fetch all users and accounts for dropdowns
  const [users, accounts] = await Promise.all([
    db
      .select({ id: schema.user.id, name: schema.user.name })
      .from(schema.member)
      .innerJoin(schema.user, eq(schema.user.id, schema.member.userId))
      .where(eq(schema.member.organizationId, org.id)),
    db
      .select({ id: schema.crmAccount.id, name: schema.crmAccount.name })
      .from(schema.crmAccount)
      .where(eq(schema.crmAccount.organizationId, org.id))
  ]);
  return { caseItem, users, accounts };
};

export const actions: Actions = {
  update: async ({ request, params, locals }) => {
    const org = locals.org!;
    const db = locals.db
    const form = await request.formData();
    const subject = form.get('title')?.toString().trim();
    const description = form.get('description')?.toString().trim();
    const accountId = form.get('accountId')?.toString();
    const dueDateRaw = form.get('dueDate');
    const dueDate = dueDateRaw ? new Date(dueDateRaw.toString()) : null;
    const priority = form.get('priority')?.toString() || 'Medium';
    const ownerId = form.get('assignedId')?.toString();

    if (!subject || !accountId || !ownerId) {
      return fail(400, { error: 'Missing required fields.' });
    }

    // Validate case is part of the organization
    const [caseExists] = await db
      .select({ id: schema.caseTable.id })
      .from(schema.caseTable)
      .where(and(eq(schema.caseTable.id, params.caseId), eq(schema.caseTable.organizationId, org.id)));
    if (!caseExists) {
      return fail(404, { error: 'Case not found or does not belong to this organization.' });
    }

    try {
      // Validate account belongs to the active organization
      const [accountBelongs] = await db
        .select({ id: schema.crmAccount.id })
        .from(schema.crmAccount)
        .where(and(eq(schema.crmAccount.id, accountId as string), eq(schema.crmAccount.organizationId, org.id)));
      if (!accountBelongs) {
        return fail(403, { error: 'Selected account does not belong to your organization.' });
      }

      // Validate owner is a member of the active organization
      const [ownerIsMember] = await db
        .select({ id: schema.member.userId })
        .from(schema.member)
        .where(and(eq(schema.member.userId, ownerId as string), eq(schema.member.organizationId, org.id)));
      if (!ownerIsMember) {
        return fail(403, { error: 'Selected assignee is not part of your organization.' });
      }

      await db
        .update(schema.caseTable)
        .set({ subject, description, accountId: accountId as string, dueDate: dueDate, priority, ownerId: ownerId as string })
        .where(and(eq(schema.caseTable.id, params.caseId), eq(schema.caseTable.organizationId, org.id)));
      return { success: true };
    } catch (error) {
      return fail(500, { error: 'Failed to update case.' });
    }
  },
  close: async ({ params, locals }) => {
    const org = locals.org!;
    const db = locals.db

    // Validate case is part of the organization
    const [caseExists] = await db
      .select({ id: schema.caseTable.id })
      .from(schema.caseTable)
      .where(and(eq(schema.caseTable.id, params.caseId), eq(schema.caseTable.organizationId, org.id)));
    if (!caseExists) {
      return fail(404, { error: 'Case not found or does not belong to this organization.' });
    }

    await db
      .update(schema.caseTable)
      .set({ status: 'CLOSED', closedAt: new Date() })
      .where(and(eq(schema.caseTable.id, params.caseId), eq(schema.caseTable.organizationId, org.id)));
    throw redirect(303, `/app/cases/${params.caseId}`);
  },
  reopen: async ({ params, locals }) => {
    const org = locals.org!;
    const db = locals.db

    // Validate case is part of the organization
    const [caseExists] = await db
      .select({ id: schema.caseTable.id })
      .from(schema.caseTable)
      .where(and(eq(schema.caseTable.id, params.caseId), eq(schema.caseTable.organizationId, org.id)));
    if (!caseExists) {
      return fail(404, { error: 'Case not found or does not belong to this organization.' });
    }

    await db
      .update(schema.caseTable)
      .set({ status: 'OPEN', closedAt: null })
      .where(and(eq(schema.caseTable.id, params.caseId), eq(schema.caseTable.organizationId, org.id)));
    throw redirect(303, `/app/cases/${params.caseId}`);
  }
};
