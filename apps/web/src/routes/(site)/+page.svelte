<!-- home page -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import banner_img from '$lib/assets/images/banner.png';
	import {
		Users,
		BarChart3,
		CheckSquare,
		TrendingUp,
		FileText,
		Smartphone,
		Zap,
		Check,
		X,
		ChevronRight,
		ChevronDown,
		GitFork,
		MessageCircle,
		Github
	} from '@lucide/svelte';
	import { Download } from '@lucide/svelte';

	let activeFaq: number | null = null;
	let mounted = false;

	function toggleFaq(index: number) {
		activeFaq = activeFaq === index ? null : index;
	}

	onMount(() => {
		mounted = true;
	});

	// JSON-LD schema for SEO
	const schema = {
		'@context': 'https://schema.org',
		'@type': 'SoftwareApplication',
		name: 'BottleCRM',
		description:
			'Free, open-source CRM software for startups and small businesses. Self-hosted, unlimited users, no subscription fees.',
		url: 'https://bottlecrm.io',
		applicationCategory: 'BusinessApplication',
		operatingSystem: 'Web',
		offers: {
			'@type': 'Offer',
			price: '0',
			priceCurrency: 'USD'
		},
		aggregateRating: {
			'@type': 'AggregateRating',
			ratingValue: '4.8',
			reviewCount: '150'
		}
	};
</script>

<svelte:head>
	<title>BottleCRM: Free Open Source CRM for Startups & Small Business</title>
	<meta
		name="description"
		content="BottleCRM is a free, open-source CRM for startups and small businesses. Self-host, manage contacts, sales, and tasks. No subscription fees. Download now!"
	/>
	<meta
		name="keywords"
		content="free crm, open source crm, crm software, startup crm, small business crm, self hosted crm, customer relationship management"
	/>
	<meta name="robots" content="index, follow" />
	<link rel="canonical" href="https://bottlecrm.io/" />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://bottlecrm.io/" />
	<meta
		property="og:title"
		content="BottleCRM: Free Open Source CRM for Startups & Small Business"
	/>
	<meta
		property="og:description"
		content="Free, open-source CRM for startups and small businesses. Self-host, unlimited users, no subscription fees."
	/>
	<meta property="og:image" content="https://bottlecrm.io/og-image.png" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content="https://bottlecrm.io/" />
	<meta
		name="twitter:title"
		content="BottleCRM: Free Open Source CRM for Startups & Small Business"
	/>
	<meta
		name="twitter:description"
		content="Free, open-source CRM for startups and small businesses. Self-host, unlimited users, no subscription fees."
	/>
	<meta name="twitter:image" content="https://bottlecrm.io/twitter-image.png" />

	<!-- Structured Data for SEO -->
	<script type="application/ld+json">
    {@html JSON.stringify(schema)}
	</script>
</svelte:head>

<!-- Hero Section with enhanced content -->
<section
	class="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white"
>
	<!-- Animated background elements -->
	<div class="absolute inset-0 bg-black/10"></div>
	<div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>

	<div
		class="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-4 py-20 sm:px-6 lg:flex-row lg:px-8"
	>
		<div class="mb-10 lg:mb-0 lg:w-1/2">
			<div>
				<div
					class="mb-6 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm"
				>
					<span class="text-sm font-medium">🚀 Free Forever • No Credit Card Required</span>
				</div>

				<h1 class="mb-6 text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
					The Free <span class="text-yellow-300">CRM Software</span> That Startups Actually Need
				</h1>
				<p class="mb-8 text-xl leading-relaxed text-blue-100 md:text-2xl">
					Stop paying $50-300/month for CRM subscriptions. BottleCRM is a 100% free, open-source,
					and self-hostable customer relationship management solution built specifically for
					startups and growing businesses.
				</p>

				<!-- Value proposition bullets -->
				<ul class="mb-8 space-y-3 text-lg">
					<li class="flex items-center">
						<Check class="mr-3 h-6 w-6 flex-shrink-0 text-green-400" />
						<span class="break-words">No monthly fees - Save thousands per year</span>
					</li>
					<li class="flex items-center">
						<Check class="mr-3 h-6 w-6 flex-shrink-0 text-green-400" />
						<span class="break-words">Complete data ownership - Host on your servers</span>
					</li>
					<li class="flex items-center">
						<Check class="mr-3 h-6 w-6 flex-shrink-0 text-green-400" />
						<span class="break-words">Unlimited users and customization</span>
					</li>
				</ul>

				<div class="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
					<a
						href="/login"
						class="inline-flex items-center justify-center whitespace-nowrap rounded-lg border border-transparent bg-white px-6 py-4 text-base font-semibold text-blue-700 shadow-lg transition-all duration-200 hover:scale-105 hover:bg-gray-100"
					>
						<Zap class="mr-2 h-5 w-5" />
						Start Free Demo
					</a>
					<a
						href="https://github.com/MicroPyramid/opensource-startup-crm"
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center justify-center whitespace-nowrap rounded-lg border-2 border-white px-6 py-4 text-base font-semibold text-white transition-all duration-200 hover:bg-white/10"
					>
						<Github class="mr-2 h-5 w-5" />
						View Source
					</a>
				</div>
			</div>
		</div>

		<div class="flex justify-center lg:w-1/2 lg:justify-end">
			<div class="w-full max-w-lg">
				<div
					class="overflow-hidden rounded-2xl border border-white/20 bg-white/10 shadow-2xl backdrop-blur-lg"
				>
					<div class="relative h-80 bg-gradient-to-br from-gray-100 to-gray-200">
						<img
							src={banner_img}
							alt="BottleCRM Dashboard Preview - Free CRM Software Interface"
							class="h-full w-full object-cover"
						/>
						<div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
					</div>
					<div class="bg-white/5 p-6">
						<div class="space-y-3">
							<div
								class="h-3 w-full rounded-full bg-gradient-to-r from-blue-400 to-purple-500"
							></div>
							<div
								class="h-3 w-4/5 rounded-full bg-gradient-to-r from-blue-300 to-indigo-400"
							></div>
							<div
								class="h-3 w-3/5 rounded-full bg-gradient-to-r from-indigo-300 to-blue-400"
							></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Features Section with enhanced content -->
<section class="bg-gray-50 py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<h2 class="mb-6 text-4xl font-extrabold text-gray-900 sm:text-5xl">
				Enterprise-Grade CRM Features <span class="text-blue-600">Without Enterprise Costs</span>
			</h2>
			<p class="mx-auto mt-4 max-w-3xl text-xl leading-relaxed text-gray-600">
				Everything your startup or small business needs to manage customer relationships, automate
				sales processes, and drive sustainable growth. All features included, no premium tiers.
			</p>
		</div>

		<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
			<!-- Smart Contact Management System -->
			<div
				class="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
			>
				<div
					class="mb-6 inline-block rounded-xl bg-gradient-to-r from-blue-100 to-indigo-100 p-4 transition-transform duration-300 group-hover:scale-110"
				>
					<Users class="h-8 w-8 text-blue-600" />
				</div>

				<h3 class="mb-4 text-2xl font-bold text-gray-900">Smart Contact Management System</h3>
				<p class="mb-6 leading-relaxed text-gray-600">
					Centralize customer data with our intuitive contact management system. Track customer
					interactions, manage qualified leads, and build stronger customer relationships. Perfect
					for startups, small businesses, and growing enterprises looking for efficient CRM
					software.
				</p>

				<ul class="space-y-2">
					<li class="flex items-center text-sm text-gray-700">
						<Check class="mr-2 h-4 w-4 text-green-500" />
						360° Customer View
					</li>
					<li class="flex items-center text-sm text-gray-700">
						<Check class="mr-2 h-4 w-4 text-green-500" />
						Lead Scoring
					</li>
					<li class="flex items-center text-sm text-gray-700">
						<Check class="mr-2 h-4 w-4 text-green-500" />
						Contact Segmentation
					</li>
				</ul>
			</div>

			<!-- Visual Sales Pipeline Management -->
			<div
				class="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
			>
				<div class="absolute right-4 top-4">
					<span
						class="inline-flex items-center rounded-full border border-yellow-200 bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800"
					>
						Coming Soon
					</span>
				</div>

				<div
					class="mb-6 inline-block rounded-xl bg-gradient-to-r from-blue-100 to-indigo-100 p-4 transition-transform duration-300 group-hover:scale-110"
				>
					<BarChart3 class="h-8 w-8 text-blue-600" />
				</div>

				<h3 class="mb-4 text-2xl font-bold text-gray-900">Visual Sales Pipeline Management</h3>
				<p class="mb-6 leading-relaxed text-gray-600">
					Streamline your sales process with our drag-and-drop sales pipeline. Track deals from lead
					qualification to closing, forecast revenue accurately, and implement powerful sales
					automation workflows to boost your conversion rates.
				</p>

				<ul class="space-y-2">
					<li class="flex items-center text-sm text-gray-700">
						<Check class="mr-2 h-4 w-4 text-green-500" />
						Deal Tracking
					</li>
					<li class="flex items-center text-sm text-gray-700">
						<Check class="mr-2 h-4 w-4 text-green-500" />
						Sales Forecasting
					</li>
					<li class="flex items-center text-sm text-gray-700">
						<Check class="mr-2 h-4 w-4 text-green-500" />
						Automation Workflows
					</li>
				</ul>
			</div>

			<!-- Advanced Task & Project Management -->
			<div
				class="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
			>
				<div
					class="mb-6 inline-block rounded-xl bg-gradient-to-r from-blue-100 to-indigo-100 p-4 transition-transform duration-300 group-hover:scale-110"
				>
					<CheckSquare class="h-8 w-8 text-blue-600" />
				</div>

				<h3 class="mb-4 text-2xl font-bold text-gray-900">Advanced Task & Project Management</h3>
				<p class="mb-6 leading-relaxed text-gray-600">
					Never miss a follow-up with integrated task management and project tracking. Set
					reminders, assign tasks to team members, track project milestones, and ensure maximum
					productivity across your sales and marketing teams.
				</p>

				<ul class="space-y-2">
					<li class="flex items-center text-sm text-gray-700">
						<Check class="mr-2 h-4 w-4 text-green-500" />
						Task Automation
					</li>
					<li class="flex items-center text-sm text-gray-700">
						<Check class="mr-2 h-4 w-4 text-green-500" />
						Team Collaboration
					</li>
					<li class="flex items-center text-sm text-gray-700">
						<Check class="mr-2 h-4 w-4 text-green-500" />
						Deadline Tracking
					</li>
				</ul>
			</div>

			<!-- Real-time Analytics & Reporting -->
			<div
				class="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
			>
				<div class="absolute right-4 top-4">
					<span
						class="inline-flex items-center rounded-full border border-yellow-200 bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800"
					>
						Coming Soon
					</span>
				</div>

				<div
					class="mb-6 inline-block rounded-xl bg-gradient-to-r from-blue-100 to-indigo-100 p-4 transition-transform duration-300 group-hover:scale-110"
				>
					<TrendingUp class="h-8 w-8 text-blue-600" />
				</div>

				<h3 class="mb-4 text-2xl font-bold text-gray-900">Real-time Analytics & Reporting</h3>
				<p class="mb-6 leading-relaxed text-gray-600">
					Make data-driven decisions with comprehensive CRM analytics and business intelligence.
					Track sales performance, monitor marketing campaign effectiveness, and generate detailed
					reports to optimize your customer acquisition strategies.
				</p>

				<ul class="space-y-2">
					<li class="flex items-center text-sm text-gray-700">
						<Check class="mr-2 h-4 w-4 text-green-500" />
						Custom Dashboards
					</li>
					<li class="flex items-center text-sm text-gray-700">
						<Check class="mr-2 h-4 w-4 text-green-500" />
						Performance Metrics
					</li>
					<li class="flex items-center text-sm text-gray-700">
						<Check class="mr-2 h-4 w-4 text-green-500" />
						ROI Tracking
					</li>
				</ul>
			</div>

			<!-- Automated Invoice & Billing Management -->
			<div
				class="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
			>
				<div class="absolute right-4 top-4">
					<span
						class="inline-flex items-center rounded-full border border-yellow-200 bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800"
					>
						Coming Soon
					</span>
				</div>

				<div
					class="mb-6 inline-block rounded-xl bg-gradient-to-r from-blue-100 to-indigo-100 p-4 transition-transform duration-300 group-hover:scale-110"
				>
					<FileText class="h-8 w-8 text-blue-600" />
				</div>

				<h3 class="mb-4 text-2xl font-bold text-gray-900">
					Automated Invoice & Billing Management
				</h3>
				<p class="mb-6 leading-relaxed text-gray-600">
					Streamline your billing process with integrated invoicing software. Create professional
					invoices, track payments, manage recurring billing, and integrate with popular payment
					gateways. Perfect for service-based businesses and SaaS startups.
				</p>

				<ul class="space-y-2">
					<li class="flex items-center text-sm text-gray-700">
						<Check class="mr-2 h-4 w-4 text-green-500" />
						Payment Tracking
					</li>
					<li class="flex items-center text-sm text-gray-700">
						<Check class="mr-2 h-4 w-4 text-green-500" />
						Recurring Billing
					</li>
					<li class="flex items-center text-sm text-gray-700">
						<Check class="mr-2 h-4 w-4 text-green-500" />
						Payment Integration
					</li>
				</ul>
			</div>

			<!-- Mobile CRM & Cloud Access -->
			<div
				class="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
			>
				<div class="absolute right-4 top-4">
					<span
						class="inline-flex items-center rounded-full border border-green-200 bg-green-100 px-3 py-1 text-xs font-medium text-green-800"
					>
						Available Now
					</span>
				</div>

				<div
					class="mb-6 inline-block rounded-xl bg-gradient-to-r from-blue-100 to-indigo-100 p-4 transition-transform duration-300 group-hover:scale-110"
				>
					<Smartphone class="h-8 w-8 text-blue-600" />
				</div>

				<h3 class="mb-4 text-2xl font-bold text-gray-900">Mobile CRM & Cloud Access</h3>
				<p class="mb-6 leading-relaxed text-gray-600">
					Access your CRM data anywhere with our native mobile app and responsive web interface.
					Work offline, sync data automatically, and manage your business on-the-go. Perfect for
					sales teams, remote workers, and field service management.
				</p>

				<ul class="space-y-2">
					<li class="flex items-center text-sm text-gray-700">
						<Check class="mr-2 h-4 w-4 text-green-500" />
						Native Mobile App
					</li>
					<li class="flex items-center text-sm text-gray-700">
						<Check class="mr-2 h-4 w-4 text-green-500" />
						Cross-platform Support
					</li>
				</ul>

				<div class="mt-4 border-t border-gray-200 pt-4">
					<a
						href="https://play.google.com/store/apps/details?id=io.bottlecrm"
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700"
					>
						<Download class="mr-1 h-4 w-4" />
						Download Mobile App
						<ChevronRight class="ml-1 h-4 w-4" />
					</a>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Mobile App Section -->
<section
	class="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-700 to-blue-800 py-20 text-white"
>
	<div class="absolute inset-0 bg-black/10"></div>
	<div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>

	<div class="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<div
				class="mb-6 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm"
			>
				<Smartphone class="mr-2 h-5 w-5" />
				<span class="text-sm font-medium">📱 Now Available on Mobile</span>
			</div>

			<h2 class="mb-6 text-4xl font-extrabold leading-tight md:text-6xl">
				Take Your CRM <span class="text-yellow-300">On The Go</span>
			</h2>
			<p class="mx-auto mb-8 max-w-4xl text-xl leading-relaxed text-blue-100 md:text-2xl">
				Introducing the BottleCRM mobile app - manage your customers, leads, and sales pipeline from
				anywhere. Built with Flutter for seamless cross-platform performance.
			</p>
		</div>

		<div class="grid items-center gap-12 lg:grid-cols-2">
			<!-- Left side - App features -->
			<div>
				<h3 class="mb-8 text-3xl font-bold">Mobile CRM Features</h3>

				<div class="space-y-6">
					<div class="flex items-start space-x-4">
						<div class="flex-shrink-0 rounded-lg bg-white/20 p-3">
							<Users class="h-6 w-6" />
						</div>
						<div>
							<h4 class="mb-2 text-xl font-semibold">Manage Contacts & Leads</h4>
							<p class="text-blue-100">
								Access your complete customer database, add new leads, and update contact
								information on the go.
							</p>
						</div>
					</div>

					<div class="flex items-start space-x-4">
						<div class="flex-shrink-0 rounded-lg bg-white/20 p-3">
							<BarChart3 class="h-6 w-6" />
						</div>
						<div>
							<h4 class="mb-2 text-xl font-semibold">Track Sales Pipeline</h4>
							<p class="text-blue-100">
								Monitor deal progress, update opportunity stages, and never miss a follow-up while
								on the field.
							</p>
						</div>
					</div>

					<div class="flex items-start space-x-4">
						<div class="flex-shrink-0 rounded-lg bg-white/20 p-3">
							<CheckSquare class="h-6 w-6" />
						</div>
						<div>
							<h4 class="mb-2 text-xl font-semibold">Task Management</h4>
							<p class="text-blue-100">
								Create tasks, set reminders, and manage your daily schedule with integrated task
								management.
							</p>
						</div>
					</div>
				</div>

				<div class="mt-10 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
					<a
						href="https://play.google.com/store/apps/details?id=io.bottlecrm"
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center justify-center rounded-lg bg-white px-6 py-4 font-semibold text-gray-900 shadow-lg transition-all duration-200 hover:scale-105 hover:bg-gray-100"
					>
						<Download class="mr-2 h-5 w-5" />
						Download on Google Play
					</a>
					<a
						href="https://github.com/MicroPyramid/flutter-crm"
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center justify-center rounded-lg border-2 border-white px-6 py-4 font-semibold text-white transition-all duration-200 hover:bg-white/10"
					>
						<Github class="mr-2 h-5 w-5" />
						View Mobile Source
					</a>
				</div>
			</div>

			<!-- Right side - App showcase -->
			<div class="flex justify-center lg:justify-end">
				<div class="relative">
					<!-- Phone mockup -->
					<div class="rounded-[3rem] bg-gray-900 p-4 shadow-2xl">
						<div class="relative h-[640px] w-80 overflow-hidden rounded-[2.5rem] bg-white">
							<!-- Status bar -->
							<div
								class="flex h-8 items-center justify-between bg-gray-100 px-6 text-xs text-gray-600"
							>
								<span>9:41</span>
								<div class="flex space-x-1">
									<div class="h-2 w-4 rounded-sm bg-gray-400"></div>
									<div class="h-2 w-4 rounded-sm bg-gray-400"></div>
									<div class="h-2 w-4 rounded-sm bg-gray-400"></div>
								</div>
							</div>

							<!-- App content -->
							<div class="h-full bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
								<div class="mb-8 text-center">
									<div
										class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600"
									>
										<span class="text-xl font-bold text-white">B</span>
									</div>
									<h3 class="text-xl font-bold text-gray-900">BottleCRM</h3>
									<p class="text-sm text-gray-600">Mobile CRM App</p>
								</div>

								<!-- Mock UI elements -->
								<div class="space-y-4">
									<div class="rounded-lg bg-white p-4 shadow-sm">
										<div class="mb-2 flex items-center justify-between">
											<div class="h-3 w-24 rounded bg-blue-200"></div>
											<div class="h-3 w-16 rounded bg-green-200"></div>
										</div>
										<div class="mb-2 h-2 w-32 rounded bg-gray-200"></div>
										<div class="h-2 w-20 rounded bg-gray-200"></div>
									</div>

									<div class="rounded-lg bg-white p-4 shadow-sm">
										<div class="mb-2 flex items-center justify-between">
											<div class="h-3 w-28 rounded bg-purple-200"></div>
											<div class="h-3 w-12 rounded bg-yellow-200"></div>
										</div>
										<div class="mb-2 h-2 w-36 rounded bg-gray-200"></div>
										<div class="h-2 w-24 rounded bg-gray-200"></div>
									</div>

									<div class="rounded-lg bg-white p-4 shadow-sm">
										<div class="mb-2 flex items-center justify-between">
											<div class="h-3 w-20 rounded bg-indigo-200"></div>
											<div class="w-18 h-3 rounded bg-red-200"></div>
										</div>
										<div class="mb-2 h-2 w-40 rounded bg-gray-200"></div>
										<div class="h-2 w-16 rounded bg-gray-200"></div>
									</div>
								</div>

								<!-- Bottom navigation mockup -->
								<div class="absolute bottom-8 left-6 right-6">
									<div class="flex justify-around rounded-full bg-white p-2 shadow-lg">
										<div class="h-8 w-8 rounded-full bg-blue-100"></div>
										<div class="h-8 w-8 rounded-full bg-gray-100"></div>
										<div class="h-8 w-8 rounded-full bg-gray-100"></div>
										<div class="h-8 w-8 rounded-full bg-gray-100"></div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<!-- Floating elements -->
					<div
						class="absolute -right-4 -top-4 animate-bounce rounded-full bg-green-500 px-3 py-1 text-sm font-semibold text-white"
					>
						Free Download
					</div>
					<div
						class="absolute -bottom-4 -left-4 rounded-full bg-blue-500 px-3 py-1 text-sm font-semibold text-white"
					>
						Open Source
					</div>
				</div>
			</div>
		</div>

		<!-- Stats row -->
		<div class="mt-16 text-center">
			<div class="mx-auto grid max-w-3xl grid-cols-1 gap-8 md:grid-cols-3">
				<div>
					<div class="mb-2 text-3xl font-bold text-yellow-300">Flutter</div>
					<div class="text-blue-100">Cross-platform mobile framework</div>
				</div>
				<div>
					<div class="mb-2 text-3xl font-bold text-yellow-300">Free</div>
					<div class="text-blue-100">No app store fees or subscriptions</div>
				</div>
				<div>
					<div class="mb-2 text-3xl font-bold text-yellow-300">Open Source</div>
					<div class="text-blue-100">Fully customizable mobile CRM</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Comparison Section -->
<section class="bg-white py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<h2 class="mb-6 text-4xl font-extrabold text-gray-900 sm:text-5xl">
				Why Choose BottleCRM Over <span class="text-red-600">Expensive CRM Solutions?</span>
			</h2>
			<p class="mx-auto max-w-3xl text-xl text-gray-600">
				Compare BottleCRM with typical commercial CRM solutions and see how much you can save while
				getting powerful features.
			</p>
		</div>

		<div class="-mx-4 overflow-x-auto sm:mx-0">
			<div class="inline-block min-w-full align-middle">
				<table class="min-w-full overflow-hidden rounded-xl bg-white shadow-lg">
					<thead class="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
						<tr>
							<th
								class="whitespace-nowrap px-3 py-4 text-left text-xs font-semibold sm:px-6 sm:text-sm"
								>CRM Category</th
							>
							<th
								class="whitespace-nowrap px-3 py-4 text-center text-xs font-semibold sm:px-6 sm:text-sm"
								>Typical Pricing</th
							>
							<th
								class="whitespace-nowrap px-3 py-4 text-center text-xs font-semibold sm:px-6 sm:text-sm"
								>Open Source</th
							>
							<th
								class="whitespace-nowrap px-3 py-4 text-center text-xs font-semibold sm:px-6 sm:text-sm"
								>Self-Hosted</th
							>
							<th
								class="whitespace-nowrap px-3 py-4 text-center text-xs font-semibold sm:px-6 sm:text-sm"
								>Customizable</th
							>
							<th
								class="whitespace-nowrap px-3 py-4 text-center text-xs font-semibold sm:px-6 sm:text-sm"
								>User Limit</th
							>
						</tr>
					</thead>
					<tbody>
						<tr class="border-b border-l-4 border-gray-200 border-l-blue-500 bg-blue-50">
							<td class="whitespace-nowrap px-3 py-4 font-semibold text-blue-700 sm:px-6">
								<div class="flex flex-col sm:flex-row sm:items-center">
									<span>BottleCRM</span>
									<span
										class="mt-1 whitespace-nowrap rounded-full bg-green-100 px-2 py-1 text-xs text-green-800 sm:ml-2 sm:mt-0"
										>Recommended</span
									>
								</div>
							</td>
							<td
								class="px-3 py-4 text-center text-xs font-medium text-green-600 sm:px-6 sm:text-sm"
								>Free</td
							>
							<td class="px-3 py-4 text-center sm:px-6">
								<Check class="mx-auto h-4 w-4 text-green-500 sm:h-5 sm:w-5" />
							</td>
							<td class="px-3 py-4 text-center sm:px-6">
								<Check class="mx-auto h-4 w-4 text-green-500 sm:h-5 sm:w-5" />
							</td>
							<td class="px-3 py-4 text-center text-xs text-gray-700 sm:px-6 sm:text-sm">Yes</td>
							<td class="px-3 py-4 text-center text-xs text-gray-700 sm:px-6 sm:text-sm"
								>Unlimited</td
							>
						</tr>
						<tr class="border-b border-gray-200 hover:bg-gray-50">
							<td class="whitespace-nowrap px-3 py-4 font-semibold text-gray-900 sm:px-6">
								<span>Enterprise CRM Solutions</span>
							</td>
							<td class="px-3 py-4 text-center text-xs font-medium text-gray-700 sm:px-6 sm:text-sm"
								>$25-300+/user/month</td
							>
							<td class="px-3 py-4 text-center sm:px-6">
								<X class="mx-auto h-4 w-4 text-red-500 sm:h-5 sm:w-5" />
							</td>
							<td class="px-3 py-4 text-center sm:px-6">
								<X class="mx-auto h-4 w-4 text-red-500 sm:h-5 sm:w-5" />
							</td>
							<td class="px-3 py-4 text-center text-xs text-gray-700 sm:px-6 sm:text-sm">Yes</td>
							<td class="px-3 py-4 text-center text-xs text-gray-700 sm:px-6 sm:text-sm"
								>Per seat pricing</td
							>
						</tr>
						<tr class="border-b border-gray-200 hover:bg-gray-50">
							<td class="whitespace-nowrap px-3 py-4 font-semibold text-gray-900 sm:px-6">
								<span>Popular Cloud CRMs</span>
							</td>
							<td class="px-3 py-4 text-center text-xs font-medium text-gray-700 sm:px-6 sm:text-sm"
								>$50-3200+/month</td
							>
							<td class="px-3 py-4 text-center sm:px-6">
								<X class="mx-auto h-4 w-4 text-red-500 sm:h-5 sm:w-5" />
							</td>
							<td class="px-3 py-4 text-center sm:px-6">
								<X class="mx-auto h-4 w-4 text-red-500 sm:h-5 sm:w-5" />
							</td>
							<td class="px-3 py-4 text-center text-xs text-gray-700 sm:px-6 sm:text-sm">Limited</td
							>
							<td class="px-3 py-4 text-center text-xs text-gray-700 sm:px-6 sm:text-sm"
								>Contact-based pricing</td
							>
						</tr>
						<tr class="border-b border-gray-200 hover:bg-gray-50">
							<td class="whitespace-nowrap px-3 py-4 font-semibold text-gray-900 sm:px-6">
								<span>Traditional CRM Platforms</span>
							</td>
							<td class="px-3 py-4 text-center text-xs font-medium text-gray-700 sm:px-6 sm:text-sm"
								>$15-99+/user/month</td
							>
							<td class="px-3 py-4 text-center sm:px-6">
								<X class="mx-auto h-4 w-4 text-red-500 sm:h-5 sm:w-5" />
							</td>
							<td class="px-3 py-4 text-center sm:px-6">
								<X class="mx-auto h-4 w-4 text-red-500 sm:h-5 sm:w-5" />
							</td>
							<td class="px-3 py-4 text-center text-xs text-gray-700 sm:px-6 sm:text-sm">Limited</td
							>
							<td class="px-3 py-4 text-center text-xs text-gray-700 sm:px-6 sm:text-sm"
								>Per seat pricing</td
							>
						</tr>
					</tbody>
				</table>
			</div>
		</div>

		<div class="mt-8 text-center">
			<p class="mb-4 text-lg text-gray-600">
				<strong class="text-green-600">Potential Annual Savings with BottleCRM:</strong>
				$3,000 - $36,000+ per year for a typical team
			</p>
			<a
				href="/pricing"
				class="inline-flex items-center font-semibold text-blue-600 hover:text-blue-700"
			>
				See detailed cost comparison
				<ChevronRight class="ml-2 h-4 w-4" />
			</a>
		</div>
	</div>
</section>

<!-- FAQ Section for SEO -->
<section class="bg-white py-20">
	<div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<h2 class="mb-6 text-4xl font-extrabold text-gray-900 sm:text-5xl">
				Frequently Asked Questions
			</h2>
			<p class="text-xl text-gray-600">
				Everything you need to know about BottleCRM and free CRM software.
			</p>
		</div>

		<div class="space-y-4">
			<div class="overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
				<button
					onclick={() => toggleFaq(0)}
					class="w-full px-6 py-5 text-left transition-colors duration-200 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
					aria-expanded={activeFaq === 0}
				>
					<div class="flex items-center justify-between">
						<h3 class="pr-4 text-lg font-semibold text-gray-900">
							Is BottleCRM really free to use?
						</h3>
						<ChevronDown
							class="h-5 w-5 transform text-gray-500 transition-transform duration-200 {activeFaq ===
							0
								? 'rotate-180'
								: ''}"
						/>
					</div>
				</button>

				{#if activeFaq === 0}
					<div transition:fade={{ duration: 200 }} class="px-6 pb-5">
						<p class="leading-relaxed text-gray-700">
							Yes! BottleCRM is 100% free and open-source. You can download, install, customize, and
							use it without any subscription fees or hidden costs. We also offer optional paid
							support services for hosting and customization.
						</p>
					</div>
				{/if}
			</div>

			<div class="overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
				<button
					onclick={() => toggleFaq(1)}
					class="w-full px-6 py-5 text-left transition-colors duration-200 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
					aria-expanded={activeFaq === 1}
				>
					<div class="flex items-center justify-between">
						<h3 class="pr-4 text-lg font-semibold text-gray-900">
							How does BottleCRM compare to traditional CRM platforms?
						</h3>
						<ChevronDown
							class="h-5 w-5 transform text-gray-500 transition-transform duration-200 {activeFaq ===
							1
								? 'rotate-180'
								: ''}"
						/>
					</div>
				</button>

				{#if activeFaq === 1}
					<div transition:fade={{ duration: 200 }} class="px-6 pb-5">
						<p class="leading-relaxed text-gray-700">
							BottleCRM offers many of the same core features as enterprise CRM platforms but
							without the high monthly costs. While some commercial CRMs might have more advanced
							features, BottleCRM provides everything most startups and small businesses need to
							manage customer relationships effectively.
						</p>
					</div>
				{/if}
			</div>

			<div class="overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
				<button
					onclick={() => toggleFaq(2)}
					class="w-full px-6 py-5 text-left transition-colors duration-200 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
					aria-expanded={activeFaq === 2}
				>
					<div class="flex items-center justify-between">
						<h3 class="pr-4 text-lg font-semibold text-gray-900">
							Can I self-host BottleCRM on my own servers?
						</h3>
						<ChevronDown
							class="h-5 w-5 transform text-gray-500 transition-transform duration-200 {activeFaq ===
							2
								? 'rotate-180'
								: ''}"
						/>
					</div>
				</button>

				{#if activeFaq === 2}
					<div transition:fade={{ duration: 200 }} class="px-6 pb-5">
						<p class="leading-relaxed text-gray-700">
							Absolutely! BottleCRM is designed to be self-hosted. You have complete control over
							your data and can deploy it on your own servers, cloud infrastructure, or local
							environment. This ensures data privacy and eliminates vendor lock-in.
						</p>
					</div>
				{/if}
			</div>

			<div class="overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
				<button
					onclick={() => toggleFaq(3)}
					class="w-full px-6 py-5 text-left transition-colors duration-200 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
					aria-expanded={activeFaq === 3}
				>
					<div class="flex items-center justify-between">
						<h3 class="pr-4 text-lg font-semibold text-gray-900">
							What technology stack does BottleCRM use?
						</h3>
						<ChevronDown
							class="h-5 w-5 transform text-gray-500 transition-transform duration-200 {activeFaq ===
							3
								? 'rotate-180'
								: ''}"
						/>
					</div>
				</button>

				{#if activeFaq === 3}
					<div transition:fade={{ duration: 200 }} class="px-6 pb-5">
						<p class="leading-relaxed text-gray-700">
							BottleCRM is built with modern web technologies: SvelteKit 2.21.x for the frontend,
							Prisma for database management, TailwindCSS for styling, and includes integration
							capabilities with various third-party services.
						</p>
					</div>
				{/if}
			</div>

			<div class="overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
				<button
					onclick={() => toggleFaq(4)}
					class="w-full px-6 py-5 text-left transition-colors duration-200 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
					aria-expanded={activeFaq === 4}
				>
					<div class="flex items-center justify-between">
						<h3 class="pr-4 text-lg font-semibold text-gray-900">
							Do you provide support for BottleCRM implementation?
						</h3>
						<ChevronDown
							class="h-5 w-5 transform text-gray-500 transition-transform duration-200 {activeFaq ===
							4
								? 'rotate-180'
								: ''}"
						/>
					</div>
				</button>

				{#if activeFaq === 4}
					<div transition:fade={{ duration: 200 }} class="px-6 pb-5">
						<p class="leading-relaxed text-gray-700">
							Yes! While the software is free, we offer paid professional services including hosting
							setup, custom development, data migration, training, and ongoing technical support to
							help you get the most out of BottleCRM.
						</p>
					</div>
				{/if}
			</div>

			<div class="overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
				<button
					onclick={() => toggleFaq(5)}
					class="w-full px-6 py-5 text-left transition-colors duration-200 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
					aria-expanded={activeFaq === 5}
				>
					<div class="flex items-center justify-between">
						<h3 class="pr-4 text-lg font-semibold text-gray-900">
							Is BottleCRM suitable for my industry?
						</h3>
						<ChevronDown
							class="h-5 w-5 transform text-gray-500 transition-transform duration-200 {activeFaq ===
							5
								? 'rotate-180'
								: ''}"
						/>
					</div>
				</button>

				{#if activeFaq === 5}
					<div transition:fade={{ duration: 200 }} class="px-6 pb-5">
						<p class="leading-relaxed text-gray-700">
							BottleCRM is industry-agnostic and works well for most businesses including SaaS
							startups, consulting firms, e-commerce businesses, real estate agencies, and
							service-based companies. Its customizable nature allows adaptation to various
							industry-specific needs.
						</p>
					</div>
				{/if}
			</div>
		</div>
	</div>
</section>

<!-- Open Source Section -->
<section class="bg-gradient-to-r from-gray-50 to-blue-50 py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="lg:flex lg:items-center lg:justify-between lg:space-x-12">
			<div class="lg:w-1/2">
				<h2 class="mb-8 text-4xl font-extrabold text-gray-900 sm:text-5xl">
					100% Free & Open Source CRM Software
				</h2>
				<p class="mb-8 text-xl leading-relaxed text-gray-700">
					BottleCRM is completely free, open-source CRM software hosted on GitHub. Download,
					customize, self-host, and contribute to the project without any licensing restrictions.
					Perfect for startups seeking a cost-effective CRM alternative to expensive
					subscription-based solutions.
				</p>

				<div class="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2">
					<div class="rounded-xl bg-white p-6 shadow-lg">
						<h4 class="mb-2 font-bold text-gray-900">Zero Licensing Costs</h4>
						<p class="text-sm text-gray-600">
							Download and use forever without any subscription fees or hidden costs
						</p>
					</div>
					<div class="rounded-xl bg-white p-6 shadow-lg">
						<h4 class="mb-2 font-bold text-gray-900">Complete Customization</h4>
						<p class="text-sm text-gray-600">
							Modify source code to match your exact business requirements
						</p>
					</div>
					<div class="rounded-xl bg-white p-6 shadow-lg">
						<h4 class="mb-2 font-bold text-gray-900">Self-Hosting Options</h4>
						<p class="text-sm text-gray-600">
							Host on your own servers for complete data control and privacy
						</p>
					</div>
					<div class="rounded-xl bg-white p-6 shadow-lg">
						<h4 class="mb-2 font-bold text-gray-900">Active Community</h4>
						<p class="text-sm text-gray-600">
							Benefit from community contributions and collaborative improvements
						</p>
					</div>
				</div>

				<div class="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
					<a
						href="https://github.com/MicroPyramid/opensource-startup-crm"
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center justify-center whitespace-nowrap rounded-lg border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-blue-700"
					>
						<Github class="mr-2 h-5 w-5" />
						⭐ Star on GitHub
					</a>
					<a
						href="https://github.com/MicroPyramid/opensource-startup-crm/fork"
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center justify-center whitespace-nowrap rounded-lg border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 shadow-lg transition-all duration-200 hover:bg-gray-50"
					>
						<GitFork class="mr-2 h-5 w-5" />
						Fork & Customize
					</a>
				</div>
			</div>

			<div class="mt-12 lg:mt-0 lg:w-1/2">
				<div class="rounded-xl border border-gray-200 bg-white p-8 shadow-xl">
					<div class="mb-6 flex items-center">
						<Github class="mr-4 h-10 w-10 text-gray-700" />
						<div>
							<h3 class="text-2xl font-bold text-gray-900">MicroPyramid/opensource-startup-crm</h3>
							<p class="text-gray-700">Free Open Source CRM: SvelteKit + Prisma</p>
						</div>
					</div>

					<div class="mb-6 grid grid-cols-3 gap-4">
						<div class="text-center">
							<div class="text-2xl font-bold text-blue-600">2+</div>
							<div class="text-sm text-gray-600">GitHub Stars</div>
						</div>
						<div class="text-center">
							<div class="text-2xl font-bold text-green-600">0+</div>
							<div class="text-sm text-gray-600">Forks</div>
						</div>
						<div class="text-center">
							<div class="text-2xl font-bold text-purple-600">MIT</div>
							<div class="text-sm text-gray-600">License</div>
						</div>
					</div>

					<div class="overflow-x-auto rounded-lg bg-gray-900 p-4 font-mono text-sm text-green-400">
						<div class="mb-2 whitespace-nowrap"># Clone and install BottleCRM</div>
						<div class="whitespace-nowrap text-gray-300">
							$ git clone https://github.com/MicroPyramid/opensource-startup-crm.git
						</div>
						<div class="whitespace-nowrap text-gray-300">$ cd opensource-startup-crm</div>
						<div class="whitespace-nowrap text-gray-300">$ pnpm install && pnpm run dev</div>
						<div class="mt-2 whitespace-nowrap text-yellow-400"># 🎉 Your free CRM is ready!</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Enhanced CTA Section -->
<section
	class="relative overflow-hidden bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 py-20 text-white"
>
	<div class="absolute inset-0 bg-black/10"></div>
	<div class="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="text-center">
			<h2 class="mb-6 text-4xl font-extrabold md:text-6xl">Ready to Stop Paying for CRM?</h2>
			<p class="mx-auto mb-8 max-w-4xl text-xl leading-relaxed text-blue-100 md:text-2xl">
				Join the growing community of startups and small businesses who are ditching expensive CRM
				subscriptions. Start managing customer relationships more effectively today with BottleCRM -
				completely free, forever.
			</p>

			<!-- Savings calculator -->
			<div class="mx-auto mb-12 max-w-2xl rounded-2xl bg-white/10 p-8 backdrop-blur-sm">
				<h3 class="mb-4 text-2xl font-bold">💰 Your Annual Savings Calculator</h3>
				<div class="grid grid-cols-1 gap-4 text-center md:grid-cols-3">
					<div>
						<div class="text-3xl font-bold text-yellow-300">$3,000+</div>
						<div class="text-sm text-blue-100">5 Users vs Enterprise CRM</div>
					</div>
					<div>
						<div class="text-3xl font-bold text-yellow-300">$6,000+</div>
						<div class="text-sm text-blue-100">10 Users vs Cloud CRM</div>
					</div>
					<div>
						<div class="text-3xl font-bold text-yellow-300">$18,000+</div>
						<div class="text-sm text-blue-100">30 Users vs Commercial CRM</div>
					</div>
				</div>
			</div>

			<div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-x-6 sm:space-y-0">
				<a
					href="/login"
					class="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-lg font-bold text-blue-700 shadow-2xl transition-all duration-200 hover:scale-105 hover:bg-gray-100"
				>
					<Zap class="mr-3 h-6 w-6" />
					Start Your Free CRM Today
				</a>
				<a
					href="/contact"
					class="inline-flex items-center justify-center rounded-xl border-2 border-white px-8 py-4 text-lg font-bold text-white transition-all duration-200 hover:bg-white/10"
				>
					<MessageCircle class="mr-3 h-6 w-6" />
					Get Professional Support
				</a>
			</div>

			<p class="mt-8 text-lg text-blue-200">
				🚀 No credit card • No setup fees • No user limits • No vendor lock-in
			</p>
		</div>
	</div>
</section>

<!-- Enhanced Stats Section -->
<section class="bg-gray-50 py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<h2 class="mb-6 text-4xl font-extrabold text-gray-900 sm:text-5xl">
				Trusted by a Growing Global Community
			</h2>
			<p class="mx-auto max-w-3xl text-xl text-gray-600">
				BottleCRM is empowering startups and small businesses worldwide to build better customer
				relationships without breaking the bank.
			</p>
		</div>

		<div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
			<div
				class="transform rounded-2xl bg-white p-8 text-center shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
			>
				<div class="mb-2 text-5xl font-extrabold text-blue-600">100%</div>
				<div class="mb-2 text-lg font-bold text-gray-700">Free & Open Source</div>
				<div class="text-sm text-gray-500">
					No hidden costs, licensing fees, or subscription charges ever.
				</div>
			</div>

			<div
				class="transform rounded-2xl bg-white p-8 text-center shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
			>
				<div class="mb-2 text-5xl font-extrabold text-green-600">New!</div>
				<div class="mb-2 text-lg font-bold text-gray-700">Fresh & Modern</div>
				<div class="text-sm text-gray-500">
					Built with the latest technologies and modern best practices.
				</div>
			</div>

			<div
				class="transform rounded-2xl bg-white p-8 text-center shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
			>
				<div class="mb-2 text-5xl font-extrabold text-purple-600">MIT</div>
				<div class="mb-2 text-lg font-bold text-gray-700">Open License</div>
				<div class="text-sm text-gray-500">Complete freedom to use, modify, and distribute.</div>
			</div>

			<div
				class="transform rounded-2xl bg-white p-8 text-center shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
			>
				<div class="mb-2 text-5xl font-extrabold text-yellow-600">24/7</div>
				<div class="mb-2 text-lg font-bold text-gray-700">Self-Hosted</div>
				<div class="text-sm text-gray-500">
					Run on your own servers with complete control over your data.
				</div>
			</div>
		</div>

		<!-- Trust badges -->
		<div class="mt-16 text-center">
			<p class="mb-8 text-lg text-gray-600">
				Developed with modern, secure, high-performance technologies:
			</p>
			<div class="flex flex-wrap items-center justify-center gap-4">
				<div
					class="flex items-center space-x-2 whitespace-nowrap rounded-lg bg-white px-4 py-2 shadow-md"
				>
					<span class="font-semibold text-gray-700">SvelteKit 2.21+</span>
				</div>
				<div
					class="flex items-center space-x-2 whitespace-nowrap rounded-lg bg-white px-4 py-2 shadow-md"
				>
					<span class="font-semibold text-gray-700">Prisma ORM</span>
				</div>
				<div
					class="flex items-center space-x-2 whitespace-nowrap rounded-lg bg-white px-4 py-2 shadow-md"
				>
					<span class="font-semibold text-gray-700">TailwindCSS 4.1+</span>
				</div>
			</div>
		</div>
	</div>
</section>
