import type { PageServerLoad } from './$types';
import { schema } from '@opensource-startup-crm/database';
import { eq, asc } from 'drizzle-orm';

export const load: PageServerLoad = async ({ params, locals }) => {
    const db = locals.db
    const [blog] = await db.select().from(schema.blogPost).where(eq(schema.blogPost.id, params.id));
    const contentBlocks = blog
        ? await db
            .select()
            .from(schema.blogContentBlock)
            .where(eq(schema.blogContentBlock.blogId, params.id))
            .orderBy(asc(schema.blogContentBlock.displayOrder))
        : [];
    return { blog: blog ? { ...blog, contentBlocks } : null };
};