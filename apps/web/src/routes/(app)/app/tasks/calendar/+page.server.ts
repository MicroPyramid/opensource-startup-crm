import { schema } from '@opensource-startup-crm/database';
import { and, eq, asc, isNotNull } from 'drizzle-orm';

export async function load({ locals }) {
  const user = locals.user!;
  const org = locals.org!;
  const db = locals.db

  const tasks = await db
    .select({
      id: schema.task.id,
      subject: schema.task.subject,
      description: schema.task.description,
      dueDate: schema.task.dueDate,
      status: schema.task.status,
      priority: schema.task.priority,
      createdAt: schema.task.createdAt,
      updatedAt: schema.task.updatedAt
    })
    .from(schema.task)
    .where(and(
      eq(schema.task.ownerId, user.id),
      eq(schema.task.organizationId, org.id),
      isNotNull(schema.task.dueDate)
    ))
    .orderBy(asc(schema.task.dueDate));

  return { tasks };
}
