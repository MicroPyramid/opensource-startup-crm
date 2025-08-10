<!-- account management page -->
<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import {
		Users,
		UserCheck,
		Database,
		Search,
		Filter,
		Tag,
		MapPin,
		Building,
		Phone,
		Mail,
		Calendar,
		Clock,
		TrendingUp,
		BarChart3,
		Shield,
		Upload,
		Download,
		RefreshCw,
		Check,
		Star,
		Target,
		Zap,
		Settings,
		Archive,
		UserPlus,
		Eye,
		Edit,
		Trash2,
		Copy,
		FileText,
		Globe,
		Lock,
		Smartphone,
		ChevronRight,
		MessageSquare,
		DollarSign,
		Award,
		Activity,
		Layers,
		GitBranch
	} from '@lucide/svelte';
</script>

<svelte:head>
	<title>Free Account Management CRM | Unlimited Contacts & Customer Database</title>
	<meta
		name="description"
		content="Manage unlimited customer accounts and contacts with BottleCRM. Free, open-source CRM for businesses to centralize data, track interactions, and grow relationships."
	/>
	<meta
		name="keywords"
		content="free crm, account management, contact management, customer database, open source crm, unlimited contacts, client management software, business crm"
	/>

	<!-- Open Graph -->
	<meta
		property="og:title"
		content="Free Account Management CRM | Unlimited Contacts & Customer Database"
	/>
	<meta
		property="og:description"
		content="BottleCRM offers free, unlimited account and contact management. Centralize customer data, track interactions, and grow your business relationships."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://bottlecrm.io/features/account-management" />

	<!-- Schema.org Structured Data -->
	<script type="application/ld+json">
    {`
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "BottleCRM",
        "applicationCategory": "Customer Relationship Management",
        "operatingSystem": "Web",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "description": "BottleCRM is a free, open-source CRM application for unlimited account and contact management. Centralize customer data, track interactions, and manage your business relationships efficiently.",
        "url": "https://bottlecrm.io/features/account-management",
        "publisher": {
          "@type": "Organization",
          "name": "BottleCRM"
        }
      }
    `}
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
				<Users class="mr-2 h-4 w-4" />
				<span class="text-sm font-medium">Account Management • 100% Free • Unlimited Contacts</span>
			</div>

			<h1 class="mb-6 text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
				Master Customer <span class="text-yellow-300">Account Management</span> with BottleCRM
			</h1>

			<p class="mb-8 text-xl leading-relaxed text-blue-100 md:text-2xl">
				Centralize customer information, track every interaction, and build stronger relationships
				with our comprehensive, free account management system. Everything you need to manage
				unlimited contacts and accounts.
			</p>

			<div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0">
				<a
					href="/login"
					class="inline-flex items-center justify-center rounded-lg border border-transparent bg-white px-6 py-4 text-base font-semibold text-blue-700 shadow-lg transition-all duration-200 hover:scale-105 hover:bg-gray-100"
				>
					<Zap class="mr-2 h-5 w-5" />
					Start Managing Accounts Free
				</a>
				<a
					href="#features"
					class="inline-flex items-center justify-center rounded-lg border-2 border-white px-6 py-4 text-base font-semibold text-white transition-all duration-200 hover:bg-white/10"
				>
					Explore Account Features
				</a>
			</div>
		</div>
	</div>
</section>

<!-- Core Features Section -->
<section class="bg-gray-50 py-20" id="features">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<h2 class="mb-6 text-4xl font-extrabold text-gray-900 sm:text-5xl">
				Complete Account Management Solution
			</h2>
			<p class="mx-auto max-w-3xl text-xl text-gray-600">
				Everything you need to manage customer accounts, contacts, and relationships in one
				comprehensive, free platform.
			</p>
		</div>

		<div class="space-y-16">
			<!-- Feature 1: Centralized Contact Database -->
			<div class="mx-auto max-w-5xl">
				<div class="mb-8 text-center">
					<div
						class="mb-6 inline-block rounded-xl bg-gradient-to-r from-blue-100 to-indigo-100 p-4"
					>
						<Database class="h-10 w-10 text-blue-600" />
					</div>

					<h3 class="mb-4 text-3xl font-bold text-gray-900">Centralized Contact Database</h3>
					<p class="mx-auto mb-6 max-w-3xl text-xl leading-relaxed text-gray-600">
						Store unlimited contacts with comprehensive profile information. Never lose track of
						important customer details with our centralized contact management system.
					</p>
					<p class="mx-auto mb-8 max-w-4xl leading-relaxed text-gray-700">
						Our contact database serves as the foundation of your CRM, allowing you to store
						detailed information about every customer, prospect, and business contact. With
						unlimited storage capacity and rich data fields, you can maintain comprehensive records
						that grow with your business.
					</p>

					<div class="mx-auto grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
						<div class="flex items-center rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
							<Check class="mr-3 h-5 w-5 flex-shrink-0 text-green-500" />
							<span class="text-sm font-medium text-gray-700">Unlimited contact storage</span>
						</div>
						<div class="flex items-center rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
							<Check class="mr-3 h-5 w-5 flex-shrink-0 text-green-500" />
							<span class="text-sm font-medium text-gray-700">Rich profile information</span>
						</div>
						<div class="flex items-center rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
							<Check class="mr-3 h-5 w-5 flex-shrink-0 text-green-500" />
							<span class="text-sm font-medium text-gray-700">Contact relationship mapping</span>
						</div>
						<div class="flex items-center rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
							<Check class="mr-3 h-5 w-5 flex-shrink-0 text-green-500" />
							<span class="text-sm font-medium text-gray-700">Duplicate detection & merging</span>
						</div>
						<div class="flex items-center rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
							<Check class="mr-3 h-5 w-5 flex-shrink-0 text-green-500" />
							<span class="text-sm font-medium text-gray-700">Historical data preservation</span>
						</div>
						<div class="flex items-center rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
							<Check class="mr-3 h-5 w-5 flex-shrink-0 text-green-500" />
							<span class="text-sm font-medium text-gray-700">Cross-reference capabilities</span>
						</div>
					</div>
				</div>
			</div>

			<!-- Feature 2: Advanced Contact Search & Filtering -->
			<div class="mx-auto max-w-5xl">
				<div class="mb-8 text-center">
					<div
						class="mb-6 inline-block rounded-xl bg-gradient-to-r from-blue-100 to-indigo-100 p-4"
					>
						<Search class="h-10 w-10 text-blue-600" />
					</div>

					<h3 class="mb-4 text-3xl font-bold text-gray-900">Advanced Contact Search & Filtering</h3>
					<p class="mx-auto mb-6 max-w-3xl text-xl leading-relaxed text-gray-600">
						Find any contact instantly with powerful search capabilities and advanced filtering
						options. Organize and segment your contacts for targeted communication.
					</p>
					<p class="mx-auto mb-8 max-w-4xl leading-relaxed text-gray-700">
						Our intelligent search system allows you to quickly locate contacts using any piece of
						information - name, company, email, phone, or custom fields. Advanced filters help you
						create targeted lists for marketing campaigns and sales outreach.
					</p>

					<div class="mx-auto grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
						<div class="flex items-center rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
							<Check class="mr-3 h-5 w-5 flex-shrink-0 text-green-500" />
							<span class="text-sm font-medium text-gray-700">Global search functionality</span>
						</div>
						<div class="flex items-center rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
							<Check class="mr-3 h-5 w-5 flex-shrink-0 text-green-500" />
							<span class="text-sm font-medium text-gray-700">Multi-criteria filtering</span>
						</div>
						<div class="flex items-center rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
							<Check class="mr-3 h-5 w-5 flex-shrink-0 text-green-500" />
							<span class="text-sm font-medium text-gray-700">Saved search queries</span>
						</div>
						<div class="flex items-center rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
							<Check class="mr-3 h-5 w-5 flex-shrink-0 text-green-500" />
							<span class="text-sm font-medium text-gray-700">Real-time search results</span>
						</div>
						<div class="flex items-center rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
							<Check class="mr-3 h-5 w-5 flex-shrink-0 text-green-500" />
							<span class="text-sm font-medium text-gray-700">Custom search operators</span>
						</div>
						<div class="flex items-center rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
							<Check class="mr-3 h-5 w-5 flex-shrink-0 text-green-500" />
							<span class="text-sm font-medium text-gray-700">Bulk action capabilities</span>
						</div>
					</div>
				</div>
			</div>

			<!-- Feature 3: Contact Segmentation & Tagging -->
			<div class="mx-auto max-w-5xl">
				<div class="mb-8 text-center">
					<div
						class="mb-6 inline-block rounded-xl bg-gradient-to-r from-blue-100 to-indigo-100 p-4"
					>
						<Tag class="h-10 w-10 text-blue-600" />
					</div>

					<h3 class="mb-4 text-3xl font-bold text-gray-900">Contact Segmentation & Tagging</h3>
					<p class="mx-auto mb-6 max-w-3xl text-xl leading-relaxed text-gray-600">
						Organize contacts into meaningful groups with custom tags and segments. Create targeted
						lists for personalized marketing and sales activities.
					</p>
					<p class="mx-auto mb-8 max-w-4xl leading-relaxed text-gray-700">
						Effective contact segmentation is crucial for personalized communication. Our tagging
						and segmentation tools allow you to group contacts based on any criteria, from
						demographics to purchase behavior, enabling more targeted and effective outreach.
					</p>

					<div class="mx-auto grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
						<div class="flex items-center rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
							<Check class="mr-3 h-5 w-5 flex-shrink-0 text-green-500" />
							<span class="text-sm font-medium text-gray-700">Custom tag creation</span>
						</div>
						<div class="flex items-center rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
							<Check class="mr-3 h-5 w-5 flex-shrink-0 text-green-500" />
							<span class="text-sm font-medium text-gray-700">Automated segmentation rules</span>
						</div>
						<div class="flex items-center rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
							<Check class="mr-3 h-5 w-5 flex-shrink-0 text-green-500" />
							<span class="text-sm font-medium text-gray-700">Behavioral segmentation</span>
						</div>
						<div class="flex items-center rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
							<Check class="mr-3 h-5 w-5 flex-shrink-0 text-green-500" />
							<span class="text-sm font-medium text-gray-700">Demographic grouping</span>
						</div>
						<div class="flex items-center rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
							<Check class="mr-3 h-5 w-5 flex-shrink-0 text-green-500" />
							<span class="text-sm font-medium text-gray-700">Interest-based categories</span>
						</div>
						<div class="flex items-center rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
							<Check class="mr-3 h-5 w-5 flex-shrink-0 text-green-500" />
							<span class="text-sm font-medium text-gray-700">Dynamic list updates</span>
						</div>
					</div>
				</div>
			</div>

			<!-- Feature 4: Contact Interaction Timeline -->
			<div class="mx-auto max-w-5xl">
				<div class="mb-8 text-center">
					<div
						class="mb-6 inline-block rounded-xl bg-gradient-to-r from-blue-100 to-indigo-100 p-4"
					>
						<Clock class="h-10 w-10 text-blue-600" />
					</div>

					<h3 class="mb-4 text-3xl font-bold text-gray-900">Contact Interaction Timeline</h3>
					<p class="mx-auto mb-6 max-w-3xl text-xl leading-relaxed text-gray-600">
						Track every interaction with your contacts in a visual timeline. Maintain complete
						communication history and never miss important context.
					</p>
					<p class="mx-auto mb-8 max-w-4xl leading-relaxed text-gray-700">
						Understanding the complete history of your relationship with each contact is essential
						for effective customer management. Our timeline feature captures every email, call,
						meeting, and interaction, providing valuable context for future communications.
					</p>

					<div class="mx-auto grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
						<div class="flex items-center rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
							<Check class="mr-3 h-5 w-5 flex-shrink-0 text-green-500" />
							<span class="text-sm font-medium text-gray-700">Complete interaction history</span>
						</div>
						<div class="flex items-center rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
							<Check class="mr-3 h-5 w-5 flex-shrink-0 text-green-500" />
							<span class="text-sm font-medium text-gray-700">Visual timeline view</span>
						</div>
						<div class="flex items-center rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
							<Check class="mr-3 h-5 w-5 flex-shrink-0 text-green-500" />
							<span class="text-sm font-medium text-gray-700">Multi-channel tracking</span>
						</div>
						<div class="flex items-center rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
							<Check class="mr-3 h-5 w-5 flex-shrink-0 text-green-500" />
							<span class="text-sm font-medium text-gray-700">Automated activity logging</span>
						</div>
						<div class="flex items-center rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
							<Check class="mr-3 h-5 w-5 flex-shrink-0 text-green-500" />
							<span class="text-sm font-medium text-gray-700">Context preservation</span>
						</div>
						<div class="flex items-center rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
							<Check class="mr-3 h-5 w-5 flex-shrink-0 text-green-500" />
							<span class="text-sm font-medium text-gray-700">Team collaboration notes</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Account Management Capabilities -->
<section class="bg-white py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<h2 class="mb-6 text-4xl font-extrabold text-gray-900 sm:text-5xl">
				Comprehensive Account Management Capabilities
			</h2>
			<p class="text-xl text-gray-600">
				Handle every aspect of customer account management with these powerful features.
			</p>
		</div>

		<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
			<!-- Capability 1: Company & Organization Management -->
			<div
				class="group rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
			>
				<div
					class="mb-6 inline-block rounded-xl bg-gradient-to-r from-blue-100 to-indigo-100 p-4 transition-transform duration-300 group-hover:scale-110"
				>
					<Building class="h-8 w-8 text-blue-600" />
				</div>

				<h3 class="mb-4 text-2xl font-bold text-gray-900">Company & Organization Management</h3>
				<p class="mb-6 leading-relaxed text-gray-600">
					Manage company accounts with multiple contacts, organizational hierarchies, and
					account-level information tracking.
				</p>

				<ul class="space-y-3">
					<li class="flex items-center">
						<Check class="mr-3 h-4 w-4 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Multi-contact accounts</span>
					</li>
					<li class="flex items-center">
						<Check class="mr-3 h-4 w-4 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Organizational charts</span>
					</li>
					<li class="flex items-center">
						<Check class="mr-3 h-4 w-4 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Account hierarchies</span>
					</li>
					<li class="flex items-center">
						<Check class="mr-3 h-4 w-4 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Company profile management</span>
					</li>
					<li class="flex items-center">
						<Check class="mr-3 h-4 w-4 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Revenue tracking per account</span>
					</li>
					<li class="flex items-center">
						<Check class="mr-3 h-4 w-4 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Account status management</span>
					</li>
				</ul>
			</div>

			<!-- Capability 2: Contact Information Management -->
			<div
				class="group rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
			>
				<div
					class="mb-6 inline-block rounded-xl bg-gradient-to-r from-blue-100 to-indigo-100 p-4 transition-transform duration-300 group-hover:scale-110"
				>
					<UserCheck class="h-8 w-8 text-blue-600" />
				</div>

				<h3 class="mb-4 text-2xl font-bold text-gray-900">Contact Information Management</h3>
				<p class="mb-6 leading-relaxed text-gray-600">
					Store comprehensive contact details including personal information, communication
					preferences, and custom data fields.
				</p>

				<ul class="space-y-3">
					<li class="flex items-center">
						<Check class="mr-3 h-4 w-4 text-green-500" />
						<span class="text-gray-700">Personal & professional details</span>
					</li>
					<li class="flex items-center">
						<Check class="mr-3 h-4 w-4 text-green-500" />
						<span class="text-gray-700">Multiple contact methods</span>
					</li>
					<li class="flex items-center">
						<Check class="mr-3 h-4 w-4 text-green-500" />
						<span class="text-gray-700">Communication preferences</span>
					</li>
					<li class="flex items-center">
						<Check class="mr-3 h-4 w-4 text-green-500" />
						<span class="text-gray-700">Custom field support</span>
					</li>
					<li class="flex items-center">
						<Check class="mr-3 h-4 w-4 text-green-500" />
						<span class="text-gray-700">Photo & document storage</span>
					</li>
					<li class="flex items-center">
						<Check class="mr-3 h-4 w-4 text-green-500" />
						<span class="text-gray-700">Social media integration</span>
					</li>
				</ul>
			</div>

			<!-- Capability 3: Geographic & Location Tracking -->
			<div
				class="group rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
			>
				<div
					class="mb-6 inline-block rounded-xl bg-gradient-to-r from-blue-100 to-indigo-100 p-4 transition-transform duration-300 group-hover:scale-110"
				>
					<MapPin class="h-8 w-8 text-blue-600" />
				</div>

				<h3 class="mb-4 text-2xl font-bold text-gray-900">Geographic & Location Tracking</h3>
				<p class="mb-6 leading-relaxed text-gray-600">
					Track contact locations, territories, and geographic information for better sales
					territory management and local marketing.
				</p>

				<ul class="space-y-3">
					<li class="flex items-center">
						<Check class="mr-3 h-4 w-4 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Address management</span>
					</li>
					<li class="flex items-center">
						<Check class="mr-3 h-4 w-4 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Territory assignment</span>
					</li>
					<li class="flex items-center">
						<Check class="mr-3 h-4 w-4 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Geographic analytics</span>
					</li>
					<li class="flex items-center">
						<Check class="mr-3 h-4 w-4 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Location-based filtering</span>
					</li>
					<li class="flex items-center">
						<Check class="mr-3 h-4 w-4 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Regional reporting</span>
					</li>
					<li class="flex items-center">
						<Check class="mr-3 h-4 w-4 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Map visualization</span>
					</li>
				</ul>
			</div>

			<!-- Capability 4: Contact Communication Hub -->
			<div
				class="group rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
			>
				<div
					class="mb-6 inline-block rounded-xl bg-gradient-to-r from-blue-100 to-indigo-100 p-4 transition-transform duration-300 group-hover:scale-110"
				>
					<MessageSquare class="h-8 w-8 text-blue-600" />
				</div>

				<h3 class="mb-4 text-2xl font-bold text-gray-900">Contact Communication Hub</h3>
				<p class="mb-6 leading-relaxed text-gray-600">
					Centralize all communication channels including email, phone, social media, and in-person
					meetings with full tracking.
				</p>

				<ul class="space-y-3">
					<li class="flex items-center">
						<Check class="mr-3 h-4 w-4 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Email integration</span>
					</li>
					<li class="flex items-center">
						<Check class="mr-3 h-4 w-4 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Call logging</span>
					</li>
					<li class="flex items-center">
						<Check class="mr-3 h-4 w-4 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Meeting scheduling</span>
					</li>
					<li class="flex items-center">
						<Check class="mr-3 h-4 w-4 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Social media tracking</span>
					</li>
					<li class="flex items-center">
						<Check class="mr-3 h-4 w-4 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Communication templates</span>
					</li>
					<li class="flex items-center">
						<Check class="mr-3 h-4 w-4 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Response tracking</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</section>

<!-- Data Management Section -->
<section class="bg-gradient-to-r from-gray-50 to-blue-50 py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<h2 class="mb-6 text-4xl font-extrabold text-gray-900 sm:text-5xl">
				Advanced Data Management
			</h2>
			<p class="text-xl text-gray-600">
				Secure, reliable, and efficient data handling for all your account management needs.
			</p>
		</div>

		<div class="grid gap-8 lg:grid-cols-3">
			<!-- Data Feature 1: Data Import & Export -->
			<div
				class="rounded-2xl bg-white p-8 text-center shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
			>
				<div
					class="mb-6 inline-block rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 p-6"
				>
					<Upload class="h-10 w-10 text-blue-600" />
				</div>

				<h3 class="mb-4 text-2xl font-bold text-gray-900">Data Import & Export</h3>
				<p class="mb-6 leading-relaxed text-gray-600">
					Easily migrate your existing contact data or export for backup and analysis purposes.
				</p>

				<ul class="space-y-2 text-left">
					<li class="flex items-center">
						<Check class="mr-3 h-4 w-4 text-green-500" />
						<span class="text-gray-700">CSV/Excel import</span>
					</li>
					<li class="flex items-center">
						<Check class="mr-3 h-4 w-4 text-green-500" />
						<span class="text-gray-700">Multiple data formats</span>
					</li>
					<li class="flex items-center">
						<Check class="mr-3 h-4 w-4 text-green-500" />
						<span class="text-gray-700">Field mapping tools</span>
					</li>
					<li class="flex items-center">
						<Check class="mr-3 h-4 w-4 text-green-500" />
						<span class="text-gray-700">Bulk data validation</span>
					</li>
					<li class="flex items-center">
						<Check class="mr-3 h-4 w-4 text-green-500" />
						<span class="text-gray-700">Export scheduling</span>
					</li>
					<li class="flex items-center">
						<Check class="mr-3 h-4 w-4 text-green-500" />
						<span class="text-gray-700">Data transformation</span>
					</li>
				</ul>
			</div>

			<!-- Data Feature 2: Data Security & Privacy -->
			<div
				class="rounded-2xl bg-white p-8 text-center shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
			>
				<div
					class="mb-6 inline-block rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 p-6"
				>
					<Shield class="h-10 w-10 text-blue-600" />
				</div>

				<h3 class="mb-4 text-2xl font-bold text-gray-900">Data Security & Privacy</h3>
				<p class="mb-6 leading-relaxed text-gray-600">
					Protect sensitive contact information with enterprise-grade security and privacy controls.
				</p>

				<ul class="space-y-2 text-left">
					<li class="flex items-center">
						<Check class="mr-3 h-4 w-4 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Data encryption</span>
					</li>
					<li class="flex items-center">
						<Check class="mr-3 h-4 w-4 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Access control</span>
					</li>
					<li class="flex items-center">
						<Check class="mr-3 h-4 w-4 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Audit trails</span>
					</li>
					<li class="flex items-center">
						<Check class="mr-3 h-4 w-4 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">GDPR compliance</span>
					</li>
					<li class="flex items-center">
						<Check class="mr-3 h-4 w-4 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Data retention policies</span>
					</li>
					<li class="flex items-center">
						<Check class="mr-3 h-4 w-4 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Privacy settings</span>
					</li>
				</ul>
			</div>

			<!-- Data Feature 3: Real-time Data Sync -->
			<div
				class="rounded-2xl bg-white p-8 text-center shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
			>
				<div
					class="mb-6 inline-block rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 p-6"
				>
					<RefreshCw class="h-10 w-10 text-blue-600" />
				</div>

				<h3 class="mb-4 text-2xl font-bold text-gray-900">Real-time Data Sync</h3>
				<p class="mb-6 leading-relaxed text-gray-600">
					Keep contact information synchronized across all devices and team members in real-time.
				</p>

				<ul class="space-y-2 text-left">
					<li class="flex items-center">
						<Check class="mr-3 h-4 w-4 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Automatic synchronization</span>
					</li>
					<li class="flex items-center">
						<Check class="mr-3 h-4 w-4 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Conflict resolution</span>
					</li>
					<li class="flex items-center">
						<Check class="mr-3 h-4 w-4 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Offline data access</span>
					</li>
					<li class="flex items-center">
						<Check class="mr-3 h-4 w-4 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Multi-device support</span>
					</li>
					<li class="flex items-center">
						<Check class="mr-3 h-4 w-4 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Team collaboration</span>
					</li>
					<li class="flex items-center">
						<Check class="mr-3 h-4 w-4 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Version control</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</section>

<!-- Benefits by User Type -->
<section class="bg-white py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<h2 class="mb-6 text-4xl font-extrabold text-gray-900 sm:text-5xl">
				Benefits for Every Team
			</h2>
			<p class="text-xl text-gray-600">
				See how different teams can leverage BottleCRM's account management features.
			</p>
		</div>

		<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
			<!-- Sales Teams -->
			<div
				class="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-8"
			>
				<div class="mb-6 flex items-center">
					<div class="mr-4 rounded-lg bg-blue-100 p-3">
						<Target class="h-8 w-8 text-blue-600" />
					</div>
					<h3 class="text-2xl font-bold text-gray-900">Sales Teams</h3>
				</div>

				<ul class="space-y-3">
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Complete prospect information at your fingertips</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Track sales interactions and follow-ups</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Identify warm leads and opportunities</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Maintain consistent communication history</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Coordinate team efforts on large accounts</span>
					</li>
				</ul>
			</div>

			<!-- Marketing Teams -->
			<div
				class="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-8"
			>
				<div class="mb-6 flex items-center">
					<div class="mr-4 rounded-lg bg-blue-100 p-3">
						<Award class="h-8 w-8 text-blue-600" />
					</div>
					<h3 class="text-2xl font-bold text-gray-900">Marketing Teams</h3>
				</div>

				<ul class="space-y-3">
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Create targeted marketing segments</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Track campaign engagement and responses</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Personalize marketing communications</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Measure marketing ROI by contact</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Generate qualified leads for sales</span>
					</li>
				</ul>
			</div>

			<!-- Customer Support -->
			<div
				class="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-8"
			>
				<div class="mb-6 flex items-center">
					<div class="mr-4 rounded-lg bg-blue-100 p-3">
						<UserCheck class="h-8 w-8 text-blue-600" />
					</div>
					<h3 class="text-2xl font-bold text-gray-900">Customer Support</h3>
				</div>

				<ul class="space-y-3">
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Access complete customer history instantly</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Provide personalized support experiences</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Track support interactions and resolutions</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Identify recurring issues by account</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Maintain customer satisfaction records</span>
					</li>
				</ul>
			</div>

			<!-- Business Owners -->
			<div
				class="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-8"
			>
				<div class="mb-6 flex items-center">
					<div class="mr-4 rounded-lg bg-blue-100 p-3">
						<TrendingUp class="h-8 w-8 text-blue-600" />
					</div>
					<h3 class="text-2xl font-bold text-gray-900">Business Owners</h3>
				</div>

				<ul class="space-y-3">
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Get complete view of customer relationships</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Track business growth and customer acquisition</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Identify most valuable accounts and contacts</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Make data-driven business decisions</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Ensure no customer falls through cracks</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</section>

<!-- Implementation Guide -->
<section class="bg-gray-50 py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<h2 class="mb-6 text-4xl font-extrabold text-gray-900 sm:text-5xl">Implementation Roadmap</h2>
			<p class="text-xl text-gray-600">
				Get started with BottleCRM account management in three simple steps.
			</p>
		</div>

		<div class="space-y-8">
			<!-- Step 1 -->
			<div class="lg:flex lg:items-center lg:space-x-8">
				<div class="mb-6 flex-shrink-0 lg:mb-0">
					<div
						class="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white"
					>
						1
					</div>
				</div>

				<div class="flex-1 rounded-2xl bg-white p-8 shadow-lg">
					<h3 class="mb-4 text-2xl font-bold text-gray-900">Data Migration & Setup</h3>
					<p class="mb-6 text-gray-600">
						Import existing contact data and configure account structure
					</p>

					<div class="grid grid-cols-1 gap-3 md:grid-cols-2">
						<div class="flex items-center">
							<Check class="mr-3 h-4 w-4 text-green-500" />
							<span class="text-gray-700">Import contact databases</span>
						</div>
						<div class="flex items-center">
							<Check class="mr-3 h-4 w-4 text-green-500" />
							<span class="text-gray-700">Set up custom fields</span>
						</div>
						<div class="flex items-center">
							<Check class="mr-3 h-4 w-4 text-green-500" />
							<span class="text-gray-700">Configure user permissions</span>
						</div>
						<div class="flex items-center">
							<Check class="mr-3 h-4 w-4 text-green-500" />
							<span class="text-gray-700">Establish data validation rules</span>
						</div>
					</div>
				</div>
			</div>

			<!-- Step 2 -->
			<div class="lg:flex lg:items-center lg:space-x-8">
				<div class="mb-6 flex-shrink-0 lg:mb-0">
					<div
						class="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white"
					>
						2
					</div>
				</div>

				<div class="flex-1 rounded-2xl bg-white p-8 shadow-lg">
					<h3 class="mb-4 text-2xl font-bold text-gray-900">Team Training & Onboarding</h3>
					<p class="mb-6 text-gray-600">Train your team on account management best practices</p>

					<div class="grid grid-cols-1 gap-3 md:grid-cols-2">
						<div class="flex items-center">
							<Check class="mr-3 h-4 w-4 text-green-500" />
							<span class="text-gray-700">User training sessions</span>
						</div>
						<div class="flex items-center">
							<Check class="mr-3 h-4 w-4 text-green-500" />
							<span class="text-gray-700">Workflow establishment</span>
						</div>
						<div class="flex items-center">
							<Check class="mr-3 h-4 w-4 text-green-500" />
							<span class="text-gray-700">Data entry standards</span>
						</div>
						<div class="flex items-center">
							<Check class="mr-3 h-4 w-4 text-green-500" />
							<span class="text-gray-700">Regular usage monitoring</span>
						</div>
					</div>
				</div>
			</div>

			<!-- Step 3 -->
			<div class="lg:flex lg:items-center lg:space-x-8">
				<div class="mb-6 flex-shrink-0 lg:mb-0">
					<div
						class="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white"
					>
						3
					</div>
				</div>

				<div class="flex-1 rounded-2xl bg-white p-8 shadow-lg">
					<h3 class="mb-4 text-2xl font-bold text-gray-900">Process Optimization</h3>
					<p class="mb-6 text-gray-600">
						Fine-tune your account management processes for maximum efficiency
					</p>

					<div class="grid grid-cols-1 gap-3 md:grid-cols-2">
						<div class="flex items-center">
							<Check class="mr-3 h-4 w-4 text-green-500" />
							<span class="text-gray-700">Performance monitoring</span>
						</div>
						<div class="flex items-center">
							<Check class="mr-3 h-4 w-4 text-green-500" />
							<span class="text-gray-700">Process refinement</span>
						</div>
						<div class="flex items-center">
							<Check class="mr-3 h-4 w-4 text-green-500" />
							<span class="text-gray-700">Advanced feature adoption</span>
						</div>
						<div class="flex items-center">
							<Check class="mr-3 h-4 w-4 text-green-500" />
							<span class="text-gray-700">Continuous improvement</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Feature Comparison -->
<section class="bg-white py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<h2 class="mb-6 text-4xl font-extrabold text-gray-900 sm:text-5xl">
				Why Choose BottleCRM for Account Management?
			</h2>
			<p class="text-xl text-gray-600">
				Compare our account management features with traditional CRM solutions.
			</p>
		</div>

		<div class="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">
			<div class="overflow-x-auto">
				<table class="w-full">
					<thead class="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
						<tr>
							<th class="px-6 py-4 text-left text-sm font-semibold">Feature</th>
							<th class="px-6 py-4 text-center text-sm font-semibold">BottleCRM</th>
							<th class="px-6 py-4 text-center text-sm font-semibold">Enterprise CRM A</th>
							<th class="px-6 py-4 text-center text-sm font-semibold">Popular CRM B</th>
							<th class="px-6 py-4 text-center text-sm font-semibold">Commercial CRM C</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-gray-200">
						<tr class="hover:bg-gray-50">
							<td class="px-6 py-4 font-medium text-gray-900">Unlimited Contacts</td>
							<td class="px-6 py-4 text-center"><Check class="mx-auto h-5 w-5 text-green-500" /></td
							>
							<td class="px-6 py-4 text-center text-gray-500">Paid plans only</td>
							<td class="px-6 py-4 text-center text-gray-500">Limited in free</td>
							<td class="px-6 py-4 text-center text-gray-500">Paid only</td>
						</tr>
						<tr class="hover:bg-gray-50">
							<td class="px-6 py-4 font-medium text-gray-900">Custom Fields</td>
							<td class="px-6 py-4 text-center"><Check class="mx-auto h-5 w-5 text-green-500" /></td
							>
							<td class="px-6 py-4 text-center"><Check class="mx-auto h-5 w-5 text-green-500" /></td
							>
							<td class="px-6 py-4 text-center"><Check class="mx-auto h-5 w-5 text-green-500" /></td
							>
							<td class="px-6 py-4 text-center"><Check class="mx-auto h-5 w-5 text-green-500" /></td
							>
						</tr>
						<tr class="hover:bg-gray-50">
							<td class="px-6 py-4 font-medium text-gray-900">Self-Hosting Option</td>
							<td class="px-6 py-4 text-center"><Check class="mx-auto h-5 w-5 text-green-500" /></td
							>
							<td class="px-6 py-4 text-center text-gray-500">Limited</td>
							<td class="px-6 py-4 text-center text-gray-500">Not available</td>
							<td class="px-6 py-4 text-center text-gray-500">Enterprise only</td>
						</tr>
						<tr class="hover:bg-gray-50">
							<td class="px-6 py-4 font-medium text-gray-900">Monthly Cost Range</td>
							<td class="px-6 py-4 text-center font-bold text-green-600">$0</td>
							<td class="px-6 py-4 text-center text-gray-700">$25-300/user*</td>
							<td class="px-6 py-4 text-center text-gray-700">$50-3200/month*</td>
							<td class="px-6 py-4 text-center text-gray-700">$15-99/user*</td>
						</tr>
						<tr class="hover:bg-gray-50">
							<td class="px-6 py-4 font-medium text-gray-900">Open Source</td>
							<td class="px-6 py-4 text-center"><Check class="mx-auto h-5 w-5 text-green-500" /></td
							>
							<td class="px-6 py-4 text-center text-gray-500">Proprietary</td>
							<td class="px-6 py-4 text-center text-gray-500">Proprietary</td>
							<td class="px-6 py-4 text-center text-gray-500">Proprietary</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>

		<div class="mt-8 text-center">
			<p class="mb-4 text-lg text-gray-600">
				<strong class="text-green-600">Potential Annual Savings:</strong> $3,000 - $36,000 per year for
				a 10-person team*
			</p>
			<p class="text-sm italic text-gray-500">
				* Pricing estimates based on publicly available information and market research. Actual
				pricing may vary. Comparison is for illustrative purposes only and does not represent
				specific vendor quotes.
			</p>
		</div>
	</div>
</section>

<!-- CTA Section -->
<section class="bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 py-20 text-white">
	<div class="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
		<h2 class="mb-6 text-4xl font-extrabold md:text-5xl">
			Ready to Transform Your Account Management?
		</h2>
		<p class="mx-auto mb-8 max-w-3xl text-xl text-blue-100 md:text-2xl">
			Start managing unlimited contacts and accounts today with BottleCRM's comprehensive, free
			account management system.
		</p>

		<div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-x-6 sm:space-y-0">
			<a
				href="/login"
				class="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-lg font-bold text-blue-700 shadow-2xl transition-all duration-200 hover:scale-105 hover:bg-gray-100"
			>
				<Zap class="mr-3 h-6 w-6" />
				Start Managing Accounts Free
			</a>
			<a
				href="https://github.com/MicroPyramid/opensource-startup-crm"
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center justify-center rounded-xl border-2 border-white px-8 py-4 text-lg font-bold text-white transition-all duration-200 hover:bg-white/10"
			>
				<GitBranch class="mr-3 h-6 w-6" />
				View Source Code
			</a>
		</div>

		<p class="mt-8 text-lg text-blue-200">
			🚀 No credit card required • Unlimited contacts • Self-host anywhere • Full customization
		</p>
	</div>
</section>
