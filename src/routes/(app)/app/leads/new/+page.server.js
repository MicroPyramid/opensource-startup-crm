import { env } from '$env/dynamic/private';
import { redirect } from '@sveltejs/kit';
import prisma from '$lib/prisma';
import { fail } from '@sveltejs/kit';
import { validatePhoneNumber, formatPhoneForStorage } from '$lib/utils/phone.js';
import { 
  industries, 
  leadSources, 
  leadStatuses, 
  countries 
} from '$lib/data/index.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
  const user = locals.user;
  const org = locals.org;

  // Get data for dropdowns
  return {
    data: {
      industries,
      status: leadStatuses,
      source: leadSources,
      countries
    }
  };
}

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ request, locals }) => {
    // Get user and org from locals
    const user = locals.user;
    const org = locals.org;


    // Get the submitted form data
    const formData = await request.formData();
    
    // Extract and validate required fields
    const firstName = formData.get('first_name')?.toString().trim();
    const lastName = formData.get('last_name')?.toString().trim() || '';
    const email = formData.get('email')?.toString().trim();
    const leadTitle = formData.get('lead_title')?.toString().trim();
    
    if (!firstName) {
      return fail(400, { error: 'First name is required' });
    }
    
    if (!lastName) {
      return fail(400, { error: 'Last name is required' });
    }
    
    if (!leadTitle) {
      return fail(400, { error: 'Lead title is required' });
    }

    // Validate phone number if provided
    let formattedPhone = null;
    const phone = formData.get('phone')?.toString();
    if (phone && phone.trim().length > 0) {
      const phoneValidation = validatePhoneNumber(phone.trim());
      if (!phoneValidation.isValid) {
        return fail(400, { error: phoneValidation.error || 'Please enter a valid phone number' });
      }
      formattedPhone = formatPhoneForStorage(phone.trim());
    }

    // Extract all form fields
    const leadData = {
      firstName,
      lastName,
      title: leadTitle,
      email: email || null,
      phone: formattedPhone,
      company: formData.get('company')?.toString() || null,
      status: (formData.get('status')?.toString() || 'PENDING'),
      leadSource: formData.get('source')?.toString() || null,
      industry: formData.get('industry')?.toString() || null,
      description: formData.get('description')?.toString() || null,
      
      // Store opportunity amount in description since it's not in the Lead schema
      opportunityAmount: formData.get('opportunity_amount') ? 
        parseFloat(formData.get('opportunity_amount')?.toString() || '0') : null,
      
      // Store probability in description since it's not in the Lead schema
      probability: formData.get('probability') ? 
        parseFloat(formData.get('probability')?.toString() || '0') : null,
      
      // Address fields
      street: formData.get('street')?.toString() || null,
      city: formData.get('city')?.toString() || null,
      state: formData.get('state')?.toString() || null,
      postalCode: formData.get('postcode')?.toString() || null,
      country: formData.get('country')?.toString() || null,
      
      // Save these to include in description if not available in the model
      website: formData.get('website')?.toString() || null,
      skypeID: formData.get('skype_ID')?.toString() || null,
    };
    
    try {
      // Prepare basic lead data that matches the Prisma schema
      const leadCreateData = {
        firstName: leadData.firstName,
        lastName: leadData.lastName,
        email: leadData.email,
        phone: leadData.phone,
        company: leadData.company,
        title: leadData.title,
        status: leadData.status,
        leadSource: leadData.leadSource || null,
        industry: leadData.industry,
        description: leadData.description || '',
        rating: null, // This is in the schema
        owner: {
          connect: {
            id: user.id
          }
        },
        organization: {
          connect: {
            id: org.id
          }
        }
      };

      // Remove logic that appends extra info to description
      // All extra fields are now ignored if not in schema

      // Create new lead in the database
      const lead = await prisma.lead.create({
        // @ts-ignore - status is a valid LeadStatus enum value
        data: leadCreateData
      });
      
      // Return success instead of redirecting
      return {
        status: 'success',
        message: 'Lead created successfully',
        lead: {
          id: lead.id,
          name: `${lead.firstName} ${lead.lastName}`
        }
      };
      
    } catch (err) {
      console.error('Error creating lead:', err);
      return fail(500, { 
        error: 'Failed to create lead: ' + (err instanceof Error ? err.message : 'Unknown error'),
        values: leadData // Return entered values so the form can be repopulated
      });
    }
  }
};