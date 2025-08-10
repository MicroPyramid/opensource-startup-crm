import { error, fail } from '@sveltejs/kit';
import { z } from 'zod';
import { schema } from '@opensource-startup-crm/database';
import { and, eq, sql, asc, desc } from 'drizzle-orm';
import { alias } from 'drizzle-orm/pg-core';
import type { PageServerLoad, Actions } from './$types';

const commentSchema = z.object({
  comment: z.string().min(1, 'Comment cannot be empty').max(1000, 'Comment too long').trim()
});

export const load: PageServerLoad = async ({ params, locals }) => {
  const leadId = params.lead_id;
  const org = locals.org!;
  const db = locals.db

  const taskOwner = alias(schema.user, 'task_owner');
  const eventOwner = alias(schema.user, 'event_owner');
  const commentAuthor = alias(schema.user, 'comment_author');

  const rows = await db
    .select({
      lead: schema.lead,
      owner: schema.user,
      contact: schema.contact,
      // task
      task: {
        id: schema.task.id,
        subject: schema.task.subject,
        createdAt: schema.task.createdAt
      },
      taskOwnerName: taskOwner.name,
      // event
      event: {
        id: schema.event.id,
        subject: schema.event.subject,
        startDate: schema.event.startDate
      },
      eventOwnerName: eventOwner.name,
      // comment
      comment: {
        id: schema.comment.id,
        body: schema.comment.body,
        createdAt: schema.comment.createdAt,
        authorId: schema.comment.authorId
      },
      commentAuthorName: commentAuthor.name
    })
    .from(schema.lead)
    .leftJoin(schema.user, eq(schema.user.id, schema.lead.ownerId))
    .leftJoin(schema.contact, eq(schema.contact.id, schema.lead.contactId))
    .leftJoin(schema.task, eq(schema.task.leadId, schema.lead.id))
    .leftJoin(taskOwner, eq(taskOwner.id, schema.task.ownerId))
    .leftJoin(schema.event, eq(schema.event.leadId, schema.lead.id))
    .leftJoin(eventOwner, eq(eventOwner.id, schema.event.ownerId))
    .leftJoin(schema.comment, eq(schema.comment.leadId, schema.lead.id))
    .leftJoin(commentAuthor, eq(commentAuthor.id, schema.comment.authorId))
    .where(and(eq(schema.lead.id, leadId), eq(schema.lead.organizationId, org.id)))
    .orderBy(
      // Ensure stable grouping and ordering across joined rows
      sql`CASE WHEN ${schema.task.id} IS NOT NULL THEN 1 WHEN ${schema.event.id} IS NOT NULL THEN 2 WHEN ${schema.comment.id} IS NOT NULL THEN 3 ELSE 4 END`,
      desc(schema.task.createdAt),
      asc(schema.event.startDate),
      desc(schema.comment.createdAt)
    );

  if (!rows || rows.length === 0) {
    throw error(404, 'Lead not found');
  }

  const head = rows[0];
  const tasks: { id: string; subject: string | null; createdAt: Date | null; ownerName: string | null }[] = [];
  const events: { id: string; subject: string | null; startDate: Date | null; ownerName: string | null }[] = [];
  const comments: { id: string; body: string; createdAt: Date; authorId: string; authorName: string | null }[] = [];
  const seenTask = new Set<string>();
  const seenEvent = new Set<string>();
  const seenComment = new Set<string>();

  for (const r of rows) {
    if (r.task && r.task.id && !seenTask.has(r.task.id)) {
      seenTask.add(r.task.id);
      tasks.push({
        id: r.task.id,
        subject: r.task.subject,
        createdAt: r.task.createdAt,
        ownerName: (r).taskOwnerName ?? null
      });
    }
    if (r.event && r.event.id && !seenEvent.has(r.event.id)) {
      seenEvent.add(r.event.id);
      events.push({
        id: r.event.id,
        subject: r.event.subject,
        startDate: r.event.startDate,
        ownerName: (r).eventOwnerName ?? null
      });
    }
    if (r.comment && r.comment.id && !seenComment.has(r.comment.id)) {
      seenComment.add(r.comment.id);
      comments.push({
        id: r.comment.id,
        body: r.comment.body,
        createdAt: r.comment.createdAt,
        authorId: r.comment.authorId,
        authorName: (r).commentAuthorName ?? null
      });
    }
  }

  return {
    lead: {
      ...head.lead,
      owner: head.owner,
      contact: head.contact,
      tasks,
      events,
      comments
    }
  };
};

export const actions: Actions = {
  convert: async ({ params, locals }) => {
    const leadId = params.lead_id;
    const org = locals.org!;
    const db = locals.db

    try {
      const [lead] = await db
        .select()
        .from(schema.lead)
        .where(and(eq(schema.lead.id, leadId), eq(schema.lead.organizationId, org.id)));

      if (!lead) {
        return fail(404, { status: 'error', message: 'Lead not found' });
      }
      if (lead.status === 'CONVERTED') {
        return { status: 'success', message: 'Lead already converted' };
      }

      const [contact] = await db
        .insert(schema.contact)
        .values({
          firstName: lead.firstName,
          lastName: lead.lastName,
          email: lead.email,
          phone: lead.phone,
          title: lead.title,
          description: lead.description,
          ownerId: lead.ownerId,
          organizationId: lead.organizationId
        })
        .returning();

      let accountId: string | null = null;
      if (lead.company) {
        const [account] = await db
          .insert(schema.crmAccount)
          .values({
            name: lead.company,
            industry: lead.industry,
            ownerId: lead.ownerId,
            organizationId: lead.organizationId
          })
          .returning();
        accountId = account.id;
        await db.insert(schema.accountContactRelationship).values({
          accountId: account.id,
          contactId: contact.id,
          isPrimary: true,
          role: 'Primary Contact'
        });
      } else {
        const [account] = await db
          .insert(schema.crmAccount)
          .values({
            name: `${lead.firstName} ${lead.lastName} Account`,
            ownerId: lead.ownerId,
            organizationId: lead.organizationId
          })
          .returning();
        accountId = account.id;
        await db.insert(schema.accountContactRelationship).values({
          accountId: account.id,
          contactId: contact.id,
          isPrimary: true,
          role: 'Primary Contact'
        });
      }

      const [opportunity] = await db
        .insert(schema.opportunity)
        .values({
          name: `${lead.company || lead.firstName + ' ' + lead.lastName} Opportunity`,
          stage: 'PROSPECTING',
          amount: 0,
          closeDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          ownerId: lead.ownerId,
          organizationId: lead.organizationId,
          accountId: accountId!
        })
        .returning();

      // link contact to opportunity via join table
      await db.insert(schema.contactToOpportunity).values({ contactId: contact.id, opportunityId: opportunity.id });

      await db
        .update(schema.lead)
        .set({
          status: 'CONVERTED',
          isConverted: true,
          convertedAt: new Date(),
          convertedContactId: contact.id,
          convertedAccountId: accountId!,
          convertedOpportunityId: opportunity.id,
          contactId: contact.id
        })
        .where(eq(schema.lead.id, leadId));

      return {
        status: 'success',
        message: 'Lead successfully converted',
        redirectTo: `/app/accounts/${accountId}`,
        contact,
        opportunity
      };
    } catch (err: any) {
      console.error('Error converting lead:', err?.message || err);
      return fail(500, { status: 'error', message: `Error converting lead: ${err?.message || 'unknown'}` });
    }
  },

  addComment: async ({ params, request, locals }) => {
    const leadId = params.lead_id;
    const org = locals.org!;
    const user = locals.user!;
    const db = locals.db

    const data = await request.formData();
    const comment = data.get('comment');
    try {
      const validated = commentSchema.parse({ comment });

      const [lead] = await db
        .select({ organizationId: schema.lead.organizationId })
        .from(schema.lead)
        .where(and(eq(schema.lead.id, leadId), eq(schema.lead.organizationId, org.id)));
      if (!lead) {
        return fail(404, { status: 'error', message: 'Lead not found' });
      }

      const updated = await db.insert(schema.comment).values({
        body: validated.comment,
        leadId: leadId,
        authorId: user.id,
        organizationId: lead.organizationId
      }).returning();

      return { status: 'success', message: 'Comment added successfully', commentAdded: true, comment: { ...updated[0], authorName: user.name } };
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        return fail(400, { status: 'error', message: err.issues[0].message });
      }
      console.error('Error adding comment:', err?.message || err);
      return fail(500, { status: 'error', message: 'Failed to add comment' });
    }
  }
};