<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import {
		Download,
		ArrowRight,
		CheckCircle,
		Clock,
		Database,
		Shield,
		Zap,
		Users,
		DollarSign,
		AlertCircle,
		FileText,
		Settings,
		Cloud,
		CheckSquare,
		MessageCircle,
		Github,
		ExternalLink,
		TrendingUp,
		Lock,
		Unlock,
		ChevronDown,
		Mail,
		Calendar
	} from '@lucide/svelte';

	let activeFaq: number | null = null;
	let mounted = false;
	let emailForUpdates = '';
	let subscribed = false;

	function toggleFaq(index: number) {
		activeFaq = activeFaq === index ? null : index;
	}

	async function subscribeForUpdates(): Promise<void> {
		// Simulate subscription - replace with actual implementation
		if (emailForUpdates) {
			subscribed = true;
		}
	}

	onMount(() => {
		mounted = true;
	});
</script>

<svelte:head>
	<title>Migrate to BottleCRM – Free CRM Migration Tools & Service</title>
	<meta
		name="description"
		content="Migrate from Salesforce, HubSpot, Pipedrive, and more to BottleCRM. Free CRM migration tools, expert support, and zero subscription fees. Own your CRM data."
	/>
	<meta
		name="keywords"
		content="crm migration, migrate crm, crm data migration, free crm migration, open source crm, salesforce migration, hubspot migration, pipedrive migration, crm import, crm export, crm migration service"
	/>
	<link rel="canonical" href="https://bottlecrm.io/migration" />

	<!-- Open Graph -->
	<meta property="og:title" content="Migrate to BottleCRM – Free CRM Migration Tools & Service" />
	<meta
		property="og:description"
		content="Switch from Salesforce, HubSpot, Pipedrive, and more to BottleCRM. Free migration tools, expert support, and zero subscription fees."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://bottlecrm.io/migration" />
	<meta property="og:image" content="https://bottlecrm.io/og-image.png" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Migrate to BottleCRM – Free CRM Migration Tools & Service" />
	<meta
		name="twitter:description"
		content="Migrate from Salesforce, HubSpot, Pipedrive, and more to BottleCRM. Free CRM migration tools, expert support, and zero subscription fees."
	/>
	<meta name="twitter:image" content="https://bottlecrm.io/og-image.png" />

	<!-- Structured Data (JSON-LD) -->
	{@html `
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "CRM Migration to BottleCRM",
        "description": "Professional CRM migration services and free tools to move from Salesforce, HubSpot, Pipedrive, and other platforms to BottleCRM. Preserve your data and eliminate subscription costs.",
        "provider": {
          "@type": "Organization",
          "name": "BottleCRM",
          "url": "https://bottlecrm.io"
        },
        "areaServed": "Worldwide",
        "serviceType": "CRM Data Migration",
        "url": "https://bottlecrm.io/migration"
      }
    </script>
  `}
</svelte:head>

<!-- Hero Section -->
<section class="bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 py-20 text-white">
	<div class="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
		<div class="mx-auto max-w-4xl">
			<div
				class="mb-6 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm"
			>
				<Clock class="mr-2 h-4 w-4" />
				Migration Tools Coming Soon • CSV Import Available Now
			</div>

			<h1 class="mb-6 text-4xl font-extrabold md:text-6xl">
				Break Free from CRM Subscriptions. <span class="text-yellow-300">Own Your Data.</span>
			</h1>

			<p class="mb-8 text-xl leading-relaxed text-blue-100 md:text-2xl">
				Migrate from expensive subscription-based CRM platforms to BottleCRM. Keep all your data,
				gain complete control, and eliminate monthly fees forever.
			</p>

			<div
				class="mb-12 flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-x-6 sm:space-y-0"
			>
				<a
					href="#preparation"
					class="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-lg font-bold text-blue-700 shadow-2xl transition-all duration-200 hover:scale-105 hover:bg-gray-100"
				>
					<CheckCircle class="mr-3 h-6 w-6" />
					Start Migration Prep
				</a>
				<a
					href="#notify"
					class="inline-flex items-center justify-center rounded-xl border-2 border-white px-8 py-4 text-lg font-bold text-white transition-all duration-200 hover:bg-white/10"
				>
					<Mail class="mr-3 h-6 w-6" />
					Get Notified When Ready
				</a>
			</div>

			<div class="mx-auto grid max-w-2xl grid-cols-1 gap-6 md:grid-cols-3">
				<div class="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
					<div class="text-2xl font-bold text-yellow-300">$0</div>
					<div class="text-sm text-blue-200">Migration Cost (DIY)</div>
				</div>
				<div class="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
					<div class="text-2xl font-bold text-yellow-300">100%</div>
					<div class="text-sm text-blue-200">Data Preserved</div>
				</div>
				<div class="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
					<div class="text-2xl font-bold text-yellow-300">1-4</div>
					<div class="text-sm text-blue-200">Weeks Timeline</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Migration Sources Section -->
<section class="bg-gray-50 py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<h2 class="mb-6 text-4xl font-extrabold text-gray-900">Migrate From Any CRM Platform</h2>
			<p class="mx-auto max-w-3xl text-xl text-gray-600">
				We're building migration tools for all major CRM platforms. See what you can expect when
				migrating from popular systems.
			</p>
		</div>

		<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
			<!-- Enterprise CRM Platform A -->
			<div
				class="relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
			>
				<div class="absolute right-4 top-4">
					<span
						class="inline-flex items-center rounded-full border border-yellow-200 bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800"
					>
						Coming Soon
					</span>
				</div>

				<div class="mb-6 text-center">
					<div class="mb-4 text-4xl">🏢</div>
					<h3 class="mb-2 text-2xl font-bold text-gray-900">Enterprise CRM Platform</h3>
					<div class="flex justify-center space-x-4 text-sm">
						<span class="rounded bg-blue-100 px-2 py-1 text-blue-800">Complex</span>
						<span class="rounded bg-green-100 px-2 py-1 text-green-800">2-4 weeks</span>
					</div>
				</div>

				<div class="space-y-4">
					<div>
						<h4 class="mb-2 font-semibold text-gray-900">Data Types:</h4>
						<div class="flex flex-wrap gap-1">
							<span class="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700">Contacts</span>
							<span class="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700">Leads</span>
							<span class="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700">Opportunities</span>
							<span class="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700">Accounts</span>
							<span class="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700">Tasks</span>
							<span class="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700">Notes</span>
						</div>
					</div>

					<div>
						<h4 class="mb-2 font-semibold text-gray-900">Challenges:</h4>
						<ul class="space-y-1">
							<li class="flex items-center text-sm text-gray-600">
								<AlertCircle class="mr-2 h-3 w-3 text-orange-500" />
								Custom fields mapping
							</li>
							<li class="flex items-center text-sm text-gray-600">
								<AlertCircle class="mr-2 h-3 w-3 text-orange-500" />
								Complex workflow recreation
							</li>
							<li class="flex items-center text-sm text-gray-600">
								<AlertCircle class="mr-2 h-3 w-3 text-orange-500" />
								API rate limitations
							</li>
						</ul>
					</div>

					<div class="border-t border-gray-200 pt-4">
						<div class="flex items-center justify-between">
							<span class="text-sm font-medium text-gray-900">Typical Savings:</span>
							<span class="text-lg font-bold text-green-600">$3,000-36,000/year</span>
						</div>
					</div>
				</div>
			</div>

			<!-- Marketing-Focused CRM -->
			<div
				class="relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
			>
				<div class="absolute right-4 top-4">
					<span
						class="inline-flex items-center rounded-full border border-yellow-200 bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800"
					>
						Coming Soon
					</span>
				</div>

				<div class="mb-6 text-center">
					<div class="mb-4 text-4xl">🧡</div>
					<h3 class="mb-2 text-2xl font-bold text-gray-900">Marketing-Focused CRM</h3>
					<div class="flex justify-center space-x-4 text-sm">
						<span class="rounded bg-blue-100 px-2 py-1 text-blue-800">Moderate</span>
						<span class="rounded bg-green-100 px-2 py-1 text-green-800">1-2 weeks</span>
					</div>
				</div>

				<div class="space-y-4">
					<div>
						<h4 class="mb-2 font-semibold text-gray-900">Data Types:</h4>
						<div class="flex flex-wrap gap-1">
							<span class="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700">Contacts</span>
							<span class="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700">Companies</span>
							<span class="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700">Deals</span>
							<span class="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700">Tasks</span>
							<span class="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700">Email history</span>
						</div>
					</div>

					<div>
						<h4 class="mb-2 font-semibold text-gray-900">Challenges:</h4>
						<ul class="space-y-1">
							<li class="flex items-center text-sm text-gray-600">
								<AlertCircle class="mr-2 h-3 w-3 text-orange-500" />
								Marketing automation setup
							</li>
							<li class="flex items-center text-sm text-gray-600">
								<AlertCircle class="mr-2 h-3 w-3 text-orange-500" />
								Custom properties mapping
							</li>
						</ul>
					</div>

					<div class="border-t border-gray-200 pt-4">
						<div class="flex items-center justify-between">
							<span class="text-sm font-medium text-gray-900">Typical Savings:</span>
							<span class="text-lg font-bold text-green-600">$6,000-60,000/year</span>
						</div>
					</div>
				</div>
			</div>

			<!-- Sales Pipeline CRM -->
			<div
				class="relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
			>
				<div class="absolute right-4 top-4">
					<span
						class="inline-flex items-center rounded-full border border-yellow-200 bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800"
					>
						Coming Soon
					</span>
				</div>

				<div class="mb-6 text-center">
					<div class="mb-4 text-4xl">🟢</div>
					<h3 class="mb-2 text-2xl font-bold text-gray-900">Sales Pipeline CRM</h3>
					<div class="flex justify-center space-x-4 text-sm">
						<span class="rounded bg-blue-100 px-2 py-1 text-blue-800">Simple</span>
						<span class="rounded bg-green-100 px-2 py-1 text-green-800">1 week</span>
					</div>
				</div>

				<div class="space-y-4">
					<div>
						<h4 class="mb-2 font-semibold text-gray-900">Data Types:</h4>
						<div class="flex flex-wrap gap-1">
							<span class="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700">Contacts</span>
							<span class="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700">Organizations</span>
							<span class="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700">Deals</span>
							<span class="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700">Activities</span>
							<span class="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700">Notes</span>
						</div>
					</div>

					<div>
						<h4 class="mb-2 font-semibold text-gray-900">Challenges:</h4>
						<ul class="space-y-1">
							<li class="flex items-center text-sm text-gray-600">
								<AlertCircle class="mr-2 h-3 w-3 text-orange-500" />
								Pipeline stage mapping
							</li>
							<li class="flex items-center text-sm text-gray-600">
								<AlertCircle class="mr-2 h-3 w-3 text-orange-500" />
								Activity type recreation
							</li>
						</ul>
					</div>

					<div class="border-t border-gray-200 pt-4">
						<div class="flex items-center justify-between">
							<span class="text-sm font-medium text-gray-900">Typical Savings:</span>
							<span class="text-lg font-bold text-green-600">$1,800-20,000/year</span>
						</div>
					</div>
				</div>
			</div>

			<!-- All-in-One CRM Suite -->
			<div
				class="relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
			>
				<div class="absolute right-4 top-4">
					<span
						class="inline-flex items-center rounded-full border border-yellow-200 bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800"
					>
						Coming Soon
					</span>
				</div>

				<div class="mb-6 text-center">
					<div class="mb-4 text-4xl">🔴</div>
					<h3 class="mb-2 text-2xl font-bold text-gray-900">All-in-One CRM Suite</h3>
					<div class="flex justify-center space-x-4 text-sm">
						<span class="rounded bg-blue-100 px-2 py-1 text-blue-800">Complex</span>
						<span class="rounded bg-green-100 px-2 py-1 text-green-800">2-3 weeks</span>
					</div>
				</div>

				<div class="space-y-4">
					<div>
						<h4 class="mb-2 font-semibold text-gray-900">Data Types:</h4>
						<div class="flex flex-wrap gap-1">
							<span class="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700">Leads</span>
							<span class="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700">Contacts</span>
							<span class="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700">Accounts</span>
							<span class="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700">Deals</span>
							<span class="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700">Tasks</span>
							<span class="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700">Events</span>
						</div>
					</div>

					<div>
						<h4 class="mb-2 font-semibold text-gray-900">Challenges:</h4>
						<ul class="space-y-1">
							<li class="flex items-center text-sm text-gray-600">
								<AlertCircle class="mr-2 h-3 w-3 text-orange-500" />
								Custom module recreation
							</li>
							<li class="flex items-center text-sm text-gray-600">
								<AlertCircle class="mr-2 h-3 w-3 text-orange-500" />
								Workflow rule mapping
							</li>
						</ul>
					</div>

					<div class="border-t border-gray-200 pt-4">
						<div class="flex items-center justify-between">
							<span class="text-sm font-medium text-gray-900">Typical Savings:</span>
							<span class="text-lg font-bold text-green-600">$1,200-15,000/year</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Migration Preparation Section -->
<section id="preparation" class="bg-white py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<h2 class="mb-6 text-4xl font-extrabold text-gray-900">Prepare for Your Migration</h2>
			<p class="mx-auto max-w-3xl text-xl text-gray-600">
				Get ready for a smooth migration with our comprehensive preparation guide. Complete these
				steps before migration tools are released.
			</p>
		</div>

		<div class="space-y-8">
			<!-- Data Audit & Cleanup -->
			<div
				class="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-8"
			>
				<div class="flex flex-col lg:flex-row lg:items-center lg:space-x-8">
					<div class="mb-6 lg:mb-0 lg:w-1/3">
						<div class="mb-4 flex items-center">
							<div class="mr-4 rounded-xl bg-blue-100 p-3">
								<Database class="h-6 w-6 text-blue-600" />
							</div>
							<div>
								<h3 class="text-xl font-bold text-gray-900">Data Audit & Cleanup</h3>
								<p class="text-sm font-medium text-blue-600">Estimated time: 1-2 days</p>
							</div>
						</div>
						<p class="text-gray-600">Review and clean your existing CRM data before migration</p>
					</div>

					<div class="lg:w-2/3">
						<div class="grid gap-3 md:grid-cols-2">
							<div class="flex items-start space-x-3 rounded-lg bg-white p-4 shadow-sm">
								<CheckCircle class="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
								<span class="text-sm text-gray-700">Remove duplicate contacts and leads</span>
							</div>
							<div class="flex items-start space-x-3 rounded-lg bg-white p-4 shadow-sm">
								<CheckCircle class="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
								<span class="text-sm text-gray-700"
									>Standardize data formats (phone, email, addresses)</span
								>
							</div>
							<div class="flex items-start space-x-3 rounded-lg bg-white p-4 shadow-sm">
								<CheckCircle class="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
								<span class="text-sm text-gray-700">Archive outdated or irrelevant records</span>
							</div>
							<div class="flex items-start space-x-3 rounded-lg bg-white p-4 shadow-sm">
								<CheckCircle class="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
								<span class="text-sm text-gray-700">Document custom fields and their purposes</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Export Data from Current CRM -->
			<div
				class="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-8"
			>
				<div class="flex flex-col lg:flex-row lg:items-center lg:space-x-8">
					<div class="mb-6 lg:mb-0 lg:w-1/3">
						<div class="mb-4 flex items-center">
							<div class="mr-4 rounded-xl bg-blue-100 p-3">
								<Download class="h-6 w-6 text-blue-600" />
							</div>
							<div>
								<h3 class="text-xl font-bold text-gray-900">Export Data from Current CRM</h3>
								<p class="text-sm font-medium text-blue-600">Estimated time: 2-4 hours</p>
							</div>
						</div>
						<p class="text-gray-600">Gather all necessary data from your existing system</p>
					</div>

					<div class="lg:w-2/3">
						<div class="grid gap-3 md:grid-cols-2">
							<div class="flex items-start space-x-3 rounded-lg bg-white p-4 shadow-sm">
								<CheckCircle class="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
								<span class="text-sm text-gray-700">Export contacts with all custom fields</span>
							</div>
							<div class="flex items-start space-x-3 rounded-lg bg-white p-4 shadow-sm">
								<CheckCircle class="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
								<span class="text-sm text-gray-700">Download deal/opportunity data</span>
							</div>
							<div class="flex items-start space-x-3 rounded-lg bg-white p-4 shadow-sm">
								<CheckCircle class="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
								<span class="text-sm text-gray-700">Save task and activity history</span>
							</div>
							<div class="flex items-start space-x-3 rounded-lg bg-white p-4 shadow-sm">
								<CheckCircle class="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
								<span class="text-sm text-gray-700">Backup email integration settings</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Plan Your BottleCRM Setup -->
			<div
				class="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-8"
			>
				<div class="flex flex-col lg:flex-row lg:items-center lg:space-x-8">
					<div class="mb-6 lg:mb-0 lg:w-1/3">
						<div class="mb-4 flex items-center">
							<div class="mr-4 rounded-xl bg-blue-100 p-3">
								<Settings class="h-6 w-6 text-blue-600" />
							</div>
							<div>
								<h3 class="text-xl font-bold text-gray-900">Plan Your BottleCRM Setup</h3>
								<p class="text-sm font-medium text-blue-600">Estimated time: 1 day</p>
							</div>
						</div>
						<p class="text-gray-600">Configure BottleCRM to match your business needs</p>
					</div>

					<div class="lg:w-2/3">
						<div class="grid gap-3 md:grid-cols-2">
							<div class="flex items-start space-x-3 rounded-lg bg-white p-4 shadow-sm">
								<CheckCircle class="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
								<span class="text-sm text-gray-700">Define your sales pipeline stages</span>
							</div>
							<div class="flex items-start space-x-3 rounded-lg bg-white p-4 shadow-sm">
								<CheckCircle class="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
								<span class="text-sm text-gray-700">Set up custom fields and properties</span>
							</div>
							<div class="flex items-start space-x-3 rounded-lg bg-white p-4 shadow-sm">
								<CheckCircle class="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
								<span class="text-sm text-gray-700">Configure user roles and permissions</span>
							</div>
							<div class="flex items-start space-x-3 rounded-lg bg-white p-4 shadow-sm">
								<CheckCircle class="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
								<span class="text-sm text-gray-700">Plan integration requirements</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Test with Sample Data -->
			<div
				class="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-8"
			>
				<div class="flex flex-col lg:flex-row lg:items-center lg:space-x-8">
					<div class="mb-6 lg:mb-0 lg:w-1/3">
						<div class="mb-4 flex items-center">
							<div class="mr-4 rounded-xl bg-blue-100 p-3">
								<CheckSquare class="h-6 w-6 text-blue-600" />
							</div>
							<div>
								<h3 class="text-xl font-bold text-gray-900">Test with Sample Data</h3>
								<p class="text-sm font-medium text-blue-600">Estimated time: 1-2 days</p>
							</div>
						</div>
						<p class="text-gray-600">Validate the migration process with a small data set</p>
					</div>

					<div class="lg:w-2/3">
						<div class="grid gap-3 md:grid-cols-2">
							<div class="flex items-start space-x-3 rounded-lg bg-white p-4 shadow-sm">
								<CheckCircle class="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
								<span class="text-sm text-gray-700">Import a small batch of test data</span>
							</div>
							<div class="flex items-start space-x-3 rounded-lg bg-white p-4 shadow-sm">
								<CheckCircle class="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
								<span class="text-sm text-gray-700">Verify data integrity and formatting</span>
							</div>
							<div class="flex items-start space-x-3 rounded-lg bg-white p-4 shadow-sm">
								<CheckCircle class="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
								<span class="text-sm text-gray-700">Test critical workflows and processes</span>
							</div>
							<div class="flex items-start space-x-3 rounded-lg bg-white p-4 shadow-sm">
								<CheckCircle class="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
								<span class="text-sm text-gray-700">Train team on new interface</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="mt-12 text-center">
			<div
				class="mx-auto max-w-3xl rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white"
			>
				<h3 class="mb-4 text-2xl font-bold">Need Professional Help?</h3>
				<p class="mb-6 text-blue-100">
					Our migration experts can handle the entire process for you, including data cleanup,
					custom field mapping, and workflow recreation.
				</p>
				<a
					href="/contact"
					class="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 font-semibold text-blue-600 transition-colors hover:bg-gray-100"
				>
					<MessageCircle class="mr-2 h-5 w-5" />
					Get Professional Migration Service
				</a>
			</div>
		</div>
	</div>
</section>

<!-- Benefits of Migration Section -->
<section class="bg-gray-50 py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<h2 class="mb-6 text-4xl font-extrabold text-gray-900">Why Choose BottleCRM?</h2>
			<p class="text-xl text-gray-600">
				Experience the freedom of open-source CRM with enterprise-level features.
			</p>
		</div>

		<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
			<div class="rounded-xl bg-white p-8 text-center shadow-lg">
				<div class="mb-6 inline-block rounded-full bg-green-100 p-4">
					<DollarSign class="h-8 w-8 text-green-600" />
				</div>
				<h3 class="mb-4 text-xl font-bold text-gray-900">Eliminate Subscription Costs</h3>
				<p class="mb-4 text-gray-600">
					Stop paying monthly fees. One-time setup, lifetime ownership.
				</p>
				<div class="text-2xl font-bold text-green-600">$0/month</div>
			</div>

			<div class="rounded-xl bg-white p-8 text-center shadow-lg">
				<div class="mb-6 inline-block rounded-full bg-blue-100 p-4">
					<Shield class="h-8 w-8 text-blue-600" />
				</div>
				<h3 class="mb-4 text-xl font-bold text-gray-900">Complete Data Control</h3>
				<p class="mb-4 text-gray-600">
					Self-host on your servers. No vendor lock-in or data hostage situations.
				</p>
				<div class="text-2xl font-bold text-blue-600">100% Yours</div>
			</div>

			<div class="rounded-xl bg-white p-8 text-center shadow-lg">
				<div class="mb-6 inline-block rounded-full bg-indigo-100 p-4">
					<Settings class="h-8 w-8 text-indigo-600" />
				</div>
				<h3 class="mb-4 text-xl font-bold text-gray-900">Unlimited Customization</h3>
				<p class="mb-4 text-gray-600">Modify source code to fit your exact business needs.</p>
				<div class="text-2xl font-bold text-indigo-600">∞ Flexible</div>
			</div>

			<div class="rounded-xl bg-white p-8 text-center shadow-lg">
				<div class="mb-6 inline-block rounded-full bg-purple-100 p-4">
					<Users class="h-8 w-8 text-purple-600" />
				</div>
				<h3 class="mb-4 text-xl font-bold text-gray-900">No User Limits</h3>
				<p class="mb-4 text-gray-600">Add unlimited users without additional per-seat costs.</p>
				<div class="text-2xl font-bold text-purple-600">∞ Users</div>
			</div>

			<div class="rounded-xl bg-white p-8 text-center shadow-lg">
				<div class="mb-6 inline-block rounded-full bg-yellow-100 p-4">
					<Unlock class="h-8 w-8 text-yellow-600" />
				</div>
				<h3 class="mb-4 text-xl font-bold text-gray-900">Open Source Freedom</h3>
				<p class="mb-4 text-gray-600">MIT license gives you complete freedom to use and modify.</p>
				<div class="text-2xl font-bold text-yellow-600">MIT License</div>
			</div>

			<div class="rounded-xl bg-white p-8 text-center shadow-lg">
				<div class="mb-6 inline-block rounded-full bg-green-100 p-4">
					<TrendingUp class="h-8 w-8 text-green-600" />
				</div>
				<h3 class="mb-4 text-xl font-bold text-gray-900">Future-Proof</h3>
				<p class="mb-4 text-gray-600">Never worry about price increases or feature limitations.</p>
				<div class="text-2xl font-bold text-green-600">Forever</div>
			</div>
		</div>
	</div>
</section>

<!-- Notification Signup Section -->
<section
	id="notify"
	class="bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-800 py-20 text-white"
>
	<div class="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
		<h2 class="mb-6 text-4xl font-extrabold">Be First to Know When Migration Tools Launch</h2>
		<p class="mb-8 text-xl text-blue-100">
			Get notified the moment our automated migration tools are ready. Plus receive migration
			guides, tips, and early access to new features.
		</p>

		{#if !subscribed}
			<div class="mx-auto max-w-md">
				<div class="flex flex-col gap-4 sm:flex-row">
					<label for="email-updates" class="sr-only">Email address for updates</label>
					<input
						id="email-updates"
						type="email"
						bind:value={emailForUpdates}
						placeholder="Enter your email address"
						class="flex-1 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
					/>
					<button
						onclick={subscribeForUpdates}
						class="rounded-lg bg-white px-6 py-3 font-semibold text-blue-600 transition-colors hover:bg-gray-100"
					>
						Notify Me
					</button>
				</div>
				<p class="mt-4 text-sm text-blue-200">
					No spam. Unsubscribe anytime. We respect your privacy.
				</p>
			</div>
		{:else}
			<div class="mx-auto max-w-md rounded-lg bg-green-500 p-6">
				<CheckCircle class="mx-auto mb-4 h-8 w-8" />
				<h3 class="mb-2 text-xl font-bold">You're all set!</h3>
				<p>We'll notify you when migration tools are ready.</p>
			</div>
		{/if}

		<div class="mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-6 md:grid-cols-3">
			<div class="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
				<Calendar class="mx-auto mb-2 h-8 w-8" />
				<div class="font-semibold">Migration Guides</div>
				<div class="text-sm text-blue-200">Step-by-step instructions</div>
			</div>
			<div class="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
				<Zap class="mx-auto mb-2 h-8 w-8" />
				<div class="font-semibold">Early Access</div>
				<div class="text-sm text-blue-200">Beta testing opportunities</div>
			</div>
			<div class="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
				<MessageCircle class="mx-auto mb-2 h-8 w-8" />
				<div class="font-semibold">Expert Support</div>
				<div class="text-sm text-blue-200">Migration assistance</div>
			</div>
		</div>
	</div>
</section>

<!-- FAQ Section -->
<section class="bg-white py-20">
	<div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<h2 class="mb-6 text-4xl font-extrabold text-gray-900">Migration Questions & Answers</h2>
			<p class="text-xl text-gray-600">Everything you need to know about migrating to BottleCRM.</p>
		</div>

		<div class="space-y-4">
			<!-- FAQ 1 -->
			<div class="overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
				<button
					onclick={() => toggleFaq(0)}
					class="w-full px-6 py-5 text-left transition-colors duration-200 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
					aria-expanded={activeFaq === 0}
				>
					<div class="flex items-center justify-between">
						<h3 class="pr-4 text-lg font-semibold text-gray-900">
							When will the migration tools be available?
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
							We're actively developing automated migration tools for popular CRM platforms. Follow
							our GitHub repository or subscribe to updates to be notified when they're ready.
							CSV/Excel imports are available now for immediate migration.
						</p>
					</div>
				{/if}
			</div>

			<!-- FAQ 2 -->
			<div class="overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
				<button
					onclick={() => toggleFaq(1)}
					class="w-full px-6 py-5 text-left transition-colors duration-200 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
					aria-expanded={activeFaq === 1}
				>
					<div class="flex items-center justify-between">
						<h3 class="pr-4 text-lg font-semibold text-gray-900">
							Will I lose any data during migration?
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
							BottleCRM migration tools are designed to preserve all your important data. We
							recommend keeping backups of your original data and testing with sample data first.
							Our professional migration service includes data integrity verification.
						</p>
					</div>
				{/if}
			</div>

			<!-- FAQ 3 -->
			<div class="overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
				<button
					onclick={() => toggleFaq(2)}
					class="w-full px-6 py-5 text-left transition-colors duration-200 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
					aria-expanded={activeFaq === 2}
				>
					<div class="flex items-center justify-between">
						<h3 class="pr-4 text-lg font-semibold text-gray-900">
							How long does a typical migration take?
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
							Migration time varies by source CRM and data complexity. Simple CSV imports take
							hours, while complex CRM migrations can take 1-4 weeks. Our professional migration
							service can accelerate this process significantly.
						</p>
					</div>
				{/if}
			</div>

			<!-- FAQ 4 -->
			<div class="overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
				<button
					onclick={() => toggleFaq(3)}
					class="w-full px-6 py-5 text-left transition-colors duration-200 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
					aria-expanded={activeFaq === 3}
				>
					<div class="flex items-center justify-between">
						<h3 class="pr-4 text-lg font-semibold text-gray-900">
							Can you help with custom field migration?
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
							Yes! Our professional migration service includes custom field mapping, workflow
							recreation, and business process migration. We ensure your BottleCRM setup matches
							your current business needs.
						</p>
					</div>
				{/if}
			</div>

			<!-- FAQ 5 -->
			<div class="overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
				<button
					onclick={() => toggleFaq(4)}
					class="w-full px-6 py-5 text-left transition-colors duration-200 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
					aria-expanded={activeFaq === 4}
				>
					<div class="flex items-center justify-between">
						<h3 class="pr-4 text-lg font-semibold text-gray-900">
							What if my current CRM has complex workflows?
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
							BottleCRM supports custom workflows and automation. Our migration service includes
							analyzing your current workflows and recreating them in BottleCRM, often with
							improvements and optimizations.
						</p>
					</div>
				{/if}
			</div>

			<!-- FAQ 6 -->
			<div class="overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
				<button
					onclick={() => toggleFaq(5)}
					class="w-full px-6 py-5 text-left transition-colors duration-200 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
					aria-expanded={activeFaq === 5}
				>
					<div class="flex items-center justify-between">
						<h3 class="pr-4 text-lg font-semibold text-gray-900">
							Is there a cost for migration assistance?
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
							Basic migration guidance is free through our community. Professional migration
							services are available starting at $497, which includes data migration, custom field
							setup, and workflow configuration.
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
		<h2 class="mb-6 text-4xl font-extrabold md:text-5xl">Ready to Own Your CRM Data?</h2>
		<p class="mx-auto mb-8 max-w-3xl text-xl text-blue-100 md:text-2xl">
			Start preparing for your migration today. Download BottleCRM, explore the features, and
			experience the freedom of open-source CRM.
		</p>

		<div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-x-6 sm:space-y-0">
			<a
				href="https://github.com/MicroPyramid/opensource-startup-crm"
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-lg font-bold text-blue-700 shadow-2xl transition-all duration-200 hover:scale-105 hover:bg-gray-100"
			>
				<Github class="mr-3 h-6 w-6" />
				Download BottleCRM
			</a>
			<a
				href="/contact"
				class="inline-flex items-center justify-center rounded-xl border-2 border-white px-8 py-4 text-lg font-bold text-white transition-all duration-200 hover:bg-white/10"
			>
				<MessageCircle class="mr-3 h-6 w-6" />
				Get Migration Help
			</a>
		</div>

		<p class="mt-8 text-blue-200">
			🚀 CSV import available now • Automated tools coming soon • Professional migration services
			available
		</p>
	</div>
</section>
