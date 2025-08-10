import { error, fail } from '@sveltejs/kit';
import { schema } from '@opensource-startup-crm/database';
import { and, desc, eq } from 'drizzle-orm';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ params, url, locals }) => {
  const org = locals.org!;
  const db = locals.db;
  try {
    const accountId = params.accountId;

    const [account] = await db
      .select()
      .from(schema.crmAccount)
      .where(and(eq(schema.crmAccount.id, accountId), eq(schema.crmAccount.organizationId, org.id)));
    if (!account) throw error(404, 'Account not found');

    const contactRelationships = await db
      .select({
        isPrimary: schema.accountContactRelationship.isPrimary,
        role: schema.accountContactRelationship.role,
        contact: schema.contact
      })
      .from(schema.accountContactRelationship)
      .innerJoin(schema.contact, eq(schema.contact.id, schema.accountContactRelationship.contactId))
      .where(eq(schema.accountContactRelationship.accountId, accountId));

    const contacts = contactRelationships.map((rel) => ({ ...rel.contact, isPrimary: rel.isPrimary, role: rel.role }));

    const opportunities = await db
      .select()
      .from(schema.opportunity)
      .where(eq(schema.opportunity.accountId, accountId));

    const comments = await db
      .select({
        id: schema.comment.id,
        body: schema.comment.body,
        createdAt: schema.comment.createdAt,
        authorId: schema.user.id,
        authorName: schema.user.name,
        isPrivate: schema.comment.isPrivate
      })
      .from(schema.comment)
      .leftJoin(schema.user, eq(schema.user.id, schema.comment.authorId))
      .where(eq(schema.comment.accountId, accountId))
      .orderBy(desc(schema.comment.createdAt));

    if (url.searchParams.get('commentsOnly') === '1') {
      return new Response(JSON.stringify({ comments }), { headers: { 'Content-Type': 'application/json' } });
    }

    const quotes = await db.select().from(schema.quote).where(eq(schema.quote.accountId, accountId));

    const tasks = await db
      .select({ id: schema.task.id, status: schema.task.status, ownerId: schema.user.id, ownerName: schema.user.name, subject: schema.task.subject, priority: schema.task.priority, dueDate: schema.task.dueDate })
      .from(schema.task)
      .leftJoin(schema.user, eq(schema.user.id, schema.task.ownerId))
      .where(eq(schema.task.accountId, accountId));

    const cases = await db.select().from(schema.caseTable).where(eq(schema.caseTable.accountId, accountId));

    const users = await db
      .select({ id: schema.user.id, name: schema.user.name, email: schema.user.email })
      .from(schema.member)
      .innerJoin(schema.user, eq(schema.member.userId, schema.user.id))
      .where(eq(schema.member.organizationId, account.organizationId));

    return {
      account,
      contacts,
      opportunities,
      comments,
      quotes,
      tasks,
      cases,
      users,
      meta: { title: account.name, description: `Account details for ${account.name}` }
    };
  } catch (err) {
    console.error('Error loading account data:', err);
    const errorMessage = err instanceof Error ? err.message : 'Error loading account data';
    throw error(500, errorMessage);
  }
};

export const actions: Actions = {
  closeAccount: async ({ request, locals, params }) => {
    try {
      const user = locals.user!;
      const org = locals.org!;
      const db = locals.db;
      const { accountId } = params;
      const formData = await request.formData();
      const closureReason = formData.get('closureReason')?.toString();
      if (!closureReason) return fail(400, { success: false, message: 'Please provide a reason for closing this account' });

      const [account] = await db
        .select({ id: schema.crmAccount.id, closedAt: schema.crmAccount.closedAt, organizationId: schema.crmAccount.organizationId, ownerId: schema.crmAccount.ownerId })
        .from(schema.crmAccount)
        .where(and(eq(schema.crmAccount.id, accountId), eq(schema.crmAccount.organizationId, org.id)));
      if (!account) return fail(404, { success: false, message: 'Account not found' });
      if (account.closedAt) return fail(400, { success: false, message: 'Account is already closed' });

      // Permission: allow org updaters or the account owner
      let isAuthorized = user.id === account.ownerId;
      if (!isAuthorized) {
        const { success } = await locals.auth.api.hasPermission({
          body: { organizationId: org.id, permission: { organization: ['update'] } },
          headers: request.headers
        });
        isAuthorized = success;
      }
      if (!isAuthorized) {
        return fail(403, { success: false, message: 'Permission denied. Only account owners or admins can close accounts.' });
      }

      const [updated] = await db
        .update(schema.crmAccount)
        .set({ closedAt: new Date(), isActive: false, closureReason })
        .where(eq(schema.crmAccount.id, accountId))
        .returning();

      await db.insert(schema.auditLog).values({
        action: 'UPDATE',
        entityType: 'Account',
        entityId: accountId,
        description: `Account closed: ${closureReason}`,
        oldValues: { closedAt: null, closureReason: null } as any,
        newValues: { closedAt: updated.closedAt, closureReason } as any,
        userId: user.id,
        organizationId: account.organizationId,
        ipAddress: request.headers.get('x-forwarded-for') || 'unknown'
      });
      return { success: true };
    } catch (error) {
      console.error('Error closing account:', error);
      return fail(500, { success: false, message: 'An unexpected error occurred' });
    }
  },
  reopenAccount: async ({ request, locals, params }) => {
    try {
      const user = locals.user!;
      const org = locals.org!;
      const db = locals.db;
      const { accountId } = params;

      const { success: hasPermission } =
        await locals.auth.api.hasPermission({
          body: {
            organizationId: org.id,
            permission: {
              organization: ['update'],
            }
          },
          headers: request.headers
        })

      if (!hasPermission) {
        return fail(403, { success: false, message: 'Permission denied. Only account owners, sales managers, or admins can reopen accounts.' });
      }

      const [account] = await db
        .select({ id: schema.crmAccount.id, closedAt: schema.crmAccount.closedAt, closureReason: schema.crmAccount.closureReason, organizationId: schema.crmAccount.organizationId, ownerId: schema.crmAccount.ownerId })
        .from(schema.crmAccount)
        .where(and(eq(schema.crmAccount.id, accountId), eq(schema.crmAccount.organizationId, org.id)));
      if (!account) return fail(404, { success: false, message: 'Account not found' });
      if (!account.closedAt) return fail(400, { success: false, message: 'Account is not closed' });

      const oldValues = { closedAt: account.closedAt, closureReason: account.closureReason } as any;
      await db
        .update(schema.crmAccount)
        .set({ closedAt: null, isActive: true, closureReason: null })
        .where(eq(schema.crmAccount.id, accountId));

      await db.insert(schema.auditLog).values({
        action: 'UPDATE',
        entityType: 'Account',
        entityId: accountId,
        description: `Account reopened`,
        oldValues,
        newValues: { closedAt: null, closureReason: null } as any,
        userId: user.id,
        organizationId: account.organizationId,
        ipAddress: request.headers.get('x-forwarded-for') || 'unknown'
      });
      return { success: true };
    } catch (error) {
      console.error('Error reopening account:', error);
      return fail(500, { success: false, message: 'An unexpected error occurred' });
    }
  },
  comment: async ({ request, locals, params }) => {
    const org = locals.org!;
    const db = locals.db;
    const [account] = await db
      .select({ organizationId: schema.crmAccount.organizationId, ownerId: schema.crmAccount.ownerId })
      .from(schema.crmAccount)
      .where(and(eq(schema.crmAccount.id, params.accountId), eq(schema.crmAccount.organizationId, org.id)));
    if (!account) return fail(404, { error: 'Account not found.' });

    const authorId = account.ownerId;
    const organizationId = account.organizationId;
    const form = await request.formData();
    const body = form.get('body')?.toString().trim();
    if (!body) return fail(400, { error: 'Comment cannot be empty.' });
    await db.insert(schema.comment).values({ body, authorId, organizationId, accountId: params.accountId });
    return { success: true };
  }
};
