import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { schema } from '@opensource-startup-crm/database';
import { eq, and, asc } from 'drizzle-orm';
import { validatePhoneNumber, formatPhoneForStorage } from '$lib/utils/phone.js';
import { validateEnumOrDefault, validateEnumOrNull } from '$lib/data/enum-helpers';
import { LEAD_STATUSES, LEAD_SOURCES, INDUSTRIES } from '@opensource-startup-crm/constants';


export const actions: Actions = {
  default: async ({ request, locals }) => {
    const user = locals.user!;
    const org = locals.org!;
    const db = locals.db

    // Get the submitted form data
    const formData = await request.formData();

    // Extract and validate required fields
    const firstName = formData.get('first_name')?.toString().trim();
    const lastName = formData.get('last_name')?.toString().trim() || '';
    const email = formData.get('email')?.toString().trim();
    const leadTitle = formData.get('lead_title')?.toString().trim();

    if (!firstName) {
      return fail(400, { error: 'First name is required' });
    }

    if (!lastName) {
      return fail(400, { error: 'Last name is required' });
    }

    if (!leadTitle) {
      return fail(400, { error: 'Lead title is required' });
    }

    // Validate phone number if provided
    let formattedPhone = null;
    const phone = formData.get('phone')?.toString();
    if (phone && phone.trim().length > 0) {
      const phoneValidation = validatePhoneNumber(phone.trim());
      if (!phoneValidation.isValid) {
        return fail(400, { error: phoneValidation.error || 'Please enter a valid phone number' });
      }
      formattedPhone = formatPhoneForStorage(phone.trim());
    }

    // Validate enum-backed fields using shared generic helpers
    const status = validateEnumOrDefault(formData.get('status'), LEAD_STATUSES, 'PENDING');
    const leadSource = validateEnumOrNull(formData.get('source'), LEAD_SOURCES);
    const industry = validateEnumOrNull(formData.get('industry'), INDUSTRIES);

    // Extract all form fields
    const leadData = {
      firstName,
      lastName,
      title: leadTitle,
      email: email || null,
      phone: formattedPhone,
      company: formData.get('company')?.toString() || null,
      status,
      leadSource,
      industry,
      description: formData.get('description')?.toString() || null,

      // Store opportunity amount in description since it's not in the Lead schema
      opportunityAmount: formData.get('opportunity_amount') ?
        parseFloat(formData.get('opportunity_amount')?.toString() || '0') : null,

      // Store probability in description since it's not in the Lead schema
      probability: formData.get('probability') ?
        parseFloat(formData.get('probability')?.toString() || '0') : null,

      // Address fields
      street: formData.get('street')?.toString() || null,
      city: formData.get('city')?.toString() || null,
      state: formData.get('state')?.toString() || null,
      postalCode: formData.get('postcode')?.toString() || null,
      country: formData.get('country')?.toString() || null,

      // Save these to include in description if not available in the model
      website: formData.get('website')?.toString() || null,
      skypeID: formData.get('skype_ID')?.toString() || null,
    };

    try {
      const [membership] = await db
        .select({ id: schema.member.id })
        .from(schema.member)
        .where(and(eq(schema.member.userId, user.id), eq(schema.member.organizationId, org.id)));
      if (!membership) return fail(403, { error: 'Not a member of this organization' });

      const [lead] = await db
        .insert(schema.lead)
        .values({
          firstName: leadData.firstName!,
          lastName: leadData.lastName!,
          email: leadData.email,
          phone: leadData.phone,
          company: leadData.company,
          title: leadData.title!,
          status: leadData.status,
          leadSource: leadData.leadSource,
          industry: leadData.industry,
          description: leadData.description || '',
          rating: null,
          ownerId: user.id,
          organizationId: org.id
        })
        .returning();

      return { status: 'success', message: 'Lead created successfully', lead: { id: lead.id, name: `${lead.firstName} ${lead.lastName}` } };
    } catch (err) {
      console.error('Error creating lead:', err);
      return fail(500, {
        error: 'Failed to create lead: ' + (err instanceof Error ? err.message : 'Unknown error'),
        values: leadData // Return entered values so the form can be repopulated
      });
    }
  }
};