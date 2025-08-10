import { schema } from '@opensource-startup-crm/database';
import { eq, desc, count } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  try {
    const db = locals.db
    const subscribers = await db
      .select({
        id: schema.newsletterSubscriber.id,
        email: schema.newsletterSubscriber.email,
        isActive: schema.newsletterSubscriber.isActive,
        isConfirmed: schema.newsletterSubscriber.isConfirmed,
        subscribedAt: schema.newsletterSubscriber.subscribedAt,
        unsubscribedAt: schema.newsletterSubscriber.unsubscribedAt,
        confirmedAt: schema.newsletterSubscriber.confirmedAt,
        ipAddress: schema.newsletterSubscriber.ipAddress
      })
      .from(schema.newsletterSubscriber)
      .orderBy(desc(schema.newsletterSubscriber.subscribedAt));

    const [{ count: activeCount }] = await db
      .select({ count: count() })
      .from(schema.newsletterSubscriber)
      .where(eq(schema.newsletterSubscriber.isActive, true));

    const [{ count: totalSubscribers }] = await db
      .select({ count: count() })
      .from(schema.newsletterSubscriber);

    return {
      subscribers,
      activeCount: Number(activeCount ?? 0),
      totalCount: totalSubscribers
    };
  } catch (error) {
    console.error('Failed to load newsletter subscribers:', error);
    return {
      subscribers: [],
      activeCount: 0,
      totalCount: 0,
      error: 'Failed to load subscribers'
    };
  }
}
