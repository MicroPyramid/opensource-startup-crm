import { error, fail, redirect } from '@sveltejs/kit';
import { schema } from '@opensource-startup-crm/database';
import { and, eq } from 'drizzle-orm';
import type { PageServerLoad, Actions } from './$types';
import { validateEnumOrNull } from '$lib/data/enum-helpers';
import { OPPORTUNITY_STAGES, LEAD_SOURCES, FORECAST_CATEGORIES, OPPORTUNITY_TYPES } from '@opensource-startup-crm/constants';

export const load: PageServerLoad = async ({ params, locals }) => {
  const org = locals.org!
  if (!org?.id) {
    throw error(403, 'Organization access required');
  }
  const db = locals.db

  const [row] = await db
    .select({
      opportunity: schema.opportunity,
      account: schema.crmAccount,
      owner: schema.user
    })
    .from(schema.opportunity)
    .leftJoin(schema.crmAccount, eq(schema.crmAccount.id, schema.opportunity.accountId))
    .leftJoin(schema.user, eq(schema.user.id, schema.opportunity.ownerId))
    .where(and(eq(schema.opportunity.id, params.opportunityId), eq(schema.opportunity.organizationId, org.id)));

  if (!row) throw error(404, 'Opportunity not found');

  return {
    opportunity: row.opportunity,
    account: row.account,
    owner: row.owner
  };
};

export const actions: Actions = {
  default: async ({ request, params, locals }) => {
    const org = locals.org!
    if (!org?.id) {
      throw error(403, 'Organization access required');
    }

    const db = locals.db

    const form = await request.formData();
    const name = form.get('name')?.toString().trim();
    const amount = form.get('amount') ? parseFloat(form.get('amount')?.toString() || '') : null;
    const expectedRevenue = form.get('expectedRevenue') ? parseFloat(form.get('expectedRevenue')?.toString() || '') : null;
    const stageInput = form.get('stage')?.toString();
    const probability = form.get('probability') ? parseFloat(form.get('probability')?.toString() || '') : null;
    const closeDateValue = form.get('closeDate')?.toString();
    const closeDate = closeDateValue ? new Date(closeDateValue) : null;
    const leadSource = validateEnumOrNull(form.get('leadSource')?.toString(), LEAD_SOURCES);
    const forecastCategory = validateEnumOrNull(form.get('forecastCategory')?.toString(), FORECAST_CATEGORIES);
    const type = validateEnumOrNull(form.get('type')?.toString(), OPPORTUNITY_TYPES);
    const nextStep = form.get('nextStep')?.toString() || null;
    const description = form.get('description')?.toString() || null;

    if (!name) {
      return fail(400, { message: 'Opportunity name is required.' });
    }
    if (!stageInput) {
      return fail(400, { message: 'Stage is required.' });
    }
    const stage = validateEnumOrNull(stageInput, OPPORTUNITY_STAGES);
    if (!stage) {
      return fail(400, { message: 'Invalid stage selected.' });
    }
    if (probability !== null && (probability < 0 || probability > 100)) {
      return fail(400, { message: 'Probability must be between 0 and 100.' });
    }
    if (amount !== null && amount < 0) {
      return fail(400, { message: 'Amount cannot be negative.' });
    }
    if (expectedRevenue !== null && expectedRevenue < 0) {
      return fail(400, { message: 'Expected revenue cannot be negative.' });
    }

    try {
      const [existing] = await db
        .select({ id: schema.opportunity.id })
        .from(schema.opportunity)
        .where(and(eq(schema.opportunity.id, params.opportunityId), eq(schema.opportunity.organizationId, org.id)));

      if (!existing) {
        return fail(404, { message: 'Opportunity not found' });
      }

      await db
        .update(schema.opportunity)
        .set({
          name,
          amount: amount,
          expectedRevenue: expectedRevenue,
          stage,
          probability: probability,
          closeDate,
          leadSource,
          forecastCategory,
          type,
          nextStep,
          description
        })
        .where(eq(schema.opportunity.id, params.opportunityId));

      throw redirect(303, `/app/opportunities/${params.opportunityId}`);
    } catch (err) {
      console.error('Failed to update opportunity:', err);
      return fail(500, { message: 'Failed to update opportunity. Please try again.' });
    }
  }
};
