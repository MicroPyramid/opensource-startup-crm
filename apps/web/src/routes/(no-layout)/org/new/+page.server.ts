import type { Actions, PageServerLoad } from './$types';
import { schema } from '@opensource-startup-crm/database';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async () => { };

export const actions: Actions = {
  default: async ({ request, cookies, locals }) => {
    // Get the user from locals
    const user = locals.user;
    const db = locals.db
    
    if (!user) {
      return {
        error: {
          name: 'You must be logged in to create an organization'
        }
      };
    }

    // Get the submitted form data
    const formData = await request.formData();
    const orgName = formData.get('org_name')?.toString();

    if (!orgName) {
      return {
        error: {
          name: 'Organization name is required'
        }
      };
    }

    try {
      // Check if organization with the same name already exists
      const [existingOrg] = await db
        .select({ id: schema.organization.id })
        .from(schema.organization)
        .where(eq(schema.organization.name, orgName));

      if (existingOrg) {
        return {
          error: {
            name: 'Organization with this name already exists'
          }
        };
      }

      // Create organization and membership
      const newOrgId = crypto.randomUUID();
      await db.insert(schema.organization).values({
        id: newOrgId,
        name: orgName,
        createdAt: new Date()
      } as any);

      await db.insert(schema.member).values({
        id: crypto.randomUUID(),
        organizationId: newOrgId,
        userId: user.id,
        role: 'ADMIN',
        createdAt: new Date()
      } as any);

      // Set org cookie for the newly created org
      cookies.set('org', newOrgId, {
        path: '/',
        httpOnly: true,
        sameSite: 'strict'
      });

      // Redirect to home page after successful creation
      return {
        data: {
          name: orgName
        }
      }
    } catch (err) {
      console.error('Error creating organization:', err);
      return {
        error: {
          name: 'An unexpected error occurred while creating the organization.'
        }
      };
    }
  }
};