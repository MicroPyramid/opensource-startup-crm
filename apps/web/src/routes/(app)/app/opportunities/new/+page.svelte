<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { Plus, Building2, DollarSign, Target, ArrowLeft } from '@lucide/svelte';

	import type { PageData, ActionData } from './$types';
	let { data, form }: { data: PageData; form?: ActionData } = $props();

	let isSubmitting = $state(false);
	let selectedContacts: string[] = $state([]);

	// Form data with defaults, including pre-selected account
	type OpportunityFormData = {
		name: string;
		accountId: string;
		stage: string;
		amount: string;
		closeDate: string;
		probability: string;
		type: string;
		leadSource: string;
		nextStep: string;
		description: string;
		ownerId: string;
	};
	let formData: OpportunityFormData = $state({
		name: form?.data?.name || '',
		accountId: form?.data?.accountId || data.preSelectedAccountId || '',
		stage: form?.data?.stage || 'PROSPECTING',
		amount: form?.data?.amount || '',
		closeDate: form?.data?.closeDate || '',
		probability: form?.data?.probability || '',
		type: form?.data?.type || '',
		leadSource: form?.data?.leadSource || '',
		nextStep: form?.data?.nextStep || '',
		description: form?.data?.description || '',
		ownerId: form?.data?.ownerId || ''
	});

	import { opportunityStages, opportunityTypeOptions, sourceOptions } from '$lib/data';

	function handleContactToggle(contactId: string) {
		if (selectedContacts.includes(contactId)) {
			selectedContacts = selectedContacts.filter((id) => id !== contactId);
		} else {
			selectedContacts = [...selectedContacts, contactId];
		}
	}

	function calculateExpectedRevenue(): string {
		const amount = parseFloat(formData.amount);
		const probability = parseFloat(formData.probability);
		if (amount && probability) {
			return ((amount * probability) / 100).toFixed(2);
		}
		return '0';
	}
</script>

<svelte:head>
	<title>New Opportunity - BottleCRM</title>
</svelte:head>

<div class="min-h-screen bg-gray-50 dark:bg-gray-900">
	<!-- Header -->
	<div class="border-b border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="flex h-16 items-center justify-between">
				<div class="flex items-center space-x-4">
					<button
						onclick={() => history.back()}
						class="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
					>
						<ArrowLeft class="h-5 w-5" />
					</button>
					<div class="flex items-center space-x-3">
						<div class="rounded-lg bg-blue-100 p-2 dark:bg-blue-900">
							<Target class="h-6 w-6 text-blue-600 dark:text-blue-400" />
						</div>
						<div>
							<h1 class="text-xl font-semibold text-gray-900 dark:text-white">New Opportunity</h1>
							<p class="text-sm text-gray-500 dark:text-gray-400">Create a new sales opportunity</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Form -->
	<div class="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
		{#if form?.error}
			<div
				class="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20"
			>
				<p class="text-red-600 dark:text-red-400">{form.error}</p>
			</div>
		{/if}

		<form
			method="POST"
			action="?/create"
			use:enhance={() => {
				if (isSubmitting) {
					return;
				}

				isSubmitting = true;

				return async ({ result, update }) => {
					isSubmitting = false;
					await update();

					if (result.type === 'redirect') {
						goto(result.location);
					}
				};
			}}
			class="space-y-8"
		>
			<!-- Basic Information -->
			<div
				class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
			>
				<h2 class="mb-6 flex items-center text-lg font-medium text-gray-900 dark:text-white">
					<Building2 class="mr-2 h-5 w-5 text-gray-500 dark:text-gray-400" />
					Basic Information
				</h2>

				<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
					<!-- Opportunity Name -->
					<div class="md:col-span-2">
						<label
							for="name"
							class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
						>
							Opportunity Name *
						</label>
						<input
							type="text"
							id="name"
							name="name"
							bind:value={formData.name}
							required
							class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-400"
							placeholder="Enter opportunity name"
						/>
						{#if form?.errors?.name}
							<p class="mt-1 text-sm text-red-600 dark:text-red-400">{form.errors.name}</p>
						{/if}
					</div>

					<!-- Account -->
					<div>
						<label
							for="accountId"
							class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
						>
							Account *
						</label>
						<select
							id="accountId"
							name="accountId"
							bind:value={formData.accountId}
							required
							class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-400"
							disabled={!!data.preSelectedAccountId}
						>
							<option value="">Select an account</option>
							{#each data.accounts as account}
								<option value={account.id}
									>{account.name} {account.type ? `(${account.type})` : ''}</option
								>
							{/each}
						</select>
						{#if data.preSelectedAccountId}
							<!-- Disabled inputs are not submitted; include hidden field to ensure value is sent -->
							<input type="hidden" name="accountId" value={formData.accountId} />
						{/if}
						{#if data.preSelectedAccountId}
							<p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
								Account pre-selected from {data.preSelectedAccountName}
							</p>
						{/if}
						{#if form?.errors?.accountId}
							<p class="mt-1 text-sm text-red-600 dark:text-red-400">{form.errors.accountId}</p>
						{/if}
					</div>

					<!-- Stage -->
					<div>
						<label
							for="stage"
							class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
						>
							Stage *
						</label>
						<select
							id="stage"
							name="stage"
							bind:value={formData.stage}
							required
							class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-400"
						>
							{#each opportunityStages as stage}
								<option value={stage.value}>{stage.label}</option>
							{/each}
						</select>
						{#if form?.errors?.stage}
							<p class="mt-1 text-sm text-red-600 dark:text-red-400">{form.errors.stage}</p>
						{/if}
					</div>

					<!-- Owner -->
					<div>
						<label
							for="ownerId"
							class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
						>
							Owner
						</label>
						<select
							id="ownerId"
							name="ownerId"
							bind:value={formData.ownerId}
							class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-400"
						>
							<option value="">Assign to me</option>
							{#each data.users as user (user.id)}
								<option value={user.id}>{user.name}</option>
							{/each}
						</select>
					</div>

					<!-- Type -->
					<div>
						<label
							for="type"
							class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
						>
							Type
						</label>
						<select
							id="type"
							name="type"
							bind:value={formData.type}
							class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-400"
						>
							<option value="">Select type</option>
							{#each opportunityTypeOptions as type}
								<option value={type.value}>{type.label}</option>
							{/each}
						</select>
					</div>
				</div>
			</div>

			<!-- Financial Information -->
			<div
				class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
			>
				<h2 class="mb-6 flex items-center text-lg font-medium text-gray-900 dark:text-white">
					<DollarSign class="mr-2 h-5 w-5 text-gray-500 dark:text-gray-400" />
					Financial Information
				</h2>

				<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
					<!-- Amount -->
					<div>
						<label
							for="amount"
							class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
						>
							Amount ($)
						</label>
						<input
							type="number"
							id="amount"
							name="amount"
							bind:value={formData.amount}
							min="0"
							step="0.01"
							class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-400"
							placeholder="0.00"
						/>
						{#if form?.errors?.amount}
							<p class="mt-1 text-sm text-red-600 dark:text-red-400">{form.errors.amount}</p>
						{/if}
					</div>

					<!-- Probability -->
					<div>
						<label
							for="probability"
							class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
						>
							Probability (%)
						</label>
						<input
							type="number"
							id="probability"
							name="probability"
							bind:value={formData.probability}
							min="0"
							max="100"
							class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-400"
							placeholder="0"
						/>
						{#if form?.errors?.probability}
							<p class="mt-1 text-sm text-red-600 dark:text-red-400">{form.errors.probability}</p>
						{/if}
					</div>

					<!-- Expected Revenue (calculated) -->
					<div>
						<div class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
							Expected Revenue
						</div>
						<div
							class="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-600 dark:text-white"
						>
							${calculateExpectedRevenue()}
						</div>
					</div>

					<!-- Close Date -->
					<div>
						<label
							for="closeDate"
							class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
						>
							Expected Close Date
						</label>
						<input
							type="date"
							id="closeDate"
							name="closeDate"
							bind:value={formData.closeDate}
							class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-400"
						/>
					</div>

					<!-- Lead Source -->
					<div>
						<label
							for="leadSource"
							class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
						>
							Lead Source
						</label>
						<select
							id="leadSource"
							name="leadSource"
							bind:value={formData.leadSource}
							class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-400"
						>
							<option value="">Select source</option>
							{#each sourceOptions as source}
								<option value={source.value}>{source.label}</option>
							{/each}
						</select>
					</div>
				</div>
			</div>

			<!-- Additional Information -->
			<div
				class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
			>
				<h2 class="mb-6 text-lg font-medium text-gray-900 dark:text-white">
					Additional Information
				</h2>

				<div class="grid grid-cols-1 gap-6">
					<!-- Associated Contacts -->
					{#if data.accountContacts.length > 0}
						<div>
							<div class="mb-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
								Associated Contacts {data.preSelectedAccountId
									? `from ${data.preSelectedAccountName}`
									: ''}
							</div>
							<div
								class="grid max-h-40 grid-cols-1 gap-3 overflow-y-auto rounded-lg border border-gray-200 bg-gray-50 p-3 sm:grid-cols-2 lg:grid-cols-3 dark:border-gray-600 dark:bg-gray-700"
							>
								{#each data.accountContacts as contact}
									<label
										class="flex cursor-pointer items-center space-x-2 rounded p-2 hover:bg-white dark:hover:bg-gray-600"
									>
										<input
											type="checkbox"
											name="contactIds"
											value={contact.id}
											checked={selectedContacts.includes(contact.id)}
											onchange={() => handleContactToggle(contact.id)}
											class="rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:focus:ring-blue-400"
										/>
										<span class="text-sm text-gray-900 dark:text-white">
											{contact.firstName}
											{contact.lastName}
											{#if contact.email}
												<span class="text-gray-500 dark:text-gray-400">({contact.email})</span>
											{/if}
										</span>
									</label>
								{/each}
							</div>
						</div>
					{/if}

					<!-- Next Step -->
					<div>
						<label
							for="nextStep"
							class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
						>
							Next Step
						</label>
						<input
							type="text"
							id="nextStep"
							name="nextStep"
							bind:value={formData.nextStep}
							class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-400"
							placeholder="What's the next step?"
						/>
					</div>

					<!-- Description -->
					<div>
						<label
							for="description"
							class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
						>
							Description
						</label>
						<textarea
							id="description"
							name="description"
							bind:value={formData.description}
							rows="4"
							class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-400"
							placeholder="Additional details about this opportunity..."
						></textarea>
					</div>
				</div>
			</div>

			<!-- Form Actions -->
			<div class="flex items-center justify-end space-x-4 pt-6">
				<button
					type="button"
					onclick={() => history.back()}
					class="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:focus:ring-blue-400"
				>
					Cancel
				</button>
				<button
					type="submit"
					disabled={isSubmitting}
					class="flex items-center rounded-lg border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
				>
					{#if isSubmitting}
						<div
							class="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
						></div>
						Creating...
					{:else}
						<Plus class="mr-2 h-4 w-4" />
						Create Opportunity
					{/if}
				</button>
			</div>
		</form>
	</div>
</div>
