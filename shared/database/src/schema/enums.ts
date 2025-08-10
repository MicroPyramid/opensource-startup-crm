import * as t from 'drizzle-orm/pg-core';
import {
  LEAD_SOURCES,
  LEAD_STATUSES,
  OPPORTUNITY_STAGES,
  CASE_STATUSES,
  QUOTE_STATUSES,
  AUDIT_ACTIONS,
  CONTENT_BLOCK_TYPES,
  INDUSTRIES,
  ACCOUNT_TYPES,
  ACCOUNT_OWNERSHIP,
  RATINGS,
  OPPORTUNITY_TYPES,
  FORECAST_CATEGORIES,
  TASK_PRIORITIES,
  TASK_STATUSES
} from '@opensource-startup-crm/constants';

// ---------- Enums ----------
export const leadSource = t.pgEnum('lead_source', [...LEAD_SOURCES]);

export const leadStatus = t.pgEnum('lead_status', [...LEAD_STATUSES]);

export const opportunityStage = t.pgEnum('opportunity_stage', [...OPPORTUNITY_STAGES]);

export const caseStatus = t.pgEnum('case_status', [...CASE_STATUSES]);

export const quoteStatus = t.pgEnum('quote_status', [...QUOTE_STATUSES]);

export const auditAction = t.pgEnum('audit_action', [...AUDIT_ACTIONS]);

export const contentBlockType = t.pgEnum('content_block_type', [...CONTENT_BLOCK_TYPES]);

// ---------- Additional enums from lookups ----------
export const industryEnum = t.pgEnum('industry', [...INDUSTRIES]);

export const accountType = t.pgEnum('account_type', [...ACCOUNT_TYPES]);

export const accountOwnershipEnum = t.pgEnum('account_ownership', [...ACCOUNT_OWNERSHIP]);

export const ratingEnum = t.pgEnum('rating', [...RATINGS]);

export const opportunityType = t.pgEnum('opportunity_type', [...OPPORTUNITY_TYPES]);

export const forecastCategoryEnum = t.pgEnum('forecast_category', [...FORECAST_CATEGORIES]);

export const taskStatus = t.pgEnum('task_status', [...TASK_STATUSES]);

export const taskPriority = t.pgEnum('task_priority', [...TASK_PRIORITIES]);
