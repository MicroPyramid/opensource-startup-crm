import { redirect, fail } from '@sveltejs/kit';
import { schema } from '@opensource-startup-crm/database';
import { and, asc, eq } from 'drizzle-orm';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals, url }) => {
  const orgId = locals.org!.id;
  const preSelectedAccountId = url.searchParams.get('accountId');
  const db = locals.db

  try {
    const accounts = await db
      .select({ id: schema.crmAccount.id, name: schema.crmAccount.name, type: schema.crmAccount.type })
      .from(schema.crmAccount)
      .where(and(eq(schema.crmAccount.organizationId, orgId), eq(schema.crmAccount.isActive, true), eq(schema.crmAccount.isDeleted, false)))
      .orderBy(asc(schema.crmAccount.name));

    const accountContacts =
      await db
        .select({ id: schema.contact.id, firstName: schema.contact.firstName, lastName: schema.contact.lastName, email: schema.contact.email })
        .from(schema.contact)
        .innerJoin(schema.accountContactRelationship, eq(schema.accountContactRelationship.contactId, schema.contact.id))
        .where(and(eq(schema.contact.organizationId, orgId), preSelectedAccountId ? eq(schema.accountContactRelationship.accountId, preSelectedAccountId) : undefined))
        .orderBy(asc(schema.contact.firstName), asc(schema.contact.lastName));

    const users = await db
      .select({ id: schema.user.id, name: schema.user.name, email: schema.user.email })
      .from(schema.member)
      .innerJoin(schema.user, eq(schema.member.userId, schema.user.id))
      .where(eq(schema.member.organizationId, orgId))
      .orderBy(asc(schema.user.name));

    const preSelectedAccount = preSelectedAccountId ? accounts.find((a) => a.id === preSelectedAccountId) : null;

    return {
      accounts,
      contacts: [],
      accountContacts,
      users,
      preSelectedAccountId,
      preSelectedAccountName: preSelectedAccount?.name || null
    };
  } catch (error) {
    console.error('Error loading opportunity form data:', error);
    return { accounts: [], contacts: [], accountContacts: [], users: [], preSelectedAccountId: null, preSelectedAccountName: null };
  }
};

export const actions: Actions = {
  create: async ({ request, locals }) => {
    if (!locals.user || !locals.org) {
      return fail(401, { error: 'Unauthorized' });
    }

    const db = locals.db

    const formData = await request.formData();
    const data = {
      name: formData.get('name')?.toString(),
      accountId: formData.get('accountId')?.toString(),
      stage: formData.get('stage')?.toString(),
      amount: formData.get('amount')?.toString(),
      closeDate: formData.get('closeDate')?.toString(),
      probability: formData.get('probability')?.toString(),
      type: formData.get('type')?.toString(),
      leadSource: formData.get('leadSource')?.toString(),
      nextStep: formData.get('nextStep')?.toString(),
      description: formData.get('description')?.toString(),
      ownerId: formData.get('ownerId')?.toString(),
      contactIds: formData.getAll('contactIds').map((id) => id.toString())
    };

    const errors: Record<string, string> = {};
    if (!data.name || data.name.length < 2) errors.name = 'Opportunity name must be at least 2 characters';
    if (!data.accountId) errors.accountId = 'Account is required';
    if (!data.stage) errors.stage = 'Stage is required';
    const validStages = ['PROSPECTING', 'QUALIFICATION', 'PROPOSAL', 'NEGOTIATION', 'CLOSED_WON', 'CLOSED_LOST'];
    if (data.stage && !validStages.includes(data.stage)) errors.stage = 'Invalid stage selected';
    if (data.amount && (isNaN(parseFloat(data.amount)) || parseFloat(data.amount) < 0)) errors.amount = 'Amount must be a valid positive number';
    if (data.probability && (isNaN(parseFloat(data.probability)) || parseFloat(data.probability) < 0 || parseFloat(data.probability) > 100)) errors.probability = 'Probability must be between 0 and 100';

    if (Object.keys(errors).length > 0) {
      return fail(400, { errors, data });
    }

    try {
      const [account] = await db
        .select({ id: schema.crmAccount.id })
        .from(schema.crmAccount)
        .where(and(eq(schema.crmAccount.id, data.accountId as string), eq(schema.crmAccount.organizationId, locals.org.id), eq(schema.crmAccount.isActive, true), eq(schema.crmAccount.isDeleted, false)));
      if (!account) return fail(400, { error: 'Invalid account selected' });

      if (!data.name || !data.accountId || !data.stage) return fail(400, { error: 'Missing required fields after validation' });

      const parsedAmount = data.amount ? parseFloat(data.amount) : null;
      const parsedProb = data.probability ? parseFloat(data.probability) : null;

      const [opportunity] = await db
        .insert(schema.opportunity)
        .values({
          name: data.name,
          accountId: data.accountId,
          stage: data.stage as any,
          amount: parsedAmount as any,
          closeDate: data.closeDate ? new Date(data.closeDate) : null,
          probability: parsedProb as any,
          type: data.type || null,
          leadSource: data.leadSource || null,
          nextStep: data.nextStep || null,
          description: data.description || null,
          ownerId: data.ownerId || locals.user.id,
          organizationId: locals.org.id,
          expectedRevenue: parsedAmount !== null && parsedProb !== null ? (parsedAmount * parsedProb) / 100 : null
        })
        .returning();

      if (data.contactIds.length > 0) {
        await Promise.all(
          data.contactIds.map((cid) =>
            db.insert(schema.contactToOpportunity).values({ contactId: cid, opportunityId: opportunity.id })
          )
        );
      }

      await db.insert(schema.auditLog).values({
        action: 'CREATE',
        entityType: 'Opportunity',
        entityId: opportunity.id,
        description: `Created opportunity: ${opportunity.name}`,
        newValues: { name: opportunity.name, stage: opportunity.stage, amount: opportunity.amount } as any,
        userId: locals.user.id,
        organizationId: locals.org.id
      });

      throw redirect(302, `/app/opportunities/${opportunity.id}`);
    } catch (error) {
      if (error && typeof error === 'object' && 'status' in (error as any) && (error as any).status === 302) {
        throw error as any;
      }
      console.error('Error creating opportunity:', error);
      return fail(500, { error: 'Failed to create opportunity' });
    }
  }
};