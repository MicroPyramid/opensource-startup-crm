import { error } from '@sveltejs/kit';
import { schema } from '@opensource-startup-crm/database';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
  const db = locals.db
  const [row] = await db
    .select({
      id: schema.opportunity.id,
      name: schema.opportunity.name,
      amount: schema.opportunity.amount,
      expectedRevenue: schema.opportunity.expectedRevenue,
      stage: schema.opportunity.stage,
      probability: schema.opportunity.probability,
      closeDate: schema.opportunity.closeDate,
      nextStep: schema.opportunity.nextStep,
      leadSource: schema.opportunity.leadSource,
      forecastCategory: schema.opportunity.forecastCategory,
      createdAt: schema.opportunity.createdAt,
      updatedAt: schema.opportunity.updatedAt,
      description: schema.opportunity.description,
      account: {
        id: schema.opportunity.accountId,
        name: schema.crmAccount.name,
        type: schema.crmAccount.type
      },
      owner: {
        id: schema.opportunity.ownerId,
        name: schema.user.name,
        email: schema.user.email
      },
      type: schema.opportunity.type
    })
    .from(schema.opportunity)
    .leftJoin(schema.crmAccount, eq(schema.crmAccount.id, schema.opportunity.accountId))
    .leftJoin(schema.user, eq(schema.user.id, schema.opportunity.ownerId))
    .where(eq(schema.opportunity.id, params.opportunityId));

  if (!row) throw error(404, 'Opportunity not found');

  return { opportunity: row };
};
