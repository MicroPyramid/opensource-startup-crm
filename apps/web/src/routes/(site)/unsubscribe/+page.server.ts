import { fail } from '@sveltejs/kit';
import { schema } from '@opensource-startup-crm/database';
import { eq } from 'drizzle-orm';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ url, locals }) => {
  const db = locals.db
  
  const token = url.searchParams.get('token');

  if (!token) {
    return {
      error: 'Invalid unsubscribe link. Please check your email for the correct link.'
    };
  }

  try {
    const [subscriber] = await db
      .select()
      .from(schema.newsletterSubscriber)
      .where(eq(schema.newsletterSubscriber.confirmationToken, token));

    if (!subscriber) {
      return {
        error: 'Invalid unsubscribe token. This link may have expired or already been used.'
      };
    }

    return {
      subscriber: {
        email: subscriber.email,
        token: subscriber.confirmationToken
      }
    };
  } catch (error) {
    console.error('Unsubscribe load error:', error);
    return {
      error: 'An error occurred while processing your request. Please try again later.'
    };
  }
}

export const actions: Actions = {
  unsubscribe: async ({ request, locals }) => {
    const db = locals.db
    
    const formData = await request.formData();
    const token = formData.get('token')?.toString();

    if (!token) {
      return fail(400, { message: 'Invalid unsubscribe token' });
    }

    try {
      const [subscriber] = await db
        .select()
        .from(schema.newsletterSubscriber)
        .where(eq(schema.newsletterSubscriber.confirmationToken, token));

      if (!subscriber) {
        return fail(404, { message: 'Subscriber not found or already unsubscribed' });
      }

      if (!subscriber.isActive) {
        return { success: true, message: 'You have already been unsubscribed from our newsletter' };
      }

      // Update subscriber to inactive
      await db
        .update(schema.newsletterSubscriber)
        .set({ isActive: false, unsubscribedAt: new Date() })
        .where(eq(schema.newsletterSubscriber.confirmationToken, token));

      return { success: true, message: 'Successfully unsubscribed from newsletter' };

    } catch (error) {
      console.error('Unsubscribe error:', error);
      return fail(500, { message: 'Failed to unsubscribe. Please try again later.' });
    }
  }
};
