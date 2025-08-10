import type { Actions, PageServerLoad } from './$types';
import { schema } from '@opensource-startup-crm/database';

export const load: PageServerLoad = async () => {
  return {};
};

export const actions: Actions = {
  default: async ({ request, locals }) => {
    const db = locals.db;
    const data = await request.formData();
    const title = data.get('title')?.toString();
    const excerpt = data.get('excerpt')?.toString();
    const slug = data.get('slug')?.toString();

    if (!title || !excerpt || !slug) {
      return { error: 'All fields are required' } as any;
    }
    try {
      await db.insert(schema.blogPost).values({
        title,
        excerpt,
        slug,
        seoTitle: '',
        seoDescription: '',
        draft: true
      });
      return { success: true } as any;
    } catch (e: any) {
      return { error: e?.message || 'Error creating blog' } as any;
    }
  }
};