import { pgTable as table } from 'drizzle-orm/pg-core';
import * as t from 'drizzle-orm/pg-core';
import { user, organization } from './base';
import {
  leadSource,
  leadStatus,
  opportunityStage,
  caseStatus,
  quoteStatus,
  auditAction,
  contentBlockType,
  industryEnum,
  accountType,
  accountOwnershipEnum,
  ratingEnum,
  opportunityType,
  forecastCategoryEnum,
  taskStatus,
  taskPriority
} from './enums';
import { randomUUID } from 'crypto';

// enums now imported from './enums'


// ---------- Core CRM tables ----------
export const crmAccount = table('crm_account', {
  id: t.text('id').primaryKey().$defaultFn(() => randomUUID()),
  name: t.text('name').notNull(),
  type: accountType('type'),
  industry: industryEnum('industry'),
  website: t.text('website'),
  phone: t.text('phone'),
  street: t.text('street'),
  city: t.text('city'),
  state: t.text('state'),
  email: t.text('email'),
  postalCode: t.text('postal_code'),
  country: t.text('country'),
  latitude: t.doublePrecision('latitude'),
  longitude: t.doublePrecision('longitude'),
  annualRevenue: t.doublePrecision('annual_revenue'),
  description: t.text('description'),
  createdAt: t.timestamp('created_at').notNull().$defaultFn(() => new Date()),
  updatedAt: t.timestamp('updated_at').notNull().$defaultFn(() => new Date()),
  numberOfEmployees: t.integer('number_of_employees'),
  accountOwnership: accountOwnershipEnum('account_ownership'),
  tickerSymbol: t.text('ticker_symbol'),
  rating: ratingEnum('rating'),
  sicCode: t.text('sic_code'),
  isActive: t.boolean('is_active').notNull().default(true),
  isDeleted: t.boolean('is_deleted').notNull().default(false),
  deletedAt: t.timestamp('deleted_at'),
  deletedById: t.text('deleted_by_id').references(() => user.id),
  closedAt: t.timestamp('closed_at'),
  closureReason: t.text('closure_reason'),
  ownerId: t.text('owner_id').notNull().references(() => user.id),
  organizationId: t.text('organization_id').notNull().references(() => organization.id)
});

export const contact = table('contact', {
  id: t.text('id').primaryKey().$defaultFn(() => randomUUID()),
  firstName: t.text('first_name').notNull(),
  lastName: t.text('last_name').notNull(),
  email: t.text('email'),
  phone: t.text('phone'),
  title: t.text('title'),
  department: t.text('department'),
  street: t.text('street'),
  city: t.text('city'),
  state: t.text('state'),
  postalCode: t.text('postal_code'),
  country: t.text('country'),
  latitude: t.doublePrecision('latitude'),
  longitude: t.doublePrecision('longitude'),
  description: t.text('description'),
  createdAt: t.timestamp('created_at').notNull().$defaultFn(() => new Date()),
  updatedAt: t.timestamp('updated_at').notNull().$defaultFn(() => new Date()),
  ownerId: t.text('owner_id').notNull().references(() => user.id),
  organizationId: t.text('organization_id').notNull().references(() => organization.id)
});

export const lead = table('lead', {
  id: t.text('id').primaryKey().$defaultFn(() => randomUUID()),
  firstName: t.text('first_name').notNull(),
  lastName: t.text('last_name').notNull(),
  email: t.text('email'),
  phone: t.text('phone'),
  company: t.text('company'),
  title: t.text('title'),
  status: leadStatus('status').notNull().default('PENDING'),
  leadSource: leadSource('lead_source'),
  industry: industryEnum('industry'),
  rating: ratingEnum('rating'),
  description: t.text('description'),
  createdAt: t.timestamp('created_at').notNull().$defaultFn(() => new Date()),
  updatedAt: t.timestamp('updated_at').notNull().$defaultFn(() => new Date()),
  ownerId: t.text('owner_id').notNull().references(() => user.id),
  organizationId: t.text('organization_id').notNull().references(() => organization.id),
  isConverted: t.boolean('is_converted').notNull().default(false),
  convertedAt: t.timestamp('converted_at'),
  convertedAccountId: t.text('converted_account_id').references(() => crmAccount.id),
  convertedContactId: t.text('converted_contact_id').references(() => contact.id),
  convertedOpportunityId: t.text('converted_opportunity_id'),
  contactId: t.text('contact_id').references(() => contact.id)
});

export const opportunity = table('opportunity', {
  id: t.text('id').primaryKey().$defaultFn(() => randomUUID()),
  name: t.text('name').notNull(),
  amount: t.doublePrecision('amount'),
  closeDate: t.timestamp('close_date'),
  probability: t.doublePrecision('probability'),
  type: opportunityType('type'),
  nextStep: t.text('next_step'),
  description: t.text('description'),
  createdAt: t.timestamp('created_at').notNull().$defaultFn(() => new Date()),
  updatedAt: t.timestamp('updated_at').notNull().$defaultFn(() => new Date()),
  accountId: t.text('account_id').notNull().references(() => crmAccount.id),
  ownerId: t.text('owner_id').notNull().references(() => user.id),
  organizationId: t.text('organization_id').notNull().references(() => organization.id),
  stage: opportunityStage('stage').notNull(),
  expectedRevenue: t.doublePrecision('expected_revenue'),
  forecastCategory: forecastCategoryEnum('forecast_category'),
  leadSource: leadSource('lead_source')
});

export const task = table('task', {
  id: t.text('id').primaryKey().$defaultFn(() => randomUUID()),
  subject: t.text('subject').notNull(),
  status: taskStatus('status').notNull().default('NOT_STARTED'),
  priority: taskPriority('priority').notNull().default('NORMAL'),
  dueDate: t.timestamp('due_date'),
  description: t.text('description'),
  createdAt: t.timestamp('created_at').notNull().$defaultFn(() => new Date()),
  updatedAt: t.timestamp('updated_at').notNull().$defaultFn(() => new Date()),
  ownerId: t.text('owner_id').notNull().references(() => user.id),
  createdById: t.text('created_by_id').notNull().references(() => user.id),
  accountId: t.text('account_id').references(() => crmAccount.id),
  contactId: t.text('contact_id').references(() => contact.id),
  leadId: t.text('lead_id').references(() => lead.id),
  opportunityId: t.text('opportunity_id').references(() => opportunity.id),
  caseId: t.text('case_id'),
  organizationId: t.text('organization_id').notNull().references(() => organization.id)
});

export const event = table('event', {
  id: t.text('id').primaryKey().$defaultFn(() => randomUUID()),
  subject: t.text('subject').notNull(),
  location: t.text('location'),
  startDate: t.timestamp('start_date').notNull(),
  endDate: t.timestamp('end_date').notNull(),
  allDayEvent: t.boolean('all_day_event').notNull().default(false),
  description: t.text('description'),
  createdAt: t.timestamp('created_at').notNull().$defaultFn(() => new Date()),
  updatedAt: t.timestamp('updated_at').notNull().$defaultFn(() => new Date()),
  ownerId: t.text('owner_id').notNull().references(() => user.id),
  createdById: t.text('created_by_id').notNull().references(() => user.id),
  accountId: t.text('account_id').references(() => crmAccount.id),
  contactId: t.text('contact_id').references(() => contact.id),
  leadId: t.text('lead_id').references(() => lead.id),
  opportunityId: t.text('opportunity_id').references(() => opportunity.id),
  organizationId: t.text('organization_id').notNull().references(() => organization.id)
});

export const product = table('product', {
  id: t.text('id').primaryKey().$defaultFn(() => randomUUID()),
  name: t.text('name').notNull(),
  code: t.text('code').notNull(),
  description: t.text('description'),
  unitPrice: t.doublePrecision('unit_price').notNull(),
  active: t.boolean('active').notNull().default(true),
  createdAt: t.timestamp('created_at').notNull().$defaultFn(() => new Date()),
  updatedAt: t.timestamp('updated_at').notNull().$defaultFn(() => new Date()),
  organizationId: t.text('organization_id').notNull().references(() => organization.id)
});

export const productOpportunity = table('product_opportunity', {
  id: t.text('id').primaryKey().$defaultFn(() => randomUUID()),
  quantity: t.doublePrecision('quantity').notNull(),
  unitPrice: t.doublePrecision('unit_price').notNull(),
  totalPrice: t.doublePrecision('total_price').notNull(),
  discount: t.doublePrecision('discount').notNull().default(0),
  productId: t.text('product_id').notNull().references(() => product.id),
  opportunityId: t.text('opportunity_id').notNull().references(() => opportunity.id),
  createdAt: t.timestamp('created_at').notNull().$defaultFn(() => new Date()),
  updatedAt: t.timestamp('updated_at').notNull().$defaultFn(() => new Date())
});

export const caseTable = table('case', {
  id: t.text('id').primaryKey().$defaultFn(() => randomUUID()),
  caseNumber: t.text('case_number').notNull(),
  subject: t.text('subject').notNull(),
  status: caseStatus('status').notNull().default('OPEN'),
  description: t.text('description'),
  priority: t.text('priority').notNull().default('Medium'),
  origin: t.text('origin'),
  type: t.text('type'),
  reason: t.text('reason'),
  dueDate: t.timestamp('due_date'),
  createdAt: t.timestamp('created_at').notNull().$defaultFn(() => new Date()),
  updatedAt: t.timestamp('updated_at').notNull().$defaultFn(() => new Date()),
  closedAt: t.timestamp('closed_at'),
  ownerId: t.text('owner_id').notNull().references(() => user.id),
  accountId: t.text('account_id').notNull().references(() => crmAccount.id),
  contactId: t.text('contact_id').references(() => contact.id),
  organizationId: t.text('organization_id').notNull().references(() => organization.id)
});

export const solution = table('solution', {
  id: t.text('id').primaryKey().$defaultFn(() => randomUUID()),
  title: t.text('title').notNull(),
  description: t.text('description').notNull(),
  status: t.text('status').notNull().default('Draft'),
  isPublished: t.boolean('is_published').notNull().default(false),
  createdAt: t.timestamp('created_at').notNull().$defaultFn(() => new Date()),
  updatedAt: t.timestamp('updated_at').notNull().$defaultFn(() => new Date()),
  organizationId: t.text('organization_id').notNull().references(() => organization.id)
});

export const comment = table('comment', {
  id: t.text('id').primaryKey().$defaultFn(() => randomUUID()),
  body: t.text('body').notNull(),
  isPrivate: t.boolean('is_private').notNull().default(false),
  createdAt: t.timestamp('created_at').notNull().$defaultFn(() => new Date()),
  updatedAt: t.timestamp('updated_at').notNull().$defaultFn(() => new Date()),
  authorId: t.text('author_id').notNull().references(() => user.id),
  organizationId: t.text('organization_id').notNull().references(() => organization.id),
  caseId: t.text('case_id').references(() => caseTable.id),
  opportunityId: t.text('opportunity_id').references(() => opportunity.id),
  leadId: t.text('lead_id').references(() => lead.id),
  taskId: t.text('task_id').references(() => task.id),
  accountId: t.text('account_id').references(() => crmAccount.id),
  contactId: t.text('contact_id').references(() => contact.id)
});

export const quote = table('quote', {
  id: t.text('id').primaryKey().$defaultFn(() => randomUUID()),
  quoteNumber: t.text('quote_number').notNull(),
  name: t.text('name').notNull(),
  status: quoteStatus('status').notNull().default('DRAFT'),
  description: t.text('description'),
  expirationDate: t.timestamp('expiration_date'),
  subtotal: t.numeric('subtotal', { precision: 18, scale: 2 }).notNull().default('0.00'),
  discountAmount: t.numeric('discount_amount', { precision: 18, scale: 2 }).notNull().default('0.00'),
  taxAmount: t.numeric('tax_amount', { precision: 18, scale: 2 }).notNull().default('0.00'),
  grandTotal: t.numeric('grand_total', { precision: 18, scale: 2 }).notNull().default('0.00'),
  billingStreet: t.text('billing_street'),
  billingCity: t.text('billing_city'),
  billingState: t.text('billing_state'),
  billingPostalCode: t.text('billing_postal_code'),
  billingCountry: t.text('billing_country'),
  shippingStreet: t.text('shipping_street'),
  shippingCity: t.text('shipping_city'),
  shippingState: t.text('shipping_state'),
  shippingPostalCode: t.text('shipping_postal_code'),
  shippingCountry: t.text('shipping_country'),
  createdAt: t.timestamp('created_at').notNull().$defaultFn(() => new Date()),
  updatedAt: t.timestamp('updated_at').notNull().$defaultFn(() => new Date()),
  preparedById: t.text('prepared_by_id').notNull().references(() => user.id),
  accountId: t.text('account_id').notNull().references(() => crmAccount.id),
  opportunityId: t.text('opportunity_id').references(() => opportunity.id),
  contactId: t.text('contact_id').references(() => contact.id),
  organizationId: t.text('organization_id').notNull().references(() => organization.id)
});

export const quoteLineItem = table('quote_line_item', {
  id: t.text('id').primaryKey().$defaultFn(() => randomUUID()),
  quantity: t.integer('quantity').notNull().default(1),
  listPrice: t.numeric('list_price', { precision: 18, scale: 2 }).notNull(),
  unitPrice: t.numeric('unit_price', { precision: 18, scale: 2 }).notNull(),
  discount: t.numeric('discount', { precision: 18, scale: 2 }).notNull().default('0.00'),
  totalPrice: t.numeric('total_price', { precision: 18, scale: 2 }).notNull(),
  description: t.text('description'),
  quoteId: t.text('quote_id').notNull().references(() => quote.id, { onDelete: 'cascade' }),
  productId: t.text('product_id').notNull().references(() => product.id)
});

export const accountContactRelationship = table('account_contact_relationship', {
  id: t.text('id').primaryKey().$defaultFn(() => randomUUID()),
  role: t.text('role'),
  isPrimary: t.boolean('is_primary').notNull().default(false),
  startDate: t.timestamp('start_date').notNull().$defaultFn(() => new Date()),
  endDate: t.timestamp('end_date'),
  description: t.text('description'),
  accountId: t.text('account_id').notNull().references(() => crmAccount.id, { onDelete: 'cascade' }),
  contactId: t.text('contact_id').notNull().references(() => contact.id, { onDelete: 'cascade' }),
  createdAt: t.timestamp('created_at').notNull().$defaultFn(() => new Date()),
  updatedAt: t.timestamp('updated_at').notNull().$defaultFn(() => new Date())
});

export const auditLog = table('audit_log', {
  id: t.text('id').primaryKey().$defaultFn(() => randomUUID()),
  timestamp: t.timestamp('timestamp').notNull().$defaultFn(() => new Date()),
  action: auditAction('action').notNull(),
  entityType: t.text('entity_type').notNull(),
  entityId: t.text('entity_id'),
  description: t.text('description'),
  oldValues: t.jsonb('old_values'),
  newValues: t.jsonb('new_values'),
  ipAddress: t.text('ip_address'),
  userAgent: t.text('user_agent'),
  userId: t.text('user_id').notNull().references(() => user.id),
  organizationId: t.text('organization_id').notNull().references(() => organization.id)
});

export const board = table('board', {
  id: t.text('id').primaryKey().$defaultFn(() => randomUUID()),
  name: t.text('name').notNull(),
  description: t.text('description'),
  ownerId: t.text('owner_id').notNull().references(() => user.id),
  organizationId: t.text('organization_id').notNull().references(() => organization.id),
  createdAt: t.timestamp('created_at').notNull().$defaultFn(() => new Date()),
  updatedAt: t.timestamp('updated_at').notNull().$defaultFn(() => new Date())
});

export const boardMember = table('board_member', {
  id: t.text('id').primaryKey().$defaultFn(() => randomUUID()),
  boardId: t.text('board_id').notNull().references(() => board.id),
  userId: t.text('user_id').notNull().references(() => user.id),
  role: t.text('role').notNull(),
  createdAt: t.timestamp('created_at').notNull().$defaultFn(() => new Date())
});

export const boardColumn = table('board_column', {
  id: t.text('id').primaryKey().$defaultFn(() => randomUUID()),
  name: t.text('name').notNull(),
  order: t.integer('order').notNull(),
  boardId: t.text('board_id').notNull().references(() => board.id),
  createdAt: t.timestamp('created_at').notNull().$defaultFn(() => new Date()),
  updatedAt: t.timestamp('updated_at').notNull().$defaultFn(() => new Date())
});

export const boardTask = table('board_task', {
  id: t.text('id').primaryKey().$defaultFn(() => randomUUID()),
  title: t.text('title').notNull(),
  description: t.text('description'),
  order: t.integer('order').notNull(),
  columnId: t.text('column_id').notNull().references(() => boardColumn.id),
  assigneeId: t.text('assignee_id').references(() => user.id),
  dueDate: t.timestamp('due_date'),
  completed: t.boolean('completed').notNull().default(false),
  createdAt: t.timestamp('created_at').notNull().$defaultFn(() => new Date()),
  updatedAt: t.timestamp('updated_at').notNull().$defaultFn(() => new Date())
});

export const boardTaskActivity = table('board_task_activity', {
  id: t.text('id').primaryKey().$defaultFn(() => randomUUID()),
  taskId: t.text('task_id').notNull().references(() => boardTask.id),
  authorId: t.text('author_id').notNull().references(() => user.id),
  type: t.text('type').notNull(),
  content: t.text('content').notNull(),
  createdAt: t.timestamp('created_at').notNull().$defaultFn(() => new Date())
});

export const blogPost = table('blog_post', {
  id: t.text('id').primaryKey().$defaultFn(() => randomUUID()),
  title: t.text('title').notNull(),
  slug: t.text('slug').notNull(),
  excerpt: t.text('excerpt').notNull(),
  draft: t.boolean('draft').notNull().default(false),
  seoDescription: t.text('seo_description').notNull(),
  seoTitle: t.text('seo_title').notNull(),
  userId: t.text('user_id').references(() => user.id),
  createdAt: t.timestamp('created_at').notNull().$defaultFn(() => new Date()),
  updatedAt: t.timestamp('updated_at').notNull().$defaultFn(() => new Date())
});

export const blogContentBlock = table('blog_content_block', {
  id: t.text('id').primaryKey().$defaultFn(() => randomUUID()),
  blogId: t.text('blog_id').notNull().references(() => blogPost.id),
  type: contentBlockType('type').notNull(),
  content: t.text('content').notNull(),
  displayOrder: t.integer('display_order').notNull(),
  draft: t.boolean('draft').notNull().default(false),
  createdAt: t.timestamp('created_at').notNull().$defaultFn(() => new Date()),
  updatedAt: t.timestamp('updated_at').notNull().$defaultFn(() => new Date())
});

export const newsletterSubscriber = table('newsletter_subscriber', {
  id: t.text('id').primaryKey().$defaultFn(() => randomUUID()),
  email: t.text('email').notNull(),
  isActive: t.boolean('is_active').notNull().default(true),
  subscribedAt: t.timestamp('subscribed_at').notNull().$defaultFn(() => new Date()),
  unsubscribedAt: t.timestamp('unsubscribed_at'),
  confirmationToken: t.text('confirmation_token'),
  isConfirmed: t.boolean('is_confirmed').notNull().default(false),
  confirmedAt: t.timestamp('confirmed_at'),
  ipAddress: t.text('ip_address'),
  userAgent: t.text('user_agent')
});

export const contactSubmission = table('contact_submission', {
  id: t.text('id').primaryKey().$defaultFn(() => randomUUID()),
  name: t.text('name').notNull(),
  email: t.text('email').notNull(),
  message: t.text('message').notNull(),
  reason: t.text('reason').notNull(),
  ipAddress: t.text('ip_address'),
  userAgent: t.text('user_agent'),
  referrer: t.text('referrer'),
  createdAt: t.timestamp('created_at').notNull().$defaultFn(() => new Date())
});

// ---------- Join tables ----------
export const contactToOpportunity = table('contact_to_opportunity', {
  contactId: t.text('contact_id').notNull().references(() => contact.id, { onDelete: 'cascade' }),
  opportunityId: t.text('opportunity_id').notNull().references(() => opportunity.id, { onDelete: 'cascade' })
});

export const caseToSolution = table('case_to_solution', {
  caseId: t.text('case_id').notNull().references(() => caseTable.id, { onDelete: 'cascade' }),
  solutionId: t.text('solution_id').notNull().references(() => solution.id, { onDelete: 'cascade' })
});


