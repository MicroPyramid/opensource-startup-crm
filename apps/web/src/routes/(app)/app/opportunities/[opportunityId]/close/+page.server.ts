import { error, fail, redirect } from '@sveltejs/kit';
import { schema } from '@opensource-startup-crm/database';
import { and, eq } from 'drizzle-orm';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
  const org = locals.org!
  if (!org?.id) {
    throw error(403, 'Organization access required');
  }

  const db = locals.db

  const [row] = await db
    .select({
      id: schema.opportunity.id,
      name: schema.opportunity.name,
      stage: schema.opportunity.stage,
      description: schema.opportunity.description,
      closeDate: schema.opportunity.closeDate,
      amount: schema.opportunity.amount,
      probability: schema.opportunity.probability,
      account: {
        id: schema.opportunity.accountId,
        name: schema.crmAccount.name,
        type: schema.crmAccount.type
      }
    })
    .from(schema.opportunity)
    .leftJoin(schema.crmAccount, eq(schema.crmAccount.id, schema.opportunity.accountId))
    .where(and(eq(schema.opportunity.id, params.opportunityId), eq(schema.opportunity.organizationId, org.id)));

  if (!row) {
    throw error(404, 'Opportunity not found');
  }

  return {
    opportunity: row
  };
};

export const actions: Actions = {
  default: async ({ request, params, locals }) => {
    const org = locals.org!
    if (!org?.id) {
      throw error(403, 'Organization access required');
    }
    
    const db = locals.db

    const formData = await request.formData();
    const status = formData.get('status')?.toString() as 'CLOSED_WON' | 'CLOSED_LOST';
    const closeDate = formData.get('closeDate')?.toString();
    const closeReason = formData.get('closeReason')?.toString();

    if (!status || !closeDate) {
      return fail(400, { error: 'Status and close date are required' });
    }

    const validCloseStatuses = ['CLOSED_WON', 'CLOSED_LOST'] as const;
    if (!validCloseStatuses.includes(status as any)) {
      return fail(400, { error: 'Invalid status selected' });
    }

    try {
      // verify opportunity exists and belongs to org
      const [opp] = await db
        .select({ id: schema.opportunity.id, description: schema.opportunity.description, organizationId: schema.opportunity.organizationId })
        .from(schema.opportunity)
        .where(and(eq(schema.opportunity.id, params.opportunityId), eq(schema.opportunity.organizationId, org.id)));

      if (!opp) {
        return fail(404, { error: 'Opportunity not found' });
      }

      const newDescription = closeReason
        ? (opp.description ? `${opp.description}\n\nClose Reason: ${closeReason}` : `Close Reason: ${closeReason}`)
        : opp.description;

      await db
        .update(schema.opportunity)
        .set({
          stage: status,
          closeDate: closeDate ? new Date(closeDate) : null,
          description: newDescription || null,
          updatedAt: new Date()
        })
        .where(eq(schema.opportunity.id, params.opportunityId));

      await db.insert(schema.auditLog).values({
        id: crypto.randomUUID(),
        action: 'UPDATE',
        entityType: 'Opportunity',
        entityId: params.opportunityId,
        description: `Opportunity closed with status: ${status}`,
        newValues: {
          stage: status,
          closeDate,
          closeReason
        },
        userId: locals.user!.id,
        organizationId: locals.org!.id
      });

      throw redirect(303, `/app/opportunities/${params.opportunityId}`);
    } catch (err) {
      console.error('Error closing opportunity:', err);
      return fail(500, { error: 'Failed to close opportunity. Please try again.' });
    }
  }
};
