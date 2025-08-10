
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
    return {
        user: locals.user,
        org_name: locals.org?.name || 'BottleCRM'
    };
};

export const ssr = false;
