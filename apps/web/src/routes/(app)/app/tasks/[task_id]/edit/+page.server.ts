import { schema } from '@opensource-startup-crm/database';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { and, eq } from 'drizzle-orm';
import { validateEnumOrDefault } from '$lib/data/enum-helpers';
import { TASK_STATUSES, TASK_PRIORITIES } from '@opensource-startup-crm/constants';

export const load: PageServerLoad = async ({ params, locals }) => {
  const org = locals.org!;
  const db = locals.db

  const [task] = await db
    .select({
      id: schema.task.id,
      subject: schema.task.subject,
      description: schema.task.description,
      status: schema.task.status,
      priority: schema.task.priority,
      dueDate: schema.task.dueDate,
      ownerId: schema.task.ownerId,
      accountId: schema.task.accountId
    })
    .from(schema.task)
    .where(and(eq(schema.task.id, params.task_id), eq(schema.task.organizationId, org.id)));

  if (!task) throw redirect(303, '/app/tasks');

  const formattedTask = {
    ...task,
    dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : task.dueDate
  } as any;

  const users = await db
    .select({ id: schema.user.id, name: schema.user.name })
    .from(schema.member)
    .innerJoin(schema.user, eq(schema.member.userId, schema.user.id))
    .where(eq(schema.member.organizationId, org.id));

  const accounts = await db
    .select({ id: schema.crmAccount.id, name: schema.crmAccount.name })
    .from(schema.crmAccount)
    .where(eq(schema.crmAccount.organizationId, org.id));

  return { task: formattedTask, users, accounts };
};

export const actions: Actions = {
  update: async ({ request, params, locals }) => {
    const formData = await request.formData();
    const org = locals.org!;
    const user = locals.user!;
    const db = locals.db

    const subject = formData.get('subject');
    const description = formData.get('description');
    const status = formData.get('status');
    const priority = formData.get('priority');
    const dueDateField = formData.get('dueDate');
    const ownerId = formData.get('ownerId');
    let accountId = formData.get('accountId');

    if (!subject || typeof subject !== 'string' || subject.trim() === '') {
      return fail(400, { fieldError: ['subject', 'Subject is required.'] });
    }
    if (!ownerId || typeof ownerId !== 'string') {
      return fail(400, { fieldError: ['ownerId', 'Owner is required.'] });
    }

    const [taskToUpdate] = await db
      .select({ id: schema.task.id })
      .from(schema.task)
      .where(and(eq(schema.task.id, params.task_id), eq(schema.task.organizationId, org.id)));

    if (!taskToUpdate) {
      return fail(404, { message: 'Task not found or you do not have permission to edit it.' });
    }

    const [userExistsInOrg] = await db
      .select({ id: schema.member.id })
      .from(schema.member)
      .where(and(eq(schema.member.userId, user.id), eq(schema.member.organizationId, org.id)));
    if (!userExistsInOrg) {
      return fail(400, { fieldError: ['ownerId', 'User is not part of this organization.'] });
    }


    // Convert empty string or null accountId to null for Prisma
    accountId = accountId === '' || accountId === 'null' ? null : accountId;

    // Convert dueDate to Date object or null if empty (DB expects Date)
    const dueDateValue: Date | null =
      typeof dueDateField === 'string' && dueDateField.trim() !== '' ? new Date(dueDateField) : null;

    try {
      await db
        .update(schema.task)
        .set({
          subject: subject.toString().trim(),
          description: description ? description.toString().trim() : null,
          status: validateEnumOrDefault(status, TASK_STATUSES, 'NOT_STARTED'),
          priority: validateEnumOrDefault(priority, TASK_PRIORITIES, 'NORMAL'),
          dueDate: dueDateValue || null,
          ownerId: ownerId.toString(),
          accountId: accountId ? accountId.toString() : null
        })
        .where(and(eq(schema.task.id, params.task_id), eq(schema.task.organizationId, org.id)));
    } catch (error) {
      console.error('Error updating task:', error);
      return fail(500, { message: 'Failed to update task. Please try again.' });
    }

    throw redirect(303, `/app/tasks/${params.task_id}`);
  }
};