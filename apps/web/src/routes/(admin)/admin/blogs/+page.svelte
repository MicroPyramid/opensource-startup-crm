<script lang="ts">
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
</script>

<div class="container mx-auto px-4 py-8">
	<h1 class="mb-6 text-2xl font-bold">Blogs</h1>
	<div class="mb-4 flex justify-end">
		<a
			href="/admin/blogs/new"
			class="inline-block rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
		>
			+ New Blog
		</a>
	</div>
	<table class="min-w-full rounded-lg border border-gray-200 bg-white shadow">
		<thead>
			<tr class="bg-gray-100">
				<th class="border-b px-4 py-2 text-left">Title</th>
				<th class="border-b px-4 py-2 text-left">Category</th>
				<th class="border-b px-4 py-2 text-left">Draft</th>
				<th class="border-b px-4 py-2 text-left">Created At</th>
				<th class="border-b px-4 py-2 text-left">Updated At</th>
			</tr>
		</thead>
		<tbody>
			{#each data.blogs as blog}
				<tr class="hover:bg-gray-50">
					<td class="border-b px-4 py-2"
						><a href="/admin/blogs/{blog.id}/">{blog.title}</a> -
						<a href="/admin/blogs/{blog.id}/edit/">Edit</a></td
					>
					<td class="border-b px-4 py-2">N/A</td>
					<td class="border-b px-4 py-2">
						{#if blog.draft}
							<span
								class="inline-block rounded bg-yellow-100 px-2 py-1 text-xs font-semibold text-yellow-800"
								>Draft</span
							>
						{:else}
							<span
								class="inline-block rounded bg-green-100 px-2 py-1 text-xs font-semibold text-green-800"
								>Published</span
							>
						{/if}
					</td>
					<td class="border-b px-4 py-2">{new Date(blog.createdAt).toLocaleString()}</td>
					<td class="border-b px-4 py-2">{new Date(blog.updatedAt).toLocaleString()}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
