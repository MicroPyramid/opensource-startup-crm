<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/state';
	import { ArrowLeft, User, Mail, Phone, Building, MapPin, FileText, Save } from '@lucide/svelte';
	import { formatPhoneNumber } from '$lib/utils/phone';
	import { isValidPhoneNumber, isPossiblePhoneNumber } from 'libphonenumber-js';

	import type { PageData, ActionData } from './$types';
	let { data, form }: { data: PageData; form: ActionData } = $props();

	let isSubmitting = $state(false);
	let phoneError = $state('');

	// Get accountId from URL parameters
	const accountId = page.url.searchParams.get('accountId');

	// Form values with defaults from form data if validation failed
	let formValues = $state({
		firstName: form?.values?.firstName || '',
		lastName: form?.values?.lastName || '',
		email: form?.values?.email || '',
		phone: form?.values?.phone || '',
		title: form?.values?.title || '',
		department: form?.values?.department || '',
		street: form?.values?.street || '',
		city: form?.values?.city || '',
		state: form?.values?.state || '',
		postalCode: form?.values?.postalCode || '',
		country: form?.values?.country || '',
		description: form?.values?.description || '',
		organizationId: form?.values?.organizationId || data.organizations?.[0]?.id || '',
		accountId: form?.values?.accountId || accountId || '',
		isPrimary: form?.values?.isPrimary || false,
		role: form?.values?.role || ''
	});

	const errors: Record<string, string> = $derived(form?.errors || {});

	// Find the selected account for display
	const selectedAccount = $derived(
		accountId ? data.accounts?.find((acc) => acc.id === accountId) : null
	);

	function handleSubmit() {
		isSubmitting = true;
		return async ({ update }: { update: () => Promise<void> }) => {
			await update();
			isSubmitting = false;
		};
	}

	function validatePhone() {
		const input = formValues.phone.trim();
		if (!input) {
			phoneError = '';
			return;
		}
		if (!isPossiblePhoneNumber(input, 'US') || !isValidPhoneNumber(input, 'US')) {
			phoneError = 'Please enter a valid phone number';
			return;
		}
		phoneError = '';
	}

	function formatPhone() {
		if (!formValues.phone.trim()) return;
		formValues.phone = formatPhoneNumber(formValues.phone);
		validatePhone();
	}
</script>

<svelte:head>
	<title>New Contact - BottleCRM</title>
</svelte:head>

<div class="min-h-screen bg-gray-50 dark:bg-gray-900">
	<!-- Header -->
	<div class="border-b border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
		<div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
			<div class="flex items-center justify-between">
				<div class="flex items-center space-x-4">
					<a
						href={accountId ? `/app/accounts/${accountId}` : '/app/contacts'}
						class="inline-flex items-center text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
					>
						<ArrowLeft class="mr-2 h-5 w-5" />
						{accountId ? 'Back to Account' : 'Back to Contacts'}
					</a>
					<div class="border-l border-gray-300 pl-4 dark:border-gray-600">
						<h1 class="text-2xl font-semibold text-gray-900 dark:text-white">New Contact</h1>
						<p class="text-sm text-gray-500 dark:text-gray-400">
							{#if selectedAccount}
								Add a new contact to {selectedAccount.name}
							{:else}
								Add a new contact to your CRM
							{/if}
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Main Content -->
	<div class="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
		<!-- Error Alert -->
		{#if errors.general}
			<div
				class="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20"
			>
				<p class="text-red-800 dark:text-red-200">{errors.general}</p>
			</div>
		{/if}

		<!-- Account Selection Alert -->
		{#if selectedAccount}
			<div
				class="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20"
			>
				<div class="flex items-center">
					<Building class="mr-2 h-5 w-5 text-blue-500" />
					<p class="text-blue-800 dark:text-blue-200">
						This contact will be added to <strong>{selectedAccount.name}</strong>
					</p>
				</div>
			</div>
		{/if}

		<form method="POST" action="?/create" use:enhance={handleSubmit} class="space-y-8">
			<!-- Hidden fields -->
			{#if accountId}
				<input type="hidden" name="accountId" value={accountId} />
			{/if}

			<!-- Basic Information -->
			<div
				class="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800"
			>
				<div class="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
					<div class="flex items-center">
						<User class="mr-2 h-5 w-5 text-blue-500" />
						<h2 class="text-lg font-medium text-gray-900 dark:text-white">Basic Information</h2>
					</div>
				</div>
				<div class="space-y-6 p-6">
					<!-- Organization Selection (only show if no account is selected) -->
					{#if !accountId}
						<div>
							<label
								for="organizationId"
								class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
							>
								Organization
							</label>
							<select
								id="organizationId"
								name="organizationId"
								bind:value={formValues.organizationId}
								class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
							>
								<option value="">Select an organization</option>
								{#each data.organizations as org}
									<option value={org.id}>{org.name}</option>
								{/each}
							</select>
						</div>
					{/if}

					<!-- Account Selection (only show if no accountId in URL) -->
					{#if !accountId && data.accounts?.length > 0}
						<div>
							<label
								for="accountSelect"
								class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
							>
								Account (Optional)
							</label>
							<select
								id="accountSelect"
								name="accountId"
								bind:value={formValues.accountId}
								class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
							>
								<option value="">Select an account (optional)</option>
								{#each data.accounts as account}
									<option value={account.id}>{account.name}</option>
								{/each}
							</select>
						</div>
					{/if}

					<!-- Name Fields -->
					<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
						<div>
							<label
								for="firstName"
								class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
							>
								First Name *
							</label>
							<input
								type="text"
								id="firstName"
								name="firstName"
								bind:value={formValues.firstName}
								required
								class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white {errors.firstName
									? 'border-red-300 dark:border-red-600'
									: ''}"
								placeholder="Enter first name"
							/>
							{#if errors.firstName}
								<p class="mt-1 text-sm text-red-600 dark:text-red-400">{errors.firstName}</p>
							{/if}
						</div>
						<div>
							<label
								for="lastName"
								class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
							>
								Last Name *
							</label>
							<input
								type="text"
								id="lastName"
								name="lastName"
								bind:value={formValues.lastName}
								required
								class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white {errors.lastName
									? 'border-red-300 dark:border-red-600'
									: ''}"
								placeholder="Enter last name"
							/>
							{#if errors.lastName}
								<p class="mt-1 text-sm text-red-600 dark:text-red-400">{errors.lastName}</p>
							{/if}
						</div>
					</div>

					<!-- Contact Fields -->
					<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
						<div>
							<label
								for="email"
								class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
							>
								<Mail class="mr-1 inline h-4 w-4" />
								Email
							</label>
							<input
								type="email"
								id="email"
								name="email"
								bind:value={formValues.email}
								class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white {errors.email
									? 'border-red-300 dark:border-red-600'
									: ''}"
								placeholder="contact@example.com"
							/>
							{#if errors.email}
								<p class="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
							{/if}
						</div>
						<div>
							<label
								for="phone"
								class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
							>
								<Phone class="mr-1 inline h-4 w-4" />
								Phone
							</label>
							<input
								type="tel"
								id="phone"
								name="phone"
								bind:value={formValues.phone}
								oninput={validatePhone}
								onblur={formatPhone}
								class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white {errors.phone
									? 'border-red-300 dark:border-red-600'
									: ''}"
								placeholder="+1 (555) 123-4567"
							/>
							{#if errors.phone}
								<p class="mt-1 text-sm text-red-600 dark:text-red-400">{errors.phone}</p>
							{/if}
							{#if phoneError}
								<p class="mt-1 text-sm text-red-600 dark:text-red-400">{phoneError}</p>
							{/if}
						</div>
					</div>
				</div>
			</div>

			<!-- Account Relationship (only show if account is selected) -->
			{#if selectedAccount || formValues.accountId}
				<div
					class="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800"
				>
					<div class="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
						<div class="flex items-center">
							<Building class="mr-2 h-5 w-5 text-blue-500" />
							<h2 class="text-lg font-medium text-gray-900 dark:text-white">
								Account Relationship
							</h2>
						</div>
					</div>
					<div class="space-y-6 p-6">
						<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
							<div>
								<label
									for="role"
									class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
								>
									Role
								</label>
								<input
									type="text"
									id="role"
									name="role"
									bind:value={formValues.role}
									class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
									placeholder="e.g., Decision Maker, Influencer"
								/>
							</div>
							<div class="flex items-center pt-8">
								<input
									type="checkbox"
									id="isPrimary"
									name="isPrimary"
									bind:checked={formValues.isPrimary}
									class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
								/>
								<label for="isPrimary" class="ml-2 block text-sm text-gray-900 dark:text-white">
									Primary Contact
								</label>
							</div>
						</div>
					</div>
				</div>
			{/if}

			<!-- Professional Information -->
			<div
				class="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800"
			>
				<div class="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
					<div class="flex items-center">
						<Building class="mr-2 h-5 w-5 text-blue-500" />
						<h2 class="text-lg font-medium text-gray-900 dark:text-white">
							Professional Information
						</h2>
					</div>
				</div>
				<div class="space-y-6 p-6">
					<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
						<div>
							<label
								for="title"
								class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
							>
								Job Title
							</label>
							<input
								type="text"
								id="title"
								name="title"
								bind:value={formValues.title}
								class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
								placeholder="e.g., Sales Manager"
							/>
						</div>
						<div>
							<label
								for="department"
								class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
							>
								Department
							</label>
							<input
								type="text"
								id="department"
								name="department"
								bind:value={formValues.department}
								class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
								placeholder="e.g., Sales"
							/>
						</div>
					</div>
				</div>
			</div>

			<!-- Address Information -->
			<div
				class="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800"
			>
				<div class="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
					<div class="flex items-center">
						<MapPin class="mr-2 h-5 w-5 text-blue-500" />
						<h2 class="text-lg font-medium text-gray-900 dark:text-white">Address Information</h2>
					</div>
				</div>
				<div class="space-y-6 p-6">
					<div>
						<label
							for="street"
							class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
						>
							Street Address
						</label>
						<input
							type="text"
							id="street"
							name="street"
							bind:value={formValues.street}
							class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
							placeholder="123 Main Street"
						/>
					</div>
					<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
						<div>
							<label
								for="city"
								class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
							>
								City
							</label>
							<input
								type="text"
								id="city"
								name="city"
								bind:value={formValues.city}
								class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
								placeholder="New York"
							/>
						</div>
						<div>
							<label
								for="state"
								class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
							>
								State/Province
							</label>
							<input
								type="text"
								id="state"
								name="state"
								bind:value={formValues.state}
								class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
								placeholder="NY"
							/>
						</div>
						<div>
							<label
								for="postalCode"
								class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
							>
								Postal Code
							</label>
							<input
								type="text"
								id="postalCode"
								name="postalCode"
								bind:value={formValues.postalCode}
								class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
								placeholder="10001"
							/>
						</div>
						<div>
							<label
								for="country"
								class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
							>
								Country
							</label>
							<input
								type="text"
								id="country"
								name="country"
								bind:value={formValues.country}
								class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
								placeholder="United States"
							/>
						</div>
					</div>
				</div>
			</div>

			<!-- Additional Information -->
			<div
				class="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800"
			>
				<div class="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
					<div class="flex items-center">
						<FileText class="mr-2 h-5 w-5 text-blue-500" />
						<h2 class="text-lg font-medium text-gray-900 dark:text-white">
							Additional Information
						</h2>
					</div>
				</div>
				<div class="p-6">
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
							bind:value={formValues.description}
							rows="4"
							class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
							placeholder="Add any additional notes or description about this contact..."
						></textarea>
					</div>
				</div>
			</div>

			<!-- Form Actions -->
			<div
				class="flex items-center justify-end space-x-4 border-t border-gray-200 pt-6 dark:border-gray-700"
			>
				<a
					href={accountId ? `/app/accounts/${accountId}` : '/app/contacts'}
					class="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
				>
					Cancel
				</a>
				<button
					type="submit"
					disabled={isSubmitting}
					class="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
				>
					{#if isSubmitting}
						<div
							class="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
						></div>
						Creating...
					{:else}
						<Save class="mr-2 h-4 w-4" />
						Create Contact
					{/if}
				</button>
			</div>
		</form>
	</div>
</div>
