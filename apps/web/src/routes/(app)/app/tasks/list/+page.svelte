<script lang="ts">
	import {
		Plus,
		Calendar,
		User,
		Building2,
		Edit3,
		Trash2,
		Clock,
		AlertCircle,
		CheckCircle2,
		PlayCircle,
		Pause,
		XCircle
	} from '@lucide/svelte';

	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();

	import { taskStatusVisualMap, taskPriorityVisualMap } from '$lib/data';
	import { formatDate } from '$lib/utils/date';
</script>

<div class="min-h-screen bg-gray-50 dark:bg-gray-900">
	<div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
		<!-- Header Section -->
		<div class="mb-8">
			<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div>
					<h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100">Tasks</h1>
					<p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
						Manage and track your team's tasks
					</p>
				</div>
				<a
					href="/app/tasks/new"
					class="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white shadow-sm transition-colors duration-200 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
				>
					<Plus size={20} />
					New Task
				</a>
			</div>
		</div>

		<!-- Tasks Table -->
		<div
			class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800"
		>
			{#if data.tasks.length === 0}
				<div class="py-16 text-center">
					<div
						class="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700"
					>
						<CheckCircle2 size={32} class="text-gray-400 dark:text-gray-500" />
					</div>
					<h3 class="mb-2 text-lg font-medium text-gray-900 dark:text-gray-100">No tasks yet</h3>
					<p class="mb-6 text-gray-500 dark:text-gray-400">
						Get started by creating your first task
					</p>
					<a
						href="/app/tasks/new"
						class="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white shadow-sm transition-colors duration-200 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
					>
						<Plus size={20} />
						Create Task
					</a>
				</div>
			{:else}
				<!-- Desktop Table -->
				<div class="hidden overflow-x-auto md:block">
					<table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
						<thead class="bg-gray-50 dark:bg-gray-700">
							<tr>
								<th
									class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-300"
								>
									Task
								</th>
								<th
									class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-300"
								>
									Status
								</th>
								<th
									class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-300"
								>
									Priority
								</th>
								<th
									class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-300"
								>
									Due Date
								</th>
								<th
									class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-300"
								>
									Owner
								</th>
								<th
									class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-300"
								>
									Account
								</th>
								<th
									class="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-300"
								>
									Actions
								</th>
							</tr>
						</thead>
						<tbody class="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
							{#each data.tasks as task (task.id)}
                {@const statusItem = taskStatusVisualMap.find(s => s.value === task.status)}
                {@const StatusIcon = statusItem?.icon || AlertCircle}
                {@const priorityItem = taskPriorityVisualMap.find(p => p.value === task.priority)}
                {@const PriorityIcon = priorityItem?.icon || Clock}
								<tr class="transition-colors duration-150 hover:bg-gray-50 dark:hover:bg-gray-700">
									<td class="px-6 py-4">
										<div class="flex items-start">
											<div class="min-w-0 flex-1">
												<a
													href="/app/tasks/{task.id}"
													class="text-sm font-medium text-gray-900 transition-colors hover:text-blue-600 dark:text-gray-100 dark:hover:text-blue-400"
												>
													{task.subject}
												</a>
												{#if task.description}
													<p
														class="mt-1 max-w-xs truncate text-sm text-gray-500 dark:text-gray-400"
													>
														{task.description}
													</p>
												{/if}
											</div>
										</div>
									</td>
									<td class="px-6 py-4">
										<div class="flex items-center gap-2">
                        <StatusIcon
													size={16}
													class={statusItem?.iconColor ||
														'text-gray-400 dark:text-gray-500'}
												/>
											<span
												class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium {statusItem?.badgeColor || ''}"
											>
												{task.status || 'N/A'}
											</span>
										</div>
									</td>
									<td class="px-6 py-4">
										<div class="flex items-center gap-2">
                        
												<PriorityIcon
													size={16}
													class={priorityItem?.iconColor ||
														'text-gray-400 dark:text-gray-500'}
												/>
											<span
												class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium {priorityItem?.badgeColor || ''}"
											>
												{task.priority || 'Normal'}
											</span>
										</div>
									</td>
									<td class="px-6 py-4">
										<div class="flex items-center gap-2 text-sm text-gray-900 dark:text-gray-100">
											<Calendar size={16} class="text-gray-400 dark:text-gray-500" />
											{formatDate(task.dueDate)}
										</div>
									</td>
									<td class="px-6 py-4">
										<div class="flex items-center gap-2">
											<User size={16} class="text-gray-400 dark:text-gray-500" />
											<span class="text-sm text-gray-900 dark:text-gray-100"
												>{task.ownerName || 'Unassigned'}</span
											>
										</div>
									</td>
									<td class="px-6 py-4">
										<div class="flex items-center gap-2">
											<Building2 size={16} class="text-gray-400 dark:text-gray-500" />
											<span class="text-sm text-gray-900 dark:text-gray-100"
												>{task.accountName || 'N/A'}</span
											>
										</div>
									</td>
									<td class="px-6 py-4 text-right">
										<div class="flex items-center justify-end gap-2">
											<a
												href="/app/tasks/{task.id}/edit"
												class="inline-flex items-center gap-1 p-1 text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
												aria-label="Edit Task"
											>
												<Edit3 size={16} />
											</a>
											<button
												class="inline-flex cursor-not-allowed items-center gap-1 p-1 text-gray-400 dark:text-gray-500"
												disabled
												title="Delete (functionality to be implemented)"
											>
												<Trash2 size={16} />
											</button>
										</div>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>

				<!-- Mobile Cards -->
				<div class="md:hidden">
					{#each data.tasks as task (task.id)}
            {@const statusItem = taskStatusVisualMap.find(s => s.value === task.status)}
            {@const StatusIcon = statusItem?.icon || AlertCircle}
            {@const priorityItem = taskPriorityVisualMap.find(p => p.value === task.priority)}
            {@const PriorityIcon = priorityItem?.icon || Clock}
						<div
							class="border-b border-gray-200 p-4 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700"
						>
							<div class="mb-3 flex items-start justify-between">
								<div class="min-w-0 flex-1">
									<a
										href="/app/tasks/{task.id}"
										class="block text-sm font-medium text-gray-900 transition-colors hover:text-blue-600 dark:text-gray-100 dark:hover:text-blue-400"
									>
										{task.subject}
									</a>
									{#if task.description}
										<p class="mt-1 line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
											{task.description}
										</p>
									{/if}
								</div>
								<div class="ml-4 flex items-center gap-2">
									<a
										href="/app/tasks/{task.id}/edit"
										class="p-1 text-gray-400 transition-colors hover:text-blue-600 dark:text-gray-500 dark:hover:text-blue-400"
									>
										<Edit3 size={16} />
									</a>
									<button class="cursor-not-allowed p-1 text-gray-300 dark:text-gray-600" disabled>
										<Trash2 size={16} />
									</button>
								</div>
							</div>

							<div class="mb-3 flex flex-wrap gap-2">
								<div class="flex items-center gap-1">
									<StatusIcon
											size={14}
											class={statusItem?.iconColor || 'text-gray-400 dark:text-gray-500'}
										/>
									<span
										class="rounded-full px-2 py-1 text-xs font-medium
                    {statusItem?.badgeColor || ''}
                  "
									>
										{task.status || 'N/A'}
									</span>
								</div>

								<div class="flex items-center gap-1">
									<PriorityIcon
											size={14}
											class={priorityItem?.iconColor || 'text-gray-400 dark:text-gray-500'}
										/>
									<span
										class="rounded-full px-2 py-1 text-xs font-medium
                    {priorityItem?.badgeColor || ''}
                  "
									>
										{task.priority || 'Normal'}
									</span>
								</div>
							</div>

							<div class="grid grid-cols-1 gap-2 text-sm">
								<div class="flex items-center gap-2 text-gray-600 dark:text-gray-400">
									<Calendar size={14} class="text-gray-400 dark:text-gray-500" />
									<span>Due: {formatDate(task.dueDate)}</span>
								</div>
								<div class="flex items-center gap-2 text-gray-600 dark:text-gray-400">
									<User size={14} class="text-gray-400 dark:text-gray-500" />
									<span>{task.ownerName || 'Unassigned'}</span>
								</div>
								{#if task.accountName}
									<div class="flex items-center gap-2 text-gray-600 dark:text-gray-400">
										<Building2 size={14} class="text-gray-400 dark:text-gray-500" />
										<span>{task.accountName}</span>
									</div>
								{/if}
							</div>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	/* Optional: fade-in animation for modal (can be removed if no other modals use it) */
	/* Or keep if edit modal will use it */
	@keyframes fade-in {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
