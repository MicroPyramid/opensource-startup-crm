import { schema } from '@opensource-startup-crm/database';
import type { Actions, PageServerLoad } from './$types';
import { and, desc, eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ locals }) => {
  const user = locals.user!;
  const org = locals.org!;
  const db = locals.db
  
  const boards = await db
    .select({ id: schema.board.id, name: schema.board.name })
    .from(schema.board)
    .where(and(eq(schema.board.ownerId, user.id), eq(schema.board.organizationId, org.id)))
    .orderBy(desc(schema.board.createdAt));
  return { boards };
};

export const actions: Actions = {
  create: async ({ request, locals }) => {
    const user = locals.user!;
    const org = locals.org!;
    const db = locals.db

    const form = await request.formData();
    const name = form.get('name')?.toString();
    if (!name) return { status: 400 } as const;

    const [board] = await db
      .insert(schema.board)
      .values({ id: crypto.randomUUID(), name, ownerId: user.id, organizationId: org.id })
      .returning();

    const defaultColumns = ["To Do", "In Progress", "Done"] as const;
    for (let i = 0; i < defaultColumns.length; i += 1) {
      await db.insert(schema.boardColumn).values({
        id: crypto.randomUUID(),
        name: defaultColumns[i],
        boardId: board.id,
        order: i + 1
      });
    }
    return { success: true };
  }
};
