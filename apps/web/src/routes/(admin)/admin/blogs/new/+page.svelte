<script lang="ts">
	import { enhance } from '$app/forms';

	import type { PageProps } from './$types';
	let { form }: PageProps = $props();

	let title = $state('');
	let excerpt = $state('');

	function make_slug(title: string) {
		return title
			.toLowerCase()
			.replace(/\s+/g, '-')
			.replace(/[^\w-]+/g, '');
	}

	let slug = $derived(make_slug(title));
</script>

<div class="mx-auto mt-10 max-w-xl rounded bg-white p-6 shadow">
	<h1 class="mb-6 text-2xl font-bold">Create New Blog</h1>

	{#if form?.error}
		<div class="mb-4 rounded border border-red-400 bg-red-100 p-3 text-red-700">
			{form.error}
		</div>
	{/if}

	{#if form?.success}
		<div class="mb-4 rounded border border-green-400 bg-green-100 p-3 text-green-700">
			Blog post created successfully!
		</div>
	{/if}

	<form method="POST" class="space-y-4" use:enhance>
		<div>
			<label for="title" class="mb-1 block font-medium">Title</label>
			<input
				class="w-full rounded border px-3 py-2"
				id="title"
				name="title"
				bind:value={title}
				required
			/>
		</div>
		<div>
			<label for="excerpt" class="mb-1 block font-medium">Excerpt</label>
			<textarea
				class="w-full rounded border px-3 py-2"
				id="excerpt"
				name="excerpt"
				bind:value={excerpt}
				required
				rows="2"
			></textarea>
		</div>
		<div>
			<label for="slug" class="mb-1 block font-medium">Slug</label>
			<input
				class="w-full rounded border px-3 py-2"
				id="slug"
				name="slug"
				bind:value={slug}
				required
			/>
		</div>

		<button type="submit" class="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
			>Create Blog</button
		>
	</form>
</div>
