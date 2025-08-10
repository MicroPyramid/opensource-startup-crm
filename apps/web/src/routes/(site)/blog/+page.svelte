<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { formatDate } from '$lib/utils/date';
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();

	// Destructure the data with proper type checking
	const posts = data.posts || [];
	const pagination = data.pagination || {
		page: 1,
		totalPages: 1,
		hasNextPage: false,
		hasPreviousPage: false
	};

	function limitWords(text: string, limit: number = 30): string {
		if (!text) return '';
		const words = text.split(' ');
		if (words.length <= limit) return text;

		return words.slice(0, limit).join(' ') + '...';
	}

	function changePage(newPage: number) {
		if (newPage < 1 || newPage > pagination.totalPages) return;

		const params = new URLSearchParams(page.url.searchParams);
		params.set('page', newPage.toString());
		goto(`?${params.toString()}`);
	}
</script>

<svelte:head>
	<title>Blog | BottleCRM</title>
	<meta name="description" content="Latest articles and updates from BottleCRM" />
</svelte:head>

<section class="bg-gradient-to-b from-blue-50 to-white py-16">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="text-center">
			<h1 class="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
				Our Blog
			</h1>
			<p class="mx-auto mt-5 max-w-xl text-xl text-gray-500">
				The latest news, articles, and resources from BottleCRM
			</p>
		</div>
	</div>
</section>

<section class="bg-white py-12">
	<div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
		{#if posts && posts.length > 0}
			<div class="space-y-10 divide-y divide-gray-200">
				{#each posts as post}
					<article class="pt-10 first:pt-0">
						<div class="flex flex-col lg:flex-row">
							<div class="flex-1">
								<div class="mb-2 flex items-center gap-3 text-sm text-gray-500">
									<time datetime={post.createdAt.toISOString()}
										>{formatDate(
											post.createdAt,
											'en-US',
											{
												year: 'numeric',
												month: 'long',
												day: 'numeric'
											},
											'-'
										)}</time
									>
									<span class="inline-block h-1 w-1 rounded-full bg-gray-300"></span>
								</div>

								<a href="/blog/{post.slug}" class="group block">
									<h2
										class="mb-3 text-2xl font-bold text-gray-900 transition-colors group-hover:text-blue-600"
									>
										{post.title}
									</h2>
								</a>

								{#if post.excerpt}
									<p class="mb-4 text-base leading-relaxed text-gray-600">
										{limitWords(post.excerpt, 40)}
									</p>
								{/if}

								<div class="mt-4">
									<a
										href="/blog/{post.slug}"
										class="flex items-center font-medium text-blue-600 hover:text-blue-800"
									>
										Read article
										<svg
											class="ml-1 h-4 w-4"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M14 5l7 7m0 0l-7 7m7-7H3"
											></path>
										</svg>
									</a>
								</div>
							</div>
						</div>
					</article>
				{/each}
			</div>

			<!-- Pagination controls -->
			{#if pagination.totalPages > 1}
				<div
					class="mt-12 flex flex-col items-center justify-between space-y-4 border-t border-gray-200 pt-6 sm:flex-row sm:space-y-0"
				>
					<div class="text-sm text-gray-700">
						Showing <span class="font-medium"
							>{(pagination.page - 1) * pagination.pageSize + 1}</span
						>
						to
						<span class="font-medium"
							>{Math.min(pagination.page * pagination.pageSize, pagination.totalPosts)}</span
						>
						of
						<span class="font-medium">{pagination.totalPosts}</span> blog posts
					</div>
					<div class="flex space-x-2">
						<button
							onclick={() => changePage(1)}
							class="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
							disabled={!pagination.hasPreviousPage}
						>
							First
						</button>
						<button
							onclick={() => changePage(pagination.page - 1)}
							class="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
							disabled={!pagination.hasPreviousPage}
						>
							Previous
						</button>
						<span
							class="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-700"
						>
							{pagination.page} / {pagination.totalPages}
						</span>
						<button
							onclick={() => changePage(pagination.page + 1)}
							class="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
							disabled={!pagination.hasNextPage}
						>
							Next
						</button>
						<button
							onclick={() => changePage(pagination.totalPages)}
							class="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
							disabled={!pagination.hasNextPage}
						>
							Last
						</button>
					</div>
				</div>
			{/if}
		{:else}
			<div class="py-16 text-center">
				<svg
					class="mx-auto h-12 w-12 text-gray-400"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="1"
						d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1M19 20a2 2 0 002-2V8a2 2 0 00-2-2h-5M8 12h8m-8 4h6"
					/>
				</svg>
				<h3 class="mt-2 text-lg font-medium text-gray-900">No blog posts yet</h3>
				<p class="mt-1 text-base text-gray-500">Check back soon for new content!</p>
			</div>
		{/if}
	</div>
</section>
