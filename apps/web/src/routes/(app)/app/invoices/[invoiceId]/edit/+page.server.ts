import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { schema } from '@opensource-startup-crm/database';
import { and, asc, eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ params, locals }) => {
  const db = locals.db
  // Load invoice with account and line items (with product) via joins
  const rows = await db
    .select({
      id: schema.quote.id,
      accountId: schema.quote.accountId,
      name: schema.quote.name,
      quoteNumber: schema.quote.quoteNumber,
      status: schema.quote.status,
      description: schema.quote.description,
      expirationDate: schema.quote.expirationDate,
      accountName: schema.crmAccount.name,
      liId: schema.quoteLineItem.id,
      liQuantity: schema.quoteLineItem.quantity,
      liListPrice: schema.quoteLineItem.listPrice,
      liUnitPrice: schema.quoteLineItem.unitPrice,
      liDiscount: schema.quoteLineItem.discount,
      liTotalPrice: schema.quoteLineItem.totalPrice,
      productId: schema.product.id,
      productName: schema.product.name,
      productCode: schema.product.code
    })
    .from(schema.quote)
    .leftJoin(schema.crmAccount, eq(schema.crmAccount.id, schema.quote.accountId))
    .leftJoin(schema.quoteLineItem, eq(schema.quoteLineItem.quoteId, schema.quote.id))
    .leftJoin(schema.product, eq(schema.product.id, schema.quoteLineItem.productId))
    .where(
      and(
        eq(schema.quote.id, params.invoiceId as string),
        eq(schema.quote.organizationId, (locals.org as any).id as string)
      )
    )
    .orderBy(asc(schema.quoteLineItem.id));

  if (!rows.length) {
    throw error(404, 'Invoice not found');
  }

  const base = rows[0];
  const invoice = {
    id: base.id,
    accountId: base.accountId,
    name: base.name,
    quoteNumber: base.quoteNumber,
    status: base.status,
    description: base.description,
    expirationDate: base.expirationDate,
    account: base.accountId ? { id: base.accountId, name: base.accountName } : null,
    lineItems: rows
      .filter((r) => r.liId !== null)
      .map((r) => ({
        id: r.liId!,
        quantity: r.liQuantity,
        listPrice: r.liListPrice,
        unitPrice: r.liUnitPrice,
        discount: r.liDiscount,
        totalPrice: r.liTotalPrice,
        product: r.productId ? { id: r.productId, name: r.productName, code: r.productCode } : null
      }))
  };

  // Get accounts for the dropdown
  const accounts = await db
    .select({ id: schema.crmAccount.id, name: schema.crmAccount.name })
    .from(schema.crmAccount)
    .where(and(eq(schema.crmAccount.organizationId, locals.org!.id), eq(schema.crmAccount.isActive, true), eq(schema.crmAccount.isDeleted, false)))
    .orderBy(asc(schema.crmAccount.name));

  return {
    invoice,
    accounts
  };
}

export const actions: Actions = {
  default: async ({ request, params, locals }) => {
    const db = locals.db
    const formData = await request.formData();

    const accountId = String(formData.get('account_id') || '');
    const invoiceDate = String(formData.get('invoice_date') || '');
    const dueDate = String(formData.get('due_date') || '');
    const status = String(formData.get('status') || 'DRAFT');
    const notes = String(formData.get('notes') || '');

    // Validation
    if (!accountId || !invoiceDate || !dueDate) {
      return fail(400, {
        error: 'Account, invoice date, and due date are required'
      });
    }

    try {
      const [invoice] = await db
        .select({ id: schema.quote.id })
        .from(schema.quote)
        .where(
          and(
            eq(schema.quote.id, params.invoiceId as string),
            eq(schema.quote.organizationId, (locals.org as any).id as string)
          )
        );

      if (!invoice) {
        return fail(404, { error: 'Invoice not found' });
      }

      // Convert status for Quote model
      const quoteStatus = status === 'DRAFT' ? 'DRAFT' :
        status === 'SENT' ? 'PRESENTED' :
          status === 'PAID' ? 'ACCEPTED' : 'DRAFT';

      await db
        .update(schema.quote)
        .set({
          accountId,
          status: quoteStatus as any,
          description: notes,
          expirationDate: new Date(dueDate),
          updatedAt: new Date()
        })
        .where(eq(schema.quote.id, params.invoiceId as string));

      throw redirect(303, `/app/invoices/${params.invoiceId}`);
    } catch (err) {
      if (err instanceof Response) throw err; // Re-throw redirects

      console.error('Error updating invoice:', err);
      return fail(500, {
        error: 'Failed to update invoice. Please try again.'
      });
    }
  }
};
