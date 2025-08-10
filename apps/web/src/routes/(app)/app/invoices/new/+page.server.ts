import { fail, redirect } from '@sveltejs/kit';
import { schema } from '@opensource-startup-crm/database';
import { asc, eq } from 'drizzle-orm';
import type { PageServerLoad, Actions } from './$types';
import { validateEnumOrDefault } from '$lib/data/enum-helpers';
import { QUOTE_STATUSES } from '@opensource-startup-crm/constants';

export const load: PageServerLoad = async ({ locals }) => {
  const db = locals.db

  // Get accounts for the dropdown
  const accounts = await db
    .select({ id: schema.crmAccount.id, name: schema.crmAccount.name })
    .from(schema.crmAccount)
    .where(eq(schema.crmAccount.organizationId, locals.org!.id))
    .orderBy(asc(schema.crmAccount.name));

  return {
    accounts
  };
};

export const actions: Actions = {
  default: async ({ request, locals }) => {
    const db = locals.db
    const formData = await request.formData();

    const invoiceNumber = String(formData.get('invoice_number') || '');
    const accountId = String(formData.get('account_id') || '');
    const invoiceDate = String(formData.get('invoice_date') || '');
    const dueDate = String(formData.get('due_date') || '');
    // Validate invoice status (DRAFT | SENT | PAID), then map to quote status enum
    const invoiceStatus = validateEnumOrDefault(formData.get('status'), ['DRAFT', 'SENT', 'PAID'] as const, 'DRAFT');
    const mappedQuoteStatus =
      invoiceStatus === 'DRAFT' ? 'DRAFT' : invoiceStatus === 'SENT' ? 'PRESENTED' : 'ACCEPTED';
    const status = validateEnumOrDefault(mappedQuoteStatus, QUOTE_STATUSES, 'DRAFT');
    const notes = String(formData.get('notes') || '');

    // Validation
    if (!invoiceNumber || !accountId || !invoiceDate || !dueDate) {
      return fail(400, {
        error: 'Invoice number, account, invoice date, and due date are required'
      });
    }

    try {
      const quoteNumber = `INV-${Date.now()}`;
      const [quote] = await db
        .insert(schema.quote)
        .values({
          quoteNumber,
          name: `Invoice ${invoiceNumber}`,
          status,
          description: notes,
          expirationDate: new Date(dueDate),
          subtotal: '0.00',
          grandTotal: '0.00',
          preparedById: locals.user!.id,
          accountId: accountId,
          organizationId: locals.org!.id
        })
        .returning();

      throw redirect(303, `/app/invoices/${quote.id}`);
    } catch (error) {
      console.error('Error creating invoice:', error);
      return fail(500, {
        error: 'Failed to create invoice. Please try again.'
      });
    }
  }
};
