<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { formatDistanceToNow } from 'date-fns';
	import {
		Search,
		Filter,
		Plus,
		ChevronDown,
		ChevronUp,
		Phone,
		Mail,
		Building2,
		User,
		Calendar,
		Star,
		TrendingUp,
		AlertCircle,
		CheckCircle2,
		Clock,
		XCircle,
		Eye
	} from '@lucide/svelte';

	// Get leads from the data prop passed from the server
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
	const { leads } = data;

	// Filter/sort options from constants
	import {
		type LeadSortField,
		leadStatusFilterOptions,
		leadSourceFilterOptions,
		leadRatingFilterOptions,
		leadStatusVisuals,
		ratingVisuals
	} from '$lib/data';
	import { toLabel } from '$lib/data/enum-helpers';
	import { LEAD_SOURCE_OPTIONS, LEAD_STATUS_OPTIONS } from '@opensource-startup-crm/constants';

	// State management
	let searchQuery = $state('');
	let statusFilter = $state('ALL');
	let sourceFilter = $state('ALL');
	let ratingFilter = $state('ALL');
	let sortBy = $state<LeadSortField>('createdAt');
	let sortOrder = $state('desc');
	let isLoading = $state(false);
	let showFilters = $state(false);

	// Options now imported from constants

	// Function to get the full name of a lead
	function getFullName(lead: any) {
		return `${lead.firstName} ${lead.lastName}`.trim();
	}

	// Replace fixed date formatting with relative time
	function formatDate(dateString: string | Date | null | undefined) {
		if (!dateString) return '-';
		return formatDistanceToNow(new Date(dateString), { addSuffix: true });
	}

	// Computed filtered and sorted leads
	let filteredLeads = $derived(
		leads
			.filter((lead) => {
				const matchesSearch =
					searchQuery === '' ||
					getFullName(lead).toLowerCase().includes(searchQuery.toLowerCase()) ||
					(lead.company && lead.company.toLowerCase().includes(searchQuery.toLowerCase())) ||
					(lead.email && lead.email.toLowerCase().includes(searchQuery.toLowerCase()));

				const matchesStatus = statusFilter === 'ALL' || lead.status === statusFilter;
				const matchesSource = sourceFilter === 'ALL' || lead.leadSource === sourceFilter;
				const matchesRating = ratingFilter === 'ALL' || lead.rating === ratingFilter;

				return matchesSearch && matchesStatus && matchesSource && matchesRating;
			})
			.sort((a, b) => {
				const getFieldValue = (obj: any, field: string) => {
					return obj[field];
				};

				const aValue = getFieldValue(a, sortBy);
				const bValue = getFieldValue(b, sortBy);

				if (sortOrder === 'asc') {
					return aValue > bValue ? 1 : -1;
				} else {
					return aValue < bValue ? 1 : -1;
				}
			})
	);

	// Function to toggle sort order
	function toggleSort(field: LeadSortField) {
		if (sortBy === field) {
			sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
		} else {
			sortBy = field;
			sortOrder = 'desc';
		}
	}

	// Clear all filters
	function clearFilters() {
		searchQuery = '';
		statusFilter = 'ALL';
		sourceFilter = 'ALL';
		ratingFilter = 'ALL';
		sortBy = 'createdAt';
		sortOrder = 'desc';
	}
</script>

<div class="min-h-screen bg-gray-50 dark:bg-gray-900">
	<!-- Header -->
	<header class="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
		<div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
			<div class="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
				<div class="flex items-center gap-3">
					<div class="rounded-lg bg-blue-100 p-2 dark:bg-blue-900">
						<User class="h-6 w-6 text-blue-600 dark:text-blue-400" />
					</div>
					<div>
						<h1 class="text-2xl font-bold text-gray-900 md:text-3xl dark:text-gray-100">
							Open Leads
						</h1>
						<p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
							{filteredLeads.length} of {leads.length} leads
						</p>
					</div>
				</div>
				<a
					href="/app/leads/new"
					class="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors duration-200 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
				>
					<Plus class="h-4 w-4" />
					New Lead
				</a>
			</div>
		</div>
	</header>

	<!-- Filters and Search -->
	<div class="mx-auto max-w-full px-4 py-6 sm:px-6 lg:px-8">
		<div
			class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
		>
			<!-- Search and Filter Toggle -->
			<div class="mb-4 flex flex-col gap-4 sm:flex-row">
				<div class="relative flex-1">
					<label for="lead-search" class="sr-only">Search leads</label>
					<Search
						class="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400 dark:text-gray-500"
					/>
					<input
						id="lead-search"
						type="text"
						placeholder="Search by name, company, or email..."
						bind:value={searchQuery}
						class="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-gray-900 placeholder-gray-500 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:border-blue-400 dark:focus:ring-blue-400"
					/>
				</div>
				<button
					onclick={() => (showFilters = !showFilters)}
					class="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-700"
				>
					<Filter class="h-4 w-4" />
					Filters
					{#if showFilters}
						<ChevronUp class="h-4 w-4" />
					{:else}
						<ChevronDown class="h-4 w-4" />
					{/if}
				</button>
			</div>

			<!-- Advanced Filters -->
			{#if showFilters}
				<div
					class="grid grid-cols-1 gap-4 rounded-lg bg-gray-50 p-4 md:grid-cols-4 dark:bg-gray-700"
					transition:fade
				>
					<div>
						<label
							for="status-filter"
							class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label
						>
						<select
							id="status-filter"
							bind:value={statusFilter}
							class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-blue-400 dark:focus:ring-blue-400"
						>
							{#each leadStatusFilterOptions as status}
								<option value={status.value}>{status.label}</option>
							{/each}
						</select>
					</div>
					<div>
						<label
							for="source-filter"
							class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Source</label
						>
						<select
							id="source-filter"
							bind:value={sourceFilter}
							class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-blue-400 dark:focus:ring-blue-400"
						>
							{#each leadSourceFilterOptions as source}
								<option value={source.value}>{source.label}</option>
							{/each}
						</select>
					</div>
					<div>
						<label
							for="rating-filter"
							class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Rating</label
						>
						<select
							id="rating-filter"
							bind:value={ratingFilter}
							class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-blue-400 dark:focus:ring-blue-400"
						>
							{#each leadRatingFilterOptions as rating}
								<option value={rating.value}>{rating.label}</option>
							{/each}
						</select>
					</div>
					<div class="flex items-end">
						<button
							onclick={clearFilters}
							class="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-600 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
						>
							Clear Filters
						</button>
					</div>
				</div>
			{/if}
		</div>
	</div>

	<!-- Main Content -->
	<main class="mx-auto max-w-full px-4 pb-8 sm:px-6 lg:px-8">
		{#if isLoading}
			<div class="flex items-center justify-center py-20" transition:fade>
				<div
					class="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600 dark:border-blue-400"
				></div>
			</div>
		{:else if filteredLeads.length === 0}
			<div
				class="rounded-xl border border-gray-200 bg-white py-16 text-center shadow-sm dark:border-gray-700 dark:bg-gray-800"
				transition:fade
			>
				<div class="mb-4 text-6xl text-gray-400 dark:text-gray-500">📭</div>
				<h3 class="mb-2 text-lg font-medium text-gray-900 dark:text-gray-100">No leads found</h3>
				<p class="mb-6 text-gray-500 dark:text-gray-400">
					Try adjusting your search criteria or create a new lead.
				</p>
				<a
					href="/app/leads/new"
					class="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
				>
					<Plus class="h-4 w-4" />
					Create New Lead
				</a>
			</div>
		{:else}
			<div
				class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800"
				in:fade={{ duration: 300 }}
			>
				<!-- Desktop Table View -->
				<div class="hidden xl:block">
					<div class="overflow-x-auto">
						<table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
							<thead class="bg-gray-50 dark:bg-gray-700">
								<tr>
									<th
										class="w-48 px-4 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
										>Lead</th
									>
									<th
										class="w-40 cursor-pointer px-4 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600"
										onclick={() => toggleSort('company')}
									>
										<div class="flex items-center gap-1">
											Company
											{#if sortBy === 'company'}
												{#if sortOrder === 'asc'}
													<ChevronUp class="h-4 w-4" />
												{:else}
													<ChevronDown class="h-4 w-4" />
												{/if}
											{/if}
										</div>
									</th>
									<th
										class="w-48 px-4 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
										>Contact</th
									>
									<th
										class="w-32 px-4 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
										>Source</th
									>
									<th
										class="w-24 px-4 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
										>Rating</th
									>
									<th
										class="w-32 px-4 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
										>Status</th
									>
									<th
										class="w-32 cursor-pointer px-4 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600"
										onclick={() => toggleSort('createdAt')}
									>
										<div class="flex items-center gap-1">
											Created
											{#if sortBy === 'createdAt'}
												{#if sortOrder === 'asc'}
													<ChevronUp class="h-4 w-4" />
												{:else}
													<ChevronDown class="h-4 w-4" />
												{/if}
											{/if}
										</div>
									</th>
									<th
										class="w-32 px-4 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
										>Owner</th
									>
									<th
										class="w-24 px-4 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
										>Actions</th
									>
								</tr>
							</thead>
							<tbody
								class="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800"
							>
								{#each filteredLeads as lead, i}
									{@const statusItem = leadStatusVisuals[lead.status]}
									{@const StatusIcon = statusItem?.icon || AlertCircle}
									{@const ratingItem = lead.rating ? ratingVisuals[lead.rating] : undefined}
									<tr
										class="transition-colors duration-150 hover:bg-gray-50 dark:hover:bg-gray-700"
										in:fly={{ y: 20, duration: 300, delay: i * 50 }}
									>
										<td class="px-4 py-4">
											<div class="flex items-center gap-3">
												<div
													class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-sm font-medium text-white dark:from-blue-600 dark:to-blue-700"
												>
													{lead.firstName.charAt(0)}{lead.lastName.charAt(0)}
												</div>
												<div class="min-w-0">
													<a
														href="/app/leads/{lead.id}"
														class="block truncate font-medium text-gray-900 transition-colors hover:text-blue-600 dark:text-gray-100 dark:hover:text-blue-400"
													>
														{getFullName(lead)}
													</a>
													{#if lead.title}
														<p class="truncate text-sm text-gray-500 dark:text-gray-400">
															{lead.title}
														</p>
													{/if}
												</div>
											</div>
										</td>
										<td class="px-4 py-4">
											{#if lead.company}
												<div class="flex min-w-0 items-center gap-2">
													<Building2
														class="h-4 w-4 flex-shrink-0 text-gray-400 dark:text-gray-500"
													/>
													<span class="truncate text-gray-900 dark:text-gray-100"
														>{lead.company}</span
													>
												</div>
											{:else}
												<span class="text-gray-400 dark:text-gray-500">-</span>
											{/if}
										</td>
										<td class="px-4 py-4">
											<div class="space-y-1">
												{#if lead.email}
													<a
														href="mailto:{lead.email}"
														class="flex min-w-0 items-center gap-2 text-sm text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
													>
														<Mail class="h-4 w-4 flex-shrink-0" />
														<span class="truncate">{lead.email}</span>
													</a>
												{/if}
												{#if lead.phone}
													<a
														href="tel:{lead.phone}"
														class="flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
													>
														<Phone class="h-4 w-4 flex-shrink-0" />
														<span class="whitespace-nowrap">{lead.phone}</span>
													</a>
												{/if}
												{#if !lead.email && !lead.phone}
													<span class="text-gray-400 dark:text-gray-500">-</span>
												{/if}
											</div>
										</td>
										<td class="px-4 py-4">
											{#if lead.leadSource}
												<span
													class="block truncate text-sm capitalize text-gray-600 dark:text-gray-300"
												>
													{toLabel(lead.leadSource, LEAD_SOURCE_OPTIONS, '-')}
												</span>
											{:else}
												<span class="text-gray-400 dark:text-gray-500">-</span>
											{/if}
										</td>
										<td class="px-4 py-4">
											{#if lead.rating}
												<div class="flex items-center gap-1">
													{#each Array(ratingItem?.dots || 0) as _, i}
														<div
															class="h-2 w-2 rounded-full {(ratingItem?.color || '').replace(
																'text-',
																'bg-'
															)} flex-shrink-0"
														></div>
													{/each}
													<span
														class="text-sm {ratingItem?.color ||
															'text-gray-400'} ml-1 whitespace-nowrap font-medium"
														>{toLabel(lead.rating, leadRatingFilterOptions.slice(1), '-')}</span
													>
												</div>
											{:else}
												<span class="text-gray-400 dark:text-gray-500">-</span>
											{/if}
										</td>
										<td class="px-4 py-4">
											<div class="flex items-center gap-2">
												<StatusIcon
													class="h-4 w-4 {(statusItem?.color || '').split(' ')[1]} flex-shrink-0"
												/>
												<span
													class="inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium {statusItem?.color ||
														'border-blue-200 bg-blue-100 text-blue-800'} whitespace-nowrap"
												>
													{toLabel(lead.status, LEAD_STATUS_OPTIONS, '-')}
												</span>
											</div>
										</td>
										<td class="px-4 py-4">
											<div class="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
												<Calendar class="h-4 w-4 flex-shrink-0" />
												<span class="whitespace-nowrap">{formatDate(lead.createdAt)}</span>
											</div>
										</td>
										<td class="px-4 py-4">
											{#if lead.ownerName}
												<div class="flex min-w-0 items-center gap-2">
													<div
														class="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gray-200 text-xs font-medium text-gray-700 dark:bg-gray-600 dark:text-gray-200"
													>
														{lead.ownerName.charAt(0)}
													</div>
													<span class="truncate text-sm text-gray-600 dark:text-gray-300"
														>{lead.ownerName}</span
													>
												</div>
											{:else}
												<span class="text-gray-400 dark:text-gray-500">-</span>
											{/if}
										</td>
										<td class="px-4 py-4">
											<a
												href="/app/leads/{lead.id}"
												class="inline-flex items-center gap-1 whitespace-nowrap rounded-lg px-3 py-1.5 text-sm text-blue-600 transition-colors hover:bg-blue-50 hover:text-blue-800 dark:text-blue-400 dark:hover:bg-blue-900/20 dark:hover:text-blue-300"
											>
												<Eye class="h-4 w-4" />
												View
											</a>
										</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				</div>

				<!-- Mobile Card View -->
				<div class="divide-y divide-gray-200 xl:hidden dark:divide-gray-700">
					{#each filteredLeads as lead, i}
						{@const statusItem = leadStatusVisuals[lead.status]}
						{@const ratingItem = lead.rating ? ratingVisuals[lead.rating] : undefined}
						<div
							class="bg-white p-6 transition-colors duration-150 hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700"
							in:fly={{ y: 20, duration: 300, delay: i * 50 }}
						>
							<!-- Header -->
							<div class="mb-4 flex items-start justify-between">
								<div class="flex items-center gap-3">
									<div
										class="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 font-medium text-white dark:from-blue-600 dark:to-blue-700"
									>
										{lead.firstName.charAt(0)}{lead.lastName.charAt(0)}
									</div>
									<div>
										<a
											href="/app/leads/{lead.id}"
											class="text-lg font-medium text-gray-900 transition-colors hover:text-blue-600 dark:text-gray-100 dark:hover:text-blue-400"
										>
											{getFullName(lead)}
										</a>
										{#if lead.title}
											<p class="text-sm text-gray-500 dark:text-gray-400">{lead.title}</p>
										{/if}
									</div>
								</div>
								<div class="flex items-center gap-2">
									{#each [lead.status] as _}
										{@const statusItem = leadStatusVisuals[lead.status]}
										{@const StatusIcon = statusItem?.icon || AlertCircle}
										<StatusIcon class="h-4 w-4 {(statusItem?.color || '').split(' ')[1]}" />
										<span
											class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium {statusItem?.color ||
												'border-blue-200 bg-blue-100 text-blue-800'}"
										>
											{lead.status}
										</span>
									{/each}
								</div>
							</div>

							<!-- Details Grid -->
							<div class="grid grid-cols-1 gap-3">
								{#if lead.company}
									<div class="flex items-center gap-2">
										<Building2 class="h-4 w-4 flex-shrink-0 text-gray-400 dark:text-gray-500" />
										<span class="text-gray-700 dark:text-gray-200">{lead.company}</span>
									</div>
								{/if}

								{#if lead.email}
									<a
										href="mailto:{lead.email}"
										class="flex items-center gap-2 text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
									>
										<Mail class="h-4 w-4 flex-shrink-0" />
										<span class="truncate">{lead.email}</span>
									</a>
								{/if}

								{#if lead.phone}
									<a
										href="tel:{lead.phone}"
										class="flex items-center gap-2 text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
									>
										<Phone class="h-4 w-4 flex-shrink-0" />
										<span>{lead.phone}</span>
									</a>
								{/if}

								<div class="flex items-center justify-between text-sm">
									<div class="flex items-center gap-2 text-gray-500 dark:text-gray-400">
										<Calendar class="h-4 w-4" />
										{formatDate(lead.createdAt)}
									</div>

									{#if lead.rating}
										{@const ratingItem = lead.rating ? ratingVisuals[lead.rating] : undefined}
										<div class="flex items-center gap-1">
											{#each Array(ratingItem?.dots || 0) as _, i}
												<div
													class="h-2 w-2 rounded-full {(ratingItem?.color || '').replace(
														'text-',
														'bg-'
													)}"
												></div>
											{/each}
											<span class="text-sm {ratingItem?.color || 'text-gray-400'} ml-1 font-medium"
												>{lead.rating}</span
											>
										</div>
									{/if}
								</div>

								{#if lead.ownerName}
									<div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
										<User class="h-4 w-4" />
										<span>Owned by {lead.ownerName}</span>
									</div>
								{/if}
							</div>

							<!-- Action Button -->
							<div class="mt-4 border-t border-gray-100 pt-4 dark:border-gray-700">
								<a
									href="/app/leads/{lead.id}"
									class="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50 hover:text-blue-800 dark:text-blue-400 dark:hover:bg-blue-900/20 dark:hover:text-blue-300"
								>
									<Eye class="h-4 w-4" />
									View Details
								</a>
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/if}
	</main>
</div>
