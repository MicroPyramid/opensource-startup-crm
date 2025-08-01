import prisma from '$lib/prisma';
import { fail } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    return {};
}

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request }) => {
       

        const data = await request.formData();
        const name = data.get('name');
        const email = data.get('email');
        const serviceType = data.get('serviceType');
        const message = data.get('message');

        // Server-side validation
        const errors = {};
        
        if (!name || name.toString().trim() === '') {
            errors.name = 'Name is required';
        }
        
        if (!email || email.toString().trim() === '') {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email.toString())) {
            errors.email = 'Email is invalid';
        }
        
        if (!serviceType || serviceType.toString().trim() === '') {
            errors.serviceType = 'Please select a service type';
        }
        
        if (!message || message.toString().trim() === '') {
            errors.message = 'Message is required';
        }

        if (Object.keys(errors).length > 0) {
            return fail(400, {
                errors,
                name: name?.toString() || '',
                email: email?.toString() || '',
                serviceType: serviceType?.toString() || '',
                message: message?.toString() || ''
            });
        }

        try {
            // Get client information from headers
            const userAgent = request.headers.get('user-agent');
            const forwarded = request.headers.get('x-forwarded-for');
            const realIp = request.headers.get('x-real-ip');
            const cfConnectingIp = request.headers.get('cf-connecting-ip');
            const referrer = request.headers.get('referer');
            
            // Determine IP address (priority: CF > X-Real-IP > X-Forwarded-For)
            let ipAddress = cfConnectingIp || realIp;
            if (!ipAddress && forwarded) {
                ipAddress = forwarded.split(',')[0].trim();
            }


            // Store submission in database
            const submission = await prisma.contactSubmission.create({
                data: {
                    name: name?.toString().trim() || '',
                    email: email?.toString().trim() || '',
                    reason: serviceType?.toString().trim() || '',
                    message: message?.toString().trim() || '',
                    ipAddress,
                    userAgent,
                    referrer
                }
            });


            return {
                success: true,
                message: 'Thank you for your message! We\'ll get back to you within 24 hours.'
            };

        } catch (error) {
            console.error('Error saving contact submission:', error);
            
            // More specific error handling
            if (error && typeof error === 'object' && 'code' in error && error.code === 'P1001') {
                return fail(500, {
                    error: 'Database connection failed. Please try again later.',
                    name: name?.toString() || '',
                    email: email?.toString() || '',
                    serviceType: serviceType?.toString() || '',
                    message: message?.toString() || ''
                });
            }
            
            return fail(500, {
                error: 'Sorry, there was an error submitting your message. Please try again later.',
                name: name?.toString() || '',
                email: email?.toString() || '',
                serviceType: serviceType?.toString() || '',
                message: message?.toString() || ''
            });
        } finally {
            
        }
    }
};