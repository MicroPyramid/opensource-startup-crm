import { schema } from '@opensource-startup-crm/database';
import { and, desc, eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
  const org = locals.org!;
  const db = locals.db
  const contactId = params.contactId;

  const [contactRow] = await db
    .select({
      id: schema.contact.id,
      firstName: schema.contact.firstName,
      lastName: schema.contact.lastName,
      email: schema.contact.email,
      phone: schema.contact.phone,
      title: schema.contact.title,
      department: schema.contact.department,
      street: schema.contact.street,
      city: schema.contact.city,
      state: schema.contact.state,
      postalCode: schema.contact.postalCode,
      country: schema.contact.country,
      createdAt: schema.contact.createdAt,
      description: schema.contact.description,
      owner: { id: schema.user.id, name: schema.user.name, email: schema.user.email }
    })
    .from(schema.contact)
    .leftJoin(schema.user, eq(schema.user.id, schema.contact.ownerId))
    .where(and(eq(schema.contact.id, contactId), eq(schema.contact.organizationId, org.id)));

  if (!contactRow) {
    return {
      status: 404,
      error: new Error('Contact not found')
    };
  }

  const accountRels = await db
    .select({
      id: schema.accountContactRelationship.id,
      role: schema.accountContactRelationship.role,
      isPrimary: schema.accountContactRelationship.isPrimary,
      description: schema.accountContactRelationship.description,
      startDate: schema.accountContactRelationship.startDate,
      endDate: schema.accountContactRelationship.endDate,
      account: schema.crmAccount
    })
    .from(schema.accountContactRelationship)
    .innerJoin(schema.crmAccount, eq(schema.crmAccount.id, schema.accountContactRelationship.accountId))
    .where(eq(schema.accountContactRelationship.contactId, contactId))
    .orderBy(desc(schema.accountContactRelationship.isPrimary), desc(schema.accountContactRelationship.startDate));

  const opportunities = await db
    .select({
      id: schema.opportunity.id,
      name: schema.opportunity.name,
      amount: schema.opportunity.amount,
      stage: schema.opportunity.stage,
      createdAt: schema.opportunity.createdAt,
      account: { id: schema.crmAccount.id, name: schema.crmAccount.name }
    })
    .from(schema.contactToOpportunity)
    .innerJoin(schema.opportunity, eq(schema.opportunity.id, schema.contactToOpportunity.opportunityId))
    .leftJoin(schema.crmAccount, eq(schema.crmAccount.id, schema.opportunity.accountId))
    .where(and(eq(schema.contactToOpportunity.contactId, contactId), eq(schema.opportunity.organizationId, org.id)))
    .orderBy(desc(schema.opportunity.createdAt))
    .limit(5);

  const tasks = await db
    .select({
      id: schema.task.id,
      subject: schema.task.subject,
      status: schema.task.status,
      priority: schema.task.priority,
      createdAt: schema.task.createdAt,
      dueDate: schema.task.dueDate,
      owner: { id: schema.user.id, name: schema.user.name },
      createdBy: { id: schema.user.id, name: schema.user.name }
    })
    .from(schema.task)
    .leftJoin(schema.user, eq(schema.user.id, schema.task.ownerId))
    .where(and(eq(schema.task.contactId, contactId), eq(schema.task.organizationId, org.id)))
    .orderBy(desc(schema.task.createdAt))
    .limit(5);

  const events = await db
    .select({
      id: schema.event.id,
      subject: schema.event.subject,
      location: schema.event.location,
      startDate: schema.event.startDate,
      endDate: schema.event.endDate,
      owner: { id: schema.user.id, name: schema.user.name },
      createdBy: { id: schema.user.id, name: schema.user.name }
    })
    .from(schema.event)
    .leftJoin(schema.user, eq(schema.user.id, schema.event.ownerId))
    .where(and(eq(schema.event.contactId, contactId), eq(schema.event.organizationId, org.id)))
    .orderBy(desc(schema.event.startDate))
    .limit(5);

  return {
    contact: {
      ...contactRow,
      accountRelationships: accountRels,
      opportunities,
      tasks,
      events
    }
  };
}
