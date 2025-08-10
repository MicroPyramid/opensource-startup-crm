<script lang="ts">
	import '../../app.css';
	import {
		Menu,
		Bell,
		User,
		Search,
		FileText,
		Settings,
		ChartBar,
		Home,
		X,
		LogOut
	} from '@lucide/svelte';

	import type { Snippet } from 'svelte';
	let { data, children }: { data?: any; children: Snippet } = $props();

	let mobileMenuOpen = $state(false);

	const handleLogout = () => {
		// Perform logout action - you might want to redirect to logout endpoint
		window.location.href = '/logout';
	};
</script>

<div class="min-h-screen bg-gray-50">
	<!-- Top navigation -->
	<header class="border-b border-gray-200 bg-white shadow-sm">
		<div class="px-4 sm:px-6 lg:px-8">
			<div class="flex h-16 items-center justify-between">
				<!-- Logo and primary navigation -->
				<div class="flex items-center">
					<!-- Logo -->
					<div class="flex-shrink-0">
						<h1 class="text-xl font-bold text-blue-600">BottleCRM</h1>
					</div>

					<!-- Desktop navigation -->
					<nav class="hidden md:ml-8 md:flex md:space-x-1">
						<a
							href="/admin"
							class="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-blue-600"
						>
							<Home class="mr-2 h-4 w-4" />
							Dashboard
						</a>
						<a
							href="/admin/blogs"
							class="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-blue-600"
						>
							<FileText class="mr-2 h-4 w-4" />
							Blog Posts
						</a>
						<a
							href="/admin/contacts"
							class="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-blue-600"
						>
							<User class="mr-2 h-4 w-4" />
							Contact Submissions
						</a>
						<a
							href="/admin/newsletter"
							class="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-blue-600"
						>
							<ChartBar class="mr-2 h-4 w-4" />
							Newsletter
						</a>
					</nav>
				</div>

				<!-- Right side items -->
				<div class="flex items-center space-x-4">
					<!-- User logout -->
					<a
						class="flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-red-50 hover:text-red-600"
						href="/logout"
					>
						<LogOut class="h-4 w-4" />
						<span class="hidden sm:block">Logout</span>
					</a>

					<!-- Mobile menu button -->
					<button
						class="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 md:hidden"
						onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
					>
						{#if mobileMenuOpen}
							<X class="h-6 w-6" />
						{:else}
							<Menu class="h-6 w-6" />
						{/if}
					</button>
				</div>
			</div>
		</div>

		<!-- Mobile navigation menu -->
		{#if mobileMenuOpen}
			<div class="border-t border-gray-200 md:hidden">
				<nav class="space-y-1 px-4 py-3">
					<a
						href="/admin"
						class="flex items-center rounded-md px-3 py-2 text-base font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-blue-600"
						onclick={() => (mobileMenuOpen = false)}
					>
						<Home class="mr-3 h-5 w-5" />
						Dashboard
					</a>
					<a
						href="/admin/blogs"
						class="flex items-center rounded-md px-3 py-2 text-base font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-blue-600"
						onclick={() => (mobileMenuOpen = false)}
					>
						<FileText class="mr-3 h-5 w-5" />
						Blog Posts
					</a>
					<a
						href="/admin/contacts"
						class="flex items-center rounded-md px-3 py-2 text-base font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-blue-600"
						onclick={() => (mobileMenuOpen = false)}
					>
						<User class="mr-3 h-5 w-5" />
						Contact Submissions
					</a>
					<a
						href="/admin/analytics"
						class="flex items-center rounded-md px-3 py-2 text-base font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-blue-600"
						onclick={() => (mobileMenuOpen = false)}
					>
						<ChartBar class="mr-3 h-5 w-5" />
						Analytics
					</a>

					<!-- Mobile logout -->
					<button
						class="flex w-full items-center rounded-md px-3 py-2 text-base font-medium text-gray-700 transition-colors hover:bg-red-50 hover:text-red-600"
						onclick={handleLogout}
					>
						<LogOut class="mr-3 h-5 w-5" />
						Logout
					</button>

					<!-- Mobile search -->
					<div class="pt-2">
						<div class="relative">
							<label for="admin-search" class="sr-only">Search</label>
							<Search
								class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400"
							/>
							<input
								id="admin-search"
								type="text"
								placeholder="Search..."
								class="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
					</div>
				</nav>
			</div>
		{/if}
	</header>

	<!-- Main content area -->
	<main class="">
		{@render children()}
	</main>
</div>
