import { schema } from '@opensource-startup-crm/database';
import { asc, eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
  const db = locals.db
  const rows = await db
    .select({
      id: schema.blogPost.id,
      title: schema.blogPost.title,
      slug: schema.blogPost.slug,
      excerpt: schema.blogPost.excerpt,
      draft: schema.blogPost.draft,
      seoDescription: schema.blogPost.seoDescription,
      seoTitle: schema.blogPost.seoTitle,
      createdAt: schema.blogPost.createdAt,
      updatedAt: schema.blogPost.updatedAt,
      blockId: schema.blogContentBlock.id,
      blockType: schema.blogContentBlock.type,
      blockContent: schema.blogContentBlock.content,
      blockDisplayOrder: schema.blogContentBlock.displayOrder,
      blockDraft: schema.blogContentBlock.draft
    })
    .from(schema.blogPost)
    .leftJoin(
      schema.blogContentBlock,
      eq(schema.blogContentBlock.blogId, schema.blogPost.id)
    )
    .where(eq(schema.blogPost.id, params.id))
    .orderBy(asc(schema.blogContentBlock.displayOrder));

  if (rows.length === 0) {
    return { blog: null };
  }

  const base = rows[0];
  const blog = {
    id: base.id,
    title: base.title,
    slug: base.slug,
    excerpt: base.excerpt,
    draft: base.draft,
    seoDescription: base.seoDescription,
    seoTitle: base.seoTitle,
    createdAt: base.createdAt,
    updatedAt: base.updatedAt,
    contentBlocks: rows
      .filter((r) => r.blockId !== null)
      .map((r) => ({
        id: r.blockId!,
        type: r.blockType,
        content: r.blockContent,
        displayOrder: r.blockDisplayOrder,
        draft: r.blockDraft
      }))
  };

  return { blog };
};

export const actions: Actions = {

  'add-block': async ({ request, params, locals }) => {
    const form = await request.formData();
    const type = form.get('type')?.toString() as typeof schema.blogContentBlock.$inferInsert['type'];
    const content = form.get('content')?.toString();
    const displayOrder = form.get('displayOrder')?.toString();

    if (!type || !content || !displayOrder) {
      return { success: false, error: 'Missing required fields' };
    }
    
    const db = locals.db

    await db.insert(schema.blogContentBlock).values({
      blogId: params.id,
      type,
      content,
      displayOrder: Number(displayOrder),
      draft: form.get('draft') === 'on'
    });
    return { success: true };
  },
  'edit-block': async ({ request, locals }) => {
    const form = await request.formData();
    const id = form.get('id')?.toString();
    const type = form.get('type')?.toString() as typeof schema.blogContentBlock.$inferInsert['type'];
    const content = form.get('content')?.toString();

    if (!id || !type || !content) {
      return { success: false, error: 'Missing required fields' };
    }

    const db = locals.db

    await db
      .update(schema.blogContentBlock)
      .set({ type, content, draft: form.get('draft') === 'on' })
      .where(eq(schema.blogContentBlock.id, id));
    return { success: true };
  },
  'delete-block': async ({ request, locals }) => {
    const form = await request.formData();
    const id = form.get('id')?.toString();
    
    if (!id) {
      return { success: false, error: 'Missing block ID' };
    }
    const db = locals.db

    await db.delete(schema.blogContentBlock).where(eq(schema.blogContentBlock.id, id));
    return { success: true };
  },
  'update-blog': async ({ request, params, locals }) => {
    const db = locals.db
    const form = await request.formData();
    const data = {
      title: form.get('title')?.toString() || '',
      seoTitle: form.get('seoTitle')?.toString() || '',
      seoDescription: form.get('seoDescription')?.toString() || '',
      excerpt: form.get('excerpt')?.toString() || '',
      slug: form.get('slug')?.toString() || '',
      draft: form.get('draft') === 'on'
    };
    await db
      .update(schema.blogPost)
      .set(data)
      .where(eq(schema.blogPost.id, params.id));
    return { success: true };
  }
  ,
  'reorder-blocks': async ({ request, params, locals }) => {
    const db = locals.db
    const form = await request.formData();
    const orderStr = form.get('order')?.toString();

    if (!orderStr) {
      return { success: false, error: 'Missing order data' };
    }

    const order = JSON.parse(orderStr);
    for (const { id, displayOrder } of order as Array<{ id: string; displayOrder: number }>) {
      await db
        .update(schema.blogContentBlock)
        .set({ displayOrder })
        .where(eq(schema.blogContentBlock.id, id));
    }
    return { success: true };
  }
};