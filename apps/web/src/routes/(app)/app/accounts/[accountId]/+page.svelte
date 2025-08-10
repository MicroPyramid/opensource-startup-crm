<script lang="ts">
	import {
		ArrowLeft,
		Edit,
		Lock,
		Unlock,
		Users,
		Target,
		DollarSign,
		AlertTriangle,
		Plus,
		ExternalLink,
		Phone,
		Mail,
		Globe,
		MapPin,
		MessageSquare,
		CheckSquare,
		FolderOpen,
		Send
	} from '@lucide/svelte';

	import type { PageData, ActionData } from './$types';
	let { data, form }: { data: PageData; form?: ActionData } = $props();

	const { account, contacts, opportunities = [], tasks, cases } = data;
	let comments = $state(data.comments ?? []);

	// Form state
	let showCloseModal = $state(false);
	let closureReason = $state('');
	let closeError = $state('');

	// Comment functionality
	let newComment = $state('');
	let isSubmittingComment = $state(false);
	let commentError = $state('');

	// Active tab state
	let activeTab = $state('contacts');

	import { toLabel } from '$lib/data/enum-helpers';
	import {
		INDUSTRY_OPTIONS,
		ACCOUNT_TYPE_OPTIONS,
		ACCOUNT_OWNERSHIP_OPTIONS,
		TASK_STATUS_OPTIONS,
		TASK_PRIORITY_OPTIONS,
		CASE_STATUS_OPTIONS,
		RATING_OPTIONS
	} from '@opensource-startup-crm/constants';
	import { opportunityStages, caseStatusVisuals } from '$lib/data';

	async function submitComment() {
		commentError = '';
		if (!newComment.trim()) return;
		isSubmittingComment = true;
		try {
			const formData = new FormData();
			formData.append('body', newComment);
			const res = await fetch(`?/comment`, {
				method: 'POST',
				body: formData
			});
			if (res.ok) {
				const commentsRes = await fetch(window.location.pathname + '?commentsOnly=1');
				if (commentsRes.ok) {
					const data = await commentsRes.json<{ comments: any[] }>();
					if (Array.isArray(data.comments)) {
						comments = data.comments;
					}
				}
				newComment = '';
			} else {
				const data = await res.json<{ error: string; message: string }>();
				commentError = data.error || data.message || 'Failed to add comment.';
			}
		} catch {
			commentError = 'Failed to add comment.';
		} finally {
			isSubmittingComment = false;
		}
	}

	import { formatCurrency, formatDate } from '$lib/utils/date';

	// Handle form submission errors
	$effect(() => {
		if (form?.success === false) {
			closeError = form.message ?? '';
		}
	});
</script>

{#if account}
	<div class="min-h-screen bg-gray-50 dark:bg-gray-900">
		<!-- Header -->
		<div class="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
			<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div class="flex items-center justify-between py-6">
					<div class="flex items-center space-x-4">
						<a
							href="/app/accounts"
							class="inline-flex items-center text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
						>
							<ArrowLeft class="mr-2 h-5 w-5" />
							Back to Accounts
						</a>
						<div class="border-l border-gray-300 pl-4 dark:border-gray-600">
							<h1 class="text-2xl font-bold text-gray-900 dark:text-white">{account?.name}</h1>
							<div class="mt-1 flex items-center space-x-2">
								<span
									class={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
										account?.isActive
											? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
											: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
									}`}
								>
									{account?.isActive ? 'Active' : 'Inactive'}
								</span>
								{#if account?.type}
									<span
										class="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
									>
										{toLabel(account.type, ACCOUNT_TYPE_OPTIONS, '')}
									</span>
								{/if}
							</div>
						</div>
					</div>

					<div class="flex items-center space-x-3">
						{#if account?.closedAt}
							<form method="POST" action="?/reopenAccount">
								<button
									type="submit"
									class="inline-flex items-center rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700"
								>
									<Unlock class="mr-2 h-4 w-4" />
									Reopen Account
								</button>
							</form>
						{:else}
							<a
								href="/app/accounts/{account.id}/edit"
								class="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
							>
								<Edit class="mr-2 h-4 w-4" />
								Edit
							</a>
							<button
								onclick={() => (showCloseModal = true)}
								class="inline-flex items-center rounded-lg bg-yellow-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-yellow-700"
							>
								<Lock class="mr-2 h-4 w-4" />
								Close Account
							</button>
						{/if}
					</div>
				</div>
			</div>
		</div>

		<div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
			<div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
				<!-- Main Content -->
				<div class="space-y-8 lg:col-span-2">
					<!-- Account Information -->
					<div
						class="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800"
					>
						<div class="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
							<h2 class="text-lg font-semibold text-gray-900 dark:text-white">
								Account Information
							</h2>
						</div>
						<div class="p-6">
							<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
								<div class="space-y-4">
									<div>
										<span class="text-sm font-medium text-gray-500 dark:text-gray-400">Name</span>
										<p class="mt-1 text-sm text-gray-900 dark:text-white">
											{account.name || 'N/A'}
										</p>
									</div>
									<div>
										<span class="text-sm font-medium text-gray-500 dark:text-gray-400"
											>Industry</span
										>
										<p class="mt-1 text-sm text-gray-900 dark:text-white">
											{toLabel(account.industry, INDUSTRY_OPTIONS, 'N/A')}
										</p>
									</div>
									<div>
										<span class="text-sm font-medium text-gray-500 dark:text-gray-400">Website</span
										>
										{#if account.website}
											<a
												href={account.website.startsWith('http')
													? account.website
													: `https://${account.website}`}
												target="_blank"
												rel="noopener noreferrer"
												class="mt-1 inline-flex items-center text-sm text-blue-600 hover:underline dark:text-blue-400"
											>
												<Globe class="mr-1 h-4 w-4" />
												{account.website}
												<ExternalLink class="ml-1 h-3 w-3" />
											</a>
										{:else}
											<p class="mt-1 text-sm text-gray-900 dark:text-white">N/A</p>
										{/if}
									</div>
									<div>
										<span class="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</span>
										{#if account.phone}
											<a
												href={`tel:${account.phone}`}
												class="mt-1 inline-flex items-center text-sm text-blue-600 hover:underline dark:text-blue-400"
											>
												<Phone class="mr-1 h-4 w-4" />
												{account.phone}
											</a>
										{:else}
											<p class="mt-1 text-sm text-gray-900 dark:text-white">N/A</p>
										{/if}
									</div>
									<div>
										<span class="text-sm font-medium text-gray-500 dark:text-gray-400">Email</span>
										{#if account?.email}
											<a
												href={`mailto:${account?.email}`}
												class="mt-1 inline-flex items-center text-sm text-blue-600 hover:underline dark:text-blue-400"
											>
												<Mail class="mr-1 h-4 w-4" />
												{account.email}
											</a>
										{:else}
											<p class="mt-1 text-sm text-gray-900 dark:text-white">N/A</p>
										{/if}
									</div>
								</div>

								<div class="space-y-4">
									<div>
										<span class="text-sm font-medium text-gray-500 dark:text-gray-400"
											>Annual Revenue</span
										>
										<p class="mt-1 text-sm text-gray-900 dark:text-white">
											{account.annualRevenue ? formatCurrency(account.annualRevenue) : 'N/A'}
										</p>
									</div>
									<div>
										<span class="text-sm font-medium text-gray-500 dark:text-gray-400"
											>Employees</span
										>
										<p class="mt-1 text-sm text-gray-900 dark:text-white">
											{account.numberOfEmployees
												? account.numberOfEmployees.toLocaleString()
												: 'N/A'}
										</p>
									</div>
									<div>
										<span class="text-sm font-medium text-gray-500 dark:text-gray-400"
											>Ownership</span
										>
										<p class="mt-1 text-sm text-gray-900 dark:text-white">
											{toLabel(account.accountOwnership, ACCOUNT_OWNERSHIP_OPTIONS, 'N/A')}
										</p>
									</div>
									<div>
										<span class="text-sm font-medium text-gray-500 dark:text-gray-400">Rating</span>
										<p class="mt-1 text-sm text-gray-900 dark:text-white">
											{toLabel(account.rating, RATING_OPTIONS, 'N/A')}
										</p>
									</div>
									<div>
										<span class="text-sm font-medium text-gray-500 dark:text-gray-400"
											>SIC Code</span
										>
										<p class="mt-1 text-sm text-gray-900 dark:text-white">
											{account.sicCode || 'N/A'}
										</p>
									</div>
								</div>
							</div>

							{#if account.street || account.city || account.state || account.country}
								<div class="mt-6 border-t border-gray-200 pt-6 dark:border-gray-700">
									<span class="text-sm font-medium text-gray-500 dark:text-gray-400">Address</span>
									<div class="mt-1 flex items-start text-sm text-gray-900 dark:text-white">
										<MapPin class="mr-2 mt-0.5 h-4 w-4 text-gray-400" />
										<address class="not-italic">
											{account.street || ''}<br />
											{account.city || ''}{account.city && account.state
												? ', '
												: ''}{account.state || ''}
											{account.postalCode || ''}<br />
											{account.country || ''}
										</address>
									</div>
								</div>
							{/if}

							{#if account.description}
								<div class="mt-6 border-t border-gray-200 pt-6 dark:border-gray-700">
									<span class="text-sm font-medium text-gray-500 dark:text-gray-400"
										>Description</span
									>
									<p class="mt-1 whitespace-pre-line text-sm text-gray-900 dark:text-white">
										{account.description}
									</p>
								</div>
							{/if}

							{#if account.closedAt}
								<div class="mt-6 border-t border-gray-200 pt-6 dark:border-gray-700">
									<div
										class="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20"
									>
										<div class="flex">
											<AlertTriangle class="mr-3 h-5 w-5 flex-shrink-0 text-red-500" />
											<div>
												<p class="font-medium text-red-800 dark:text-red-200">
													This account was closed on {formatDate(account.closedAt)}.
												</p>
												<p class="mt-1 text-red-700 dark:text-red-300">
													Reason: {account.closureReason || 'No reason provided'}
												</p>
											</div>
										</div>
									</div>
								</div>
							{/if}

							<div
								class="mt-6 grid grid-cols-2 gap-4 border-t border-gray-200 pt-6 text-sm dark:border-gray-700"
							>
								<div>
									<span class="text-gray-500 dark:text-gray-400">Created</span>
									<p class="text-gray-900 dark:text-white">{formatDate(account.createdAt)}</p>
								</div>
								<div>
									<span class="text-gray-500 dark:text-gray-400">Last Updated</span>
									<p class="text-gray-900 dark:text-white">{formatDate(account.updatedAt)}</p>
								</div>
							</div>
						</div>
					</div>

					<!-- Related Records Tabs -->
					<div
						class="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800"
					>
						<!-- Tab Navigation -->
						<div class="border-b border-gray-200 dark:border-gray-700">
							<nav class="flex space-x-8 px-6" aria-label="Tabs">
								<button
									onclick={() => (activeTab = 'contacts')}
									class={`whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium ${
										activeTab === 'contacts'
											? 'border-blue-500 text-blue-600 dark:text-blue-400'
											: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
									}`}
								>
									Contacts ({contacts.length})
								</button>
								<button
									onclick={() => (activeTab = 'opportunities')}
									class={`whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium ${
										activeTab === 'opportunities'
											? 'border-blue-500 text-blue-600 dark:text-blue-400'
											: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
									}`}
								>
									Opportunities ({opportunities.length})
								</button>
								<button
									onclick={() => (activeTab = 'tasks')}
									class={`whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium ${
										activeTab === 'tasks'
											? 'border-blue-500 text-blue-600 dark:text-blue-400'
											: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
									}`}
								>
									Tasks ({tasks.length})
								</button>
								<button
									onclick={() => (activeTab = 'cases')}
									class={`whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium ${
										activeTab === 'cases'
											? 'border-blue-500 text-blue-600 dark:text-blue-400'
											: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
									}`}
								>
									Cases ({cases.length})
								</button>
								<button
									onclick={() => (activeTab = 'notes')}
									class={`whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium ${
										activeTab === 'notes'
											? 'border-blue-500 text-blue-600 dark:text-blue-400'
											: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
									}`}
								>
									Notes ({comments.length})
								</button>
							</nav>
						</div>

						<!-- Tab Content -->
						<div class="p-6">
							{#if activeTab === 'contacts'}
								{#if contacts.length === 0}
									<div class="py-12 text-center">
										<Users class="mx-auto h-12 w-12 text-gray-400" />
										<p class="mt-2 text-gray-500 dark:text-gray-400">
											No contacts found for this account
										</p>
										<a
											href="/app/contacts/new?accountId={account.id}"
											class="mt-4 inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
										>
											<Plus class="mr-2 h-4 w-4" />
											Add Contact
										</a>
									</div>
								{:else}
									<div class="overflow-x-auto">
										<table class="min-w-full">
											<thead>
												<tr class="border-b border-gray-200 dark:border-gray-700">
													<th
														class="pb-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
														>Name</th
													>
													<th
														class="pb-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
														>Title</th
													>
													<th
														class="hidden pb-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 md:table-cell dark:text-gray-400"
														>Email</th
													>
													<th
														class="hidden pb-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 lg:table-cell dark:text-gray-400"
														>Phone</th
													>
													<th
														class="pb-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
														>Role</th
													>
													<th
														class="pb-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
														>Actions</th
													>
												</tr>
											</thead>
											<tbody class="divide-y divide-gray-200 dark:divide-gray-700">
												{#each contacts as contact (contact.id)}
													<tr class="hover:bg-gray-50 dark:hover:bg-gray-700/50">
														<td class="py-4 font-medium text-gray-900 dark:text-white">
															<a
																href="/app/contacts/{contact.id}"
																class="hover:text-blue-600 hover:underline dark:hover:text-blue-400"
															>
																{contact.firstName}
																{contact.lastName}
															</a>
															{#if contact.isPrimary}
																<span
																	class="ml-2 inline-flex items-center rounded bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
																>
																	Primary
																</span>
															{/if}
														</td>
														<td class="py-4 text-gray-900 dark:text-white"
															>{contact.title || 'N/A'}</td
														>
														<td class="hidden py-4 text-gray-900 md:table-cell dark:text-white">
															{#if contact.email}
																<a
																	href="mailto:{contact.email}"
																	class="text-blue-600 hover:underline dark:text-blue-400"
																>
																	{contact.email}
																</a>
															{:else}
																N/A
															{/if}
														</td>
														<td class="hidden py-4 text-gray-900 lg:table-cell dark:text-white">
															{#if contact.phone}
																<a
																	href="tel:{contact.phone}"
																	class="text-blue-600 hover:underline dark:text-blue-400"
																>
																	{contact.phone}
																</a>
															{:else}
																N/A
															{/if}
														</td>
														<td class="py-4 text-gray-900 dark:text-white"
															>{contact.role || 'N/A'}</td
														>
														<td class="py-4 text-right">
															<a
																href="/app/contacts/{contact.id}"
																class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
																>View</a
															>
														</td>
													</tr>
												{/each}
											</tbody>
										</table>
									</div>
								{/if}
							{/if}

							{#if activeTab === 'opportunities'}
								{#if opportunities.length === 0}
									<div class="py-12 text-center">
										<Target class="mx-auto h-12 w-12 text-gray-400" />
										<p class="mt-2 text-gray-500 dark:text-gray-400">
											No opportunities found for this account
										</p>
										<a
											href="/app/opportunities/new?accountId={account.id}"
											class="mt-4 inline-flex items-center rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700"
										>
											<Plus class="mr-2 h-4 w-4" />
											Add Opportunity
										</a>
									</div>
								{:else}
									<div class="overflow-x-auto">
										<table class="min-w-full">
											<thead>
												<tr class="border-b border-gray-200 dark:border-gray-700">
													<th
														class="pb-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
														>Name</th
													>
													<th
														class="pb-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
														>Value</th
													>
													<th
														class="pb-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
														>Stage</th
													>
													<th
														class="hidden pb-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 md:table-cell dark:text-gray-400"
														>Close Date</th
													>
													<th
														class="hidden pb-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 lg:table-cell dark:text-gray-400"
														>Probability</th
													>
													<th
														class="pb-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
														>Actions</th
													>
												</tr>
											</thead>
											<tbody class="divide-y divide-gray-200 dark:divide-gray-700">
												{#each opportunities as opportunity (opportunity.id)}
													<tr class="hover:bg-gray-50 dark:hover:bg-gray-700/50">
														<td class="py-4 font-medium text-gray-900 dark:text-white">
															<a
																href="/app/opportunities/{opportunity.id}"
																class="hover:text-blue-600 hover:underline dark:hover:text-blue-400"
															>
																{opportunity.name}
															</a>
														</td>
														<td class="py-4 text-gray-900 dark:text-white"
															>{formatCurrency(opportunity.amount)}</td
														>
														<td class="py-4">
															{#if opportunity.stage}
																{#each opportunityStages as s}
																	{#if s.value === opportunity.stage}
																		<span
																			class={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${s.color}`}
																		>
																			{s.label}
																		</span>
																	{/if}
																{/each}
															{:else}
																<span
																	class="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-800 dark:text-gray-300"
																>
																	Unknown
																</span>
															{/if}
														</td>
														<td class="hidden py-4 text-gray-900 md:table-cell dark:text-white"
															>{formatDate(opportunity.closeDate)}</td
														>
														<td class="hidden py-4 text-gray-900 lg:table-cell dark:text-white"
															>{opportunity.probability ? `${opportunity.probability}%` : 'N/A'}</td
														>
														<td class="py-4 text-right">
															<a
																href="/app/opportunities/{opportunity.id}"
																class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
																>View</a
															>
														</td>
													</tr>
												{/each}
											</tbody>
										</table>
									</div>
								{/if}
							{/if}

							{#if activeTab === 'tasks'}
								{#if tasks.length === 0}
									<div class="py-12 text-center">
										<CheckSquare class="mx-auto h-12 w-12 text-gray-400" />
										<p class="mt-2 text-gray-500 dark:text-gray-400">
											No tasks found for this account
										</p>
										<a
											href="/app/tasks/new?accountId={account.id}"
											class="mt-4 inline-flex items-center rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-700"
										>
											<Plus class="mr-2 h-4 w-4" />
											Add Task
										</a>
									</div>
								{:else}
									<div class="overflow-x-auto">
										<table class="min-w-full">
											<thead>
												<tr class="border-b border-gray-200 dark:border-gray-700">
													<th
														class="pb-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
														>Subject</th
													>
													<th
														class="pb-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
														>Status</th
													>
													<th
														class="pb-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
														>Priority</th
													>
													<th
														class="hidden pb-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 md:table-cell dark:text-gray-400"
														>Due Date</th
													>
													<th
														class="hidden pb-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 lg:table-cell dark:text-gray-400"
														>Assigned To</th
													>
													<th
														class="pb-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
														>Actions</th
													>
												</tr>
											</thead>
											<tbody class="divide-y divide-gray-200 dark:divide-gray-700">
												{#each tasks as task (task.id)}
													<tr class="hover:bg-gray-50 dark:hover:bg-gray-700/50">
														<td class="py-4 font-medium text-gray-900 dark:text-white">
															<a
																href="/app/tasks/{task.id}"
																class="hover:text-blue-600 hover:underline dark:hover:text-blue-400"
															>
																{task.subject}
															</a>
														</td>
														<td class="py-4">
															<span
																class={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
																	task.status === 'COMPLETED'
																		? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
																		: task.status === 'IN_PROGRESS'
																			? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
																			: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
																}`}
															>
																{toLabel(task.status, TASK_STATUS_OPTIONS, 'N/A')}
															</span>
														</td>
														<td class="py-4">
															<span
																class={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
																	task.priority === 'HIGH'
																		? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
																		: task.priority === 'NORMAL'
																			? 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
																			: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
																}`}
															>
																{toLabel(task.priority, TASK_PRIORITY_OPTIONS, 'Normal')}
															</span>
														</td>
														<td class="hidden py-4 text-gray-900 md:table-cell dark:text-white"
															>{formatDate(task.dueDate)}</td
														>
														<td class="hidden py-4 text-gray-900 lg:table-cell dark:text-white"
															>{task.ownerName || 'Unassigned'}</td
														>
														<td class="py-4 text-right">
															<a
																href="/app/tasks/{task.id}"
																class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
																>View</a
															>
														</td>
													</tr>
												{/each}
											</tbody>
										</table>
									</div>
								{/if}
							{/if}

							{#if activeTab === 'cases'}
								{#if cases.length === 0}
									<div class="py-12 text-center">
										<FolderOpen class="mx-auto h-12 w-12 text-gray-400" />
										<p class="mt-2 text-gray-500 dark:text-gray-400">
											No cases found for this account
										</p>
										<a
											href="/app/cases/new?accountId={account.id}"
											class="mt-4 inline-flex items-center rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
										>
											<Plus class="mr-2 h-4 w-4" />
											Open Case
										</a>
									</div>
								{:else}
									<div class="overflow-x-auto">
										<table class="min-w-full">
											<thead>
												<tr class="border-b border-gray-200 dark:border-gray-700">
													<th
														class="pb-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
														>Case Number</th
													>
													<th
														class="pb-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
														>Subject</th
													>
													<th
														class="pb-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
														>Status</th
													>
													<th
														class="pb-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
														>Priority</th
													>
													<th
														class="hidden pb-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 md:table-cell dark:text-gray-400"
														>Created Date</th
													>
													<th
														class="pb-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
														>Actions</th
													>
												</tr>
											</thead>
											<tbody class="divide-y divide-gray-200 dark:divide-gray-700">
												{#each cases as caseItem (caseItem.id)}
													<tr class="hover:bg-gray-50 dark:hover:bg-gray-700/50">
														<td class="py-4 font-medium text-gray-900 dark:text-white">
															<a
																href="/app/cases/{caseItem.id}"
																class="hover:text-blue-600 hover:underline dark:hover:text-blue-400"
															>
																{caseItem.caseNumber}
															</a>
														</td>
														<td class="py-4 text-gray-900 dark:text-white">{caseItem.subject}</td>
														<td class="py-4">
															<span
																class={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${caseStatusVisuals[caseItem.status as keyof typeof caseStatusVisuals]?.badgeColor || 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'}`}
															>
																{toLabel(caseItem.status, CASE_STATUS_OPTIONS, 'Unknown')}
															</span>
														</td>
														<td class="py-4">
															<span
																class={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
																	caseItem.priority === 'High'
																		? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
																		: caseItem.priority === 'Medium'
																			? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
																			: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
																}`}
															>
																{caseItem.priority}
															</span>
														</td>
														<td class="hidden py-4 text-gray-900 md:table-cell dark:text-white"
															>{formatDate(caseItem.createdAt)}</td
														>
														<td class="py-4 text-right">
															<a
																href="/app/cases/{caseItem.id}"
																class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
																>View</a
															>
														</td>
													</tr>
												{/each}
											</tbody>
										</table>
									</div>
								{/if}
							{/if}

							{#if activeTab === 'notes'}
								<div class="space-y-6">
									<!-- Add Note Form -->
									<div class="rounded-lg bg-gray-50 p-4 dark:bg-gray-700/50">
										<label
											for="comment"
											class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
											>Add a note</label
										>
										<textarea
											id="comment"
											rows="3"
											placeholder="Write your note here..."
											bind:value={newComment}
											class="w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
										></textarea>
										{#if commentError}
											<p class="mt-2 text-sm text-red-600">{commentError}</p>
										{/if}
										<div class="mt-3 flex justify-end">
											<button
												onclick={submitComment}
												disabled={isSubmittingComment}
												class="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:bg-blue-400"
											>
												<Send class="mr-2 h-4 w-4" />
												{#if isSubmittingComment}Adding...{:else}Add Note{/if}
											</button>
										</div>
									</div>

									<!-- Comments List -->
									{#if comments.length === 0}
										<div class="py-12 text-center">
											<MessageSquare class="mx-auto h-12 w-12 text-gray-400" />
											<p class="mt-2 text-gray-500 dark:text-gray-400">
												No notes found for this account
											</p>
										</div>
									{:else}
										<div class="space-y-4">
											{#each comments as comment (comment.id)}
												<div
													class="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-600 dark:bg-gray-700"
												>
													<div class="mb-2 flex items-start justify-between">
														<div class="flex items-center space-x-2">
															<span class="font-medium text-gray-900 dark:text-white"
																>{comment.authorName || 'Unknown'}</span
															>
															<span class="text-xs text-gray-500 dark:text-gray-400">
																{formatDate(comment.createdAt)}
															</span>
															{#if comment.isPrivate}
																<span
																	class="inline-flex items-center rounded bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900/20 dark:text-red-400"
																>
																	Private
																</span>
															{/if}
														</div>
													</div>
													<p class="whitespace-pre-line text-gray-700 dark:text-gray-300">
														{comment.body}
													</p>
												</div>
											{/each}
										</div>
									{/if}
								</div>
							{/if}
						</div>
					</div>
				</div>

				<!-- Sidebar -->
				<div class="space-y-6">
					<!-- Quick Stats -->
					<div
						class="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800"
					>
						<div class="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
							<h2 class="text-lg font-semibold text-gray-900 dark:text-white">Overview</h2>
						</div>
						<div class="space-y-6 p-6">
							<div class="flex items-center justify-between">
								<div>
									<p class="text-sm font-medium text-gray-500 dark:text-gray-400">Contacts</p>
									<p class="text-2xl font-bold text-gray-900 dark:text-white">{contacts.length}</p>
								</div>
								<Users class="h-8 w-8 text-blue-500" />
							</div>

							<div class="flex items-center justify-between">
								<div>
									<p class="text-sm font-medium text-gray-500 dark:text-gray-400">Opportunities</p>
									<p class="text-2xl font-bold text-gray-900 dark:text-white">
										{opportunities.length}
									</p>
								</div>
								<Target class="h-8 w-8 text-green-500" />
							</div>

							<div class="flex items-center justify-between">
								<div>
									<p class="text-sm font-medium text-gray-500 dark:text-gray-400">Pipeline Value</p>
									<p class="text-2xl font-bold text-gray-900 dark:text-white">
										{formatCurrency(
											opportunities.reduce((sum: number, opp: any) => sum + (opp.amount || 0), 0)
										)}
									</p>
								</div>
								<DollarSign class="h-8 w-8 text-yellow-500" />
							</div>

							<div class="flex items-center justify-between">
								<div>
									<p class="text-sm font-medium text-gray-500 dark:text-gray-400">Open Cases</p>
									<p class="text-2xl font-bold text-gray-900 dark:text-white">
										{cases.filter((c: any) => c.status !== 'CLOSED').length}
									</p>
								</div>
								<AlertTriangle class="h-8 w-8 text-red-500" />
							</div>
						</div>
					</div>

					<!-- Quick Actions -->
					<div
						class="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800"
					>
						<div class="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
							<h2 class="text-lg font-semibold text-gray-900 dark:text-white">Quick Actions</h2>
						</div>
						<div class="space-y-3 p-6">
							<a
								href="/app/contacts/new?accountId={account.id}"
								class="inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
							>
								<Users class="mr-2 h-4 w-4" />
								Add Contact
							</a>
							<a
								href="/app/opportunities/new?accountId={account.id}"
								class="inline-flex w-full items-center justify-center rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700"
							>
								<Target class="mr-2 h-4 w-4" />
								Add Opportunity
							</a>
							<a
								href="/app/tasks/new?accountId={account.id}"
								class="inline-flex w-full items-center justify-center rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-700"
							>
								<CheckSquare class="mr-2 h-4 w-4" />
								Add Task
							</a>
							<a
								href="/app/cases/new?accountId={account.id}"
								class="inline-flex w-full items-center justify-center rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
							>
								<FolderOpen class="mr-2 h-4 w-4" />
								Open Case
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Close Account Modal -->
		{#if showCloseModal}
			<div class="fixed inset-0 z-50 overflow-y-auto">
				<div
					class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
				>
					<div
						class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
						role="button"
						tabindex="0"
						aria-label="Close modal"
						onclick={() => (showCloseModal = false)}
						onkeydown={(e) => e.key === 'Escape' && (showCloseModal = false)}
					></div>

					<div
						class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg dark:bg-gray-800"
					>
						<form method="POST" action="?/closeAccount">
							<div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 dark:bg-gray-800">
								<div class="sm:flex sm:items-start">
									<div
										class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10 dark:bg-red-900/20"
									>
										<Lock class="h-6 w-6 text-red-600 dark:text-red-400" />
									</div>
									<div class="mt-3 w-full text-center sm:ml-4 sm:mt-0 sm:text-left">
										<h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
											Close Account
										</h3>
										<div class="mt-2">
											<p class="text-sm text-gray-500 dark:text-gray-400">
												You are about to close the account "{account.name}". This action will mark
												the account as closed but will retain all account data for historical
												purposes.
											</p>

											<div class="mt-4">
												<label
													for="closureReason"
													class="block text-sm font-medium text-gray-700 dark:text-gray-300"
												>
													Reason for Closing <span class="text-red-500">*</span>
												</label>
												<textarea
													id="closureReason"
													name="closureReason"
													rows="3"
													placeholder="Please provide a reason for closing this account..."
													bind:value={closureReason}
													class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
												></textarea>
												{#if closeError}
													<p class="mt-1 text-sm text-red-600 dark:text-red-400">{closeError}</p>
												{/if}
											</div>
										</div>
									</div>
								</div>
							</div>
							<div
								class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 dark:bg-gray-700"
							>
								<button
									type="submit"
									class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
								>
									Close Account
								</button>
								<button
									type="button"
									onclick={() => (showCloseModal = false)}
									class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto dark:bg-gray-600 dark:text-white dark:ring-gray-500 dark:hover:bg-gray-500"
								>
									Cancel
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		{/if}
	</div>
{/if}
