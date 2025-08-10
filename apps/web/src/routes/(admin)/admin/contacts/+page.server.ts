import type { PageServerLoad } from './$types';
import { schema } from '@opensource-startup-crm/database';

export const load: PageServerLoad = async ({ locals }) => {
    const db = locals.db
    const contacts = await db.select().from(schema.contactSubmission);
    return { contacts };
};