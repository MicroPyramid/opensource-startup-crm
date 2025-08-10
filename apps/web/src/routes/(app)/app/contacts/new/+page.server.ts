import { redirect, fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { schema } from '@opensource-startup-crm/database';
import { validatePhoneNumber, formatPhoneForStorage } from '$lib/utils/phone.js';
import { and, eq, inArray, asc } from 'drizzle-orm';

export const load: PageServerLoad = async ({ locals, url }) => {
    const db = locals.db
    const user = locals.user!

    // Get user's organizations for the dropdown
    const userOrganizations = await db
        .select({ id: schema.organization.id, name: schema.organization.name })
        .from(schema.member)
        .innerJoin(schema.organization, eq(schema.organization.id, schema.member.organizationId))
        .where(eq(schema.member.userId, user.id));

    // Get accounts for the account dropdown (if no specific accountId is provided)
    const accountId = url.searchParams.get('accountId');
    let accounts: Array<{ id: string; name: string; organizationId: string }> = [];

    if (!accountId) {
        // Load accounts from user's organizations
        const organizationIds = userOrganizations.map((uo) => uo.id);
        accounts = await db
            .select({ id: schema.crmAccount.id, name: schema.crmAccount.name, organizationId: schema.crmAccount.organizationId })
            .from(schema.crmAccount)
            .where(and(inArray(schema.crmAccount.organizationId, organizationIds), eq(schema.crmAccount.isDeleted, false)))
            .orderBy(asc(schema.crmAccount.name));
    } else {
        // Load the specific account to validate access and show in UI
        const [account] = await db
            .select({ id: schema.crmAccount.id, name: schema.crmAccount.name, organizationId: schema.crmAccount.organizationId })
            .from(schema.crmAccount)
            .where(and(eq(schema.crmAccount.id, accountId), inArray(schema.crmAccount.organizationId, userOrganizations.map((uo) => uo.id)), eq(schema.crmAccount.isDeleted, false)));

        if (account) {
            accounts = [account];
        }
    }

    return { organizations: userOrganizations.map((o) => ({ id: o.id, name: o.name })), accounts };
}

export const actions: Actions = {
    create: async ({ request, locals }) => {
        const db = locals.db
        const user = locals.user!

        const data = await request.formData();
        const firstName = data.get('firstName')?.toString().trim() || '';
        const lastName = data.get('lastName')?.toString().trim() || '';
        const email = data.get('email')?.toString().trim();
        const phone = data.get('phone')?.toString().trim();
        const title = data.get('title')?.toString().trim();
        const department = data.get('department')?.toString().trim();
        const street = data.get('street')?.toString().trim();
        const city = data.get('city')?.toString().trim();
        const state = data.get('state')?.toString().trim();
        const postalCode = data.get('postalCode')?.toString().trim();
        const country = data.get('country')?.toString().trim();
        const description = data.get('description')?.toString().trim();
        const organizationId = data.get('organizationId')?.toString();
        const accountId = data.get('accountId')?.toString();
        const role = data.get('role')?.toString().trim();
        const isPrimary = data.get('isPrimary') === 'on';

        // Validation
        const errors: Record<string, string> = {};

        if (!firstName) errors.firstName = 'First name is required';
        if (!lastName) errors.lastName = 'Last name is required';

        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.email = 'Please enter a valid email address';
        }

        // Validate phone number if provided
        let formattedPhone = null;
        if (phone && phone.length > 0) {
            const phoneValidation = validatePhoneNumber(phone);
            if (!phoneValidation.isValid) {
                errors.phone = phoneValidation.error || 'Please enter a valid phone number';
            } else {
                formattedPhone = formatPhoneForStorage(phone);
            }
        }

        if (Object.keys(errors).length > 0) {
            return fail(400, {
                errors,
                values: {
                    firstName, lastName, email, phone, title, department,
                    street, city, state, postalCode, country, description,
                    organizationId, accountId, role, isPrimary
                }
            });
        }

        try {
            let validatedOrganizationId = organizationId || locals.org?.id;

            // If accountId is provided, validate it and get its organizationId
            if (accountId) {
                const [account] = await db
                    .select({ id: schema.crmAccount.id, organizationId: schema.crmAccount.organizationId })
                    .from(schema.crmAccount)
                    .where(and(eq(schema.crmAccount.id, accountId), eq(schema.crmAccount.isDeleted, false)));

                if (!account) {
                    return fail(404, {
                        errors: { accountId: 'Account not found' },
                        values: {
                            firstName, lastName, email, phone, title, department,
                            street, city, state, postalCode, country, description,
                            organizationId, accountId, role, isPrimary
                        }
                    });
                }

                const [membership] = await db
                    .select({ id: schema.member.id })
                    .from(schema.member)
                    .where(and(eq(schema.member.userId, user.id), eq(schema.member.organizationId, account.organizationId)));
                if (!membership) {
                    return fail(403, {
                        errors: { accountId: 'You do not have access to this account' },
                        values: {
                            firstName, lastName, email, phone, title, department,
                            street, city, state, postalCode, country, description,
                            organizationId, accountId, role, isPrimary
                        }
                    });
                }

                validatedOrganizationId = account.organizationId;
            }

            // Verify user has access to the organization
            if (validatedOrganizationId) {
                const [userOrg] = await db
                    .select({ id: schema.member.id })
                    .from(schema.member)
                    .where(and(eq(schema.member.userId, user.id), eq(schema.member.organizationId, validatedOrganizationId)));

                if (!userOrg) {
                    return fail(403, {
                        errors: { organizationId: 'You do not have access to this organization' },
                        values: {
                            firstName, lastName, email, phone, title, department,
                            street, city, state, postalCode, country, description,
                            organizationId, accountId, role, isPrimary
                        }
                    });
                }

                // Check for duplicate email within the organization
                if (email) {
                    const [existingContact] = await db
                        .select({ id: schema.contact.id })
                        .from(schema.contact)
                        .where(and(eq(schema.contact.email, email), eq(schema.contact.organizationId, validatedOrganizationId)));

                    if (existingContact) {
                        return fail(400, {
                            errors: { email: 'A contact with this email already exists in this organization' },
                            values: {
                                firstName, lastName, email, phone, title, department,
                                street, city, state, postalCode, country, description,
                                organizationId, accountId, role, isPrimary
                            }
                        });
                    }
                }
            }

            // Create the contact
            const [contact] = await db
                .insert(schema.contact)
                .values({
                    firstName,
                    lastName,
                    email: email || null,
                    phone: formattedPhone,
                    title: title || null,
                    department: department || null,
                    street: street || null,
                    city: city || null,
                    state: state || null,
                    postalCode: postalCode || null,
                    country: country || null,
                    description: description || null,
                    ownerId: user.id,
                    organizationId: validatedOrganizationId!
                })
                .returning();

            // Create account-contact relationship if accountId is provided
            if (accountId) {
                await db.insert(schema.accountContactRelationship).values({
                    accountId: accountId,
                    contactId: contact.id,
                    role: role || null,
                    isPrimary: isPrimary
                });
            }

            // Create audit log
            await db.insert(schema.auditLog).values({
                action: 'CREATE',
                entityType: 'Contact',
                entityId: contact.id,
                description: `Created contact: ${firstName} ${lastName}${accountId ? ` and linked to account` : ''}`,
                newValues: { contact, accountRelationship: accountId ? { accountId, role, isPrimary } : null } as any,
                userId: user.id,
                organizationId: locals.org!.id
            });

        } catch (error) {
            console.error('Error creating contact:', error);
            return fail(500, {
                errors: { general: 'An error occurred while creating the contact. Please try again.' },
                values: {
                    firstName, lastName, email, phone, title, department,
                    street, city, state, postalCode, country, description,
                    organizationId, accountId, role, isPrimary
                }
            });
        }

        // Redirect back to account if accountId was provided, otherwise to contacts list
        const redirectUrl = accountId ? `/app/accounts/${accountId}` : '/app/contacts';
        throw redirect(302, redirectUrl);
    }
};