import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, request }) => {
  if (locals.session?.id) {
    try {
      await locals.auth.api.signOut({ headers: request.headers });
    } catch (e) { }
  }
  throw redirect(303, '/login');
};
