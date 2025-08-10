// Consolidated simple lookup tuples. All are readonly tuple arrays.

import {
  // Value/Label options
  INDUSTRY_OPTIONS,
  ACCOUNT_TYPE_OPTIONS,
  ACCOUNT_OWNERSHIP_OPTIONS,
  RATING_OPTIONS,
  LEAD_SOURCE_OPTIONS,
  LEAD_STATUS_OPTIONS,
  OPPORTUNITY_TYPE_OPTIONS,
  FORECAST_CATEGORY_OPTIONS,
  CASE_STATUS_OPTIONS,
  OPPORTUNITY_STAGE_OPTIONS,
  TASK_STATUS_OPTIONS,
  TASK_PRIORITY_OPTIONS,
  // Types
  type ValueLabel,
  type TASK_PRIORITIES,
  CASE_STATUSES,
  QUOTE_STATUSES,
  TASK_STATUSES,
  LEAD_STATUSES,
  OPPORTUNITY_STAGES
} from '@opensource-startup-crm/constants';

// Tuples removed; rely on constants options/values
// industries tuples not needed in app layer

// accountTypes tuples not needed in app layer

// accountOwnership tuples not needed in app layer

// ratings tuples not needed in app layer

export const countries = [
  ['US', 'United States'],
  ['UK', 'United Kingdom'],
  ['CA', 'Canada'],
  ['AU', 'Australia'],
  ['IN', 'India'],
  ['DE', 'Germany'],
  ['FR', 'France'],
  ['JP', 'Japan'],
  ['CN', 'China'],
  ['BR', 'Brazil'],
  ['MX', 'Mexico'],
  ['IT', 'Italy'],
  ['ES', 'Spain'],
  ['NL', 'Netherlands'],
  ['SE', 'Sweden'],
  ['NO', 'Norway'],
  ['DK', 'Denmark'],
  ['FI', 'Finland'],
  ['CH', 'Switzerland'],
  ['AT', 'Austria'],
  ['BE', 'Belgium'],
  ['IE', 'Ireland'],
  ['PL', 'Poland'],
  ['RU', 'Russia'],
  ['KR', 'South Korea'],
  ['SG', 'Singapore'],
  ['TH', 'Thailand'],
  ['MY', 'Malaysia'],
  ['ID', 'Indonesia'],
  ['PH', 'Philippines'],
  ['VN', 'Vietnam'],
  ['NZ', 'New Zealand'],
  ['ZA', 'South Africa'],
  ['EG', 'Egypt'],
  ['NG', 'Nigeria'],
  ['KE', 'Kenya'],
  ['AR', 'Argentina'],
  ['CL', 'Chile'],
  ['CO', 'Colombia'],
  ['PE', 'Peru'],
  ['OTHER', 'Other']
] as const;

// Opportunity stages with display colors (labels sourced from constants)
const stageColorMap: Record<typeof OPPORTUNITY_STAGES[number], string> = {
  PROSPECTING: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
  QUALIFICATION: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  PROPOSAL: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  NEGOTIATION: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  CLOSED_WON: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  CLOSED_LOST: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
};
export const opportunityStages: ReadonlyArray<{ value: string; label: string; color: string }> =
  OPPORTUNITY_STAGE_OPTIONS.map(({ value, label }) => ({ value, label, color: stageColorMap[value as keyof typeof stageColorMap] }));

export type Option = ValueLabel;

export const sourceOptions: Option[] = [{ value: '', label: 'Select Source' }, ...LEAD_SOURCE_OPTIONS];
export const leadStatusOptions: Option[] = LEAD_STATUS_OPTIONS;
export const ratingOptions: Option[] = [{ value: '', label: 'Select Rating' }, ...RATING_OPTIONS];
export const opportunityTypeOptions: Option[] = [{ value: '', label: 'Select Type' }, ...OPPORTUNITY_TYPE_OPTIONS];
export const forecastCategoryOptions: Option[] = [{ value: '', label: 'Select Category' }, ...FORECAST_CATEGORY_OPTIONS];
export const accountTypeOptions: Option[] = [{ value: '', label: 'Select Type' }, ...ACCOUNT_TYPE_OPTIONS];
export const accountOwnershipOptions: Option[] = [{ value: '', label: 'Select Ownership' }, ...ACCOUNT_OWNERSHIP_OPTIONS];
export const industryOptions: Option[] = [{ value: '', label: 'Select Industry' }, ...INDUSTRY_OPTIONS];
export const countryOptions: Option[] = [{ value: '', label: 'Select Country' }, ...countries.map(([value, label]) => ({ value, label }))];

export const caseStatusOptions: Option[] = [{ value: '', label: 'Select Status' }, ...CASE_STATUS_OPTIONS];


// Lead visuals and filters
import { Star, TrendingUp, CheckCircle2 as LeadCheckCircle2, Clock as LeadClock, XCircle as LeadXCircle, AlertCircle as LeadAlertCircle } from '@lucide/svelte';
type LeadIconComponent = typeof Star;
export const leadStatusVisuals: Record<typeof LEAD_STATUSES[number], { icon: LeadIconComponent; color: string }> = {
  NEW: { icon: Star, color: 'border-blue-200 bg-blue-100 text-blue-800' },
  PENDING: { icon: LeadClock, color: 'border-yellow-200 bg-yellow-100 text-yellow-800' },
  CONTACTED: { icon: LeadCheckCircle2, color: 'border-green-200 bg-green-100 text-green-800' },
  QUALIFIED: { icon: TrendingUp, color: 'border-indigo-200 bg-indigo-100 text-indigo-800' },
  UNQUALIFIED: { icon: LeadXCircle, color: 'border-red-200 bg-red-100 text-red-800' },
  CONVERTED: { icon: LeadCheckCircle2, color: 'border-gray-200 bg-gray-100 text-gray-800' }
};
export const leadStatusOptionsWithColor: Array<Option & { color: string }> = leadStatusOptions.map((o) => ({
  ...o,
  ...leadStatusVisuals[o.value as keyof typeof leadStatusVisuals]
}));

export const ratingVisuals: Record<string, { color: string; dots: number }> = {
  HOT: { color: 'text-red-600', dots: 3 },
  WARM: { color: 'text-orange-500', dots: 2 },
  COLD: { color: 'text-blue-500', dots: 1 }
};

// Lead list filters (consolidated)
export type LeadSortField = 'createdAt' | 'firstName' | 'lastName' | 'company' | 'rating';
export const leadStatusFilterOptions: Option[] = [
  { value: 'ALL', label: 'All Statuses' },
  ...leadStatusOptions
];
export const leadSourceFilterOptions: Option[] = [{ value: 'ALL', label: 'All Sources' }, ...sourceOptions];
export const leadRatingFilterOptions: Option[] = [{ value: 'ALL', label: 'All Ratings' }, ...ratingOptions];
export const leadSortOptions: Option[] = [
  { value: 'createdAt', label: 'Created Date' },
  { value: 'firstName', label: 'First Name' },
  { value: 'lastName', label: 'Last Name' },
  { value: 'company', label: 'Company' },
  { value: 'rating', label: 'Rating' }
];

// Task visuals
import { CheckCircle2, PlayCircle, Pause, Clock, XCircle, AlertCircle } from '@lucide/svelte';
type IconComponent = typeof CheckCircle2;
export const taskStatusOptions: Option[] = TASK_STATUS_OPTIONS;
export const taskPriorityOptions: Option[] = TASK_PRIORITY_OPTIONS;
const taskStatusVisuals: Record<typeof TASK_STATUSES[number], { icon: IconComponent; iconColor: string; badgeColor: string }> = {
  COMPLETED: { icon: CheckCircle2, iconColor: 'text-green-500 dark:text-green-400', badgeColor: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' },
  IN_PROGRESS: { icon: PlayCircle, iconColor: 'text-yellow-500 dark:text-yellow-400', badgeColor: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300' },
  NOT_STARTED: { icon: Pause, iconColor: 'text-gray-400 dark:text-gray-500', badgeColor: 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300' },
  WAITING_ON_SOMEONE_ELSE: { icon: Clock, iconColor: 'text-purple-500 dark:text-purple-400', badgeColor: 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300' },
  DEFERRED: { icon: XCircle, iconColor: 'text-pink-500 dark:text-pink-400', badgeColor: 'bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-300' }
};
const taskPriorityVisuals: Record<typeof TASK_PRIORITIES[number], { icon: IconComponent; iconColor: string; badgeColor: string }> = {
  HIGH: { icon: AlertCircle, iconColor: 'text-red-500 dark:text-red-400', badgeColor: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300' },
  NORMAL: { icon: Clock, iconColor: 'text-blue-500 dark:text-blue-400', badgeColor: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' },
  LOW: { icon: Clock, iconColor: 'text-gray-400 dark:text-gray-500', badgeColor: 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300' }
};
export const taskStatusVisualMap: (Option & { icon: IconComponent; iconColor: string; badgeColor: string })[] =
  taskStatusOptions.map((o) => ({ ...o, ...taskStatusVisuals[o.value as keyof typeof taskStatusVisuals] }));
export const taskPriorityVisualMap: (Option & { icon: IconComponent; iconColor: string; badgeColor: string })[] =
  taskPriorityOptions.map((o) => ({ ...o, ...taskPriorityVisuals[o.value as keyof typeof taskPriorityVisuals] }));


// Case visuals
export const caseStatusVisuals: Record<typeof CASE_STATUSES[number], { badgeColor: string }> = {
  OPEN: { badgeColor: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800' },
  IN_PROGRESS: { badgeColor: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800' },
  CLOSED: { badgeColor: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800' }
};
export const casePriorityVisuals: Record<typeof TASK_PRIORITIES[number], { badgeColor: string }> = {
  HIGH: { badgeColor: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800' },
  NORMAL: { badgeColor: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800' },
  LOW: { badgeColor: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600' }
};


// Quote/Invoice visuals
export const quoteStatusVisuals: Record<typeof QUOTE_STATUSES[number], { badgeColor: string }> = {
  DRAFT: { badgeColor: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300' },
  NEEDS_REVIEW: { badgeColor: 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300' },
  IN_REVIEW: { badgeColor: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' },
  APPROVED: { badgeColor: 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300' },
  REJECTED: { badgeColor: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300' },
  PRESENTED: { badgeColor: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' },
  ACCEPTED: { badgeColor: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' }
};
