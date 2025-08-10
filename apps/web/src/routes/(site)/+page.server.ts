import { fail, type Actions } from '@sveltejs/kit';
import { schema } from '@opensource-startup-crm/database';
import { eq } from 'drizzle-orm';

export const actions: Actions = {
  subscribe: async ({ request, getClientAddress, locals }) => {
    const db = locals.db
    
    const formData = await request.formData();
    const email = formData.get('email')?.toString().trim();

    if (!email) {
      return fail(400, { message: 'Email is required' });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return fail(400, { message: 'Please enter a valid email address' });
    }

    // Restrict emails with '+' character
    if (email.includes('+')) {
      return fail(400, { message: 'Please enter a valid email address' });
    }

    try {
      // Check if email already exists
      const [existingSubscriber] = await db
        .select()
        .from(schema.newsletterSubscriber)
        .where(eq(schema.newsletterSubscriber.email, email));

      if (existingSubscriber) {
        if (existingSubscriber.isActive) {
          return fail(400, { message: 'You are already subscribed to our newsletter' });
        } else {
          // Reactivate subscription
          await db
            .update(schema.newsletterSubscriber)
            .set({
              isActive: true,
              subscribedAt: new Date(),
              unsubscribedAt: null,
              confirmationToken: crypto.randomUUID() as string,
              isConfirmed: false,
              confirmedAt: null,
              ipAddress: getClientAddress(),
              userAgent: request.headers.get('user-agent') || null
            })
            .where(eq(schema.newsletterSubscriber.email, email));

          return { success: true, message: 'Successfully resubscribed to newsletter' };
        }
      }

      // Create new subscription
      await db.insert(schema.newsletterSubscriber).values({
        id: crypto.randomUUID(),
        email,
        isActive: true,
        confirmationToken: crypto.randomUUID() as string,
        isConfirmed: false,
        ipAddress: getClientAddress(),
        userAgent: request.headers.get('user-agent') || null
      });

      return { success: true, message: 'Successfully subscribed to newsletter' };

    } catch (error) {
      console.error('Newsletter subscription error:', error);
      return fail(500, { message: 'Failed to subscribe. Please try again later.' });
    }
  }
};