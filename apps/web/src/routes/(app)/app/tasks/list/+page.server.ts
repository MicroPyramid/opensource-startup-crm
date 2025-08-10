import { schema } from '@opensource-startup-crm/database';
import { redirect } from '@sveltejs/kit';
import { eq, desc } from 'drizzle-orm';

export async function load({ locals }) {
  const org = locals.org!;
  const db = locals.db

  if (!org?.id) throw redirect(302, "/app")

  const tasks = await db
    .select({
      id: schema.task.id,
      subject: schema.task.subject,
      status: schema.task.status,
      priority: schema.task.priority,
      createdAt: schema.task.createdAt,
      ownerId: schema.task.ownerId,
      accountId: schema.task.accountId,
      ownerName: schema.user.name,
      ownerUserId: schema.user.id,
      accountName: schema.crmAccount.name,
      description: schema.task.description,
      dueDate: schema.task.dueDate,
    })
    .from(schema.task)
    .leftJoin(schema.user, eq(schema.user.id, schema.task.ownerId))
    .leftJoin(schema.crmAccount, eq(schema.crmAccount.id, schema.task.accountId))
    .where(eq(schema.task.organizationId, org.id))
    .orderBy(desc(schema.task.createdAt));

  return { tasks };
}