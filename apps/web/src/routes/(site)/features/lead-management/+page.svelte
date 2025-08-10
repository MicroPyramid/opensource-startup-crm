<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import {
		Users,
		Target,
		TrendingUp,
		Filter,
		Zap,
		Check,
		Clock,
		Star,
		ArrowRight,
		BarChart3,
		UserPlus,
		Mail,
		Phone,
		Calendar,
		Tag,
		Search,
		FileText,
		Settings,
		Database,
		Workflow,
		Bell,
		MessageSquare,
		PieChart,
		Activity,
		Award,
		Shield,
		Code,
		GitBranch,
		ChevronRight,
		Download,
		Upload,
		RefreshCw,
		MapPin,
		Building,
		DollarSign,
		Percent,
		Timer,
		Eye,
		Edit,
		Trash2,
		MoreHorizontal
	} from '@lucide/svelte';

	let mounted = false;

	onMount(() => {
		mounted = true;
	});

	// JSON-LD schema for SoftwareApplication
	const schema = {
		'@context': 'https://schema.org',
		'@type': 'SoftwareApplication',
		name: 'BottleCRM Lead Management',
		url: 'https://bottlecrm.io/features/lead-management',
		applicationCategory: 'CRM Application',
		operatingSystem: 'All',
		offers: {
			'@type': 'Offer',
			price: '0',
			priceCurrency: 'USD',
			availability: 'https://schema.org/InStock'
		},
		description:
			'Free, open-source CRM lead management software for startups and small businesses. Capture, score, nurture, and convert leads with automated workflows.',
		publisher: {
			'@type': 'Organization',
			name: 'BottleCRM'
		}
	};
</script>

<svelte:head>
	<title>Free CRM Lead Management Software | BottleCRM</title>
	<meta
		name="description"
		content="Free, open-source CRM lead management software for startups & small businesses. Capture, score, nurture & convert leads with automated workflows."
	/>
	<meta
		name="keywords"
		content="lead management software, free crm, lead generation, lead nurturing, open source crm, sales crm, lead scoring, crm for startups, crm for small business"
	/>
	<link rel="canonical" href="https://bottlecrm.io/features/lead-management" />
	<meta name="robots" content="index, follow" />

	<!-- Open Graph -->
	<meta property="og:title" content="Free CRM Lead Management Software | BottleCRM" />
	<meta
		property="og:description"
		content="Free, open-source CRM lead management software for startups & small businesses. Capture, score, nurture & convert leads with automated workflows."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://bottlecrm.io/features/lead-management" />
	<meta property="og:image" content="https://bottlecrm.io/og-lead-management.png" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Free CRM Lead Management Software | BottleCRM" />
	<meta
		name="twitter:description"
		content="Free, open-source CRM lead management software for startups & small businesses. Capture, score, nurture & convert leads with automated workflows."
	/>
	<meta name="twitter:image" content="https://bottlecrm.io/og-lead-management.png" />

	<script type="application/ld+json">
{JSON.stringify(schema)}
	</script>
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
				<Target class="mr-2 h-4 w-4" />
				<span class="text-sm font-medium">Convert More Leads • Accelerate Growth • 100% Free</span>
			</div>

			<h1 class="mb-6 text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
				Transform Prospects into <span class="text-yellow-300">Paying Customers</span>
			</h1>

			<p class="mb-8 text-xl leading-relaxed text-blue-100 md:text-2xl">
				Capture, score, nurture, and convert leads with BottleCRM's comprehensive lead management
				system. Stop losing potential customers and start maximizing your sales pipeline.
			</p>

			<!-- Key Benefits -->
			<div class="mb-10 grid grid-cols-1 gap-6 md:grid-cols-3">
				<div class="rounded-xl bg-white/10 p-6 backdrop-blur-sm">
					<Target class="mx-auto mb-3 h-10 w-10 text-yellow-300" />
					<div class="mb-2 text-lg font-semibold">Smart Lead Scoring</div>
					<div class="text-sm text-blue-100">Automatically identify your hottest prospects</div>
				</div>
				<div class="rounded-xl bg-white/10 p-6 backdrop-blur-sm">
					<Workflow class="mx-auto mb-3 h-10 w-10 text-yellow-300" />
					<div class="mb-2 text-lg font-semibold">Automated Nurturing</div>
					<div class="text-sm text-blue-100">Guide leads through personalized journeys</div>
				</div>
				<div class="rounded-xl bg-white/10 p-6 backdrop-blur-sm">
					<TrendingUp class="mx-auto mb-3 h-10 w-10 text-yellow-300" />
					<div class="mb-2 text-lg font-semibold">Higher Conversions</div>
					<div class="text-sm text-blue-100">Increase lead-to-customer conversion rates</div>
				</div>
			</div>

			<div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0">
				<a
					href="/login"
					class="inline-flex items-center justify-center rounded-lg border border-transparent bg-white px-6 py-4 text-base font-semibold text-blue-700 shadow-lg transition-all duration-200 hover:scale-105 hover:bg-gray-100"
				>
					<Zap class="mr-2 h-5 w-5" />
					Start Managing Leads Free
				</a>
				<a
					href="#features"
					class="inline-flex items-center justify-center rounded-lg border-2 border-white px-6 py-4 text-base font-semibold text-white transition-all duration-200 hover:bg-white/10"
				>
					Explore Lead Features
				</a>
			</div>
		</div>
	</div>
</section>

<!-- Lead Management Process -->
<section class="bg-gray-50 py-20" id="features">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<h2 class="mb-6 text-4xl font-extrabold text-gray-900 sm:text-5xl">
				Complete Lead Management Process
			</h2>
			<p class="mx-auto max-w-3xl text-xl text-gray-600">
				From initial capture to final conversion, BottleCRM streamlines every step of your lead
				management process.
			</p>
		</div>

		<div class="grid gap-8 lg:grid-cols-4">
			{#if mounted}
				<div
					in:fly={{ y: 30, duration: 600, delay: 0 }}
					class="group relative rounded-2xl bg-white p-8 text-center shadow-lg transition-all duration-300 hover:shadow-2xl"
				>
					<!-- Step Number -->
					<div class="absolute -top-4 left-1/2 -translate-x-1/2 transform">
						<div
							class="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white"
						>
							1
						</div>
					</div>

					<!-- Process Icon -->
					<div
						class="mb-6 inline-block rounded-xl bg-gradient-to-r from-blue-100 to-indigo-100 p-4 transition-transform duration-300 group-hover:scale-110"
					>
						<Download class="h-8 w-8 text-blue-600" />
					</div>

					<!-- Process Content -->
					<h3 class="mb-4 text-xl font-bold text-gray-900">Lead Capture</h3>
					<p class="mb-6 text-gray-600">
						Capture leads from websites, forms, emails, and social media automatically
					</p>

					<!-- Process Details -->
					<ul class="space-y-2 text-left">
						<li class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Website form integration</span>
						</li>
						<li class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Email parsing & extraction</span>
						</li>
						<li class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Social media monitoring</span>
						</li>
						<li class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Manual lead entry</span>
						</li>
						<li class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>API integrations</span>
						</li>
					</ul>

					<!-- Arrow -->
					<div class="absolute -right-4 top-1/2 hidden -translate-y-1/2 transform lg:block">
						<ArrowRight class="h-6 w-6 text-blue-400" />
					</div>
				</div>

				<div
					in:fly={{ y: 30, duration: 600, delay: 150 }}
					class="group relative rounded-2xl bg-white p-8 text-center shadow-lg transition-all duration-300 hover:shadow-2xl"
				>
					<!-- Step Number -->
					<div class="absolute -top-4 left-1/2 -translate-x-1/2 transform">
						<div
							class="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white"
						>
							2
						</div>
					</div>

					<!-- Process Icon -->
					<div
						class="mb-6 inline-block rounded-xl bg-gradient-to-r from-blue-100 to-indigo-100 p-4 transition-transform duration-300 group-hover:scale-110"
					>
						<Target class="h-8 w-8 text-blue-600" />
					</div>

					<!-- Process Content -->
					<h3 class="mb-4 text-xl font-bold text-gray-900">Lead Qualification</h3>
					<p class="mb-6 text-gray-600">Score and qualify leads based on fit and interest levels</p>

					<!-- Process Details -->
					<ul class="space-y-2 text-left">
						<li class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Automated lead scoring</span>
						</li>
						<li class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>BANT qualification</span>
						</li>
						<li class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Behavioral analysis</span>
						</li>
						<li class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Demographic matching</span>
						</li>
						<li class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Engagement tracking</span>
						</li>
					</ul>

					<!-- Arrow -->
					<div class="absolute -right-4 top-1/2 hidden -translate-y-1/2 transform lg:block">
						<ArrowRight class="h-6 w-6 text-blue-400" />
					</div>
				</div>

				<div
					in:fly={{ y: 30, duration: 600, delay: 300 }}
					class="group relative rounded-2xl bg-white p-8 text-center shadow-lg transition-all duration-300 hover:shadow-2xl"
				>
					<!-- Step Number -->
					<div class="absolute -top-4 left-1/2 -translate-x-1/2 transform">
						<div
							class="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white"
						>
							3
						</div>
					</div>

					<!-- Process Icon -->
					<div
						class="mb-6 inline-block rounded-xl bg-gradient-to-r from-blue-100 to-indigo-100 p-4 transition-transform duration-300 group-hover:scale-110"
					>
						<Mail class="h-8 w-8 text-blue-600" />
					</div>

					<!-- Process Content -->
					<h3 class="mb-4 text-xl font-bold text-gray-900">Lead Nurturing</h3>
					<p class="mb-6 text-gray-600">
						Engage leads with personalized content and follow-up sequences
					</p>

					<!-- Process Details -->
					<ul class="space-y-2 text-left">
						<li class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Email campaigns</span>
						</li>
						<li class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Content personalization</span>
						</li>
						<li class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Automated follow-ups</span>
						</li>
						<li class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Multi-channel outreach</span>
						</li>
						<li class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Engagement monitoring</span>
						</li>
					</ul>

					<!-- Arrow -->
					<div class="absolute -right-4 top-1/2 hidden -translate-y-1/2 transform lg:block">
						<ArrowRight class="h-6 w-6 text-blue-400" />
					</div>
				</div>

				<div
					in:fly={{ y: 30, duration: 600, delay: 450 }}
					class="group relative rounded-2xl bg-white p-8 text-center shadow-lg transition-all duration-300 hover:shadow-2xl"
				>
					<!-- Step Number -->
					<div class="absolute -top-4 left-1/2 -translate-x-1/2 transform">
						<div
							class="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white"
						>
							4
						</div>
					</div>

					<!-- Process Icon -->
					<div
						class="mb-6 inline-block rounded-xl bg-gradient-to-r from-blue-100 to-indigo-100 p-4 transition-transform duration-300 group-hover:scale-110"
					>
						<TrendingUp class="h-8 w-8 text-blue-600" />
					</div>

					<!-- Process Content -->
					<h3 class="mb-4 text-xl font-bold text-gray-900">Lead Conversion</h3>
					<p class="mb-6 text-gray-600">
						Convert qualified leads into sales opportunities and customers
					</p>

					<!-- Process Details -->
					<ul class="space-y-2 text-left">
						<li class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Opportunity creation</span>
						</li>
						<li class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Sales handoff process</span>
						</li>
						<li class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Conversion tracking</span>
						</li>
						<li class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>ROI measurement</span>
						</li>
						<li class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Performance analytics</span>
						</li>
					</ul>
				</div>
			{/if}
		</div>
	</div>
</section>

<!-- Core Lead Management Features -->
<section class="bg-white py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<h2 class="mb-6 text-4xl font-extrabold text-gray-900 sm:text-5xl">
				Powerful Lead Management Features
			</h2>
			<p class="text-xl text-gray-600">
				Everything you need to capture, manage, and convert leads into customers.
			</p>
		</div>

		<div class="grid gap-8 lg:grid-cols-2">
			{#if mounted}
				<div
					in:fly={{ y: 30, duration: 600, delay: 0 }}
					class="group relative overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
				>
					<!-- Status Badge -->
					<div class="absolute right-4 top-4">
						<span
							class="inline-flex items-center rounded-full border border-green-200 bg-green-100 px-3 py-1 text-xs font-medium text-green-800"
						>
							<Check class="mr-1 h-3 w-3" />
							Available Now
						</span>
					</div>

					<!-- Feature Icon -->
					<div
						class="mb-6 inline-block rounded-xl bg-gradient-to-r from-blue-100 to-indigo-100 p-4 transition-transform duration-300 group-hover:scale-110"
					>
						<UserPlus class="h-8 w-8 text-blue-600" />
					</div>

					<!-- Feature Content -->
					<h3 class="mb-4 text-2xl font-bold text-gray-900">Smart Lead Capture & Import</h3>
					<p class="mb-6 leading-relaxed text-gray-600">
						Capture leads from multiple sources including web forms, email campaigns, social media,
						and manual entry. Automatically parse contact information and prevent duplicates.
					</p>

					<!-- Feature List -->
					<div class="grid grid-cols-1 gap-2 md:grid-cols-2">
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Multi-channel lead capture</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Web form integration</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Email signature parsing</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Social media lead import</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Bulk CSV import/export</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Duplicate detection & merging</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>API-based lead creation</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Real-time lead notifications</span>
						</div>
					</div>
				</div>

				<div
					in:fly={{ y: 30, duration: 600, delay: 100 }}
					class="group relative overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
				>
					<!-- Status Badge -->
					<div class="absolute right-4 top-4">
						<span
							class="inline-flex items-center rounded-full border border-yellow-200 bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800"
						>
							<Clock class="mr-1 h-3 w-3" />
							Coming Soon
						</span>
					</div>

					<!-- Feature Icon -->
					<div
						class="mb-6 inline-block rounded-xl bg-gradient-to-r from-blue-100 to-indigo-100 p-4 transition-transform duration-300 group-hover:scale-110"
					>
						<Target class="h-8 w-8 text-blue-600" />
					</div>

					<!-- Feature Content -->
					<h3 class="mb-4 text-2xl font-bold text-gray-900">Lead Scoring & Qualification</h3>
					<p class="mb-6 leading-relaxed text-gray-600">
						Automatically score leads based on behavior, demographics, and engagement. Identify hot
						prospects and prioritize follow-up activities for maximum conversion.
					</p>

					<!-- Feature List -->
					<div class="grid grid-cols-1 gap-2 md:grid-cols-2">
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Customizable scoring rules</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Behavioral tracking</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Demographic scoring</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Engagement metrics</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Lead temperature indicators</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Qualification frameworks</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Automated lead routing</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Score history tracking</span>
						</div>
					</div>
				</div>

				<div
					in:fly={{ y: 30, duration: 600, delay: 200 }}
					class="group relative overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
				>
					<!-- Status Badge -->
					<div class="absolute right-4 top-4">
						<span
							class="inline-flex items-center rounded-full border border-green-200 bg-green-100 px-3 py-1 text-xs font-medium text-green-800"
						>
							<Check class="mr-1 h-3 w-3" />
							Available Now
						</span>
					</div>

					<!-- Feature Icon -->
					<div
						class="mb-6 inline-block rounded-xl bg-gradient-to-r from-blue-100 to-indigo-100 p-4 transition-transform duration-300 group-hover:scale-110"
					>
						<Filter class="h-8 w-8 text-blue-600" />
					</div>

					<!-- Feature Content -->
					<h3 class="mb-4 text-2xl font-bold text-gray-900">Advanced Lead Segmentation</h3>
					<p class="mb-6 leading-relaxed text-gray-600">
						Organize leads into meaningful segments based on industry, size, behavior, or custom
						criteria. Create targeted campaigns and personalized follow-up strategies.
					</p>

					<!-- Feature List -->
					<div class="grid grid-cols-1 gap-2 md:grid-cols-2">
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Dynamic segmentation rules</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Industry-based grouping</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Company size filtering</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Geographic segmentation</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Behavior-based segments</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Custom field filtering</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Segment performance tracking</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Automated segment updates</span>
						</div>
					</div>
				</div>

				<div
					in:fly={{ y: 30, duration: 600, delay: 300 }}
					class="group relative overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
				>
					<!-- Status Badge -->
					<div class="absolute right-4 top-4">
						<span
							class="inline-flex items-center rounded-full border border-yellow-200 bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800"
						>
							<Clock class="mr-1 h-3 w-3" />
							Coming Soon
						</span>
					</div>

					<!-- Feature Icon -->
					<div
						class="mb-6 inline-block rounded-xl bg-gradient-to-r from-blue-100 to-indigo-100 p-4 transition-transform duration-300 group-hover:scale-110"
					>
						<Workflow class="h-8 w-8 text-blue-600" />
					</div>

					<!-- Feature Content -->
					<h3 class="mb-4 text-2xl font-bold text-gray-900">Lead Nurturing Workflows</h3>
					<p class="mb-6 leading-relaxed text-gray-600">
						Create automated nurturing sequences to guide leads through your sales funnel. Send
						personalized emails, schedule follow-ups, and track engagement.
					</p>

					<!-- Feature List -->
					<div class="grid grid-cols-1 gap-2 md:grid-cols-2">
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Drag-and-drop workflow builder</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Email sequence automation</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Trigger-based actions</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Personalization tokens</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>A/B testing capabilities</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Multi-channel nurturing</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Engagement tracking</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Conversion optimization</span>
						</div>
					</div>
				</div>
			{/if}
		</div>
	</div>
</section>

<!-- Lead Analytics & Metrics -->
<section class="bg-gradient-to-r from-gray-50 to-blue-50 py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<h2 class="mb-6 text-4xl font-extrabold text-gray-900 sm:text-5xl">
				Track What Matters Most
			</h2>
			<p class="text-xl text-gray-600">
				Monitor key lead metrics and optimize your conversion funnel with actionable insights.
			</p>
		</div>

		<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
			{#if mounted}
				<div
					in:fly={{ y: 30, duration: 600, delay: 0 }}
					class="rounded-2xl bg-white p-8 text-center shadow-lg transition-all duration-300 hover:shadow-2xl"
				>
					<div
						class="mb-6 inline-block rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 p-4"
					>
						<Percent class="h-8 w-8 text-blue-600" />
					</div>

					<h3 class="mb-3 text-xl font-bold text-gray-900">Lead Conversion Rate</h3>
					<p class="mb-4 text-sm text-gray-600">
						Track the percentage of leads that convert to customers
					</p>

					<div class="mb-2 text-3xl font-extrabold text-blue-600">15-25%</div>
					<div class="text-sm text-gray-500">Industry average: 2-5%</div>
				</div>

				<div
					in:fly={{ y: 30, duration: 600, delay: 100 }}
					class="rounded-2xl bg-white p-8 text-center shadow-lg transition-all duration-300 hover:shadow-2xl"
				>
					<div
						class="mb-6 inline-block rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 p-4"
					>
						<Timer class="h-8 w-8 text-blue-600" />
					</div>

					<h3 class="mb-3 text-xl font-bold text-gray-900">Lead Response Time</h3>
					<p class="mb-4 text-sm text-gray-600">
						Monitor how quickly your team responds to new leads
					</p>

					<div class="mb-2 text-3xl font-extrabold text-blue-600">5 minutes</div>
					<div class="text-sm text-gray-500">Best practice: Under 1 hour</div>
				</div>

				<div
					in:fly={{ y: 30, duration: 600, delay: 200 }}
					class="rounded-2xl bg-white p-8 text-center shadow-lg transition-all duration-300 hover:shadow-2xl"
				>
					<div
						class="mb-6 inline-block rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 p-4"
					>
						<DollarSign class="h-8 w-8 text-blue-600" />
					</div>

					<h3 class="mb-3 text-xl font-bold text-gray-900">Lead Source ROI</h3>
					<p class="mb-4 text-sm text-gray-600">
						Identify which channels generate the highest quality leads
					</p>

					<div class="mb-2 text-3xl font-extrabold text-blue-600">Per channel</div>
					<div class="text-sm text-gray-500">Optimize based on performance</div>
				</div>

				<div
					in:fly={{ y: 30, duration: 600, delay: 300 }}
					class="rounded-2xl bg-white p-8 text-center shadow-lg transition-all duration-300 hover:shadow-2xl"
				>
					<div
						class="mb-6 inline-block rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 p-4"
					>
						<Activity class="h-8 w-8 text-blue-600" />
					</div>

					<h3 class="mb-3 text-xl font-bold text-gray-900">Sales Cycle Length</h3>
					<p class="mb-4 text-sm text-gray-600">Average time from lead to customer conversion</p>

					<div class="mb-2 text-3xl font-extrabold text-blue-600">30-60 days</div>
					<div class="text-sm text-gray-500">Varies by industry</div>
				</div>
			{/if}
		</div>
	</div>
</section>

<!-- Lead Management Tools -->
<section class="bg-white py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<h2 class="mb-6 text-4xl font-extrabold text-gray-900 sm:text-5xl">
				Complete Lead Management Toolkit
			</h2>
			<p class="text-xl text-gray-600">
				All the tools you need to manage leads effectively, integrated into one platform.
			</p>
		</div>

		<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
			{#if mounted}
				<div
					in:fly={{ y: 30, duration: 600, delay: 0 }}
					class="group rounded-2xl bg-gray-50 p-8 text-center transition-all duration-300 hover:bg-gray-100"
				>
					<div
						class="mb-6 inline-block rounded-xl bg-gradient-to-r from-blue-100 to-indigo-100 p-4 transition-transform duration-300 group-hover:scale-110"
					>
						<BarChart3 class="h-8 w-8 text-blue-600" />
					</div>

					<h3 class="mb-4 text-xl font-bold text-gray-900">Lead Dashboard</h3>
					<p class="mb-6 text-gray-600">
						Comprehensive overview of all lead activities and metrics
					</p>

					<ul class="space-y-2">
						<li class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Real-time lead count</span>
						</li>
						<li class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Conversion metrics</span>
						</li>
						<li class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Source analysis</span>
						</li>
						<li class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Team performance</span>
						</li>
					</ul>
				</div>

				<div
					in:fly={{ y: 30, duration: 600, delay: 100 }}
					class="group rounded-2xl bg-gray-50 p-8 text-center transition-all duration-300 hover:bg-gray-100"
				>
					<div
						class="mb-6 inline-block rounded-xl bg-gradient-to-r from-blue-100 to-indigo-100 p-4 transition-transform duration-300 group-hover:scale-110"
					>
						<Database class="h-8 w-8 text-blue-600" />
					</div>

					<h3 class="mb-4 text-xl font-bold text-gray-900">Lead Database</h3>
					<p class="mb-6 text-gray-600">Centralized storage for all lead information and history</p>

					<ul class="space-y-2">
						<li class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Contact details</span>
						</li>
						<li class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Interaction history</span>
						</li>
						<li class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Document storage</span>
						</li>
						<li class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Custom fields</span>
						</li>
					</ul>
				</div>

				<div
					in:fly={{ y: 30, duration: 600, delay: 200 }}
					class="group rounded-2xl bg-gray-50 p-8 text-center transition-all duration-300 hover:bg-gray-100"
				>
					<div
						class="mb-6 inline-block rounded-xl bg-gradient-to-r from-blue-100 to-indigo-100 p-4 transition-transform duration-300 group-hover:scale-110"
					>
						<MessageSquare class="h-8 w-8 text-blue-600" />
					</div>

					<h3 class="mb-4 text-xl font-bold text-gray-900">Communication Hub</h3>
					<p class="mb-6 text-gray-600">Manage all lead communications from one central location</p>

					<ul class="space-y-2">
						<li class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Email integration</span>
						</li>
						<li class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Call logging</span>
						</li>
						<li class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Meeting notes</span>
						</li>
						<li class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Message templates</span>
						</li>
					</ul>
				</div>

				<div
					in:fly={{ y: 30, duration: 600, delay: 300 }}
					class="group rounded-2xl bg-gray-50 p-8 text-center transition-all duration-300 hover:bg-gray-100"
				>
					<div
						class="mb-6 inline-block rounded-xl bg-gradient-to-r from-blue-100 to-indigo-100 p-4 transition-transform duration-300 group-hover:scale-110"
					>
						<FileText class="h-8 w-8 text-blue-600" />
					</div>

					<h3 class="mb-4 text-xl font-bold text-gray-900">Reporting Engine</h3>
					<p class="mb-6 text-gray-600">Generate detailed reports on lead performance and trends</p>

					<ul class="space-y-2">
						<li class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Custom reports</span>
						</li>
						<li class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Automated delivery</span>
						</li>
						<li class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Performance analytics</span>
						</li>
						<li class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Export options</span>
						</li>
					</ul>
				</div>
			{/if}
		</div>
	</div>
</section>

<!-- Benefits Section -->
<section class="bg-gray-50 py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="lg:flex lg:items-center lg:justify-between lg:space-x-12">
			<div class="lg:w-1/2">
				<h2 class="mb-8 text-4xl font-extrabold text-gray-900 sm:text-5xl">
					Why Choose BottleCRM for Lead Management?
				</h2>

				<div class="space-y-8">
					<div class="flex items-start">
						<div class="flex-shrink-0">
							<div class="rounded-lg bg-blue-100 p-3">
								<DollarSign class="h-6 w-6 text-blue-600" />
							</div>
						</div>
						<div class="ml-4">
							<h3 class="mb-2 text-xl font-bold text-gray-900">100% Free Forever</h3>
							<p class="text-gray-600">
								No per-lead fees, no monthly subscriptions. Use all lead management features
								completely free.
							</p>
						</div>
					</div>

					<div class="flex items-start">
						<div class="flex-shrink-0">
							<div class="rounded-lg bg-green-100 p-3">
								<Shield class="h-6 w-6 text-green-600" />
							</div>
						</div>
						<div class="ml-4">
							<h3 class="mb-2 text-xl font-bold text-gray-900">Complete Data Ownership</h3>
							<p class="text-gray-600">
								Self-host your lead data for complete privacy and control. No vendor lock-in.
							</p>
						</div>
					</div>

					<div class="flex items-start">
						<div class="flex-shrink-0">
							<div class="rounded-lg bg-purple-100 p-3">
								<Settings class="h-6 w-6 text-purple-600" />
							</div>
						</div>
						<div class="ml-4">
							<h3 class="mb-2 text-xl font-bold text-gray-900">Fully Customizable</h3>
							<p class="text-gray-600">
								Adapt lead scoring, workflows, and processes to match your unique business needs.
							</p>
						</div>
					</div>

					<div class="flex items-start">
						<div class="flex-shrink-0">
							<div class="rounded-lg bg-orange-100 p-3">
								<Code class="h-6 w-6 text-orange-600" />
							</div>
						</div>
						<div class="ml-4">
							<h3 class="mb-2 text-xl font-bold text-gray-900">Open Source</h3>
							<p class="text-gray-600">
								Built on open-source technologies with active community support and development.
							</p>
						</div>
					</div>
				</div>
			</div>

			<div class="mt-12 lg:mt-0 lg:w-1/2">
				<div class="rounded-2xl bg-white p-8 shadow-2xl">
					<h3 class="mb-6 text-center text-2xl font-bold text-gray-900">
						Lead Management ROI Calculator
					</h3>

					<div class="space-y-6">
						<div class="rounded-xl bg-gray-50 p-6">
							<div class="text-center">
								<div class="mb-2 text-3xl font-extrabold text-blue-600">5x</div>
								<div class="text-sm text-gray-600">Faster Lead Response Time</div>
							</div>
						</div>

						<div class="grid grid-cols-2 gap-4">
							<div class="rounded-xl bg-green-50 p-4 text-center">
								<div class="mb-1 text-2xl font-bold text-green-600">+25%</div>
								<div class="text-xs text-gray-600">Conversion Rate</div>
							</div>
							<div class="rounded-xl bg-blue-50 p-4 text-center">
								<div class="mb-1 text-2xl font-bold text-blue-600">-40%</div>
								<div class="text-xs text-gray-600">Sales Cycle</div>
							</div>
						</div>

						<div class="border-t border-gray-200 pt-4 text-center">
							<div class="mb-2 text-lg font-semibold text-gray-700">Potential Annual Savings</div>
							<div class="text-3xl font-extrabold text-green-600">$12,000+</div>
							<div class="text-sm text-gray-500">vs. paid lead management tools</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- FAQ Section -->
<section class="bg-white py-20">
	<div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<h2 class="mb-6 text-4xl font-extrabold text-gray-900 sm:text-5xl">Lead Management FAQs</h2>
			<p class="text-xl text-gray-600">
				Common questions about BottleCRM's lead management capabilities.
			</p>
		</div>

		<div class="space-y-6">
			<div class="rounded-xl bg-gray-50 p-6">
				<h3 class="mb-3 text-lg font-semibold text-gray-900">
					How does lead scoring work in BottleCRM?
				</h3>
				<p class="text-gray-600">
					BottleCRM's lead scoring system automatically evaluates leads based on demographic
					information, behavioral data, and engagement levels. You can customize scoring rules to
					match your ideal customer profile and business priorities.
				</p>
			</div>

			<div class="rounded-xl bg-gray-50 p-6">
				<h3 class="mb-3 text-lg font-semibold text-gray-900">
					Can I import leads from other systems?
				</h3>
				<p class="text-gray-600">
					Yes, BottleCRM supports bulk lead import from CSV files, API integrations, and direct
					migration from other CRM systems. Our duplicate detection ensures clean data integration.
				</p>
			</div>

			<div class="rounded-xl bg-gray-50 p-6">
				<h3 class="mb-3 text-lg font-semibold text-gray-900">
					How are lead nurturing workflows automated?
				</h3>
				<p class="text-gray-600">
					Create automated sequences based on triggers like lead source, behavior, or time delays.
					Send personalized emails, assign tasks, and move leads through your sales funnel
					automatically.
				</p>
			</div>

			<div class="rounded-xl bg-gray-50 p-6">
				<h3 class="mb-3 text-lg font-semibold text-gray-900">What lead analytics are available?</h3>
				<p class="text-gray-600">
					Track conversion rates, lead sources, response times, and pipeline velocity. Generate
					custom reports to identify your best-performing lead channels and optimize your strategy.
				</p>
			</div>
		</div>
	</div>
</section>

<!-- CTA Section -->
<section class="bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 py-20 text-white">
	<div class="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
		<h2 class="mb-6 text-4xl font-extrabold md:text-5xl">
			Ready to Transform Your Lead Management?
		</h2>
		<p class="mx-auto mb-8 max-w-3xl text-xl text-blue-100 md:text-2xl">
			Stop losing leads and start converting more prospects into customers. Try BottleCRM's lead
			management features today.
		</p>

		<div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-x-6 sm:space-y-0">
			<a
				href="/login"
				class="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-lg font-bold text-blue-700 shadow-2xl transition-all duration-200 hover:scale-105 hover:bg-gray-100"
			>
				<Target class="mr-3 h-6 w-6" />
				Start Managing Leads Free
			</a>
			<a
				href="/features"
				class="inline-flex items-center justify-center rounded-xl border-2 border-white px-8 py-4 text-lg font-bold text-white transition-all duration-200 hover:bg-white/10"
			>
				<Eye class="mr-3 h-6 w-6" />
				View All CRM Features
			</a>
		</div>

		<p class="mt-8 text-lg text-blue-200">
			🚀 No credit card • Unlimited leads • Self-host anywhere • Open source
		</p>
	</div>
</section>
