<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { fade } from 'svelte/transition';
	import { formatPhoneNumber } from '$lib/utils/phone';
	import { isValidPhoneNumber, isPossiblePhoneNumber } from 'libphonenumber-js';

	// Lucide icons
	import {
		User,
		Building,
		Mail,
		Phone,
		Globe,
		MapPin,
		Percent,
		DollarSign,
		Calendar,
		Save,
		X,
		CheckCircle,
		AlertCircle,
		Briefcase,
		Target
	} from '@lucide/svelte';
	import type { ActionData } from './$types';
	import { industryOptions, leadStatusOptions, sourceOptions, ratingOptions } from '$lib/data';
	let { form }: { form: ActionData } = $props();

	// Toast state
	let showToast = $state(false);
	let toastMessage = $state('');
	let toastType = $state('success'); // 'success' | 'error'
	let phoneError = $state('');

	let formData: Record<string, string> = $state({
		lead_title: '',
		opportunity_amount: '',
		website: '',
		industry: '',
		status: 'NEW',
		skype_ID: '',
		source: '',
		lead_attachment: '',
		probability: '',
		first_name: '',
		last_name: '',
		company: '',
		title: '',
		phone: '',
		email: '',
		address_line: '',
		city: '',
		street: '',
		state: '',
		postcode: '',
		country: '',
		description: '',
		rating: '',
		// Additional fields for better lead management
		linkedin_url: '',
		budget_range: '',
		decision_timeframe: '',
		pain_points: '',
		competitor_info: '',
		referral_source: '',
		last_contacted: '',
		next_follow_up: ''
	});

	let errors: Record<string, string> = $state({});

	/**
	 * Handles changes to form inputs
	 */
	function handleChange(event: Event) {
		const target = event.target as HTMLInputElement | null;
		if (!target || !('name' in target && 'value' in target)) return;
		const name = target.name as string;
		const value = target.value as string;
		if (typeof name === 'string' && typeof value === 'string') {
			(formData as Record<string, string>)[name] = value;
			// Clear error when user starts typing
			if (errors[name]) {
				errors[name] = '';
			}
		}
	}

	/**
	 * Validates the form before submission.
	 */
	function validateForm() {
		errors = {};
		let isValid = true;

		// Required fields
		const requiredFields = {
			first_name: 'First name is required',
			last_name: 'Last name is required',
			lead_title: 'Lead title is required',
			email: 'Email is required'
		};

		// Check required fields
		Object.entries(requiredFields).forEach(([field, message]) => {
			if (!formData[field]?.trim()) {
				errors[field] = message;
				isValid = false;
			}
		});

		// Validate email format if provided
		if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			errors.email = 'Please enter a valid email address';
			isValid = false;
		}

		// Validate phone format if provided
		if (formData.phone && formData.phone.trim().length > 0) {
			if (
				!isPossiblePhoneNumber(formData.phone, 'US') ||
				!isValidPhoneNumber(formData.phone, 'US')
			) {
				errors.phone = 'Please enter a valid phone number';
				isValid = false;
			}
		}

		// Validate website URL if provided
		if (formData.website && !/^https?:\/\/.+/.test(formData.website)) {
			errors.website = 'Please enter a valid website URL (include http:// or https://)';
			isValid = false;
		}

		// Validate LinkedIn URL if provided
		if (
			formData.linkedin_url &&
			!/^https?:\/\/(www\.)?linkedin\.com\//.test(formData.linkedin_url)
		) {
			errors.linkedin_url = 'Please enter a valid LinkedIn URL';
			isValid = false;
		}

		// Validate probability range
		if (
			formData.probability &&
			(Number(formData.probability) < 0 || Number(formData.probability) > 100)
		) {
			errors.probability = 'Probability must be between 0 and 100';
			isValid = false;
		}

		return isValid;
	}

	// Submitting indicator
	let isSubmitting = $state(false);

	/**
	 * Resets the form to its initial state
	 */
	function resetForm() {
		formData = {
			lead_title: '',
			opportunity_amount: '',
			website: '',
			industry: '',
			status: 'NEW',
			skype_ID: '',
			source: '',
			lead_attachment: '',
			probability: '',
			first_name: '',
			last_name: '',
			company: '',
			title: '',
			phone: '',
			email: '',
			address_line: '',
			city: '',
			street: '',
			state: '',
			postcode: '',
			country: '',
			description: '',
			rating: '',
			linkedin_url: '',
			budget_range: '',
			decision_timeframe: '',
			pain_points: '',
			competitor_info: '',
			referral_source: '',
			last_contacted: '',
			next_follow_up: ''
		};
		errors = {};
	}

	function showNotification(message: string, type: 'success' | 'error' = 'success') {
		toastMessage = message;
		toastType = type;
		showToast = true;
		setTimeout(() => (showToast = false), 5000);
	}

	function validatePhone() {
		const input = formData.phone.trim();
		if (!input) {
			phoneError = '';
			return;
		}
		if (!isPossiblePhoneNumber(input, 'US') || !isValidPhoneNumber(input, 'US')) {
			phoneError = 'Invalid phone number';
			return;
		}
		phoneError = '';
	}

	function formatPhone() {
		if (!formData.phone.trim()) return;
		formData.phone = formatPhoneNumber(formData.phone);
		validatePhone();
	}
</script>

<!-- Main container -->
<div class="min-h-screen bg-gray-50 py-8 dark:bg-gray-900">
	<!-- Toast notification -->
	{#if showToast}
		<div class="fixed right-4 top-4 z-50" in:fade>
			<div
				class="flex items-center rounded-lg p-4 shadow-lg {toastType === 'success'
					? 'border border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20'
					: 'border border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20'}"
			>
				<div class="flex-shrink-0">
					{#if toastType === 'success'}
						<CheckCircle class="h-5 w-5 text-green-400 dark:text-green-400" />
					{:else}
						<AlertCircle class="h-5 w-5 text-red-400 dark:text-red-400" />
					{/if}
				</div>
				<div class="ml-3">
					<p
						class="text-sm font-medium {toastType === 'success'
							? 'text-green-800 dark:text-green-200'
							: 'text-red-800 dark:text-red-200'}"
					>
						{toastMessage}
					</p>
				</div>
				<button
					onclick={() => (showToast = false)}
					class="-mx-1.5 -my-1.5 ml-auto rounded-lg p-1.5 {toastType === 'success'
						? 'text-green-500 hover:bg-green-100 dark:text-green-400 dark:hover:bg-green-800/30'
						: 'text-red-500 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-800/30'}"
				>
					<X class="h-4 w-4" />
				</button>
			</div>
		</div>
	{/if}

	<div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
		<!-- Header -->
		<div
			class="mb-6 rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800"
		>
			<div class="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
				<div class="flex items-center justify-between">
					<div>
						<h1 class="flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-white">
							<Target class="h-6 w-6 text-blue-600 dark:text-blue-400" />
							Create New Lead
						</h1>
						<p class="mt-1 text-gray-600 dark:text-gray-300">
							Capture lead information and start building relationships
						</p>
					</div>
				</div>
			</div>
		</div>

		<!-- Show error if returned from server -->
		{#if form?.error}
			<div
				class="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20"
			>
				<div class="flex items-center">
					<AlertCircle class="mr-2 h-5 w-5 text-red-400 dark:text-red-400" />
					<span class="font-medium text-red-800 dark:text-red-200">Error:</span>
					<span class="ml-1 text-red-700 dark:text-red-300">{form.error}</span>
				</div>
			</div>
		{/if}

		<!-- Main Form -->
		<form
			method="POST"
			use:enhance={({ formData, cancel }) => {
				if (!validateForm()) {
					cancel();
					return;
				}

				isSubmitting = true;

				return async ({ result }) => {
					isSubmitting = false;

					if (result.type === 'success') {
						showNotification('Lead created successfully!', 'success');
						resetForm();
						setTimeout(() => goto('/app/leads'), 1500);
					} else if (result.type === 'failure') {
						const errorMessage =
							result.data && typeof result.data === 'object' && 'error' in result.data
								? String(result.data.error)
								: 'Failed to create lead';
						showNotification(errorMessage, 'error');
					}
				};
			}}
			class="space-y-6"
		>
			<!-- Lead Information Section -->
			<div
				class="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800"
			>
				<div class="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
					<h2 class="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
						<Briefcase class="h-5 w-5 text-blue-600 dark:text-blue-400" />
						Lead Information
					</h2>
				</div>
				<div class="p-6">
					<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
						<!-- Lead Title -->
						<div class="md:col-span-2">
							<label
								for="lead_title"
								class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
							>
								Lead Title *
							</label>
							<input
								id="lead_title"
								name="lead_title"
								type="text"
								bind:value={formData.lead_title}
								oninput={handleChange}
								placeholder="Enter lead title"
								required
								class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-500 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-400 dark:focus:ring-blue-400 {errors.lead_title
									? 'border-red-500 ring-1 ring-red-500 dark:border-red-400 dark:ring-red-400'
									: ''}"
							/>
							{#if errors.lead_title}
								<p class="mt-1 text-sm text-red-500 dark:text-red-400">{errors.lead_title}</p>
							{/if}
						</div>

						<!-- Company -->
						<div>
							<label
								for="company"
								class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
							>
								<Building class="mr-1 inline h-4 w-4" />
								Company
							</label>
							<input
								id="company"
								name="company"
								type="text"
								bind:value={formData.company}
								oninput={handleChange}
								placeholder="Company name"
								class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-500 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-400 dark:focus:ring-blue-400"
							/>
						</div>

						<!-- Lead Source -->
						<div>
							<label
								for="source"
								class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
							>
								Lead Source
							</label>
							<select
								id="source"
								name="source"
								bind:value={formData.source}
								onchange={handleChange}
								class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400"
							>
								<option value="">Select source</option>
								{#each sourceOptions as { value, label }}
									<option {value}>{label}</option>
								{/each}
							</select>
						</div>

						<!-- Industry -->
						<div>
							<label
								for="industry"
								class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
							>
								Industry
							</label>
							<select
								id="industry"
								name="industry"
								bind:value={formData.industry}
								onchange={handleChange}
								class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400"
							>
								<option value="">Select industry</option>
								{#each industryOptions as { value, label }}
									<option {value}>{label}</option>
								{/each}
							</select>
						</div>

						<!-- Status -->
						<div>
							<label
								for="status"
								class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
							>
								Status
							</label>
							<select
								id="status"
								name="status"
								bind:value={formData.status}
								onchange={handleChange}
								class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400"
							>
								{#each leadStatusOptions as { value, label }}
									<option {value}>{label}</option>
								{/each}
							</select>
						</div>

						<!-- Rating -->
						<div>
							<label
								for="rating"
								class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
							>
								Rating
							</label>
							<select
								id="rating"
								name="rating"
								bind:value={formData.rating}
								onchange={handleChange}
								class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400"
							>
								{#each ratingOptions as { value, label }}
									<option {value}>{label}</option>
								{/each}
							</select>
						</div>

						<!-- Website -->
						<div>
							<label
								for="website"
								class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
							>
								<Globe class="mr-1 inline h-4 w-4" />
								Website
							</label>
							<input
								id="website"
								name="website"
								type="url"
								bind:value={formData.website}
								oninput={handleChange}
								placeholder="https://company.com"
								class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-500 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-400 dark:focus:ring-blue-400 {errors.website
									? 'border-red-500 ring-1 ring-red-500 dark:border-red-400 dark:ring-red-400'
									: ''}"
							/>
							{#if errors.website}
								<p class="mt-1 text-sm text-red-500 dark:text-red-400">{errors.website}</p>
							{/if}
						</div>

						<!-- Opportunity Amount -->
						<div>
							<label
								for="opportunity_amount"
								class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
							>
								<DollarSign class="mr-1 inline h-4 w-4" />
								Opportunity Amount
							</label>
							<input
								type="number"
								id="opportunity_amount"
								name="opportunity_amount"
								bind:value={formData.opportunity_amount}
								oninput={handleChange}
								placeholder="0"
								min="0"
								step="0.01"
								class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-500 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-400 dark:focus:ring-blue-400"
							/>
						</div>

						<!-- Probability -->
						<div>
							<label
								for="probability"
								class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
							>
								<Percent class="mr-1 inline h-4 w-4" />
								Probability (%)
							</label>
							<input
								id="probability"
								name="probability"
								type="number"
								min="0"
								max="100"
								bind:value={formData.probability}
								oninput={handleChange}
								placeholder="50"
								class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-500 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-400 dark:focus:ring-blue-400 {errors.probability
									? 'border-red-500 ring-1 ring-red-500 dark:border-red-400 dark:ring-red-400'
									: ''}"
							/>
							{#if errors.probability}
								<p class="mt-1 text-sm text-red-500 dark:text-red-400">{errors.probability}</p>
							{/if}
						</div>

						<!-- Budget Range -->
						<div>
							<label
								for="budget_range"
								class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
							>
								Budget Range
							</label>
							<select
								id="budget_range"
								name="budget_range"
								bind:value={formData.budget_range}
								onchange={handleChange}
								class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400"
							>
								<option value="">Select budget range</option>
								<option value="under_10k">Under $10K</option>
								<option value="10k_50k">$10K - $50K</option>
								<option value="50k_100k">$50K - $100K</option>
								<option value="100k_500k">$100K - $500K</option>
								<option value="500k_plus">$500K+</option>
							</select>
						</div>

						<!-- Decision Timeframe -->
						<div>
							<label
								for="decision_timeframe"
								class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
							>
								<Calendar class="mr-1 inline h-4 w-4" />
								Decision Timeframe
							</label>
							<select
								id="decision_timeframe"
								name="decision_timeframe"
								bind:value={formData.decision_timeframe}
								onchange={handleChange}
								class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400"
							>
								<option value="">Select timeframe</option>
								<option value="immediate">Immediate (&lt; 1 month)</option>
								<option value="short_term">Short term (1-3 months)</option>
								<option value="medium_term">Medium term (3-6 months)</option>
								<option value="long_term">Long term (6+ months)</option>
							</select>
						</div>
					</div>
				</div>
			</div>

			<!-- Contact Section -->
			<div
				class="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800"
			>
				<div class="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
					<h2 class="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
						<User class="h-5 w-5 text-blue-600 dark:text-blue-400" />
						Contact Information
					</h2>
				</div>
				<div class="p-6">
					<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
						<!-- First Name -->
						<div>
							<label
								for="first_name"
								class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
							>
								First Name *
							</label>
							<input
								id="first_name"
								name="first_name"
								type="text"
								bind:value={formData.first_name}
								oninput={handleChange}
								placeholder="First name"
								required
								class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-500 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-400 dark:focus:ring-blue-400 {errors.first_name
									? 'border-red-500 ring-1 ring-red-500 dark:border-red-400 dark:ring-red-400'
									: ''}"
							/>
							{#if errors.first_name}
								<p class="mt-1 text-sm text-red-500 dark:text-red-400">{errors.first_name}</p>
							{/if}
						</div>

						<!-- Last Name -->
						<div>
							<label
								for="last_name"
								class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
							>
								Last Name *
							</label>
							<input
								id="last_name"
								name="last_name"
								type="text"
								bind:value={formData.last_name}
								oninput={handleChange}
								placeholder="Last name"
								required
								class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-500 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-400 dark:focus:ring-blue-400 {errors.last_name
									? 'border-red-500 ring-1 ring-red-500 dark:border-red-400 dark:ring-red-400'
									: ''}"
							/>
							{#if errors.last_name}
								<p class="mt-1 text-sm text-red-500 dark:text-red-400">{errors.last_name}</p>
							{/if}
						</div>

						<!-- Job Title -->
						<div>
							<label
								for="title"
								class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
							>
								Job Title
							</label>
							<input
								id="title"
								name="title"
								type="text"
								bind:value={formData.title}
								oninput={handleChange}
								placeholder="Job title"
								class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-500 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-400 dark:focus:ring-blue-400"
							/>
						</div>

						<!-- Phone Number -->
						<div>
							<label
								for="phone"
								class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
							>
								<Phone class="mr-1 inline h-4 w-4" />
								Phone
							</label>
							<input
								id="phone"
								name="phone"
								type="tel"
								bind:value={formData.phone}
								oninput={handleChange}
								onblur={formatPhone}
								placeholder="+1 (555) 123-4567"
								class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-500 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-400 dark:focus:ring-blue-400 {errors.phone ||
								phoneError
									? 'border-red-500 ring-1 ring-red-500 dark:border-red-400 dark:ring-red-400'
									: ''}"
							/>
							{#if errors.phone}
								<p class="mt-1 text-sm text-red-500 dark:text-red-400">{errors.phone}</p>
							{/if}
							{#if phoneError}
								<p class="mt-1 text-sm text-red-500 dark:text-red-400">{phoneError}</p>
							{/if}
						</div>

						<!-- Email Address -->
						<div class="md:col-span-2">
							<label
								for="email"
								class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
							>
								<Mail class="mr-1 inline h-4 w-4" />
								Email *
							</label>
							<input
								id="email"
								type="email"
								name="email"
								bind:value={formData.email}
								oninput={handleChange}
								placeholder="email@company.com"
								required
								class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-500 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-400 dark:focus:ring-blue-400 {errors.email
									? 'border-red-500 ring-1 ring-red-500 dark:border-red-400 dark:ring-red-400'
									: ''}"
							/>
							{#if errors.email}
								<p class="mt-1 text-sm text-red-500 dark:text-red-400">{errors.email}</p>
							{/if}
						</div>

						<!-- LinkedIn URL -->
						<div class="md:col-span-2">
							<label
								for="linkedin_url"
								class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
							>
								LinkedIn Profile
							</label>
							<input
								id="linkedin_url"
								name="linkedin_url"
								type="url"
								bind:value={formData.linkedin_url}
								oninput={handleChange}
								placeholder="https://linkedin.com/in/username"
								class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-500 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-400 dark:focus:ring-blue-400 {errors.linkedin_url
									? 'border-red-500 ring-1 ring-red-500 dark:border-red-400 dark:ring-red-400'
									: ''}"
							/>
							{#if errors.linkedin_url}
								<p class="mt-1 text-sm text-red-500 dark:text-red-400">{errors.linkedin_url}</p>
							{/if}
						</div>
					</div>
				</div>
			</div>

			<!-- Address Section -->
			<div
				class="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800"
			>
				<div class="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
					<h2 class="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
						<MapPin class="h-5 w-5 text-blue-600 dark:text-blue-400" />
						Address Information
					</h2>
				</div>
				<div class="p-6">
					<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
						<!-- Address Lane -->
						<div class="md:col-span-2">
							<label
								for="address_line"
								class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
							>
								Address Line
							</label>
							<input
								id="address_line"
								name="address_line"
								type="text"
								bind:value={formData.address_line}
								oninput={handleChange}
								placeholder="Street address"
								class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-500 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-400 dark:focus:ring-blue-400"
							/>
						</div>

						<div>
							<label
								for="city"
								class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">City</label
							>
							<input
								id="city"
								name="city"
								type="text"
								bind:value={formData.city}
								oninput={handleChange}
								placeholder="City"
								class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-500 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-400 dark:focus:ring-blue-400"
							/>
						</div>

						<div>
							<label
								for="state"
								class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">State</label
							>
							<input
								id="state"
								name="state"
								type="text"
								bind:value={formData.state}
								oninput={handleChange}
								placeholder="State"
								class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-500 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-400 dark:focus:ring-blue-400"
							/>
						</div>

						<div>
							<label
								for="postcode"
								class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
								>Postal Code</label
							>
							<input
								id="postcode"
								name="postcode"
								type="text"
								bind:value={formData.postcode}
								oninput={handleChange}
								placeholder="Postal code"
								class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-500 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-400 dark:focus:ring-blue-400"
							/>
						</div>

						<div>
							<label
								for="country"
								class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
								>Country</label
							>
							<input
								id="country"
								name="country"
								type="text"
								bind:value={formData.country}
								oninput={handleChange}
								placeholder="Country"
								class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-500 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-400 dark:focus:ring-blue-400"
							/>
						</div>
					</div>
				</div>
			</div>

			<!-- Additional Details Section -->
			<div
				class="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800"
			>
				<div class="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
					<h2 class="text-lg font-semibold text-gray-900 dark:text-white">Additional Details</h2>
				</div>
				<div class="space-y-6 p-6">
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
							oninput={handleChange}
							placeholder="Additional notes about this lead..."
							rows="3"
							class="resize-vertical w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-500 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-400 dark:focus:ring-blue-400"
						></textarea>
					</div>

					<!-- Pain Points -->
					<div>
						<label
							for="pain_points"
							class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
						>
							Pain Points
						</label>
						<textarea
							id="pain_points"
							name="pain_points"
							bind:value={formData.pain_points}
							oninput={handleChange}
							placeholder="What challenges is the lead facing?"
							rows="3"
							class="resize-vertical w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-500 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-400 dark:focus:ring-blue-400"
						></textarea>
					</div>

					<!-- Follow-up Dates -->
					<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
						<div>
							<label
								for="last_contacted"
								class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
							>
								Last Contacted
							</label>
							<input
								id="last_contacted"
								name="last_contacted"
								type="date"
								bind:value={formData.last_contacted}
								oninput={handleChange}
								class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400"
							/>
						</div>

						<div>
							<label
								for="next_follow_up"
								class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
							>
								Next Follow-up
							</label>
							<input
								id="next_follow_up"
								name="next_follow_up"
								type="date"
								bind:value={formData.next_follow_up}
								oninput={handleChange}
								class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400"
							/>
						</div>
					</div>
				</div>
			</div>

			<!-- Submit Button -->
			<div
				class="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800"
			>
				<div class="px-6 py-4">
					<div class="flex justify-end gap-4">
						<button
							type="button"
							onclick={() => goto('/app/leads/')}
							disabled={isSubmitting}
							class="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-2 text-gray-700 transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:focus:ring-blue-400 dark:focus:ring-offset-gray-800"
						>
							<X class="h-4 w-4" />
							Cancel
						</button>
						<button
							type="submit"
							disabled={isSubmitting}
							class="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-400 dark:focus:ring-offset-gray-800"
						>
							{#if isSubmitting}
								<div
									class="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
								></div>
								Creating...
							{:else}
								<Save class="h-4 w-4" />
								Create Lead
							{/if}
						</button>
					</div>
				</div>
			</div>
		</form>
	</div>
</div>
