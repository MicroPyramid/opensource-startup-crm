import { schema } from '@opensource-startup-crm/database';
import { error } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
  const db = locals.db
  
  const { slug } = params;

  try {
    const rows = await db
      .select({
        post: {
          id: schema.blogPost.id,
          title: schema.blogPost.title,
          slug: schema.blogPost.slug,
          excerpt: schema.blogPost.excerpt,
          draft: schema.blogPost.draft,
          createdAt: schema.blogPost.createdAt,
          updatedAt: schema.blogPost.updatedAt
        },
        block: {
          id: schema.blogContentBlock.id,
          blogId: schema.blogContentBlock.blogId,
          type: schema.blogContentBlock.type,
          content: schema.blogContentBlock.content,
          displayOrder: schema.blogContentBlock.displayOrder,
          draft: schema.blogContentBlock.draft,
          createdAt: schema.blogContentBlock.createdAt,
          updatedAt: schema.blogContentBlock.updatedAt
        }
      })
      .from(schema.blogPost)
      .leftJoin(
        schema.blogContentBlock,
        eq(schema.blogContentBlock.blogId, schema.blogPost.id)
      )
      .where(and(eq(schema.blogPost.slug, slug), eq(schema.blogPost.draft, false)))
      .orderBy(schema.blogContentBlock.displayOrder);

    if (!rows || rows.length === 0) {
      throw error(404, 'Blog post not found');
    }

    const post = rows[0].post;
    const contentBlocks = rows
      .filter((r) => r.block && r.block.id)
      .map((r) => r.block);

    return { post: { ...post, contentBlocks } };
  } catch (err) {
    console.error('Error loading blog post:', err);
    throw error(404, 'Blog post not found');
  }
}
