<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import {
		BarChart3,
		TrendingUp,
		DollarSign,
		Clock,
		Users,
		Target,
		Zap,
		Check,
		ChevronRight,
		ArrowRight,
		Filter,
		Calendar,
		Bell,
		RefreshCw,
		PieChart,
		Settings,
		Eye,
		Edit,
		Trash2,
		Plus,
		Move,
		Star,
		AlertCircle,
		CheckCircle,
		X,
		MessageSquare,
		FileText,
		Phone,
		Mail,
		GitBranch,
		Code
	} from '@lucide/svelte';

	let mounted = false;
	let selectedDeal: any = null;
	let showDealModal = false;

	onMount(() => {
		mounted = true;
	});

	/** Opens the deal details modal */
	function openDealDetails(deal: any) {
		selectedDeal = deal;
		showDealModal = true;
	}

	function closeDealModal() {
		showDealModal = false;
		selectedDeal = null;
	}

	function formatCurrency(value: number): string {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
			minimumFractionDigits: 0,
			maximumFractionDigits: 0
		}).format(value);
	}

	// JSON-LD schema for SaaS CRM SoftwareApplication
	const schema = {
		'@context': 'https://schema.org',
		'@type': 'SoftwareApplication',
		name: 'BottleCRM',
		image: 'https://bottlecrm.io/logo.png',
		url: 'https://bottlecrm.io/features/sales-pipeline',
		applicationCategory: 'BusinessApplication',
		operatingSystem: 'All',
		offers: {
			'@type': 'Offer',
			price: '0',
			priceCurrency: 'USD'
		},
		description:
			'Free open-source CRM with visual sales pipeline management, deal tracking, sales forecasting, and workflow automation.',
		publisher: {
			'@type': 'Organization',
			name: 'BottleCRM'
		}
	};
</script>

<svelte:head>
	<title>Free Sales Pipeline CRM | Visual Deal Tracking & Forecasting</title>
	<meta
		name="description"
		content="Free CRM with visual sales pipeline, deal tracking, sales forecasting & automation. Boost conversions with BottleCRM's open-source pipeline management."
	/>
	<link rel="canonical" href="https://bottlecrm.io/features/sales-pipeline" />

	<!-- Open Graph -->
	<meta property="og:title" content="Free Sales Pipeline CRM | Visual Deal Tracking" />
	<meta
		property="og:description"
		content="Open-source CRM for sales pipeline management, deal tracking, and forecasting. Try BottleCRM free."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://bottlecrm.io/features/sales-pipeline" />
	<meta property="og:image" content="https://bottlecrm.io/logo.png" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Free Sales Pipeline CRM | Visual Deal Tracking" />
	<meta
		name="twitter:description"
		content="Open-source CRM for sales pipeline management, deal tracking, and forecasting. Try BottleCRM free."
	/>
	<meta name="twitter:image" content="https://bottlecrm.io/logo.png" />

	<!-- Schema.org JSON-LD -->
	{@html `<script type="application/ld+json">${JSON.stringify(schema)}</script>`}
</svelte:head>

<!-- Hero Section -->
<section
	class="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white"
>
	<div class="absolute inset-0 bg-black/10"></div>
	<div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>

	<div class="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
		<div class="mx-auto max-w-4xl text-center">
			<div
				class="mb-6 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm"
			>
				<BarChart3 class="mr-2 h-4 w-4" />
				<span class="text-sm font-medium">Coming Soon • Visual Sales Pipeline Management</span>
			</div>

			<h1 class="mb-6 text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
				Visualize Your Sales Process with <span class="text-yellow-300"
					>Smart Pipeline Management</span
				>
			</h1>

			<p class="mb-8 text-xl leading-relaxed text-blue-100 md:text-2xl">
				Transform your sales workflow with BottleCRM's intuitive visual pipeline. Track deals from
				first contact to closed-won, forecast revenue accurately, and automate your sales process
				for maximum efficiency.
			</p>

			<!-- Value proposition points -->
			<ul class="mx-auto mb-8 max-w-2xl space-y-3 text-lg">
				<li class="flex items-center justify-center md:justify-start">
					<Check class="mr-3 h-6 w-6 flex-shrink-0 text-green-400" />
					<span>Drag-and-drop deal management</span>
				</li>
				<li class="flex items-center justify-center md:justify-start">
					<Check class="mr-3 h-6 w-6 flex-shrink-0 text-green-400" />
					<span>Automated sales forecasting</span>
				</li>
				<li class="flex items-center justify-center md:justify-start">
					<Check class="mr-3 h-6 w-6 flex-shrink-0 text-green-400" />
					<span>Real-time collaboration and insights</span>
				</li>
			</ul>

			<div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0">
				<a
					href="/login"
					class="inline-flex items-center justify-center rounded-lg border border-transparent bg-white px-6 py-4 text-base font-semibold text-blue-700 shadow-lg transition-all duration-200 hover:scale-105 hover:bg-gray-100"
				>
					<Eye class="mr-2 h-5 w-5" />
					Preview Pipeline Demo
				</a>
				<a
					href="/features"
					class="inline-flex items-center justify-center rounded-lg border-2 border-white px-6 py-4 text-base font-semibold text-white transition-all duration-200 hover:bg-white/10"
				>
					View All Features
				</a>
			</div>
		</div>
	</div>
</section>

<!-- Sales Metrics Overview -->
<section class="bg-white py-16">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-12 text-center">
			<h2 class="mb-4 text-3xl font-extrabold text-gray-900">
				Real-time Sales Performance Dashboard
			</h2>
			<p class="text-lg text-gray-600">
				Monitor key sales metrics and track your pipeline performance at a glance
			</p>
		</div>

		<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#if mounted}
				<div
					in:fly={{ y: 20, duration: 500, delay: 0 }}
					class="rounded-xl border border-gray-100 bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl"
				>
					<div class="mb-2 flex items-center justify-between">
						<h3 class="text-sm font-medium text-gray-500">Total Pipeline Value</h3>
						<span
							class="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800"
						>
							+12.5%
						</span>
					</div>
					<p class="text-3xl font-bold text-gray-900">$1.31M</p>
				</div>

				<div
					in:fly={{ y: 20, duration: 500, delay: 100 }}
					class="rounded-xl border border-gray-100 bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl"
				>
					<div class="mb-2 flex items-center justify-between">
						<h3 class="text-sm font-medium text-gray-500">Deals in Pipeline</h3>
						<span
							class="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800"
						>
							+8
						</span>
					</div>
					<p class="text-3xl font-bold text-gray-900">77</p>
				</div>

				<div
					in:fly={{ y: 20, duration: 500, delay: 200 }}
					class="rounded-xl border border-gray-100 bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl"
				>
					<div class="mb-2 flex items-center justify-between">
						<h3 class="text-sm font-medium text-gray-500">Average Deal Size</h3>
						<span
							class="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800"
						>
							+5.2%
						</span>
					</div>
					<p class="text-3xl font-bold text-gray-900">$17,013</p>
				</div>

				<div
					in:fly={{ y: 20, duration: 500, delay: 300 }}
					class="rounded-xl border border-gray-100 bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl"
				>
					<div class="mb-2 flex items-center justify-between">
						<h3 class="text-sm font-medium text-gray-500">Conversion Rate</h3>
						<span
							class="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800"
						>
							+2.1%
						</span>
					</div>
					<p class="text-3xl font-bold text-gray-900">23.5%</p>
				</div>

				<div
					in:fly={{ y: 20, duration: 500, delay: 400 }}
					class="rounded-xl border border-gray-100 bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl"
				>
					<div class="mb-2 flex items-center justify-between">
						<h3 class="text-sm font-medium text-gray-500">Sales Cycle</h3>
						<span
							class="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800"
						>
							-3 days
						</span>
					</div>
					<p class="text-3xl font-bold text-gray-900">28 days</p>
				</div>

				<div
					in:fly={{ y: 20, duration: 500, delay: 500 }}
					class="rounded-xl border border-gray-100 bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl"
				>
					<div class="mb-2 flex items-center justify-between">
						<h3 class="text-sm font-medium text-gray-500">Win Rate</h3>
						<span
							class="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800"
						>
							+4.8%
						</span>
					</div>
					<p class="text-3xl font-bold text-gray-900">65.2%</p>
				</div>
			{/if}
		</div>
	</div>
</section>

<!-- Interactive Pipeline Demo -->
<section class="bg-gray-50 py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<h2 class="mb-6 text-4xl font-extrabold text-gray-900 sm:text-5xl">
				Interactive Sales Pipeline Demo
			</h2>
			<p class="mx-auto max-w-3xl text-xl text-gray-600">
				Experience how BottleCRM's visual pipeline makes deal management intuitive and efficient.
				Drag deals between stages and watch your sales process come to life.
			</p>
		</div>

		<!-- Pipeline Board -->
		<div class="overflow-x-auto rounded-2xl bg-white p-6 shadow-xl">
			<div class="flex min-w-max space-x-6">
				<!-- Lead Stage -->
				<div class="w-80 flex-shrink-0">
					<div class="rounded-t-xl border-b-4 border-blue-500 bg-gray-50 p-4">
						<div class="mb-2 flex items-center justify-between">
							<h3 class="flex items-center font-bold text-gray-900">
								<div class="mr-2 h-3 w-3 rounded-full bg-blue-500"></div>
								Lead
							</h3>
							<span class="rounded-full bg-gray-200 px-2 py-1 text-sm font-medium text-gray-700"
								>24</span
							>
						</div>
						<p class="mb-2 text-sm text-gray-600">Initial prospects and incoming leads</p>
						<p class="text-lg font-bold text-gray-900">$120,000</p>
					</div>

					<div class="min-h-96 space-y-3 rounded-b-xl bg-gray-50 p-4">
						{#if mounted}
							<div
								in:fly={{ y: 20, duration: 400, delay: 0 }}
								class="group cursor-pointer rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md"
								role="button"
								tabindex="0"
							>
								<div class="mb-3 flex items-start justify-between">
									<h4 class="font-semibold text-gray-900 group-hover:text-blue-600">
										TechStart Inc.
									</h4>
									<button
										class="text-gray-400 opacity-0 transition-opacity hover:text-gray-600 group-hover:opacity-100"
									>
										<Move class="h-4 w-4" />
									</button>
								</div>

								<div class="space-y-2 text-sm">
									<div class="flex items-center justify-between">
										<span class="text-gray-600">Value:</span>
										<span class="font-semibold text-gray-900">$15,000</span>
									</div>
									<div class="flex items-center justify-between">
										<span class="text-gray-600">Probability:</span>
										<span class="font-semibold text-gray-900">20%</span>
									</div>
									<div class="flex items-center justify-between">
										<span class="text-gray-600">Contact:</span>
										<span class="font-medium text-gray-900">John Smith</span>
									</div>
								</div>

								<div class="mt-3">
									<div class="h-2 w-full rounded-full bg-gray-200">
										<div
											class="h-2 rounded-full bg-blue-500 transition-all duration-300"
											style="width: 20%"
										></div>
									</div>
								</div>

								<div class="mt-3 flex items-center justify-between border-t border-gray-100 pt-2">
									<span class="text-xs text-gray-500">2 hours ago</span>
									<div class="flex space-x-1">
										<button class="p-1 text-gray-400 transition-colors hover:text-blue-600">
											<Mail class="h-3 w-3" />
										</button>
										<button class="p-1 text-gray-400 transition-colors hover:text-green-600">
											<Phone class="h-3 w-3" />
										</button>
										<button class="p-1 text-gray-400 transition-colors hover:text-purple-600">
											<MessageSquare class="h-3 w-3" />
										</button>
									</div>
								</div>
							</div>

							<div
								in:fly={{ y: 20, duration: 400, delay: 50 }}
								class="group cursor-pointer rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md"
								role="button"
								tabindex="0"
							>
								<div class="mb-3 flex items-start justify-between">
									<h4 class="font-semibold text-gray-900 group-hover:text-blue-600">
										Digital Solutions
									</h4>
									<button
										class="text-gray-400 opacity-0 transition-opacity hover:text-gray-600 group-hover:opacity-100"
									>
										<Move class="h-4 w-4" />
									</button>
								</div>

								<div class="space-y-2 text-sm">
									<div class="flex items-center justify-between">
										<span class="text-gray-600">Value:</span>
										<span class="font-semibold text-gray-900">$8,500</span>
									</div>
									<div class="flex items-center justify-between">
										<span class="text-gray-600">Probability:</span>
										<span class="font-semibold text-gray-900">15%</span>
									</div>
									<div class="flex items-center justify-between">
										<span class="text-gray-600">Contact:</span>
										<span class="font-medium text-gray-900">Sarah Johnson</span>
									</div>
								</div>

								<div class="mt-3">
									<div class="h-2 w-full rounded-full bg-gray-200">
										<div
											class="h-2 rounded-full bg-blue-500 transition-all duration-300"
											style="width: 15%"
										></div>
									</div>
								</div>

								<div class="mt-3 flex items-center justify-between border-t border-gray-100 pt-2">
									<span class="text-xs text-gray-500">1 day ago</span>
									<div class="flex space-x-1">
										<button class="p-1 text-gray-400 transition-colors hover:text-blue-600">
											<Mail class="h-3 w-3" />
										</button>
										<button class="p-1 text-gray-400 transition-colors hover:text-green-600">
											<Phone class="h-3 w-3" />
										</button>
										<button class="p-1 text-gray-400 transition-colors hover:text-purple-600">
											<MessageSquare class="h-3 w-3" />
										</button>
									</div>
								</div>
							</div>
						{/if}

						<button
							class="group w-full rounded-lg border-2 border-dashed border-gray-300 p-4 text-gray-500 transition-colors hover:border-gray-400 hover:text-gray-600"
						>
							<Plus class="mx-auto mb-1 h-5 w-5 transition-transform group-hover:scale-110" />
							<span class="text-sm">Add Deal</span>
						</button>
					</div>
				</div>

				<!-- Qualified Stage -->
				<div class="w-80 flex-shrink-0">
					<div class="rounded-t-xl border-b-4 border-indigo-500 bg-gray-50 p-4">
						<div class="mb-2 flex items-center justify-between">
							<h3 class="flex items-center font-bold text-gray-900">
								<div class="mr-2 h-3 w-3 rounded-full bg-indigo-500"></div>
								Qualified
							</h3>
							<span class="rounded-full bg-gray-200 px-2 py-1 text-sm font-medium text-gray-700"
								>18</span
							>
						</div>
						<p class="mb-2 text-sm text-gray-600">Leads that meet qualification criteria</p>
						<p class="text-lg font-bold text-gray-900">$180,000</p>
					</div>

					<div class="min-h-96 space-y-3 rounded-b-xl bg-gray-50 p-4">
						{#if mounted}
							<div
								in:fly={{ y: 20, duration: 400, delay: 100 }}
								class="group cursor-pointer rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md"
								role="button"
								tabindex="0"
							>
								<div class="mb-3 flex items-start justify-between">
									<h4 class="font-semibold text-gray-900 group-hover:text-blue-600">
										Innovation Labs
									</h4>
									<button
										class="text-gray-400 opacity-0 transition-opacity hover:text-gray-600 group-hover:opacity-100"
									>
										<Move class="h-4 w-4" />
									</button>
								</div>

								<div class="space-y-2 text-sm">
									<div class="flex items-center justify-between">
										<span class="text-gray-600">Value:</span>
										<span class="font-semibold text-gray-900">$25,000</span>
									</div>
									<div class="flex items-center justify-between">
										<span class="text-gray-600">Probability:</span>
										<span class="font-semibold text-gray-900">40%</span>
									</div>
									<div class="flex items-center justify-between">
										<span class="text-gray-600">Contact:</span>
										<span class="font-medium text-gray-900">Emily Davis</span>
									</div>
								</div>

								<div class="mt-3">
									<div class="h-2 w-full rounded-full bg-gray-200">
										<div
											class="h-2 rounded-full bg-indigo-500 transition-all duration-300"
											style="width: 40%"
										></div>
									</div>
								</div>

								<div class="mt-3 flex items-center justify-between border-t border-gray-100 pt-2">
									<span class="text-xs text-gray-500">30 min ago</span>
									<div class="flex space-x-1">
										<button class="p-1 text-gray-400 transition-colors hover:text-blue-600">
											<Mail class="h-3 w-3" />
										</button>
										<button class="p-1 text-gray-400 transition-colors hover:text-green-600">
											<Phone class="h-3 w-3" />
										</button>
										<button class="p-1 text-gray-400 transition-colors hover:text-purple-600">
											<MessageSquare class="h-3 w-3" />
										</button>
									</div>
								</div>
							</div>
						{/if}

						<button
							class="group w-full rounded-lg border-2 border-dashed border-gray-300 p-4 text-gray-500 transition-colors hover:border-gray-400 hover:text-gray-600"
						>
							<Plus class="mx-auto mb-1 h-5 w-5 transition-transform group-hover:scale-110" />
							<span class="text-sm">Add Deal</span>
						</button>
					</div>
				</div>

				<!-- Proposal Stage -->
				<div class="w-80 flex-shrink-0">
					<div class="rounded-t-xl border-b-4 border-purple-500 bg-gray-50 p-4">
						<div class="mb-2 flex items-center justify-between">
							<h3 class="flex items-center font-bold text-gray-900">
								<div class="mr-2 h-3 w-3 rounded-full bg-purple-500"></div>
								Proposal
							</h3>
							<span class="rounded-full bg-gray-200 px-2 py-1 text-sm font-medium text-gray-700"
								>12</span
							>
						</div>
						<p class="mb-2 text-sm text-gray-600">Proposals sent and under review</p>
						<p class="text-lg font-bold text-gray-900">$240,000</p>
					</div>

					<div class="min-h-96 space-y-3 rounded-b-xl bg-gray-50 p-4">
						{#if mounted}
							<div
								in:fly={{ y: 20, duration: 400, delay: 200 }}
								class="group cursor-pointer rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md"
								role="button"
								tabindex="0"
							>
								<div class="mb-3 flex items-start justify-between">
									<h4 class="font-semibold text-gray-900 group-hover:text-blue-600">
										Enterprise Corp
									</h4>
									<button
										class="text-gray-400 opacity-0 transition-opacity hover:text-gray-600 group-hover:opacity-100"
									>
										<Move class="h-4 w-4" />
									</button>
								</div>

								<div class="space-y-2 text-sm">
									<div class="flex items-center justify-between">
										<span class="text-gray-600">Value:</span>
										<span class="font-semibold text-gray-900">$45,000</span>
									</div>
									<div class="flex items-center justify-between">
										<span class="text-gray-600">Probability:</span>
										<span class="font-semibold text-gray-900">60%</span>
									</div>
									<div class="flex items-center justify-between">
										<span class="text-gray-600">Contact:</span>
										<span class="font-medium text-gray-900">Lisa Anderson</span>
									</div>
								</div>

								<div class="mt-3">
									<div class="h-2 w-full rounded-full bg-gray-200">
										<div
											class="h-2 rounded-full bg-purple-500 transition-all duration-300"
											style="width: 60%"
										></div>
									</div>
								</div>

								<div class="mt-3 flex items-center justify-between border-t border-gray-100 pt-2">
									<span class="text-xs text-gray-500">1 hour ago</span>
									<div class="flex space-x-1">
										<button class="p-1 text-gray-400 transition-colors hover:text-blue-600">
											<Mail class="h-3 w-3" />
										</button>
										<button class="p-1 text-gray-400 transition-colors hover:text-green-600">
											<Phone class="h-3 w-3" />
										</button>
										<button class="p-1 text-gray-400 transition-colors hover:text-purple-600">
											<MessageSquare class="h-3 w-3" />
										</button>
									</div>
								</div>
							</div>
						{/if}

						<button
							class="group w-full rounded-lg border-2 border-dashed border-gray-300 p-4 text-gray-500 transition-colors hover:border-gray-400 hover:text-gray-600"
						>
							<Plus class="mx-auto mb-1 h-5 w-5 transition-transform group-hover:scale-110" />
							<span class="text-sm">Add Deal</span>
						</button>
					</div>
				</div>

				<!-- Negotiation Stage -->
				<div class="w-80 flex-shrink-0">
					<div class="rounded-t-xl border-b-4 border-orange-500 bg-gray-50 p-4">
						<div class="mb-2 flex items-center justify-between">
							<h3 class="flex items-center font-bold text-gray-900">
								<div class="mr-2 h-3 w-3 rounded-full bg-orange-500"></div>
								Negotiation
							</h3>
							<span class="rounded-full bg-gray-200 px-2 py-1 text-sm font-medium text-gray-700"
								>8</span
							>
						</div>
						<p class="mb-2 text-sm text-gray-600">Active contract negotiations</p>
						<p class="text-lg font-bold text-gray-900">$320,000</p>
					</div>

					<div class="min-h-96 space-y-3 rounded-b-xl bg-gray-50 p-4">
						{#if mounted}
							<div
								in:fly={{ y: 20, duration: 400, delay: 300 }}
								class="group cursor-pointer rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md"
								role="button"
								tabindex="0"
							>
								<div class="mb-3 flex items-start justify-between">
									<h4 class="font-semibold text-gray-900 group-hover:text-blue-600">
										Global Systems
									</h4>
									<button
										class="text-gray-400 opacity-0 transition-opacity hover:text-gray-600 group-hover:opacity-100"
									>
										<Move class="h-4 w-4" />
									</button>
								</div>

								<div class="space-y-2 text-sm">
									<div class="flex items-center justify-between">
										<span class="text-gray-600">Value:</span>
										<span class="font-semibold text-gray-900">$75,000</span>
									</div>
									<div class="flex items-center justify-between">
										<span class="text-gray-600">Probability:</span>
										<span class="font-semibold text-gray-900">80%</span>
									</div>
									<div class="flex items-center justify-between">
										<span class="text-gray-600">Contact:</span>
										<span class="font-medium text-gray-900">Jennifer Lee</span>
									</div>
								</div>

								<div class="mt-3">
									<div class="h-2 w-full rounded-full bg-gray-200">
										<div
											class="h-2 rounded-full bg-orange-500 transition-all duration-300"
											style="width: 80%"
										></div>
									</div>
								</div>

								<div class="mt-3 flex items-center justify-between border-t border-gray-100 pt-2">
									<span class="text-xs text-gray-500">15 min ago</span>
									<div class="flex space-x-1">
										<button class="p-1 text-gray-400 transition-colors hover:text-blue-600">
											<Mail class="h-3 w-3" />
										</button>
										<button class="p-1 text-gray-400 transition-colors hover:text-green-600">
											<Phone class="h-3 w-3" />
										</button>
										<button class="p-1 text-gray-400 transition-colors hover:text-purple-600">
											<MessageSquare class="h-3 w-3" />
										</button>
									</div>
								</div>
							</div>
						{/if}

						<button
							class="group w-full rounded-lg border-2 border-dashed border-gray-300 p-4 text-gray-500 transition-colors hover:border-gray-400 hover:text-gray-600"
						>
							<Plus class="mx-auto mb-1 h-5 w-5 transition-transform group-hover:scale-110" />
							<span class="text-sm">Add Deal</span>
						</button>
					</div>
				</div>

				<!-- Closed Won Stage -->
				<div class="w-80 flex-shrink-0">
					<div class="rounded-t-xl border-b-4 border-green-500 bg-gray-50 p-4">
						<div class="mb-2 flex items-center justify-between">
							<h3 class="flex items-center font-bold text-gray-900">
								<div class="mr-2 h-3 w-3 rounded-full bg-green-500"></div>
								Closed Won
							</h3>
							<span class="rounded-full bg-gray-200 px-2 py-1 text-sm font-medium text-gray-700"
								>15</span
							>
						</div>
						<p class="mb-2 text-sm text-gray-600">Successfully closed deals</p>
						<p class="text-lg font-bold text-gray-900">$450,000</p>
					</div>

					<div class="min-h-96 space-y-3 rounded-b-xl bg-gray-50 p-4">
						{#if mounted}
							<div
								in:fly={{ y: 20, duration: 400, delay: 400 }}
								class="group cursor-pointer rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md"
								role="button"
								tabindex="0"
							>
								<div class="mb-3 flex items-start justify-between">
									<h4 class="font-semibold text-gray-900 group-hover:text-blue-600">
										Success Stories
									</h4>
									<button
										class="text-gray-400 opacity-0 transition-opacity hover:text-gray-600 group-hover:opacity-100"
									>
										<Move class="h-4 w-4" />
									</button>
								</div>

								<div class="space-y-2 text-sm">
									<div class="flex items-center justify-between">
										<span class="text-gray-600">Value:</span>
										<span class="font-semibold text-gray-900">$60,000</span>
									</div>
									<div class="flex items-center justify-between">
										<span class="text-gray-600">Probability:</span>
										<span class="font-semibold text-gray-900">100%</span>
									</div>
									<div class="flex items-center justify-between">
										<span class="text-gray-600">Contact:</span>
										<span class="font-medium text-gray-900">Robert Chen</span>
									</div>
								</div>

								<div class="mt-3">
									<div class="h-2 w-full rounded-full bg-gray-200">
										<div
											class="h-2 rounded-full bg-green-500 transition-all duration-300"
											style="width: 100%"
										></div>
									</div>
								</div>

								<div class="mt-3 flex items-center justify-between border-t border-gray-100 pt-2">
									<span class="text-xs text-gray-500">Today</span>
									<div class="flex space-x-1">
										<button class="p-1 text-gray-400 transition-colors hover:text-blue-600">
											<Mail class="h-3 w-3" />
										</button>
										<button class="p-1 text-gray-400 transition-colors hover:text-green-600">
											<Phone class="h-3 w-3" />
										</button>
										<button class="p-1 text-gray-400 transition-colors hover:text-purple-600">
											<MessageSquare class="h-3 w-3" />
										</button>
									</div>
								</div>
							</div>
						{/if}

						<button
							class="group w-full rounded-lg border-2 border-dashed border-gray-300 p-4 text-gray-500 transition-colors hover:border-gray-400 hover:text-gray-600"
						>
							<Plus class="mx-auto mb-1 h-5 w-5 transition-transform group-hover:scale-110" />
							<span class="text-sm">Add Deal</span>
						</button>
					</div>
				</div>
			</div>
		</div>

		<!-- Pipeline Controls -->
		<div class="mt-8 flex flex-wrap items-center justify-between rounded-xl bg-white p-6 shadow-lg">
			<div class="mb-4 flex items-center space-x-4 lg:mb-0">
				<button
					class="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
				>
					<Filter class="mr-2 h-4 w-4" />
					Filter Deals
				</button>
				<button
					class="inline-flex items-center rounded-lg bg-gray-100 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-200"
				>
					<Calendar class="mr-2 h-4 w-4" />
					Date Range
				</button>
				<button
					class="inline-flex items-center rounded-lg bg-gray-100 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-200"
				>
					<RefreshCw class="mr-2 h-4 w-4" />
					Refresh
				</button>
			</div>

			<div class="flex items-center space-x-4">
				<span class="text-sm text-gray-600">Pipeline Value:</span>
				<span class="text-2xl font-bold text-gray-900">$1,310,000</span>
				<span class="text-sm font-medium text-green-600">+12.5% this month</span>
			</div>
		</div>
	</div>
</section>

<!-- Pipeline Features -->
<section class="bg-white py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<h2 class="mb-6 text-4xl font-extrabold text-gray-900 sm:text-5xl">
				Powerful Pipeline Features
			</h2>
			<p class="mx-auto max-w-3xl text-xl text-gray-600">
				Everything you need to manage your sales pipeline effectively and close more deals faster.
			</p>
		</div>

		<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#if mounted}
				<div
					in:fly={{ y: 30, duration: 600, delay: 0 }}
					class="group rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
				>
					<div
						class="mb-6 inline-block rounded-xl bg-gradient-to-r from-blue-100 to-indigo-100 p-4 transition-transform duration-300 group-hover:scale-110"
					>
						<Eye class="h-8 w-8 text-blue-600" />
					</div>

					<h3 class="mb-4 text-2xl font-bold text-gray-900">Visual Deal Tracking</h3>
					<p class="mb-6 leading-relaxed text-gray-600">
						See all your deals at a glance with our intuitive kanban-style pipeline view. Drag and
						drop deals between stages effortlessly.
					</p>

					<ul class="space-y-2">
						<li class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							Instant pipeline overview
						</li>
						<li class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							Drag-and-drop interface
						</li>
						<li class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							Real-time updates
						</li>
						<li class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							Color-coded stages
						</li>
					</ul>
				</div>

				<div
					in:fly={{ y: 30, duration: 600, delay: 100 }}
					class="group rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
				>
					<div
						class="mb-6 inline-block rounded-xl bg-gradient-to-r from-blue-100 to-indigo-100 p-4 transition-transform duration-300 group-hover:scale-110"
					>
						<TrendingUp class="h-8 w-8 text-blue-600" />
					</div>

					<h3 class="mb-4 text-2xl font-bold text-gray-900">Sales Forecasting</h3>
					<p class="mb-6 leading-relaxed text-gray-600">
						Predict future revenue with probability-based forecasting. Track sales velocity and
						identify bottlenecks in your process.
					</p>

					<ul class="space-y-2">
						<li class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							Revenue predictions
						</li>
						<li class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							Probability weighting
						</li>
						<li class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							Velocity tracking
						</li>
						<li class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							Trend analysis
						</li>
					</ul>
				</div>

				<div
					in:fly={{ y: 30, duration: 600, delay: 200 }}
					class="group rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
				>
					<div
						class="mb-6 inline-block rounded-xl bg-gradient-to-r from-blue-100 to-indigo-100 p-4 transition-transform duration-300 group-hover:scale-110"
					>
						<FileText class="h-8 w-8 text-blue-600" />
					</div>

					<h3 class="mb-4 text-2xl font-bold text-gray-900">Deal Management</h3>
					<p class="mb-6 leading-relaxed text-gray-600">
						Manage individual deals with detailed information, activity tracking, and automated
						reminders for follow-ups.
					</p>

					<ul class="space-y-2">
						<li class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							Deal details
						</li>
						<li class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							Activity timeline
						</li>
						<li class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							Automated reminders
						</li>
						<li class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							Contact integration
						</li>
					</ul>
				</div>

				<div
					in:fly={{ y: 30, duration: 600, delay: 300 }}
					class="group rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
				>
					<div
						class="mb-6 inline-block rounded-xl bg-gradient-to-r from-blue-100 to-indigo-100 p-4 transition-transform duration-300 group-hover:scale-110"
					>
						<PieChart class="h-8 w-8 text-blue-600" />
					</div>

					<h3 class="mb-4 text-2xl font-bold text-gray-900">Pipeline Analytics</h3>
					<p class="mb-6 leading-relaxed text-gray-600">
						Analyze your sales performance with detailed metrics, conversion rates, and
						stage-by-stage insights.
					</p>

					<ul class="space-y-2">
						<li class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							Conversion rates
						</li>
						<li class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							Stage analytics
						</li>
						<li class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							Performance metrics
						</li>
						<li class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							Historical data
						</li>
					</ul>
				</div>

				<div
					in:fly={{ y: 30, duration: 600, delay: 400 }}
					class="group rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
				>
					<div
						class="mb-6 inline-block rounded-xl bg-gradient-to-r from-blue-100 to-indigo-100 p-4 transition-transform duration-300 group-hover:scale-110"
					>
						<Zap class="h-8 w-8 text-blue-600" />
					</div>

					<h3 class="mb-4 text-2xl font-bold text-gray-900">Workflow Automation</h3>
					<p class="mb-6 leading-relaxed text-gray-600">
						Automate routine tasks like follow-up emails, stage transitions, and notification alerts
						to boost productivity.
					</p>

					<ul class="space-y-2">
						<li class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							Automated workflows
						</li>
						<li class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							Smart notifications
						</li>
						<li class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							Task automation
						</li>
						<li class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							Email sequences
						</li>
					</ul>
				</div>

				<div
					in:fly={{ y: 30, duration: 600, delay: 500 }}
					class="group rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
				>
					<div
						class="mb-6 inline-block rounded-xl bg-gradient-to-r from-blue-100 to-indigo-100 p-4 transition-transform duration-300 group-hover:scale-110"
					>
						<Users class="h-8 w-8 text-blue-600" />
					</div>

					<h3 class="mb-4 text-2xl font-bold text-gray-900">Team Collaboration</h3>
					<p class="mb-6 leading-relaxed text-gray-600">
						Share pipeline visibility with your team, assign deals, and collaborate on closing
						opportunities together.
					</p>

					<ul class="space-y-2">
						<li class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							Team visibility
						</li>
						<li class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							Deal assignment
						</li>
						<li class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							Collaborative notes
						</li>
						<li class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							Activity sharing
						</li>
					</ul>
				</div>
			{/if}
		</div>
	</div>
</section>

<!-- Benefits Section -->
<section class="bg-gradient-to-r from-gray-50 to-blue-50 py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="lg:flex lg:items-center lg:space-x-12">
			<div class="lg:w-1/2">
				<h2 class="mb-8 text-4xl font-extrabold text-gray-900 sm:text-5xl">
					Why Visual Pipeline Management Matters
				</h2>
				<p class="mb-8 text-xl leading-relaxed text-gray-700">
					Transform your sales process from chaotic spreadsheets to organized, visual workflow
					management. See immediate improvements in deal closure rates and sales team productivity.
				</p>

				<div class="space-y-6">
					<div class="flex items-start space-x-4">
						<div class="flex-shrink-0">
							<div class="rounded-lg bg-green-100 p-3">
								<TrendingUp class="h-6 w-6 text-green-600" />
							</div>
						</div>
						<div>
							<h4 class="mb-2 text-lg font-semibold text-gray-900">
								Increase Conversion Rates by 30%
							</h4>
							<p class="text-gray-600">
								Visual pipeline management helps identify bottlenecks and optimize your sales
								process for better conversion rates.
							</p>
						</div>
					</div>

					<div class="flex items-start space-x-4">
						<div class="flex-shrink-0">
							<div class="rounded-lg bg-blue-100 p-3">
								<Clock class="h-6 w-6 text-blue-600" />
							</div>
						</div>
						<div>
							<h4 class="mb-2 text-lg font-semibold text-gray-900">Reduce Sales Cycle by 25%</h4>
							<p class="text-gray-600">
								Automated workflows and clear process visualization help sales teams move deals
								through stages faster.
							</p>
						</div>
					</div>

					<div class="flex items-start space-x-4">
						<div class="flex-shrink-0">
							<div class="rounded-lg bg-purple-100 p-3">
								<Target class="h-6 w-6 text-purple-600" />
							</div>
						</div>
						<div>
							<h4 class="mb-2 text-lg font-semibold text-gray-900">
								Improve Forecast Accuracy by 40%
							</h4>
							<p class="text-gray-600">
								Probability-based forecasting and historical data analysis provide more accurate
								revenue predictions.
							</p>
						</div>
					</div>
				</div>
			</div>

			<div class="mt-12 lg:mt-0 lg:w-1/2">
				<div class="rounded-2xl bg-white p-8 shadow-2xl">
					<h3 class="mb-6 text-2xl font-bold text-gray-900">Pipeline Performance Impact</h3>

					<div class="space-y-6">
						<div>
							<div class="mb-2 flex items-center justify-between">
								<span class="text-sm font-medium text-gray-700">Deal Closure Rate</span>
								<span class="text-sm font-semibold text-green-600">+30%</span>
							</div>
							<div class="h-3 w-full rounded-full bg-gray-200">
								<div
									class="h-3 rounded-full bg-gradient-to-r from-green-400 to-green-600"
									style="width: 85%"
								></div>
							</div>
						</div>

						<div>
							<div class="mb-2 flex items-center justify-between">
								<span class="text-sm font-medium text-gray-700">Sales Team Productivity</span>
								<span class="text-sm font-semibold text-blue-600">+45%</span>
							</div>
							<div class="h-3 w-full rounded-full bg-gray-200">
								<div
									class="h-3 rounded-full bg-gradient-to-r from-blue-400 to-blue-600"
									style="width: 90%"
								></div>
							</div>
						</div>

						<div>
							<div class="mb-2 flex items-center justify-between">
								<span class="text-sm font-medium text-gray-700">Forecast Accuracy</span>
								<span class="text-sm font-semibold text-purple-600">+40%</span>
							</div>
							<div class="h-3 w-full rounded-full bg-gray-200">
								<div
									class="h-3 rounded-full bg-gradient-to-r from-purple-400 to-purple-600"
									style="width: 88%"
								></div>
							</div>
						</div>

						<div>
							<div class="mb-2 flex items-center justify-between">
								<span class="text-sm font-medium text-gray-700">Customer Follow-up</span>
								<span class="text-sm font-semibold text-orange-600">+60%</span>
							</div>
							<div class="h-3 w-full rounded-full bg-gray-200">
								<div
									class="h-3 rounded-full bg-gradient-to-r from-orange-400 to-orange-600"
									style="width: 95%"
								></div>
							</div>
						</div>
					</div>

					<div class="mt-6 rounded-lg bg-gray-50 p-4">
						<p class="text-center text-sm text-gray-600">
							<strong class="text-gray-900">Average ROI:</strong> 320% within 6 months of implementation
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Coming Soon Notice -->
<section class="border-y border-yellow-200 bg-yellow-50 py-16">
	<div class="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
		<div class="mb-6 inline-flex items-center rounded-full bg-yellow-200 px-4 py-2 text-yellow-800">
			<AlertCircle class="mr-2 h-5 w-5" />
			<span class="font-semibold">Development Update</span>
		</div>

		<h2 class="mb-4 text-3xl font-bold text-gray-900">Sales Pipeline Features Coming Soon</h2>
		<p class="mb-8 text-lg leading-relaxed text-gray-700">
			Our development team is actively working on the visual sales pipeline features. Want to
			contribute to the development or get early access? Join our open-source community and be part
			of building the future of free CRM software.
		</p>

		<div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0">
			<a
				href="https://github.com/MicroPyramid/opensource-startup-crm"
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center justify-center rounded-lg border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-lg transition-all duration-200 hover:bg-blue-700"
			>
				<GitBranch class="mr-2 h-5 w-5" />
				Contribute to Development
			</a>
			<a
				href="/contact"
				class="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 shadow-lg transition-all duration-200 hover:bg-gray-50"
			>
				<Bell class="mr-2 h-5 w-5" />
				Get Notified When Ready
			</a>
		</div>
	</div>
</section>

<!-- CTA Section -->
<section class="bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 py-20 text-white">
	<div class="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
		<h2 class="mb-6 text-4xl font-extrabold md:text-5xl">Ready to Transform Your Sales Process?</h2>
		<p class="mx-auto mb-8 max-w-3xl text-xl text-blue-100 md:text-2xl">
			Start using BottleCRM today and experience the power of visual sales pipeline management. Join
			the community building the future of free CRM software.
		</p>

		<div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-x-6 sm:space-y-0">
			<a
				href="/login"
				class="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-lg font-bold text-blue-700 shadow-2xl transition-all duration-200 hover:scale-105 hover:bg-gray-100"
			>
				<Zap class="mr-3 h-6 w-6" />
				Start Free Demo
			</a>
			<a
				href="https://github.com/MicroPyramid/opensource-startup-crm"
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center justify-center rounded-xl border-2 border-white px-8 py-4 text-lg font-bold text-white transition-all duration-200 hover:bg-white/10"
			>
				<Code class="mr-3 h-6 w-6" />
				View Source Code
			</a>
		</div>

		<p class="mt-8 text-lg text-blue-200">
			🚀 No credit card required • Open source • Self-host anywhere
		</p>
	</div>
</section>

<!-- Deal Modal (if needed for interactivity) -->
{#if showDealModal && selectedDeal}
	<div
		class="fixed inset-0 z-50 overflow-y-auto"
		aria-labelledby="modal-title"
		role="dialog"
		aria-modal="true"
	>
		<div
			class="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0"
		>
			<div
				class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
				aria-hidden="true"
				onclick={closeDealModal}
			></div>

			<div
				class="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle"
			>
				<div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
					<div class="sm:flex sm:items-start">
						<div class="mt-3 w-full text-center sm:mt-0 sm:text-left">
							<h3 class="mb-4 text-lg font-medium leading-6 text-gray-900" id="modal-title">
								Deal Details: {selectedDeal.company}
							</h3>

							<div class="space-y-4">
								<div class="grid grid-cols-2 gap-4">
									<div>
										<div class="block text-sm font-medium text-gray-700">Deal Value</div>
										<p class="text-lg font-semibold text-gray-900">
											{formatCurrency(selectedDeal.value)}
										</p>
									</div>
									<div>
										<div class="block text-sm font-medium text-gray-700">Probability</div>
										<p class="text-lg font-semibold text-gray-900">{selectedDeal.probability}%</p>
									</div>
								</div>

								<div>
									<div class="block text-sm font-medium text-gray-700">Primary Contact</div>
									<p class="text-gray-900">{selectedDeal.contact}</p>
								</div>

								<div>
									<div class="block text-sm font-medium text-gray-700">Last Activity</div>
									<p class="text-gray-900">{selectedDeal.lastActivity}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
					<button
						type="button"
						onclick={closeDealModal}
						class="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
					>
						Close
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}
