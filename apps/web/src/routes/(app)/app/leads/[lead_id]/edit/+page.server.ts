import { error, fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { schema } from '@opensource-startup-crm/database';
import { and, eq } from 'drizzle-orm';
import { validateEnumOrDefault, validateEnumOrNull } from '$lib/data/enum-helpers';
import { INDUSTRIES, LEAD_SOURCES, LEAD_STATUSES, RATINGS } from '@opensource-startup-crm/constants';

export const load: PageServerLoad = async ({ params, locals }) => {
  const { lead_id } = params;
  const org = locals.org!;
  const db = locals.db

  const [lead] = await db
    .select({
      id: schema.lead.id,
      firstName: schema.lead.firstName,
      lastName: schema.lead.lastName,
      email: schema.lead.email,
      phone: schema.lead.phone,
      company: schema.lead.company,
      title: schema.lead.title,
      industry: schema.lead.industry,
      rating: schema.lead.rating,
      description: schema.lead.description,
      status: schema.lead.status,
      leadSource: schema.lead.leadSource,
      ownerId: schema.lead.ownerId,
      contactId: schema.lead.contactId
    })
    .from(schema.lead)
    .where(and(eq(schema.lead.id, lead_id), eq(schema.lead.organizationId, org.id)));

  if (!lead) throw error(404, 'Lead not found');

  const users = await db
    .select({ user: { id: schema.user.id, name: schema.user.name } })
    .from(schema.member)
    .innerJoin(schema.user, eq(schema.member.userId, schema.user.id))
    .where(eq(schema.member.organizationId, org.id));

  return { lead, users };
};

export const actions: Actions = {
  default: async ({ request, params, locals }) => {
    const { lead_id } = params;
    const formData = await request.formData();
    const org = locals.org!;
    const db = locals.db

    const leadEmail = formData.get('email');
    const ownerId = formData.get('ownerId');
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');

    if (!firstName || typeof firstName !== 'string' || firstName.trim() === '') {
      return { success: false, error: 'First name is required.' };
    }
    if (!lastName || typeof lastName !== 'string' || lastName.trim() === '') {
      return { success: false, error: 'Last name is required.' };
    }
    if (!ownerId || typeof ownerId !== 'string') {
      return { success: false, error: 'Owner ID is required.' };
    }

    const [ownerValidation] = await db
      .select({ id: schema.member.id })
      .from(schema.member)
      .where(and(eq(schema.member.userId, ownerId), eq(schema.member.organizationId, org.id)));
    if (!ownerValidation) {
      return { success: false, error: 'Invalid owner selected. User is not part of this organization.' };
    }

    if (typeof leadEmail === 'string' && leadEmail.trim() !== '') {
      const [user] = await db
        .select({ id: schema.user.id })
        .from(schema.user)
        .where(eq(schema.user.email, leadEmail));
      if (!user) {
        return { success: false, error: 'User with this email does not exist.' };
      }
      const [userOrgMembership] = await db
        .select({ id: schema.member.id })
        .from(schema.member)
        .where(and(eq(schema.member.userId, user.id), eq(schema.member.organizationId, org.id)));
      if (!userOrgMembership) {
        return { success: false, error: 'User is not part of this organization.' };
      }
    }

    const status = validateEnumOrDefault(formData.get('status'), LEAD_STATUSES, 'PENDING');
    const leadSource = validateEnumOrNull(formData.get('leadSource'), LEAD_SOURCES);
    const industry = validateEnumOrNull(formData.get('industry'), INDUSTRIES);
    const rating = validateEnumOrNull(formData.get('rating'), RATINGS);

    try {
      await db
        .update(schema.lead)
        .set({
          firstName: firstName.toString().trim(),
          lastName: lastName.toString().trim(),
          email: formData.get('email')?.toString() || null,
          phone: formData.get('phone')?.toString() || null,
          company: formData.get('company')?.toString() || null,
          title: formData.get('title')?.toString() || null,
          industry,
          rating,
          description: formData.get('description')?.toString() || null,
          ownerId: ownerId.toString(),
          organizationId: org.id,
          status,
          leadSource
        })
        .where(eq(schema.lead.id, lead_id));

      return { success: true };
    } catch (err) {
      console.error('Error updating lead:', err);
      return { success: false, error: 'Failed to update lead' };
    }
  }
};
