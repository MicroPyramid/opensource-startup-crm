<script lang="ts">
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
	import { formatPhoneNumber } from '$lib/utils/phone';
	import { isValidPhoneNumber, isPossiblePhoneNumber } from 'libphonenumber-js';
	let account: any = data.account;
	let name = $state(account.name);
	let industry = $state(account.industry || '');
	let type = $state(account.type || '');
	let website = $state(account.website || '');
	let phone = $state(account.phone || '');
	let phoneError = $state('');

	function validatePhone() {
		const input = phone.trim();
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
		if (!phone.trim()) return;
		phone = formatPhoneNumber(phone);
		validatePhone();
	}
</script>

<div class="mx-auto mt-8 max-w-xl rounded bg-white shadow dark:bg-gray-800">
	<h2 class="mb-4 text-2xl font-bold text-gray-900 dark:text-white">Edit Account</h2>
	<form method="POST" class="space-y-4">
		<div>
			<label for="name" class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
				>Name<span class="text-red-500">*</span></label
			>
			<input
				id="name"
				name="name"
				bind:value={name}
				required
				class="w-full rounded border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
			/>
		</div>
		<div>
			<label for="industry" class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
				>Industry</label
			>
			<input
				id="industry"
				name="industry"
				bind:value={industry}
				class="w-full rounded border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
			/>
		</div>
		<div>
			<label for="type" class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
				>Type</label
			>
			<input
				id="type"
				name="type"
				bind:value={type}
				class="w-full rounded border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
			/>
		</div>
		<div>
			<label for="website" class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
				>Website</label
			>
			<input
				id="website"
				name="website"
				bind:value={website}
				class="w-full rounded border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
			/>
		</div>
		<div>
			<label for="phone" class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
				>Phone</label
			>
			<input
				id="phone"
				name="phone"
				bind:value={phone}
				type="tel"
				oninput={validatePhone}
				onblur={formatPhone}
				class="w-full rounded border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
			/>
			{#if phoneError}
				<p class="mt-1 text-sm text-red-600 dark:text-red-400">{phoneError}</p>
			{/if}
		</div>
		<div class="mt-6 flex gap-2">
			<button
				type="submit"
				class="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
				>Save</button
			>
			<a
				href={`/app/accounts/${account.id}`}
				class="rounded bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
				>Cancel</a
			>
		</div>
	</form>
</div>
