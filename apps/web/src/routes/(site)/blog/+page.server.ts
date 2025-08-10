import { schema } from '@opensource-startup-crm/database';
import { count, desc, eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, locals }) => {
  const db = locals.db
  try {
    // Pagination parameters
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const pageSize = 5; // Number of posts per page
    const skip = (page - 1) * pageSize;
    // console.log('Page:', page, 'Skip:', skip, 'Page Size:', pageSize);
    // Fetch posts with pagination
    const posts = await db
      .select({
        id: schema.blogPost.id,
        title: schema.blogPost.title,
        slug: schema.blogPost.slug,
        excerpt: schema.blogPost.excerpt,
        createdAt: schema.blogPost.createdAt,
        updatedAt: schema.blogPost.updatedAt
      })
      .from(schema.blogPost)
      .where(eq(schema.blogPost.draft, false))
      .orderBy(desc(schema.blogPost.createdAt))
      .limit(pageSize)
      .offset(skip);

    // console.log('Fetched Posts:', posts);
    // Get total count for pagination
    const [{ count: totalPosts }] = await db
      .select({ count: count() })
      .from(schema.blogPost)
      .where(eq(schema.blogPost.draft, false));

    // Calculate pagination values
    const totalPages = Math.ceil(Number(totalPosts ?? 0) / pageSize);

    return {
      posts,
      pagination: {
        page,
        pageSize,
        totalPosts,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1
      }
    };
  } catch (error) {
    console.error('Error loading blog posts:', error);
    return {
      posts: [],
      pagination: {
        page: 1,
        pageSize: 5,
        totalPosts: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPreviousPage: false
      },
      error: 'Failed to load blog posts'
    };
  }
}
