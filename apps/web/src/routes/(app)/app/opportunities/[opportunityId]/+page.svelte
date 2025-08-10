<script lang="ts">
	import {
		ArrowLeft,
		Edit,
		Trash2,
		DollarSign,
		Calendar,
		TrendingUp,
		Building,
		User,
		Target,
		Percent,
		MapPin,
		Clock,
		FileText,
		Activity,
		Award
	} from '@lucide/svelte';

	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
	let { account, owner, ...opportunity } = data.opportunity;

	// Standardized stage visuals
	import { opportunityStages } from '$lib/data';
	import { toLabel } from '$lib/data/enum-helpers';
	import {
		OPPORTUNITY_TYPE_OPTIONS,
		LEAD_SOURCE_OPTIONS,
		FORECAST_CATEGORY_OPTIONS
	} from '@opensource-startup-crm/constants';
	import { formatCurrency, formatDate } from '$lib/utils/date';

	const getStageProgress = (stage: string): number => {
		const values: string[] = [];
		for (const st of opportunityStages) values.push(st.value);
		const stages = values.filter((v) => v !== 'CLOSED_LOST');
		const index = stages.indexOf(stage);
		return index >= 0 ? ((index + 1) / stages.length) * 100 : 0;
	};
</script>

<div class="min-h-screen bg-gray-50 dark:bg-gray-900">
	<div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
		<!-- Header -->
		<div class="mb-8">
			<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div class="flex items-center gap-3">
					<a
						href={account ? `/app/accounts/${account.id}` : '/app/accounts'}
						class="inline-flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
					>
						<ArrowLeft size={16} />
						Back to Account
					</a>
				</div>
				<div class="flex gap-3">
					<a
						href={`/app/opportunities/${opportunity.id}/edit`}
						class="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
					>
						<Edit size={16} />
						Edit
					</a>
					<a
						href={`/app/opportunities/${opportunity.id}/delete`}
						class="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
					>
						<Trash2 size={16} />
						Delete
					</a>
				</div>
			</div>

			<div class="mt-4">
				<h1 class="text-3xl font-bold text-gray-900 dark:text-white">{opportunity.name}</h1>
				<div class="mt-2 flex items-center gap-3">
					{#if opportunity.stage}
						{@const stageItem = opportunityStages.find((s) => s.value === opportunity.stage)}
						<span
							class="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium {stageItem
								? stageItem.color
								: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}"
						>
							{stageItem ? stageItem.label : 'Unknown'}
						</span>
					{:else}
						<span
							class="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300"
							>Unknown</span
						>
					{/if}
					{#if opportunity.probability}
						<div class="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
							<Percent size={14} />
							{opportunity.probability}% probability
						</div>
					{/if}
				</div>
			</div>

			<!-- Stage Progress Bar -->
			{#if opportunity.stage !== 'CLOSED_LOST'}
				<div class="mt-4">
					<div
						class="mb-2 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400"
					>
						<span>Progress</span>
						<span>{Math.round(getStageProgress(opportunity.stage))}%</span>
					</div>
					<div class="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
						<div
							class="h-2 rounded-full bg-blue-600 transition-all duration-300"
							style="width: {getStageProgress(opportunity.stage)}%"
						></div>
					</div>
				</div>
			{/if}
		</div>

		<!-- Main Content Grid -->
		<div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
			<!-- Left Column - Main Details -->
			<div class="space-y-6 lg:col-span-2">
				<!-- Financial Information -->
				<div
					class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
				>
					<div class="mb-4 flex items-center gap-2">
						<DollarSign size={20} class="text-green-600" />
						<h2 class="text-lg font-semibold text-gray-900 dark:text-white">Financial Details</h2>
					</div>
					<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
						<div class="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
							<div class="text-sm text-gray-500 dark:text-gray-400">Amount</div>
							<div class="text-xl font-bold text-gray-900 dark:text-white">
								{formatCurrency(opportunity.amount)}
							</div>
						</div>
						<div class="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
							<div class="text-sm text-gray-500 dark:text-gray-400">Expected Revenue</div>
							<div class="text-xl font-bold text-gray-900 dark:text-white">
								{formatCurrency(opportunity.expectedRevenue)}
							</div>
						</div>
					</div>
				</div>

				<!-- Opportunity Details -->
				<div
					class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
				>
					<div class="mb-4 flex items-center gap-2">
						<Target size={20} class="text-blue-600" />
						<h2 class="text-lg font-semibold text-gray-900 dark:text-white">
							Opportunity Information
						</h2>
					</div>
					<div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
						<div>
							<div class="mb-1 text-sm text-gray-500 dark:text-gray-400">Type</div>
							<div class="text-gray-900 dark:text-white">
								{toLabel(opportunity.type, OPPORTUNITY_TYPE_OPTIONS, 'Not specified')}
							</div>
						</div>
						<div>
							<div class="mb-1 text-sm text-gray-500 dark:text-gray-400">Lead Source</div>
							<div class="text-gray-900 dark:text-white">
								{toLabel(opportunity.leadSource, LEAD_SOURCE_OPTIONS, 'Not specified')}
							</div>
						</div>
						<div>
							<div class="mb-1 text-sm text-gray-500 dark:text-gray-400">Forecast Category</div>
							<div class="text-gray-900 dark:text-white">
								{toLabel(opportunity.forecastCategory, FORECAST_CATEGORY_OPTIONS, 'Not specified')}
							</div>
						</div>
						<div>
							<div class="mb-1 text-sm text-gray-500 dark:text-gray-400">Close Date</div>
							<div class="flex items-center gap-1 text-gray-900 dark:text-white">
								<Calendar size={14} />
								{formatDate(opportunity.closeDate)}
							</div>
						</div>
					</div>
				</div>

				<!-- Next Steps -->
				{#if opportunity.nextStep}
					<div
						class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
					>
						<div class="mb-4 flex items-center gap-2">
							<Activity size={20} class="text-orange-600" />
							<h2 class="text-lg font-semibold text-gray-900 dark:text-white">Next Steps</h2>
						</div>
						<div class="text-gray-700 dark:text-gray-300">{opportunity.nextStep}</div>
					</div>
				{/if}

				<!-- Description -->
				{#if opportunity.description}
					<div
						class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
					>
						<div class="mb-4 flex items-center gap-2">
							<FileText size={20} class="text-gray-600" />
							<h2 class="text-lg font-semibold text-gray-900 dark:text-white">Description</h2>
						</div>
						<div class="whitespace-pre-line text-gray-700 dark:text-gray-300">
							{opportunity.description}
						</div>
					</div>
				{/if}
			</div>

			<!-- Right Column - Sidebar -->
			<div class="space-y-6">
				<!-- Key Metrics -->
				<div
					class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
				>
					<div class="mb-4 flex items-center gap-2">
						<TrendingUp size={20} class="text-purple-600" />
						<h3 class="text-lg font-semibold text-gray-900 dark:text-white">Key Metrics</h3>
					</div>
					<div class="space-y-4">
						<div class="flex items-center justify-between">
							<span class="text-sm text-gray-500 dark:text-gray-400">Probability</span>
							<span class="font-semibold text-gray-900 dark:text-white">
								{opportunity.probability ? `${opportunity.probability}%` : 'N/A'}
							</span>
						</div>
						<div class="flex items-center justify-between">
							<span class="text-sm text-gray-500 dark:text-gray-400">Days to Close</span>
							<span class="font-semibold text-gray-900 dark:text-white">
								{opportunity.closeDate
									? Math.ceil(
											(new Date(opportunity.closeDate).getTime() - new Date().getTime()) /
												(1000 * 60 * 60 * 24)
										)
									: 'N/A'}
							</span>
						</div>
					</div>
				</div>

				<!-- Related Records -->
				<div
					class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
				>
					<div class="mb-4 flex items-center gap-2">
						<Building size={20} class="text-blue-600" />
						<h3 class="text-lg font-semibold text-gray-900 dark:text-white">Related Records</h3>
					</div>
					<div class="space-y-4">
						<div>
							<div class="mb-1 text-sm text-gray-500 dark:text-gray-400">Account</div>
							{#if account}
								<a
									href={`/app/accounts/${account.id}`}
									class="font-medium text-blue-600 hover:underline dark:text-blue-400"
								>
									{account.name}
								</a>
							{:else}
								<span class="text-gray-500 dark:text-gray-400">No account</span>
							{/if}
						</div>
						<div>
							<div class="mb-1 text-sm text-gray-500 dark:text-gray-400">Owner</div>
							<div class="flex items-center gap-2">
								<User size={16} class="text-gray-400" />
								<span class="text-gray-900 dark:text-white">{owner?.name ?? 'Unassigned'}</span>
							</div>
						</div>
					</div>
				</div>

				<!-- System Information -->
				<div
					class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
				>
					<div class="mb-4 flex items-center gap-2">
						<Clock size={20} class="text-gray-600" />
						<h3 class="text-lg font-semibold text-gray-900 dark:text-white">System Information</h3>
					</div>
					<div class="space-y-3">
						<div>
							<div class="text-sm text-gray-500 dark:text-gray-400">Created</div>
							<div class="text-sm text-gray-900 dark:text-white">
								{formatDate(
									opportunity.createdAt,
									'en-US',
									{ hour: '2-digit', minute: '2-digit' },
									'-'
								)}
							</div>
						</div>
						<div>
							<div class="text-sm text-gray-500 dark:text-gray-400">Last Updated</div>
							<div class="text-sm text-gray-900 dark:text-white">
								{formatDate(
									opportunity.updatedAt,
									'en-US',
									{ hour: '2-digit', minute: '2-digit' },
									'-'
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	@media (max-width: 640px) {
		.max-w-2xl {
			max-width: 100%;
			padding: 0.5rem;
		}
	}
</style>
