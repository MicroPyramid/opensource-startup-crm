import { schema } from '@opensource-startup-crm/database';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { and, eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ params, locals }) => {
  const user = locals.user;
  const org = locals.org;
  const db = locals.db
  const { task_id } = params;

  // Better-auth guard: ensure authenticated user and active organization
  if (!user) throw redirect(307, '/login');
  if (!org) throw redirect(307, '/org');

  // Ensure the task belongs to the active organization
  const [taskExists] = await db
    .select({ id: schema.task.id })
    .from(schema.task)
    .where(and(eq(schema.task.id, task_id), eq(schema.task.organizationId, org.id)));

  if (!taskExists) {
    return fail(404, { message: 'Task not found or you do not have permission to view it.' });
  }

  // Ensure the current user is a member of the active organization
  const [membership] = await db
    .select({ id: schema.member.id })
    .from(schema.member)
    .where(and(eq(schema.member.userId, user.id), eq(schema.member.organizationId, org.id)));

  if (!membership) {
    return fail(403, { message: 'You are not a member of this organization.' });
  }

  // Load task details
  const [task] = await db
    .select({
      id: schema.task.id,
      subject: schema.task.subject,
      description: schema.task.description,
      status: schema.task.status,
      priority: schema.task.priority,
      dueDate: schema.task.dueDate,
      ownerId: schema.task.ownerId,
      accountId: schema.task.accountId,
      owner: { id: schema.user.id, name: schema.user.name, image: schema.user.image },
      accountName: schema.crmAccount.name
    })
    .from(schema.task)
    .leftJoin(schema.user, eq(schema.user.id, schema.task.ownerId))
    .leftJoin(schema.crmAccount, eq(schema.crmAccount.id, schema.task.accountId))
    .where(eq(schema.task.id, task_id));

  // Users limited to active organization
  const users = await db
    .select({ id: schema.user.id, name: schema.user.name, image: schema.user.image })
    .from(schema.user)
    .innerJoin(schema.member, eq(schema.member.userId, schema.user.id))
    .where(eq(schema.member.organizationId, org.id));

  // Accounts limited to active organization
  const accounts = await db
    .select({ id: schema.crmAccount.id, name: schema.crmAccount.name })
    .from(schema.crmAccount)
    .where(eq(schema.crmAccount.organizationId, org.id));

  // Logged-in user details (with profile photo)
  const [loggedInUserRow] = await db
    .select({ id: schema.user.id, name: schema.user.name, image: schema.user.image })
    .from(schema.user)
    .where(eq(schema.user.id, user.id));

  // Load task comments with author data
  const comments = await db
    .select({
      id: schema.comment.id,
      body: schema.comment.body,
      createdAt: schema.comment.createdAt,
      author: { id: schema.user.id, name: schema.user.name, image: schema.user.image }
    })
    .from(schema.comment)
    .leftJoin(schema.user, eq(schema.user.id, schema.comment.authorId))
    .where(eq(schema.comment.taskId, task_id));

  const formattedTask = task
    ? {
      ...task,
      dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : task.dueDate,
      account: task.accountName ? { name: task.accountName } : null,
      comments
    }
    : null;

  return {
    task: formattedTask,
    users,
    accounts,
    loggedInUser: loggedInUserRow ?? null
  };
};

export const actions: Actions = {
  addComment: async ({ request, params, locals }) => {
    const user = locals.user;
    const org = locals.org;
    const db = locals.db

    if (!user) throw redirect(307, '/login');
    if (!org) throw redirect(307, '/org');

    const formData = await request.formData();
    const commentBody = formData.get('commentBody')?.toString();
    const { task_id } = params;

    const userId = user.id;

    // check if the task is related to org.id and the user is related to the org
    const [taskToUpdate] = await db
      .select({ id: schema.task.id, organizationId: schema.task.organizationId })
      .from(schema.task)
      .where(and(eq(schema.task.id, params.task_id), eq(schema.task.organizationId, org.id)));

    if (!taskToUpdate) {
      return fail(404, { message: 'Task not found or you do not have permission to edit it.' });
    }

    const [userExistsInOrg] = await db
      .select({ userId: schema.member.userId })
      .from(schema.member)
      .where(and(eq(schema.member.userId, userId), eq(schema.member.organizationId, org.id)));
    if (!userExistsInOrg) {
      return fail(400, { fieldError: ['ownerId', 'User is not part of this organization.'] });
    }

    if (!commentBody || commentBody.trim() === '') {
      return fail(400, { error: true, message: 'Comment body cannot be empty.', commentBody });
    }

    try {
      const body = commentBody.trim();
      const [task] = await db
        .select({ organizationId: schema.task.organizationId })
        .from(schema.task)
        .where(eq(schema.task.id, task_id));

      if (!task) {
        return fail(404, { error: true, message: 'Task not found.' });
      }

      if (!task.organizationId) {
        // This case should ideally not happen if tasks always have an organizationId
        return fail(500, { error: true, message: 'Task is not associated with an organization.' });
      }

      await db.insert(schema.comment).values({
        body,
        authorId: userId,
        taskId: task_id,
        organizationId: task.organizationId
      });
      // No need to return the comment, page will reload data.
      // SvelteKit will invalidate the page data, causing `load` to re-run.
      // The form will be reset by default with `enhance`.
      return { success: true, message: 'Comment added successfully.' };
    } catch (error) {
      console.error('Error adding comment:', error);
      return fail(500, { error: true, message: 'Failed to add comment.' });
    }
  }
};