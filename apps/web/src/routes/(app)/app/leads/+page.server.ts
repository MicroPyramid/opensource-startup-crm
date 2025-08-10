import type { PageServerLoad } from './$types';
import { schema } from '@opensource-startup-crm/database';
import { and, desc, eq, inArray } from 'drizzle-orm';

export const load: PageServerLoad = async ({ locals }) => {
  const org = locals.org!;
  const db = locals.db
  
  const rows = await db
    .select({
      id: schema.lead.id,
      firstName: schema.lead.firstName,
      lastName: schema.lead.lastName,
      email: schema.lead.email,
      company: schema.lead.company,
      phone: schema.lead.phone,
      status: schema.lead.status,
      leadSource: schema.lead.leadSource,
      rating: schema.lead.rating,
      title: schema.lead.title,
      createdAt: schema.lead.createdAt,
      isConverted: schema.lead.isConverted,
      updatedAt: schema.lead.updatedAt,
      ownerName: schema.user.name,
      ownerEmail: schema.user.email
    })
    .from(schema.lead)
    .leftJoin(schema.user, eq(schema.user.id, schema.lead.ownerId))
    .where(
      and(
        eq(schema.lead.organizationId, org.id),
        inArray(schema.lead.status, ['NEW', 'PENDING', 'CONTACTED', 'QUALIFIED']),
        eq(schema.lead.isConverted, false)
      )
    )
    .orderBy(desc(schema.lead.updatedAt));

  return { leads: rows };
};