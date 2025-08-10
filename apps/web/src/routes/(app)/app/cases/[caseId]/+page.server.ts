import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { schema } from '@opensource-startup-crm/database';
import { and, desc, eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ params, locals }) => {
  const org = locals.org!;
  const db = locals.db
  const caseId = params.caseId;
  const [base] = await db
    .select({
      id: schema.caseTable.id,
      subject: schema.caseTable.subject,
      description: schema.caseTable.description,
      status: schema.caseTable.status,
      dueDate: schema.caseTable.dueDate,
      priority: schema.caseTable.priority,
      ownerId: schema.user.id,
      ownerName: schema.user.name,
      accountId: schema.crmAccount.id,
      accountName: schema.crmAccount.name
    })
    .from(schema.caseTable)
    .leftJoin(schema.user, eq(schema.user.id, schema.caseTable.ownerId))
    .leftJoin(schema.crmAccount, eq(schema.crmAccount.id, schema.caseTable.accountId))
    .where(and(eq(schema.caseTable.id, caseId), eq(schema.caseTable.organizationId, org.id)) as any);

  if (!base) throw error(404, 'Case not found');

  const comments = await db
    .select({
      id: schema.comment.id,
      body: schema.comment.body,
      createdAt: schema.comment.createdAt,
      authorId: schema.user.id,
      authorName: schema.user.name
    })
    .from(schema.comment)
    .leftJoin(schema.user, eq(schema.user.id, schema.comment.authorId))
    .where(eq(schema.comment.caseId, caseId))
    .orderBy(desc(schema.comment.createdAt));

  const caseItem = {
    id: base.id,
    subject: base.subject,
    description: base.description,
    status: base.status,
    dueDate: base.dueDate,
    priority: base.priority,
    owner: { id: base.ownerId, name: base.ownerName },
    account: { id: base.accountId, name: base.accountName },
    comments
  } as any;
  if (!caseItem) throw error(404, 'Case not found');
  return { caseItem };
};

export const actions: Actions = {
  comment: async ({ request, params, locals }) => {
    const org = locals.org!;
    const user = locals.user!;
    const db = locals.db

    // check if the case is related to the organization
    const [caseExists] = await db
      .select({ id: schema.caseTable.id })
      .from(schema.caseTable)
      .where(and(eq(schema.caseTable.id, params.caseId), eq(schema.caseTable.organizationId, org.id)) as any);
    if (!caseExists) {
      return fail(404, { error: 'Case not found or does not belong to this organization.' });
    }
    const form = await request.formData();
    const body = form.get('body')?.toString().trim();
    if (!body) return fail(400, { error: 'Comment cannot be empty.' });
    await db.insert(schema.comment).values({
      id: crypto.randomUUID(),
      body,
      authorId: user.id,
      organizationId: org.id,
      caseId: params.caseId
    } as any);
    return { success: true };
  }
};
