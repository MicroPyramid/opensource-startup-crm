<script lang="ts">
	import { Mail, Users, TrendingUp, UserCheck, Calendar } from '@lucide/svelte';
	import { formatDate } from '$lib/utils/date';
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();

	// Get status badge class
	function getStatusClass(isActive: boolean, isConfirmed: boolean) {
		if (!isActive) return 'bg-red-100 text-red-800';
		if (isConfirmed) return 'bg-green-100 text-green-800';
		return 'bg-yellow-100 text-yellow-800';
	}

	// Get status text
	function getStatusText(isActive: boolean, isConfirmed: boolean) {
		if (!isActive) return 'Unsubscribed';
		if (isConfirmed) return 'Active';
		return 'Pending';
	}
</script>

<svelte:head>
	<title>Newsletter Subscribers - Admin</title>
</svelte:head>

<div class="min-h-screen bg-gray-50 py-8">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<!-- Header -->
		<div class="mb-8">
			<h1 class="mb-2 text-3xl font-bold text-gray-900">Newsletter Management</h1>
			<p class="text-gray-600">Manage and view newsletter subscribers</p>
		</div>

		<!-- Stats Cards -->
		<div class="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
			<div class="rounded-lg bg-white p-6 shadow">
				<div class="flex items-center">
					<div class="flex-shrink-0">
						<Users class="h-8 w-8 text-blue-600" />
					</div>
					<div class="ml-4">
						<p class="text-sm font-medium text-gray-500">Total Subscribers</p>
						<p class="text-2xl font-bold text-gray-900">{data.totalCount}</p>
					</div>
				</div>
			</div>

			<div class="rounded-lg bg-white p-6 shadow">
				<div class="flex items-center">
					<div class="flex-shrink-0">
						<UserCheck class="h-8 w-8 text-green-600" />
					</div>
					<div class="ml-4">
						<p class="text-sm font-medium text-gray-500">Active Subscribers</p>
						<p class="text-2xl font-bold text-gray-900">{data.activeCount}</p>
					</div>
				</div>
			</div>

			<div class="rounded-lg bg-white p-6 shadow">
				<div class="flex items-center">
					<div class="flex-shrink-0">
						<TrendingUp class="h-8 w-8 text-purple-600" />
					</div>
					<div class="ml-4">
						<p class="text-sm font-medium text-gray-500">Active Rate</p>
						<p class="text-2xl font-bold text-gray-900">
							{data.totalCount > 0 ? Math.round((data.activeCount / data.totalCount) * 100) : 0}%
						</p>
					</div>
				</div>
			</div>
		</div>

		{#if data.error}
			<div class="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
				<p class="text-red-800">{data.error}</p>
			</div>
		{/if}

		<!-- Subscribers Table -->
		<div class="overflow-hidden rounded-lg bg-white shadow">
			<div class="border-b border-gray-200 px-6 py-4">
				<h2 class="flex items-center text-lg font-medium text-gray-900">
					<Mail class="mr-2 h-5 w-5" />
					Newsletter Subscribers
				</h2>
			</div>

			{#if data.subscribers.length === 0}
				<div class="py-12 text-center">
					<Mail class="mx-auto h-12 w-12 text-gray-400" />
					<h3 class="mt-2 text-sm font-medium text-gray-900">No subscribers yet</h3>
					<p class="mt-1 text-sm text-gray-500">Get started by promoting your newsletter.</p>
				</div>
			{:else}
				<div class="overflow-x-auto">
					<table class="min-w-full divide-y divide-gray-200">
						<thead class="bg-gray-50">
							<tr>
								<th
									class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
								>
									Email
								</th>
								<th
									class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
								>
									Status
								</th>
								<th
									class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
								>
									Subscribed
								</th>
								<th
									class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
								>
									Confirmed
								</th>
								<th
									class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
								>
									IP Address
								</th>
							</tr>
						</thead>
						<tbody class="divide-y divide-gray-200 bg-white">
							{#each data.subscribers as subscriber}
								<tr class="hover:bg-gray-50">
									<td class="whitespace-nowrap px-6 py-4">
										<div class="text-sm font-medium text-gray-900">{subscriber.email}</div>
									</td>
									<td class="whitespace-nowrap px-6 py-4">
										<span
											class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium {getStatusClass(
												subscriber.isActive,
												subscriber.isConfirmed
											)}"
										>
											{getStatusText(subscriber.isActive, subscriber.isConfirmed)}
										</span>
									</td>
									<td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
										<div class="flex items-center">
											<Calendar class="mr-1 h-4 w-4" />
											{formatDate(subscriber.subscribedAt, 'en-US', { hour: '2-digit', minute: '2-digit' }, '-')}
										</div>
									</td>
									<td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
										{#if subscriber.confirmedAt}
											<div class="flex items-center">
												<Calendar class="mr-1 h-4 w-4" />
												{formatDate(subscriber.confirmedAt, 'en-US', { hour: '2-digit', minute: '2-digit' }, '-')}
											</div>
										{:else}
											<span class="text-gray-400">Not confirmed</span>
										{/if}
									</td>
									<td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
										{subscriber.ipAddress || 'N/A'}
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			{/if}
		</div>
	</div>
</div>
