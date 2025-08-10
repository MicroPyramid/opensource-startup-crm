import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { schema } from '@opensource-startup-crm/database';
import { validatePhoneNumber, formatPhoneForStorage } from '$lib/utils/phone';
import { validateEnumOrNull } from '$lib/data/enum-helpers';
import { ACCOUNT_TYPES, INDUSTRIES, ACCOUNT_OWNERSHIP, RATINGS } from '@opensource-startup-crm/constants';

export const load: PageServerLoad = async () => ({});

export const actions: Actions = {
  default: async ({ request, locals }) => {
    // Get user and org from locals
    const user = locals.user!;
    const org = locals.org!;
    const db = locals.db

    // Get the submitted form data
    const formData = await request.formData();

    // Extract and validate required fields
    const name = formData.get('name')?.toString().trim();

    if (!name) {
      return fail(400, { error: 'Account name is required' });
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

    // Extract all form fields
    const accountData = {
      name,
      type: validateEnumOrNull(formData.get('type'), ACCOUNT_TYPES),
      industry: validateEnumOrNull(formData.get('industry'), INDUSTRIES),
      website: formData.get('website')?.toString() || null,
      phone: formattedPhone,
      street: formData.get('street')?.toString() || null,
      city: formData.get('city')?.toString() || null,
      state: formData.get('state')?.toString() || null,
      postalCode: formData.get('postalCode')?.toString() || null,
      country: formData.get('country')?.toString() || null,
      description: formData.get('description')?.toString() || null,
      numberOfEmployees: formData.get('numberOfEmployees') ?
        parseInt(formData.get('numberOfEmployees')?.toString() || '0') : null,
      annualRevenue: formData.get('annualRevenue') ?
        parseFloat(formData.get('annualRevenue')?.toString() || '0') : null,
      accountOwnership: validateEnumOrNull(formData.get('accountOwnership'), ACCOUNT_OWNERSHIP),
      tickerSymbol: formData.get('tickerSymbol')?.toString() || null,
      rating: validateEnumOrNull(formData.get('rating'), RATINGS),
      sicCode: formData.get('sicCode')?.toString() || null
    };

    try {
      const [account] = await db
        .insert(schema.crmAccount)
        .values({
          ...accountData,
          ownerId: user.id,
          organizationId: org.id
        })
        .returning();

      return {
        status: 'success',
        message: 'Account created successfully',
        account
      };
    } catch (err) {
      console.error('Error creating account:', err);
      return fail(500, {
        error: 'Failed to create account: ' + (err instanceof Error ? err.message : 'Unknown error'),
        values: accountData // Return entered values so the form can be repopulated
      });
    }
  }
};