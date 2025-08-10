export const INDUSTRIES = ['TECHNOLOGY', 'HEALTHCARE', 'FINANCE', 'EDUCATION', 'RETAIL', 'MANUFACTURING', 'ENERGY', 'REAL_ESTATE', 'CONSTRUCTION', 'TRANSPORTATION', 'HOSPITALITY', 'AGRICULTURE', 'OTHER'] as const;
export const INDUSTRY_TUPLES = INDUSTRIES.map((v) => [v, toTitle(v)]) as ReadonlyArray<readonly [string, string]>;
export const INDUSTRY_OPTIONS = toValueLabel(INDUSTRY_TUPLES);

export const ACCOUNT_TYPES = ['CUSTOMER', 'PARTNER', 'PROSPECT', 'VENDOR', 'COMPETITOR', 'OTHER'] as const;
export const ACCOUNT_TYPE_TUPLES = ACCOUNT_TYPES.map((v) => [v, toTitle(v)]) as ReadonlyArray<readonly [string, string]>;
export const ACCOUNT_TYPE_OPTIONS = toValueLabel(ACCOUNT_TYPE_TUPLES);

export const ACCOUNT_OWNERSHIP = ['PUBLIC', 'PRIVATE', 'SUBSIDIARY', 'NONPROFIT', 'GOVERNMENT', 'OTHER'] as const;
export const ACCOUNT_OWNERSHIP_TUPLES = ACCOUNT_OWNERSHIP.map((v) => [v, toTitle(v)]) as ReadonlyArray<readonly [string, string]>;
export const ACCOUNT_OWNERSHIP_OPTIONS = toValueLabel(ACCOUNT_OWNERSHIP_TUPLES);

export const RATINGS = ['HOT', 'WARM', 'COLD'] as const;
export const RATING_TUPLES = RATINGS.map((v) => [v, toTitle(v)]) as ReadonlyArray<readonly [string, string]>;
export const RATING_OPTIONS = toValueLabel(RATING_TUPLES);

export const LEAD_SOURCES = ['WEB', 'PHONE_INQUIRY', 'PARTNER_REFERRAL', 'COLD_CALL', 'TRADE_SHOW', 'EMPLOYEE_REFERRAL', 'ADVERTISEMENT', 'SOCIAL_MEDIA', 'EMAIL_CAMPAIGN', 'WEBINAR', 'CONTENT_MARKETING', 'SEO', 'PPC', 'DIRECT_MAIL', 'OTHER'] as const;
export const LEAD_SOURCE_TUPLES = LEAD_SOURCES.map((v) => [v, formatLeadSourceLabel(v)]) as ReadonlyArray<readonly [string, string]>;
export const LEAD_SOURCE_OPTIONS = toValueLabel(LEAD_SOURCE_TUPLES);

export const LEAD_STATUSES = ['NEW', 'PENDING', 'CONTACTED', 'QUALIFIED', 'UNQUALIFIED', 'CONVERTED'] as const;
export const LEAD_STATUS_TUPLES = LEAD_STATUSES.map((v) => [v, toTitle(v)]) as ReadonlyArray<readonly [string, string]>;
export const LEAD_STATUS_OPTIONS = toValueLabel(LEAD_STATUS_TUPLES);

export const OPPORTUNITY_TYPES = ['NEW_BUSINESS', 'EXISTING_BUSINESS', 'RENEWAL', 'UPSELL', 'CROSS_SELL'] as const;
export const OPPORTUNITY_TYPE_TUPLES = OPPORTUNITY_TYPES.map((v) => [v, toTitle(v)]) as ReadonlyArray<readonly [string, string]>;
export const OPPORTUNITY_TYPE_OPTIONS = toValueLabel(OPPORTUNITY_TYPE_TUPLES);

export const FORECAST_CATEGORIES = ['PIPELINE', 'BEST_CASE', 'COMMIT', 'CLOSED'] as const;
export const FORECAST_CATEGORY_TUPLES = FORECAST_CATEGORIES.map((v) => [v, toTitle(v)]) as ReadonlyArray<readonly [string, string]>;
export const FORECAST_CATEGORY_OPTIONS = toValueLabel(FORECAST_CATEGORY_TUPLES);

export const CASE_STATUSES = ['OPEN', 'IN_PROGRESS', 'CLOSED'] as const;
export const CASE_STATUS_TUPLES = CASE_STATUSES.map((v) => [v, toTitle(v)]) as ReadonlyArray<readonly [string, string]>;
export const CASE_STATUS_OPTIONS = toValueLabel(CASE_STATUS_TUPLES);

export const OPPORTUNITY_STAGES = ['PROSPECTING', 'QUALIFICATION', 'PROPOSAL', 'NEGOTIATION', 'CLOSED_WON', 'CLOSED_LOST'] as const;
export const OPPORTUNITY_STAGE_TUPLES = OPPORTUNITY_STAGES.map((v) => [v, toTitle(v)]) as ReadonlyArray<readonly [string, string]>;
export const OPPORTUNITY_STAGE_OPTIONS = toValueLabel(OPPORTUNITY_STAGE_TUPLES);

export const QUOTE_STATUSES = ['DRAFT', 'NEEDS_REVIEW', 'IN_REVIEW', 'APPROVED', 'REJECTED', 'PRESENTED', 'ACCEPTED'] as const;
export const QUOTE_STATUS_TUPLES = QUOTE_STATUSES.map((v) => [v, toTitle(v)]) as ReadonlyArray<readonly [string, string]>;
export const QUOTE_STATUS_OPTIONS = toValueLabel(QUOTE_STATUS_TUPLES);

export const TASK_STATUSES = ['COMPLETED', 'IN_PROGRESS', 'NOT_STARTED', 'WAITING_ON_SOMEONE_ELSE', 'DEFERRED'] as const;
export const TASK_STATUS_TUPLES = TASK_STATUSES.map((v) => [v, v === 'WAITING_ON_SOMEONE_ELSE' ? 'Waiting on someone else' : toTitle(v)]) as ReadonlyArray<readonly [string, string]>;
export const TASK_STATUS_OPTIONS = toValueLabel(TASK_STATUS_TUPLES);

export const TASK_PRIORITIES = ['HIGH', 'NORMAL', 'LOW'] as const;
export const TASK_PRIORITY_TUPLES = TASK_PRIORITIES.map((v) => [v, toTitle(v)]) as ReadonlyArray<readonly [string, string]>;
export const TASK_PRIORITY_OPTIONS = toValueLabel(TASK_PRIORITY_TUPLES);

export const AUDIT_ACTIONS = ['CREATE', 'UPDATE', 'DELETE', 'LOGIN', 'LOGOUT', 'EXPORT', 'IMPORT', 'VIEW', 'OTHER'] as const;
export const AUDIT_ACTION_TUPLES = AUDIT_ACTIONS.map((v) => [v, toTitle(v)]) as ReadonlyArray<readonly [string, string]>;
export const AUDIT_ACTION_OPTIONS = toValueLabel(AUDIT_ACTION_TUPLES);

export const CONTENT_BLOCK_TYPES = ['MARKDOWN', 'CODE', 'IMAGE'] as const;
export const CONTENT_BLOCK_TYPE_TUPLES = CONTENT_BLOCK_TYPES.map((v) => [v, toTitle(v)]) as ReadonlyArray<readonly [string, string]>;
export const CONTENT_BLOCK_TYPE_OPTIONS = toValueLabel(CONTENT_BLOCK_TYPE_TUPLES);

// Helpers
function toTitle(s: string): string {
  return s
    .toLowerCase()
    .split('_')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function formatLeadSourceLabel(s: string): string {
  const map: Record<string, string> = {
    SEO: 'SEO/Organic Search',
    PPC: 'Pay-Per-Click Advertising'
  };
  return map[s] ?? toTitle(s);
}

export type ValueLabel = { value: string; label: string };

function toValueLabel(tuples: ReadonlyArray<readonly [string, string]>): ValueLabel[] {
  return tuples.map(([value, label]) => ({ value, label }));
}

