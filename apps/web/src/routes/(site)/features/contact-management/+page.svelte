<!-- contact management page -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import {
		Users,
		Search,
		Filter,
		Download,
		Upload,
		Mail,
		Phone,
		MapPin,
		Building2,
		Tag,
		Calendar,
		Eye,
		Edit,
		Trash2,
		Plus,
		ChevronDown,
		Check,
		X,
		Star,
		TrendingUp,
		Smartphone,
		BarChart3,
		MessageCircle,
		Github,
		Zap,
		Shield,
		Database,
		Infinity,
		DollarSign,
		UserPlus,
		Target,
		Activity,
		Clock,
		Globe,
		Settings
	} from '@lucide/svelte';

	let mounted = false;
	let activeFaq: number | null = null;
	let selectedContact: any = null;

	function toggleFaq(index: number) {
		activeFaq = activeFaq === index ? null : index;
	}

	/** Selects a contact for display */
	function selectContact(contact: any) {
		selectedContact = contact;
	}

	onMount(() => {
		mounted = true;
	});
</script>

<svelte:head>
	<title>Free Contact Management Software | Unlimited CRM - BottleCRM</title>
	<meta
		name="description"
		content="Manage unlimited contacts for free with BottleCRM. Advanced search, custom fields, mobile access. No per-contact fees. 100% data ownership."
	/>
	<meta
		name="keywords"
		content="free crm, contact management, unlimited contacts, open source crm, customer database, contact manager, crm software, bottlecrm"
	/>
	<link rel="canonical" href="https://bottlecrm.io/features/contact-management" />

	<!-- Open Graph -->
	<meta
		property="og:title"
		content="Free Contact Management Software | Unlimited CRM - BottleCRM"
	/>
	<meta
		property="og:description"
		content="Manage unlimited contacts for free with BottleCRM. Advanced search, custom fields, mobile access. No per-contact fees. 100% data ownership."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://bottlecrm.io/features/contact-management" />
	<meta property="og:image" content="https://bottlecrm.io/og-image-contact-management.png" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta
		name="twitter:title"
		content="Free Contact Management Software | Unlimited CRM - BottleCRM"
	/>
	<meta
		name="twitter:description"
		content="Manage unlimited contacts for free with BottleCRM. Advanced search, custom fields, mobile access. No per-contact fees. 100% data ownership."
	/>
	<meta name="twitter:image" content="https://bottlecrm.io/og-image-contact-management.png" />

	<!-- Structured Data (JSON-LD) -->
	{@html `
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "BottleCRM",
        "url": "https://bottlecrm.io/features/contact-management",
        "image": "https://bottlecrm.io/og-image-contact-management.png",
        "description": "Free contact management software with unlimited contacts, advanced search, custom fields, and mobile access. No per-contact fees.",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "All",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "publisher": {
          "@type": "Organization",
          "name": "BottleCRM"
        }
      }
    </script>
  `}
</svelte:head>

<!-- Hero Section -->
<section class="bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 py-20 text-white">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="lg:flex lg:items-center lg:space-x-12">
			<div class="mb-12 lg:mb-0 lg:w-1/2">
				<div
					class="mb-6 inline-flex items-center rounded-full bg-green-500 px-4 py-2 text-sm font-semibold text-white"
				>
					<Users class="mr-2 h-4 w-4" />
					Unlimited Contacts • Always Free
				</div>

				<h1 class="mb-6 text-4xl font-extrabold leading-tight md:text-6xl">
					Contact Management That <span class="text-green-300">Doesn't Cost Per Contact</span>
				</h1>

				<p class="mb-8 text-xl leading-relaxed text-blue-100 md:text-2xl">
					Stop paying $2-10 per contact. BottleCRM gives you unlimited contact storage, advanced
					search, custom fields, and mobile access - all completely free. Build stronger customer
					relationships without breaking the bank.
				</p>

				<ul class="mb-8 space-y-3 text-lg">
					<li class="flex items-center">
						<Check class="mr-3 h-6 w-6 flex-shrink-0 text-green-400" />
						<span>Unlimited contacts and custom fields</span>
					</li>
					<li class="flex items-center">
						<Check class="mr-3 h-6 w-6 flex-shrink-0 text-green-400" />
						<span>Advanced search and smart filtering</span>
					</li>
					<li class="flex items-center">
						<Check class="mr-3 h-6 w-6 flex-shrink-0 text-green-400" />
						<span>Complete interaction history and timeline</span>
					</li>
					<li class="flex items-center">
						<Check class="mr-3 h-6 w-6 flex-shrink-0 text-green-400" />
						<span>Mobile-optimized with offline access</span>
					</li>
				</ul>

				<div class="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
					<a
						href="/login"
						class="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-lg font-bold text-blue-700 shadow-2xl transition-all duration-200 hover:scale-105 hover:bg-gray-100"
					>
						<UserPlus class="mr-3 h-6 w-6" />
						Start Managing Contacts
					</a>
					<a
						href="https://github.com/MicroPyramid/opensource-startup-crm"
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center justify-center rounded-xl border-2 border-white px-8 py-4 text-lg font-bold text-white transition-all duration-200 hover:bg-white/10"
					>
						<Github class="mr-3 h-6 w-6" />
						View Source Code
					</a>
				</div>
			</div>

			<div class="lg:w-1/2">
				<div class="rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-sm">
					<h3 class="mb-6 text-center text-2xl font-bold">💰 Industry Cost Comparison*</h3>

					<div class="space-y-4">
						<div class="rounded-lg bg-white/20 p-4">
							<div class="mb-2 flex items-center justify-between">
								<span class="font-semibold">1,000 contacts in Enterprise CRM:</span>
								<span class="text-2xl font-bold text-red-300">$25,000+/year</span>
							</div>
							<div class="mb-2 flex items-center justify-between">
								<span class="font-semibold">1,000 contacts in Popular CRM:</span>
								<span class="text-2xl font-bold text-red-300">$3,000-8,000/year</span>
							</div>
							<div class="mb-4 flex items-center justify-between">
								<span class="font-semibold">1,000 contacts in Standard CRM:</span>
								<span class="text-2xl font-bold text-red-300">$1,500-3,000/year</span>
							</div>
							<div class="border-t border-white/30 pt-4">
								<div class="flex items-center justify-between">
									<span class="text-lg font-bold">Unlimited contacts in BottleCRM:</span>
									<span class="text-3xl font-bold text-green-300">$0</span>
								</div>
							</div>
						</div>

						<div class="text-center text-xl font-bold text-green-300">
							Save $1,500 - $25,000+ per year!
						</div>

						<div class="mt-4 text-center text-xs text-blue-200">
							*Based on industry-standard per-contact pricing models as of 2024
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Features Section -->
<section class="bg-gray-50 py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<h2 class="mb-6 text-4xl font-extrabold text-gray-900">
				Professional Contact Management Features
			</h2>
			<p class="mx-auto max-w-3xl text-xl text-gray-600">
				Everything you need to organize, track, and nurture your customer relationships. All
				features included for free, no premium tiers or hidden costs.
			</p>
		</div>

		<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#if mounted}
				<div
					in:fly={{ y: 30, duration: 600, delay: 0 }}
					class="group relative rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
				>
					<div class="absolute right-4 top-4">
						<span
							class="inline-flex items-center rounded-full border border-green-200 bg-green-100 px-3 py-1 text-xs font-medium text-green-800"
						>
							Save $2-10 per contact vs competitors
						</span>
					</div>

					<div
						class="mb-6 inline-block rounded-xl bg-gradient-to-r from-blue-100 to-indigo-100 p-4 transition-transform duration-300 group-hover:scale-110"
					>
						<Users class="h-8 w-8 text-blue-600" />
					</div>

					<h3 class="mb-4 text-2xl font-bold text-gray-900">Unlimited Contact Storage</h3>
					<p class="mb-6 leading-relaxed text-gray-600">
						Store unlimited contacts with complete profile information, interaction history, and
						custom fields. No per-contact pricing or storage limits.
					</p>

					<ul class="space-y-2">
						<li class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 text-green-500" />
							Unlimited contacts
						</li>
						<li class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 text-green-500" />
							Custom fields
						</li>
						<li class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 text-green-500" />
							Rich profiles
						</li>
						<li class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 text-green-500" />
							No storage limits
						</li>
					</ul>
				</div>

				<div
					in:fly={{ y: 30, duration: 600, delay: 100 }}
					class="group relative rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
				>
					<div class="absolute right-4 top-4">
						<span
							class="inline-flex items-center rounded-full border border-green-200 bg-green-100 px-3 py-1 text-xs font-medium text-green-800"
						>
							Enterprise-grade search for free
						</span>
					</div>

					<div
						class="mb-6 inline-block rounded-xl bg-gradient-to-r from-blue-100 to-indigo-100 p-4 transition-transform duration-300 group-hover:scale-110"
					>
						<Search class="h-8 w-8 text-blue-600" />
					</div>

					<h3 class="mb-4 text-2xl font-bold text-gray-900">Advanced Search & Filtering</h3>
					<p class="mb-6 leading-relaxed text-gray-600">
						Find contacts instantly with powerful search capabilities, smart filters, and custom
						tags. Search by name, company, tags, location, or any custom field.
					</p>

					<ul class="space-y-2">
						<li class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 text-green-500" />
							Instant search
						</li>
						<li class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 text-green-500" />
							Smart filters
						</li>
						<li class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 text-green-500" />
							Custom tags
						</li>
						<li class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 text-green-500" />
							Bulk operations
						</li>
					</ul>
				</div>

				<div
					in:fly={{ y: 30, duration: 600, delay: 200 }}
					class="group relative rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
				>
					<div class="absolute right-4 top-4">
						<span
							class="inline-flex items-center rounded-full border border-green-200 bg-green-100 px-3 py-1 text-xs font-medium text-green-800"
						>
							360° customer view
						</span>
					</div>

					<div
						class="mb-6 inline-block rounded-xl bg-gradient-to-r from-blue-100 to-indigo-100 p-4 transition-transform duration-300 group-hover:scale-110"
					>
						<Activity class="h-8 w-8 text-blue-600" />
					</div>

					<h3 class="mb-4 text-2xl font-bold text-gray-900">Contact Interaction Timeline</h3>
					<p class="mb-6 leading-relaxed text-gray-600">
						Track every interaction with your contacts including emails, calls, meetings, and notes.
						Build stronger relationships with complete interaction history.
					</p>

					<ul class="space-y-2">
						<li class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 text-green-500" />
							Complete timeline
						</li>
						<li class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 text-green-500" />
							Interaction tracking
						</li>
						<li class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 text-green-500" />
							Meeting history
						</li>
						<li class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 text-green-500" />
							Notes & tasks
						</li>
					</ul>
				</div>

				<div
					in:fly={{ y: 30, duration: 600, delay: 300 }}
					class="group relative rounded-2xl border border-gray-100 bg-white p-8 opacity-75 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
				>
					<div class="absolute right-4 top-4">
						<span
							class="inline-flex items-center rounded-full border border-orange-200 bg-orange-100 px-3 py-1 text-xs font-medium text-orange-800"
						>
							Coming Soon
						</span>
					</div>

					<div
						class="mb-6 inline-block rounded-xl bg-gradient-to-r from-blue-100 to-indigo-100 p-4 grayscale transition-transform duration-300 group-hover:scale-110"
					>
						<Target class="h-8 w-8 text-blue-600" />
					</div>

					<h3 class="mb-4 text-2xl font-bold text-gray-900">
						Smart Contact Segmentation
						<span class="ml-2 text-sm font-normal text-orange-600">• Coming Soon</span>
					</h3>
					<p class="mb-6 leading-relaxed text-gray-600">
						Organize contacts into dynamic segments based on behavior, demographics, or custom
						criteria. Target your outreach and marketing efforts effectively.
					</p>

					<ul class="space-y-2">
						<li class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 text-green-500" />
							Dynamic segments
						</li>
						<li class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 text-green-500" />
							Behavioral targeting
						</li>
						<li class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 text-green-500" />
							Custom criteria
						</li>
						<li class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 text-green-500" />
							Automated grouping
						</li>
					</ul>

					<div class="mt-4 rounded-lg border border-orange-200 bg-orange-50 p-3">
						<p class="text-sm font-medium text-orange-700">
							This feature is in development and will be available soon!
						</p>
					</div>
				</div>

				<div
					in:fly={{ y: 30, duration: 600, delay: 400 }}
					class="group relative rounded-2xl border border-gray-100 bg-white p-8 opacity-75 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
				>
					<div class="absolute right-4 top-4">
						<span
							class="inline-flex items-center rounded-full border border-orange-200 bg-orange-100 px-3 py-1 text-xs font-medium text-orange-800"
						>
							Coming Soon
						</span>
					</div>

					<div
						class="mb-6 inline-block rounded-xl bg-gradient-to-r from-blue-100 to-indigo-100 p-4 grayscale transition-transform duration-300 group-hover:scale-110"
					>
						<Database class="h-8 w-8 text-blue-600" />
					</div>

					<h3 class="mb-4 text-2xl font-bold text-gray-900">
						Bulk Import & Export
						<span class="ml-2 text-sm font-normal text-orange-600">• Coming Soon</span>
					</h3>
					<p class="mb-6 leading-relaxed text-gray-600">
						Easily import contacts from CSV, Excel, or other CRM systems. Export your data anytime
						with no vendor lock-in. Your data stays yours.
					</p>

					<ul class="space-y-2">
						<li class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 text-green-500" />
							CSV/Excel import
						</li>
						<li class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 text-green-500" />
							CRM migration
						</li>
						<li class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 text-green-500" />
							Data export
						</li>
						<li class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 text-green-500" />
							No vendor lock-in
						</li>
					</ul>

					<div class="mt-4 rounded-lg border border-orange-200 bg-orange-50 p-3">
						<p class="text-sm font-medium text-orange-700">
							This feature is in development and will be available soon!
						</p>
					</div>
				</div>

				<div
					in:fly={{ y: 30, duration: 600, delay: 500 }}
					class="group relative rounded-2xl border border-gray-100 bg-white p-8 opacity-75 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
				>
					<div class="absolute right-4 top-4">
						<span
							class="inline-flex items-center rounded-full border border-orange-200 bg-orange-100 px-3 py-1 text-xs font-medium text-orange-800"
						>
							Coming Soon
						</span>
					</div>

					<div
						class="mb-6 inline-block rounded-xl bg-gradient-to-r from-blue-100 to-indigo-100 p-4 grayscale transition-transform duration-300 group-hover:scale-110"
					>
						<Smartphone class="h-8 w-8 text-blue-600" />
					</div>

					<h3 class="mb-4 text-2xl font-bold text-gray-900">
						Mobile-First Contact Access
						<span class="ml-2 text-sm font-normal text-orange-600">• Coming Soon</span>
					</h3>
					<p class="mb-6 leading-relaxed text-gray-600">
						Access and manage contacts on any device with our responsive interface. Work offline and
						sync automatically when connected.
					</p>

					<ul class="space-y-2">
						<li class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 text-green-500" />
							Mobile optimized
						</li>
						<li class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 text-green-500" />
							Offline access
						</li>
						<li class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 text-green-500" />
							Auto sync
						</li>
						<li class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 text-green-500" />
							Cross-platform
						</li>
					</ul>

					<div class="mt-4 rounded-lg border border-orange-200 bg-orange-50 p-3">
						<p class="text-sm font-medium text-orange-700">
							This feature is in development and will be available soon!
						</p>
					</div>
				</div>
			{/if}
		</div>
	</div>
</section>

<!-- Interactive Demo Section -->
<section class="bg-white py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<h2 class="mb-6 text-4xl font-extrabold text-gray-900">See Contact Management in Action</h2>
			<p class="text-xl text-gray-600">
				Experience the intuitive interface and powerful features of BottleCRM's contact management
				system.
			</p>
		</div>

		<div class="rounded-2xl bg-gray-50 p-8">
			<div
				class="mb-6 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0"
			>
				<div class="flex items-center space-x-4">
					<div class="relative">
						<Search
							class="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400"
						/>
						<label for="contact-search-demo" class="sr-only">Search contacts</label>
						<input
							id="contact-search-demo"
							type="text"
							placeholder="Search contacts..."
							class="w-64 rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
						/>
					</div>
					<button
						class="flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 hover:bg-gray-50"
					>
						<Filter class="mr-2 h-4 w-4" />
						Filter
					</button>
				</div>
				<button
					class="flex items-center rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
				>
					<Plus class="mr-2 h-4 w-4" />
					Add Contact
				</button>
			</div>

			<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				<div
					class="cursor-pointer rounded-xl border-l-4 border-green-500 bg-white p-6 shadow-md transition-shadow duration-200 hover:shadow-lg"
				>
					<div class="mb-4 flex items-start justify-between">
						<div class="flex-1">
							<h4 class="text-lg font-bold text-gray-900">Sarah Johnson</h4>
							<p class="mt-1 flex items-center text-gray-600">
								<Building2 class="mr-1 h-4 w-4" />
								TechStart Inc.
							</p>
						</div>
						<span class="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
							Qualified
						</span>
					</div>

					<div class="space-y-2 text-sm text-gray-600">
						<p class="flex items-center">
							<Mail class="mr-2 h-4 w-4" />
							sarah@techstart.com
						</p>
						<p class="flex items-center">
							<Phone class="mr-2 h-4 w-4" />
							+1 (555) 123-4567
						</p>
						<p class="flex items-center">
							<MapPin class="mr-2 h-4 w-4" />
							San Francisco, CA
						</p>
						<p class="flex items-center">
							<Clock class="mr-2 h-4 w-4" />
							Last contact: 2 days ago
						</p>
					</div>

					<div class="mt-4 flex flex-wrap gap-2">
						<span class="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700">Hot Lead</span>
						<span class="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700">Enterprise</span>
					</div>

					<div class="mt-4 flex space-x-2">
						<button
							class="flex flex-1 items-center justify-center rounded-lg bg-blue-50 px-3 py-2 text-sm text-blue-600 hover:bg-blue-100"
						>
							<Eye class="mr-1 h-4 w-4" />
							View
						</button>
						<button
							class="flex flex-1 items-center justify-center rounded-lg bg-green-50 px-3 py-2 text-sm text-green-600 hover:bg-green-100"
						>
							<Edit class="mr-1 h-4 w-4" />
							Edit
						</button>
					</div>
				</div>

				<div
					class="cursor-pointer rounded-xl border-l-4 border-yellow-500 bg-white p-6 shadow-md transition-shadow duration-200 hover:shadow-lg"
				>
					<div class="mb-4 flex items-start justify-between">
						<div class="flex-1">
							<h4 class="text-lg font-bold text-gray-900">Michael Chen</h4>
							<p class="mt-1 flex items-center text-gray-600">
								<Building2 class="mr-1 h-4 w-4" />
								Growth Co.
							</p>
						</div>
						<span class="rounded-full bg-yellow-100 px-2 py-1 text-xs text-yellow-800">
							Negotiation
						</span>
					</div>

					<div class="space-y-2 text-sm text-gray-600">
						<p class="flex items-center">
							<Mail class="mr-2 h-4 w-4" />
							m.chen@growthco.com
						</p>
						<p class="flex items-center">
							<Phone class="mr-2 h-4 w-4" />
							+1 (555) 987-6543
						</p>
						<p class="flex items-center">
							<MapPin class="mr-2 h-4 w-4" />
							New York, NY
						</p>
						<p class="flex items-center">
							<Clock class="mr-2 h-4 w-4" />
							Last contact: 1 week ago
						</p>
					</div>

					<div class="mt-4 flex flex-wrap gap-2">
						<span class="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700"
							>Proposal Sent</span
						>
						<span class="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700"
							>Decision Maker</span
						>
					</div>

					<div class="mt-4 flex space-x-2">
						<button
							class="flex flex-1 items-center justify-center rounded-lg bg-blue-50 px-3 py-2 text-sm text-blue-600 hover:bg-blue-100"
						>
							<Eye class="mr-1 h-4 w-4" />
							View
						</button>
						<button
							class="flex flex-1 items-center justify-center rounded-lg bg-green-50 px-3 py-2 text-sm text-green-600 hover:bg-green-100"
						>
							<Edit class="mr-1 h-4 w-4" />
							Edit
						</button>
					</div>
				</div>

				<div
					class="cursor-pointer rounded-xl border-l-4 border-blue-500 bg-white p-6 shadow-md transition-shadow duration-200 hover:shadow-lg"
				>
					<div class="mb-4 flex items-start justify-between">
						<div class="flex-1">
							<h4 class="text-lg font-bold text-gray-900">Emma Rodriguez</h4>
							<p class="mt-1 flex items-center text-gray-600">
								<Building2 class="mr-1 h-4 w-4" />
								Scale Solutions
							</p>
						</div>
						<span class="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800"> New </span>
					</div>

					<div class="space-y-2 text-sm text-gray-600">
						<p class="flex items-center">
							<Mail class="mr-2 h-4 w-4" />
							emma@scalesolutions.com
						</p>
						<p class="flex items-center">
							<Phone class="mr-2 h-4 w-4" />
							+1 (555) 456-7890
						</p>
						<p class="flex items-center">
							<MapPin class="mr-2 h-4 w-4" />
							Austin, TX
						</p>
						<p class="flex items-center">
							<Clock class="mr-2 h-4 w-4" />
							Last contact: 3 days ago
						</p>
					</div>

					<div class="mt-4 flex flex-wrap gap-2">
						<span class="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700">New Contact</span
						>
						<span class="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700">SMB</span>
					</div>

					<div class="mt-4 flex space-x-2">
						<button
							class="flex flex-1 items-center justify-center rounded-lg bg-blue-50 px-3 py-2 text-sm text-blue-600 hover:bg-blue-100"
						>
							<Eye class="mr-1 h-4 w-4" />
							View
						</button>
						<button
							class="flex flex-1 items-center justify-center rounded-lg bg-green-50 px-3 py-2 text-sm text-green-600 hover:bg-green-100"
						>
							<Edit class="mr-1 h-4 w-4" />
							Edit
						</button>
					</div>
				</div>
			</div>

			<div class="mt-8 text-center">
				<p class="mb-4 text-gray-600">
					This is just a preview. The actual BottleCRM interface includes advanced filtering, bulk
					operations, custom fields, and much more.
				</p>
				<a
					href="/login"
					class="inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
				>
					<Zap class="mr-2 h-5 w-5" />
					Try the Full Interface
				</a>
			</div>
		</div>
	</div>
</section>

<!-- Coming Soon Features Section -->
<section class="bg-gradient-to-r from-orange-50 to-amber-50 py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<h2 class="mb-6 text-4xl font-extrabold text-gray-900">🚀 Coming Soon Features</h2>
			<p class="text-xl text-gray-600">
				We're continuously improving BottleCRM with new contact management features based on user
				feedback.
			</p>
		</div>

		<div class="grid gap-8 md:grid-cols-3">
			<div class="rounded-2xl border border-orange-200 bg-white p-8 shadow-lg">
				<div class="mb-6 inline-block rounded-xl bg-gradient-to-r from-orange-100 to-amber-100 p-4">
					<Target class="h-8 w-8 text-orange-600" />
				</div>
				<h3 class="mb-4 text-2xl font-bold text-gray-900">Smart Contact Segmentation</h3>
				<p class="mb-4 text-gray-600">
					Automatically segment contacts based on behavior, engagement, and custom criteria for
					targeted campaigns.
				</p>
				<div
					class="inline-flex items-center rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-800"
				>
					Q2 2024
				</div>
			</div>

			<div class="rounded-2xl border border-orange-200 bg-white p-8 shadow-lg">
				<div class="mb-6 inline-block rounded-xl bg-gradient-to-r from-orange-100 to-amber-100 p-4">
					<Database class="h-8 w-8 text-orange-600" />
				</div>
				<h3 class="mb-4 text-2xl font-bold text-gray-900">Bulk Import & Export</h3>
				<p class="mb-4 text-gray-600">
					Import thousands of contacts from CSV/Excel files and export your data in multiple formats
					with advanced mapping.
				</p>
				<div
					class="inline-flex items-center rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-800"
				>
					Q2 2024
				</div>
			</div>

			<div class="rounded-2xl border border-orange-200 bg-white p-8 shadow-lg">
				<div class="mb-6 inline-block rounded-xl bg-gradient-to-r from-orange-100 to-amber-100 p-4">
					<Smartphone class="h-8 w-8 text-orange-600" />
				</div>
				<h3 class="mb-4 text-2xl font-bold text-gray-900">Mobile-First Contact Access</h3>
				<p class="mb-4 text-gray-600">
					Native mobile app with offline sync, push notifications, and optimized contact management
					on the go.
				</p>
				<div
					class="inline-flex items-center rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-800"
				>
					Q3 2024
				</div>
			</div>
		</div>

		<div class="mt-12 rounded-2xl bg-white p-8 text-center shadow-lg">
			<h3 class="mb-4 text-2xl font-bold text-gray-900">Want to influence our roadmap?</h3>
			<p class="mb-6 text-gray-600">
				Join our community and help us prioritize which features to build next. Your feedback shapes
				BottleCRM's future!
			</p>
			<div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0">
				<a
					href="https://github.com/MicroPyramid/opensource-startup-crm/discussions"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center justify-center rounded-lg bg-orange-600 px-6 py-3 font-semibold text-white hover:bg-orange-700"
				>
					<MessageCircle class="mr-2 h-5 w-5" />
					Join Discussions
				</a>
				<a
					href="https://github.com/MicroPyramid/opensource-startup-crm/issues"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center justify-center rounded-lg bg-gray-600 px-6 py-3 font-semibold text-white hover:bg-gray-700"
				>
					<Github class="mr-2 h-5 w-5" />
					Request Features
				</a>
			</div>
		</div>
	</div>
</section>

<!-- Workflow Section -->
<section class="bg-gradient-to-r from-blue-50 to-indigo-50 py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<h2 class="mb-6 text-4xl font-extrabold text-gray-900">Simple Contact Management Workflow</h2>
			<p class="text-xl text-gray-600">
				Get started with professional contact management in just 4 easy steps.
			</p>
		</div>

		<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
			{#if mounted}
				<div
					in:fly={{ y: 30, duration: 600, delay: 0 }}
					class="relative rounded-2xl bg-white p-8 text-center shadow-lg"
				>
					<div class="absolute -top-4 left-1/2 -translate-x-1/2 transform">
						<div
							class="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 font-bold text-white"
						>
							1
						</div>
					</div>

					<div class="mb-6 mt-4">
						<div class="inline-block rounded-xl bg-gradient-to-r from-blue-100 to-indigo-100 p-4">
							<Upload class="h-8 w-8 text-blue-600" />
						</div>
					</div>

					<h3 class="mb-4 text-xl font-bold text-gray-900">Import Your Contacts</h3>
					<p class="mb-6 text-gray-600">
						Upload from CSV, Excel, or migrate from your existing CRM
					</p>

					<ul class="space-y-2 text-sm text-gray-700">
						<li class="flex items-center">
							<Check class="mr-2 h-4 w-4 text-green-500" />
							Drag & drop files
						</li>
						<li class="flex items-center">
							<Check class="mr-2 h-4 w-4 text-green-500" />
							Map fields automatically
						</li>
						<li class="flex items-center">
							<Check class="mr-2 h-4 w-4 text-green-500" />
							Validate data
						</li>
					</ul>
				</div>

				<div
					in:fly={{ y: 30, duration: 600, delay: 150 }}
					class="relative rounded-2xl bg-white p-8 text-center shadow-lg"
				>
					<div class="absolute -top-4 left-1/2 -translate-x-1/2 transform">
						<div
							class="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 font-bold text-white"
						>
							2
						</div>
					</div>

					<div class="mb-6 mt-4">
						<div class="inline-block rounded-xl bg-gradient-to-r from-blue-100 to-indigo-100 p-4">
							<Tag class="h-8 w-8 text-blue-600" />
						</div>
					</div>

					<h3 class="mb-4 text-xl font-bold text-gray-900">Organize & Segment</h3>
					<p class="mb-6 text-gray-600">
						Create tags, segments, and custom fields for better organization
					</p>

					<ul class="space-y-2 text-sm text-gray-700">
						<li class="flex items-center">
							<Check class="mr-2 h-4 w-4 text-green-500" />
							Create custom tags
						</li>
						<li class="flex items-center">
							<Check class="mr-2 h-4 w-4 text-green-500" />
							Set up segments
						</li>
						<li class="flex items-center">
							<Check class="mr-2 h-4 w-4 text-green-500" />
							Add custom fields
						</li>
					</ul>
				</div>

				<div
					in:fly={{ y: 30, duration: 600, delay: 300 }}
					class="relative rounded-2xl bg-white p-8 text-center shadow-lg"
				>
					<div class="absolute -top-4 left-1/2 -translate-x-1/2 transform">
						<div
							class="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 font-bold text-white"
						>
							3
						</div>
					</div>

					<div class="mb-6 mt-4">
						<div class="inline-block rounded-xl bg-gradient-to-r from-blue-100 to-indigo-100 p-4">
							<MessageCircle class="h-8 w-8 text-blue-600" />
						</div>
					</div>

					<h3 class="mb-4 text-xl font-bold text-gray-900">Track Interactions</h3>
					<p class="mb-6 text-gray-600">Log emails, calls, meetings, and notes for each contact</p>

					<ul class="space-y-2 text-sm text-gray-700">
						<li class="flex items-center">
							<Check class="mr-2 h-4 w-4 text-green-500" />
							Log communications
						</li>
						<li class="flex items-center">
							<Check class="mr-2 h-4 w-4 text-green-500" />
							Schedule follow-ups
						</li>
						<li class="flex items-center">
							<Check class="mr-2 h-4 w-4 text-green-500" />
							Add notes
						</li>
					</ul>
				</div>

				<div
					in:fly={{ y: 30, duration: 600, delay: 450 }}
					class="relative rounded-2xl bg-white p-8 text-center shadow-lg"
				>
					<div class="absolute -top-4 left-1/2 -translate-x-1/2 transform">
						<div
							class="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 font-bold text-white"
						>
							4
						</div>
					</div>

					<div class="mb-6 mt-4">
						<div class="inline-block rounded-xl bg-gradient-to-r from-blue-100 to-indigo-100 p-4">
							<BarChart3 class="h-8 w-8 text-blue-600" />
						</div>
					</div>

					<h3 class="mb-4 text-xl font-bold text-gray-900">Analyze & Optimize</h3>
					<p class="mb-6 text-gray-600">
						Use insights to improve relationships and conversion rates
					</p>

					<ul class="space-y-2 text-sm text-gray-700">
						<li class="flex items-center">
							<Check class="mr-2 h-4 w-4 text-green-500" />
							View analytics
						</li>
						<li class="flex items-center">
							<Check class="mr-2 h-4 w-4 text-green-500" />
							Track engagement
						</li>
						<li class="flex items-center">
							<Check class="mr-2 h-4 w-4 text-green-500" />
							Optimize outreach
						</li>
					</ul>
				</div>
			{/if}
		</div>
	</div>
</section>

<!-- Comparison Table -->
<section class="bg-gray-50 py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<h2 class="mb-6 text-4xl font-extrabold text-gray-900">
				Contact Management Feature Comparison
			</h2>
			<p class="text-xl text-gray-600">
				See how BottleCRM's contact management compares to typical CRM pricing models.
			</p>
		</div>

		<div class="overflow-x-auto">
			<table class="w-full overflow-hidden rounded-xl bg-white shadow-lg">
				<thead class="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
					<tr>
						<th class="px-6 py-4 text-left text-sm font-semibold">Platform Type</th>
						<th class="px-6 py-4 text-center text-sm font-semibold">Contact Limit</th>
						<th class="px-6 py-4 text-center text-sm font-semibold">Typical Pricing</th>
						<th class="px-6 py-4 text-center text-sm font-semibold">Custom Fields</th>
						<th class="px-6 py-4 text-center text-sm font-semibold">Data Export</th>
						<th class="px-6 py-4 text-center text-sm font-semibold">Mobile App</th>
						<th class="px-6 py-4 text-center text-sm font-semibold">API Access</th>
						<th class="px-6 py-4 text-center text-sm font-semibold">Self-Hosted</th>
					</tr>
				</thead>
				<tbody>
					<tr class="border-b border-l-4 border-gray-200 border-l-green-500 bg-green-50">
						<td class="px-6 py-4 font-semibold text-green-700">
							<div class="flex items-center">
								BottleCRM
								<span class="ml-2 rounded-full bg-green-100 px-2 py-1 text-xs text-green-800"
									>Free & Open Source</span
								>
							</div>
						</td>
						<td class="px-6 py-4 text-center font-bold text-green-600">Unlimited</td>
						<td class="px-6 py-4 text-center font-bold text-green-600">$0</td>
						<td class="px-6 py-4 text-center text-gray-700">Unlimited</td>
						<td class="px-6 py-4 text-center">
							<Check class="mx-auto h-5 w-5 text-green-500" />
						</td>
						<td class="px-6 py-4 text-center">
							<Check class="mx-auto h-5 w-5 text-green-500" />
						</td>
						<td class="px-6 py-4 text-center">
							<Check class="mx-auto h-5 w-5 text-green-500" />
						</td>
						<td class="px-6 py-4 text-center">
							<Check class="mx-auto h-5 w-5 text-green-500" />
						</td>
					</tr>
					<tr class="border-b border-gray-200 hover:bg-gray-50">
						<td class="px-6 py-4 font-semibold text-gray-900">
							<div class="flex items-center">Enterprise CRM Platforms</div>
						</td>
						<td class="px-6 py-4 text-center text-gray-700">Plan-dependent</td>
						<td class="px-6 py-4 text-center text-gray-700">$25-300+/user</td>
						<td class="px-6 py-4 text-center text-gray-700">Limited by tier</td>
						<td class="px-6 py-4 text-center">
							<span class="text-sm text-gray-700">Often restricted</span>
						</td>
						<td class="px-6 py-4 text-center">
							<Check class="mx-auto h-5 w-5 text-green-500" />
						</td>
						<td class="px-6 py-4 text-center">
							<span class="text-sm text-gray-700">Premium tiers</span>
						</td>
						<td class="px-6 py-4 text-center">
							<X class="mx-auto h-5 w-5 text-red-500" />
						</td>
					</tr>
					<tr class="border-b border-gray-200 hover:bg-gray-50">
						<td class="px-6 py-4 font-semibold text-gray-900">
							<div class="flex items-center">Popular Cloud CRMs</div>
						</td>
						<td class="px-6 py-4 text-center text-gray-700">Limited on free plans</td>
						<td class="px-6 py-4 text-center text-gray-700">$15-100+/month</td>
						<td class="px-6 py-4 text-center text-gray-700">Tier-restricted</td>
						<td class="px-6 py-4 text-center">
							<span class="text-sm text-gray-700">Basic exports</span>
						</td>
						<td class="px-6 py-4 text-center">
							<Check class="mx-auto h-5 w-5 text-green-500" />
						</td>
						<td class="px-6 py-4 text-center">
							<span class="text-sm text-gray-700">Paid features</span>
						</td>
						<td class="px-6 py-4 text-center">
							<X class="mx-auto h-5 w-5 text-red-500" />
						</td>
					</tr>
					<tr class="border-b border-gray-200 hover:bg-gray-50">
						<td class="px-6 py-4 font-semibold text-gray-900">
							<div class="flex items-center">Mid-Market CRM Solutions</div>
						</td>
						<td class="px-6 py-4 text-center text-gray-700">Per-user limitations</td>
						<td class="px-6 py-4 text-center text-gray-700">$15-99/user</td>
						<td class="px-6 py-4 text-center text-gray-700">Limited</td>
						<td class="px-6 py-4 text-center">
							<Check class="mx-auto h-5 w-5 text-green-500" />
						</td>
						<td class="px-6 py-4 text-center">
							<Check class="mx-auto h-5 w-5 text-green-500" />
						</td>
						<td class="px-6 py-4 text-center">
							<span class="text-sm text-gray-700">Higher tiers</span>
						</td>
						<td class="px-6 py-4 text-center">
							<X class="mx-auto h-5 w-5 text-red-500" />
						</td>
					</tr>
				</tbody>
			</table>
		</div>

		<div class="mt-8 text-center">
			<p class="text-sm text-gray-600">
				*Pricing and features based on publicly available information as of 2024. Individual
				platform offerings may vary.
			</p>
		</div>
	</div>
</section>

<!-- FAQ Section -->
<section class="bg-white py-20">
	<div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<h2 class="mb-6 text-4xl font-extrabold text-gray-900">Contact Management FAQ</h2>
			<p class="text-xl text-gray-600">
				Common questions about BottleCRM's contact management features.
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
							How many contacts can I store in BottleCRM?
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
							Unlimited! Unlike other CRM systems that charge per contact or have storage limits,
							BottleCRM allows you to store as many contacts as you need without any additional
							costs.
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
							Can I import contacts from my existing CRM or spreadsheet?
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
							Yes, BottleCRM supports importing contacts from CSV files, Excel spreadsheets, and
							most popular CRM systems. Our import wizard helps you map fields and ensures data
							integrity during the migration process.
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
							Is my contact data secure and private?
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
							Absolutely. Since BottleCRM is self-hosted, your contact data never leaves your
							servers. You have complete control over data security, privacy, and compliance with
							regulations like GDPR.
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
							Can I customize contact fields for my business needs?
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
							Yes, BottleCRM allows unlimited custom fields. Add industry-specific information,
							custom tags, dropdown selections, and any other data points relevant to your business
							without restrictions.
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
							Does BottleCRM work on mobile devices?
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
							BottleCRM is fully responsive and works perfectly on smartphones and tablets. You can
							access, search, and manage contacts on any device with a modern web browser.
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
							How does contact management in BottleCRM compare to paid alternatives?
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
							BottleCRM provides enterprise-grade contact management features for free, including
							unlimited contacts, custom fields, advanced search, and data export. Most commercial
							CRM systems charge $25-100+ per user per month for similar functionality, often with
							contact limits and feature restrictions.
						</p>
					</div>
				{/if}
			</div>
		</div>
	</div>
</section>

<!-- Call to Action -->
<section class="bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 py-20 text-white">
	<div class="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
		<h2 class="mb-6 text-4xl font-extrabold md:text-5xl">
			Ready to Manage Unlimited Contacts for Free?
		</h2>
		<p class="mx-auto mb-8 max-w-3xl text-xl text-blue-100 md:text-2xl">
			Stop paying per contact or hitting storage limits. Start building better customer
			relationships with BottleCRM's powerful, free contact management system.
		</p>

		<div
			class="mb-8 flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-x-6 sm:space-y-0"
		>
			<a
				href="/login"
				class="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-lg font-bold text-blue-700 shadow-2xl transition-all duration-200 hover:scale-105 hover:bg-gray-100"
			>
				<UserPlus class="mr-3 h-6 w-6" />
				Start Managing Contacts
			</a>
			<a
				href="https://github.com/MicroPyramid/opensource-startup-crm"
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center justify-center rounded-xl border-2 border-white px-8 py-4 text-lg font-bold text-white transition-all duration-200 hover:bg-white/10"
			>
				<Github class="mr-3 h-6 w-6" />
				Download Source Code
			</a>
		</div>

		<div class="mx-auto grid max-w-2xl grid-cols-1 gap-6 md:grid-cols-3">
			<div class="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
				<div class="text-2xl font-bold text-green-300">∞</div>
				<div class="text-sm text-blue-200">Unlimited Contacts</div>
			</div>
			<div class="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
				<div class="text-2xl font-bold text-green-300">$0</div>
				<div class="text-sm text-blue-200">Monthly Cost</div>
			</div>
			<div class="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
				<div class="text-2xl font-bold text-green-300">100%</div>
				<div class="text-sm text-blue-200">Data Ownership</div>
			</div>
		</div>

		<p class="mt-8 text-blue-200">
			🚀 No setup fees • No user limits • No vendor lock-in • Free forever
		</p>
	</div>
</section>
