import { error, redirect } from '@sveltejs/kit';
import { schema } from '@opensource-startup-crm/database';
import { and, eq, asc } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
  const db = locals.db

  // Join across quote -> account/contact/preparedBy/lineItems/product in one query
  const rows = await db
    .select({
      // quote
      id: schema.quote.id,
      quoteNumber: schema.quote.quoteNumber,
      name: schema.quote.name,
      status: schema.quote.status,
      description: schema.quote.description,
      expirationDate: schema.quote.expirationDate,
      subtotal: schema.quote.subtotal,
      discountAmount: schema.quote.discountAmount,
      taxAmount: schema.quote.taxAmount,
      grandTotal: schema.quote.grandTotal,
      createdAt: schema.quote.createdAt,
      updatedAt: schema.quote.updatedAt,
      // account
      accountId: schema.crmAccount.id,
      accountName: schema.crmAccount.name,
      accountStreet: schema.crmAccount.street,
      accountCity: schema.crmAccount.city,
      accountState: schema.crmAccount.state,
      accountPostalCode: schema.crmAccount.postalCode,
      accountCountry: schema.crmAccount.country,
      // contact
      contactId: schema.contact.id,
      contactFirstName: schema.contact.firstName,
      contactLastName: schema.contact.lastName,
      contactEmail: schema.contact.email,
      // prepared by
      preparedByName: schema.user.name,
      preparedByEmail: schema.user.email,
      // line items
      liId: schema.quoteLineItem.id,
      liDescription: schema.quoteLineItem.description,
      liQuantity: schema.quoteLineItem.quantity,
      liListPrice: schema.quoteLineItem.listPrice,
      liUnitPrice: schema.quoteLineItem.unitPrice,
      liDiscount: schema.quoteLineItem.discount,
      liTotalPrice: schema.quoteLineItem.totalPrice,
      productName: schema.product.name,
      productCode: schema.product.code
    })
    .from(schema.quote)
    .leftJoin(schema.crmAccount, eq(schema.crmAccount.id, schema.quote.accountId))
    .leftJoin(schema.contact, eq(schema.contact.id, schema.quote.contactId))
    .leftJoin(schema.user, eq(schema.user.id, schema.quote.preparedById))
    .leftJoin(schema.quoteLineItem, eq(schema.quoteLineItem.quoteId, schema.quote.id))
    .leftJoin(schema.product, eq(schema.product.id, schema.quoteLineItem.productId))
    .where(and(eq(schema.quote.id, params.invoiceId as string), eq(schema.quote.organizationId, locals.org!.id)))
    .orderBy(asc(schema.quoteLineItem.id));

  if (!rows.length) {
    throw error(404, 'Invoice not found');
  }

  const base = rows[0];
  const invoice = {
    id: base.id,
    quoteNumber: base.quoteNumber,
    name: base.name,
    status: base.status,
    description: base.description,
    expirationDate: base.expirationDate,
    subtotal: base.subtotal,
    discountAmount: base.discountAmount,
    taxAmount: base.taxAmount,
    grandTotal: base.grandTotal,
    createdAt: base.createdAt,
    updatedAt: base.updatedAt,
    accountId: base.accountId,
    account: base.accountId
      ? {
        id: base.accountId,
        name: base.accountName,
        street: base.accountStreet,
        city: base.accountCity,
        state: base.accountState,
        postalCode: base.accountPostalCode,
        country: base.accountCountry
      }
      : null,
    contact: base.contactId
      ? {
        firstName: base.contactFirstName,
        lastName: base.contactLastName,
        email: base.contactEmail
      }
      : null,
    preparedBy: base.preparedByName ? { name: base.preparedByName, email: base.preparedByEmail } : null,
    lineItems: rows
      .filter((r) => r.liId !== null)
      .map((r) => ({
        id: r.liId!,
        description: r.liDescription,
        quantity: r.liQuantity,
        listPrice: r.liListPrice,
        unitPrice: r.liUnitPrice,
        discount: r.liDiscount,
        totalPrice: r.liTotalPrice,
        productName: r.productName,
        productCode: r.productCode
      }))
  };

  return { invoice };
};
