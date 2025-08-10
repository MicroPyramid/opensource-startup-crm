<script lang="ts">
	import {
		Users,
		Target,
		Building,
		Phone,
		CheckSquare,
		DollarSign,
		TrendingUp,
		Calendar,
		Activity,
		AlertCircle
	} from '@lucide/svelte';

	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	import { toLabel } from '$lib/data/enum-helpers';
	import { leadStatusVisuals, taskPriorityVisualMap } from '$lib/data';
	import {
		LEAD_STATUS_OPTIONS,
		TASK_STATUS_OPTIONS,
		TASK_PRIORITY_OPTIONS
	} from '@opensource-startup-crm/constants';
	import { formatCurrency, formatDate } from '$lib/utils/date';

	let metrics = $derived(data.metrics || {});
	let recentData = $derived(data.recentData || {});
</script>

<svelte:head>
	<title>Dashboard - BottleCRM</title>
</svelte:head>

<div class="space-y-6 px-4 py-6 sm:px-6 lg:px-8">
	<!-- Header -->
	<div class="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
		<div>
			<h1 class="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
			<p class="text-gray-600 dark:text-gray-400">
				Welcome back! Here's what's happening with your CRM.
			</p>
		</div>
	</div>

	{#if data?.error}
		<div
			class="flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20"
		>
			<AlertCircle class="text-red-500 dark:text-red-400" size={20} />
			<span class="text-red-700 dark:text-red-300">{data.error}</span>
		</div>
	{:else}
		<!-- Metrics Cards -->
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
			<div
				class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
			>
				<div class="flex items-center justify-between">
					<div>
						<p class="text-sm font-medium text-gray-600 dark:text-gray-400">Active Leads</p>
						<p class="text-2xl font-bold text-gray-900 dark:text-white">{metrics.totalLeads}</p>
					</div>
					<div
						class="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30"
					>
						<Users class="text-blue-600 dark:text-blue-400" size={24} />
					</div>
				</div>
			</div>

			<div
				class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
			>
				<div class="flex items-center justify-between">
					<div>
						<p class="text-sm font-medium text-gray-600 dark:text-gray-400">Opportunities</p>
						<p class="text-2xl font-bold text-gray-900 dark:text-white">
							{metrics.totalOpportunities}
						</p>
					</div>
					<div
						class="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30"
					>
						<Target class="text-green-600 dark:text-green-400" size={24} />
					</div>
				</div>
			</div>

			<div
				class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
			>
				<div class="flex items-center justify-between">
					<div>
						<p class="text-sm font-medium text-gray-600 dark:text-gray-400">Accounts</p>
						<p class="text-2xl font-bold text-gray-900 dark:text-white">{metrics.totalAccounts}</p>
					</div>
					<div
						class="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30"
					>
						<Building class="text-purple-600 dark:text-purple-400" size={24} />
					</div>
				</div>
			</div>

			<div
				class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
			>
				<div class="flex items-center justify-between">
					<div>
						<p class="text-sm font-medium text-gray-600 dark:text-gray-400">Contacts</p>
						<p class="text-2xl font-bold text-gray-900 dark:text-white">{metrics.totalContacts}</p>
					</div>
					<div
						class="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900/30"
					>
						<Phone class="text-orange-600 dark:text-orange-400" size={24} />
					</div>
				</div>
			</div>

			<div
				class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
			>
				<div class="flex items-center justify-between">
					<div>
						<p class="text-sm font-medium text-gray-600 dark:text-gray-400">Pending Tasks</p>
						<p class="text-2xl font-bold text-gray-900 dark:text-white">{metrics.pendingTasks}</p>
					</div>
					<div
						class="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-100 dark:bg-yellow-900/30"
					>
						<CheckSquare class="text-yellow-600 dark:text-yellow-400" size={24} />
					</div>
				</div>
			</div>

			<div
				class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
			>
				<div class="flex items-center justify-between">
					<div>
						<p class="text-sm font-medium text-gray-600 dark:text-gray-400">Pipeline Value</p>
						<p class="text-2xl font-bold text-gray-900 dark:text-white">
							{formatCurrency(metrics.opportunityRevenue)}
						</p>
					</div>
					<div
						class="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30"
					>
						<DollarSign class="text-emerald-600 dark:text-emerald-400" size={24} />
					</div>
				</div>
			</div>
		</div>

		<!-- Content Grid -->
		<div class="grid grid-cols-1 gap-6 xl:grid-cols-3">
			<!-- Recent Leads -->
			<div
				class="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800"
			>
				<div class="border-b border-gray-200 p-6 dark:border-gray-700">
					<div class="flex items-center justify-between">
						<h2 class="text-lg font-semibold text-gray-900 dark:text-white">Recent Leads</h2>
						<TrendingUp class="text-gray-400 dark:text-gray-500" size={20} />
					</div>
				</div>
				<div class="p-6">
					{#if recentData.leads?.length > 0}
						<div class="space-y-4">
							{#each recentData.leads as lead}
								<div class="flex items-center justify-between">
									<div>
										<p class="font-medium text-gray-900 dark:text-white">
											{lead.firstName}
											{lead.lastName}
										</p>
										<p class="text-sm text-gray-500 dark:text-gray-400">
											{lead.company || 'No company'}
										</p>
									</div>
									<div class="text-right">
										<span
											class="inline-block rounded-full px-2 py-1 text-xs font-medium {leadStatusVisuals[
												lead.status as keyof typeof leadStatusVisuals
											]?.color || 'bg-gray-100 text-gray-800'}"
										>
											{toLabel(lead.status, LEAD_STATUS_OPTIONS, '-')}
										</span>
										<p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
											{formatDate(lead.createdAt, 'en-US', undefined, '-')}
										</p>
									</div>
								</div>
							{/each}
						</div>
					{:else}
						<p class="py-8 text-center text-gray-500 dark:text-gray-400">No recent leads</p>
					{/if}
				</div>
			</div>

			<!-- Recent Opportunities -->
			<div
				class="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800"
			>
				<div class="border-b border-gray-200 p-6 dark:border-gray-700">
					<div class="flex items-center justify-between">
						<h2 class="text-lg font-semibold text-gray-900 dark:text-white">
							Recent Opportunities
						</h2>
						<Target class="text-gray-400 dark:text-gray-500" size={20} />
					</div>
				</div>
				<div class="p-6">
					{#if recentData.opportunities?.length > 0}
						<div class="space-y-4">
							{#each recentData.opportunities as opportunity}
								<div class="flex items-center justify-between">
									<div>
										<p class="font-medium text-gray-900 dark:text-white">{opportunity.name}</p>
										<p class="text-sm text-gray-500 dark:text-gray-400">
											{opportunity.accountName || 'No account'}
										</p>
									</div>
									<div class="text-right">
										{#if opportunity.amount}
											<p class="font-medium text-green-600 dark:text-green-400">
												{formatCurrency(opportunity.amount)}
											</p>
										{/if}
										<p class="text-xs text-gray-500 dark:text-gray-400">
											{formatDate(opportunity.createdAt, 'en-US', undefined, '-')}
										</p>
									</div>
								</div>
							{/each}
						</div>
					{:else}
						<p class="py-8 text-center text-gray-500 dark:text-gray-400">No recent opportunities</p>
					{/if}
				</div>
			</div>

			<!-- Upcoming Tasks -->
			<div
				class="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800"
			>
				<div class="border-b border-gray-200 p-6 dark:border-gray-700">
					<div class="flex items-center justify-between">
						<h2 class="text-lg font-semibold text-gray-900 dark:text-white">Upcoming Tasks</h2>
						<Calendar class="text-gray-400 dark:text-gray-500" size={20} />
					</div>
				</div>
				<div class="p-6">
					{#if recentData.tasks?.length > 0}
						<div class="space-y-4">
							{#each recentData.tasks as task}
								{@const priorityItem = taskPriorityVisualMap.find((p) => p.value === task.priority)}
								<div class="flex items-center justify-between">
									<div>
										<p class="font-medium text-gray-900 dark:text-white">{task.subject}</p>
										<p class="text-sm text-gray-500 dark:text-gray-400">
											{toLabel(task.status, TASK_STATUS_OPTIONS, 'N/A')}
										</p>
									</div>
									<div class="text-right">
										<span
											class="inline-block rounded-full px-2 py-1 text-xs font-medium {priorityItem?.badgeColor ||
												'bg-gray-100 text-gray-800'}"
										>
											{toLabel(task.priority, TASK_PRIORITY_OPTIONS, 'Normal')}
										</span>
										{#if task.dueDate}
											<p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
												{formatDate(task.dueDate, 'en-US', undefined, '-')}
											</p>
										{/if}
									</div>
								</div>
							{/each}
						</div>
					{:else}
						<p class="py-8 text-center text-gray-500 dark:text-gray-400">No upcoming tasks</p>
					{/if}
				</div>
			</div>
		</div>

		<!-- Recent Activities -->
		<div
			class="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800"
		>
			<div class="border-b border-gray-200 p-6 dark:border-gray-700">
				<div class="flex items-center justify-between">
					<h2 class="text-lg font-semibold text-gray-900 dark:text-white">Recent Activities</h2>
					<Activity class="text-gray-400 dark:text-gray-500" size={20} />
				</div>
			</div>
			<div class="p-6">
				{#if recentData.activities?.length > 0}
					<div class="space-y-4">
						{#each recentData.activities as activity}
							<div class="flex items-start gap-3">
								<div
									class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700"
								>
									<Activity class="text-gray-500 dark:text-gray-400" size={16} />
								</div>
								<div class="min-w-0 flex-1">
									<p class="text-sm text-gray-900 dark:text-white">
										<span class="font-medium">{activity.userName || 'Someone'}</span>
										{activity.description ||
											`performed ${activity.action.toLowerCase()} on ${activity.entityType}`}
									</p>
									<p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
										{formatDate(activity.timestamp, 'en-US', undefined, '-')}
									</p>
								</div>
							</div>
						{/each}
					</div>
				{:else}
					<p class="py-8 text-center text-gray-500 dark:text-gray-400">No recent activities</p>
				{/if}
			</div>
		</div>
	{/if}
</div>
