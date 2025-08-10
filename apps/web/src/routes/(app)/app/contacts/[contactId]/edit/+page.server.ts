import { schema } from '@opensource-startup-crm/database';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { and, eq } from 'drizzle-orm';
import { validatePhoneNumber, formatPhoneForStorage } from '$lib/utils/phone.js';

export const load: PageServerLoad = async ({ params, locals }) => {
  const org = locals.org!;
  const db = locals.db
  const [row] = await db
    .select({
      contact: schema.contact,
      isPrimary: schema.accountContactRelationship.isPrimary,
      role: schema.accountContactRelationship.role,
      account: schema.crmAccount
    })
    .from(schema.contact)
    .leftJoin(
      schema.accountContactRelationship,
      eq(schema.accountContactRelationship.contactId, schema.contact.id)
    )
    .leftJoin(
      schema.crmAccount,
      eq(schema.crmAccount.id, schema.accountContactRelationship.accountId)
    )
    .where(and(eq(schema.contact.id, params.contactId), eq(schema.contact.organizationId, org.id)));

  if (!row?.contact) return fail(404, { message: 'Contact not found' });

  return {
    contact: row.contact,
    account: row.account || null,
    isPrimary: row.isPrimary || false,
    role: row.role || ''
  };
}

export const actions: Actions = {
  default: async ({ request, params, locals }) => {
    const org = locals.org!;
    const db = locals.db

    const formData = await request.formData();
    const firstName = formData.get('firstName')?.toString().trim();
    const lastName = formData.get('lastName')?.toString().trim();
    const email = formData.get('email')?.toString().trim() || null;
    const phone = formData.get('phone')?.toString().trim() || null;
    const title = formData.get('title')?.toString().trim() || null;
    const department = formData.get('department')?.toString().trim() || null;
    const street = formData.get('street')?.toString().trim() || null;
    const city = formData.get('city')?.toString().trim() || null;
    const state = formData.get('state')?.toString().trim() || null;
    const postalCode = formData.get('postalCode')?.toString().trim() || null;
    const country = formData.get('country')?.toString().trim() || null;
    const description = formData.get('description')?.toString().trim() || null;

    if (!firstName || !lastName) {
      return fail(400, { message: 'First and last name are required.' });
    }

    // Validate phone number if provided
    let formattedPhone = null;
    if (phone && phone.length > 0) {
      const phoneValidation = validatePhoneNumber(phone);
      if (!phoneValidation.isValid) {
        return fail(400, { message: phoneValidation.error || 'Please enter a valid phone number' });
      }
      formattedPhone = formatPhoneForStorage(phone);
    }

    const [contact] = await db
      .select({ id: schema.contact.id })
      .from(schema.contact)
      .where(and(eq(schema.contact.id, params.contactId), eq(schema.contact.organizationId, org.id)));
    if (!contact) {
      return fail(404, { message: 'Contact not found' });
    }

    await db
      .update(schema.contact)
      .set({
        firstName,
        lastName,
        email,
        phone: formattedPhone,
        title,
        department,
        street,
        city,
        state,
        postalCode,
        country,
        description
      })
      .where(eq(schema.contact.id, params.contactId));

    return { success: true };
  }
};
