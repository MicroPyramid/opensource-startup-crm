import type { PageServerLoad } from './$types';
import { schema } from '@opensource-startup-crm/database';
import { desc } from 'drizzle-orm';

export const load: PageServerLoad = async ({ locals }) => {
    const db = locals.db;
    const blogs = await db
        .select({
            id: schema.blogPost.id,
            title: schema.blogPost.title,
            createdAt: schema.blogPost.createdAt,
            updatedAt: schema.blogPost.updatedAt,
            draft: schema.blogPost.draft
        })
        .from(schema.blogPost)
        .orderBy(desc(schema.blogPost.updatedAt));
    return { blogs };
};