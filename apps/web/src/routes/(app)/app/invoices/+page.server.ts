import { redirect } from '@sveltejs/kit';
import { schema } from '@opensource-startup-crm/database';
import { desc, eq, asc } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  const db = locals.db
  // One query with joins: quote <- crmAccount, quoteLineItem <- product
  const rows = await db
    .select({
      id: schema.quote.id,
      quoteNumber: schema.quote.quoteNumber,
      name: schema.quote.name,
      grandTotal: schema.quote.grandTotal,
      createdAt: schema.quote.createdAt,
      status: schema.quote.status,
      expirationDate: schema.quote.expirationDate,
      accountId: schema.quote.accountId,
      accountName: schema.crmAccount.name,
      liId: schema.quoteLineItem.id,
      liDescription: schema.quoteLineItem.description,
      liTotalPrice: schema.quoteLineItem.totalPrice,
      productName: schema.product.name
    })
    .from(schema.quote)
    .leftJoin(schema.crmAccount, eq(schema.crmAccount.id, schema.quote.accountId))
    .leftJoin(schema.quoteLineItem, eq(schema.quoteLineItem.quoteId, schema.quote.id))
    .leftJoin(schema.product, eq(schema.product.id, schema.quoteLineItem.productId))
    .where(eq(schema.quote.organizationId, locals.org!.id))
    .orderBy(desc(schema.quote.createdAt), asc(schema.quoteLineItem.id));

  if (rows.length === 0) {
    return { invoices: [] };
  }

  // Group rows by invoice id and compose
  const byId = new Map<string, ReturnType<typeof compose>>();
  function compose(r: typeof rows[number]) {
    return {
      id: r.id,
      quoteNumber: r.quoteNumber,
      name: r.name,
      grandTotal: r.grandTotal,
      createdAt: r.createdAt,
      status: r.status,
      expirationDate: r.expirationDate,
      accountId: r.accountId,
      account: { id: r.accountId, name: r.accountName },
      lineItems: [] as Array<{ id: string; description: string | null; totalPrice: any; product?: { name: string } }>
    };
  }

  for (const r of rows) {
    if (!byId.has(r.id)) byId.set(r.id, compose(r));
    if (r.liId) {
      byId.get(r.id)!.lineItems.push({
        id: r.liId,
        description: r.liDescription,
        totalPrice: r.liTotalPrice,
        product: r.productName ? { name: r.productName } : undefined
      });
    }
  }

  return { invoices: Array.from(byId.values()) };
};
