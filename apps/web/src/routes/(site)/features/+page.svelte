<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import {
		Users,
		BarChart3,
		CheckSquare,
		TrendingUp,
		FileText,
		Smartphone,
		Shield,
		Zap,
		Check,
		Clock,
		Settings,
		Globe,
		MessageSquare,
		Calendar,
		Mail,
		Phone,
		Target,
		PieChart,
		Lock,
		Code,
		Cloud,
		Server,
		GitBranch,
		Palette,
		Search,
		UserCheck,
		DollarSign,
		Database,
		MapPin
	} from '@lucide/svelte';
</script>

<svelte:head>
	<title>BottleCRM Features: Free & Open Source CRM Software</title>
	<meta
		name="description"
		content="Explore BottleCRM's powerful features: contact management, sales pipeline, task automation, analytics & more. A free, open-source CRM for growing businesses."
	/>
	<meta
		name="keywords"
		content="bottlecrm features, free crm features, open source crm, crm software features, contact management, sales pipeline, task automation, crm analytics, business management software"
	/>

	<!-- Open Graph -->
	<meta property="og:title" content="BottleCRM Features: Free & Open Source CRM Software" />
	<meta
		property="og:description"
		content="Discover BottleCRM's comprehensive features: contact management, sales automation, analytics & more. Enterprise-grade, free, and open-source."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://bottlecrm.io/features" />
	<meta property="og:image" content="https://bottlecrm.io/logo_social.png" />

	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "WebPage",
			"name": "BottleCRM Features",
			"description": "Explore BottleCRM's powerful features: contact management, sales pipeline, task automation, analytics & more. A free, open-source CRM for growing businesses.",
			"url": "https://bottlecrm.io/features",
			"isPartOf": {
				"@type": "WebSite",
				"name": "BottleCRM",
				"url": "https://bottlecrm.io"
			},
			"mainEntity": {
				"@type": "SoftwareApplication",
				"name": "BottleCRM",
				"applicationCategory": "BusinessApplication",
				"operatingSystem": "Web (Cross-platform)",
				"offers": {
					"@type": "Offer",
					"price": "0",
					"priceCurrency": "USD"
				},
				"description": "BottleCRM is a free and open-source Customer Relationship Management (CRM) software offering enterprise-grade features like contact management, sales pipeline, task automation, analytics, and invoicing.",
				"url": "https://bottlecrm.io",
				"softwareVersion": "1.0", // Update as versions change
				"keywords": "crm, free crm, open source crm, contact management, sales pipeline, business software",
				"featureList": [
					"Advanced Contact Management",
					"Sales Pipeline Management (Coming Soon)",
					"Task & Activity Management",
					"Communication Center (Coming Soon)",
					"Real-time Analytics Dashboard (Coming Soon)",
					"Advanced Reporting System (Coming Soon)",
					"Invoice & Billing Management (Coming Soon)",
					"Customer Support Center (Coming Soon)",
					"Marketing Campaign Management (Coming Soon)",
					"Mobile-First Design",
					"Data Security & Privacy",
					"API & Integrations (Coming Soon)",
					"Self-Hosting & Deployment",
					"Complete Customization",
					"Multi-language Support (Coming Soon)"
				],
				"provider": {
					"@type": "Organization",
					"name": "BottleCRM",
					"url": "https://bottlecrm.io",
					"logo": "https://bottlecrm.io/logo.png" // Add a relevant logo URL
				}
			},
			"publisher": {
				"@type": "Organization",
				"name": "BottleCRM",
				"url": "https://bottlecrm.io",
				"logo": {
					"@type": "ImageObject",
					"url": "https://bottlecrm.io/logo.png" // Add a relevant logo URL
				}
			}
		}
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
				<Zap class="mr-2 h-4 w-4" />
				<span class="text-sm font-medium">Enterprise Features • Zero Cost • Open Source</span>
			</div>

			<h1 class="mb-6 text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
				Enterprise CRM Features at <span class="text-yellow-300">Zero Cost</span>
			</h1>

			<p class="mb-8 text-xl leading-relaxed text-blue-100 md:text-2xl">
				Discover powerful features that rival premium CRM solutions. From contact management to
				advanced analytics, everything you need without subscription fees or vendor lock-in.
			</p>

			<div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0">
				<a
					href="/login"
					class="inline-flex items-center justify-center rounded-lg border border-transparent bg-white px-6 py-4 text-base font-semibold text-blue-700 shadow-lg transition-all duration-200 hover:scale-105 hover:bg-gray-100"
				>
					<Check class="mr-2 h-5 w-5" />
					Try All Features Free
				</a>
				<a
					href="#features"
					class="inline-flex items-center justify-center rounded-lg border-2 border-white px-6 py-4 text-base font-semibold text-white transition-all duration-200 hover:bg-white/10"
				>
					Explore Features Below
				</a>
			</div>
		</div>
	</div>
</section>

<!-- Features Overview -->
<section class="bg-gray-50 py-20" id="features">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<h2 class="mb-6 text-4xl font-extrabold text-gray-900 sm:text-5xl">
				Professional CRM Feature Set
			</h2>
			<p class="mx-auto max-w-3xl text-xl text-gray-600">
				BottleCRM provides enterprise-grade functionality typically found in premium CRM solutions.
				All features are included in our free, open-source platform with no hidden costs or
				limitations.
			</p>
		</div>

		<!-- Core CRM Features -->
		<div class="mb-20">
			<div class="mb-12 text-center">
				<h3 class="mb-4 text-3xl font-bold text-gray-900">Core CRM Features</h3>
				<p class="text-lg text-gray-600">Essential customer relationship management tools</p>
			</div>

			<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
				<!-- Advanced Contact Management -->
				<div
					class="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
				>
					<div class="absolute right-4 top-4">
						<span
							class="inline-flex items-center rounded-full border border-green-200 bg-green-100 px-3 py-1 text-xs font-medium text-green-800"
						>
							<Check class="mr-1 h-3 w-3" />
							Available Now
						</span>
					</div>

					<div
						class="mb-6 inline-block rounded-xl bg-gradient-to-r from-blue-100 to-indigo-100 p-4 transition-transform duration-300 group-hover:scale-110"
					>
						<Users class="h-8 w-8 text-blue-600" />
					</div>

					<h4 class="mb-4 text-2xl font-bold text-gray-900">Advanced Contact Management</h4>
					<p class="mb-6 leading-relaxed text-gray-600">
						Centralize all customer information in one place with our comprehensive contact
						management system. Store detailed customer profiles, track interaction history, manage
						contact segmentation, and build 360-degree customer views.
					</p>

					<div class="grid grid-cols-1 gap-2 md:grid-cols-2">
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Unlimited contact storage</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Custom fields and tags</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Contact segmentation</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Interaction timeline</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Duplicate detection</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Import/Export tools</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Advanced search & filtering</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Contact scoring</span>
						</div>
					</div>
				</div>

				<!-- Sales Pipeline Management -->
				<div
					class="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
				>
					<div class="absolute right-4 top-4">
						<span
							class="inline-flex items-center rounded-full border border-yellow-200 bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800"
						>
							<Clock class="mr-1 h-3 w-3" />
							Coming Soon
						</span>
					</div>

					<div
						class="mb-6 inline-block rounded-xl bg-gradient-to-r from-blue-100 to-indigo-100 p-4 transition-transform duration-300 group-hover:scale-110"
					>
						<BarChart3 class="h-8 w-8 text-blue-600" />
					</div>

					<h4 class="mb-4 text-2xl font-bold text-gray-900">Sales Pipeline Management</h4>
					<p class="mb-6 leading-relaxed text-gray-600">
						Visualize and manage your entire sales process with intuitive pipeline management. Track
						deals from initial contact to closing, forecast revenue, and optimize conversion rates
						with automated workflows.
					</p>

					<div class="grid grid-cols-1 gap-2 md:grid-cols-2">
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Drag-and-drop pipeline</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Custom deal stages</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Revenue forecasting</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Deal probability tracking</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Sales velocity metrics</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Win/loss analysis</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Activity reminders</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Team collaboration</span>
						</div>
					</div>
				</div>

				<!-- Task & Activity Management -->
				<div
					class="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
				>
					<div class="absolute right-4 top-4">
						<span
							class="inline-flex items-center rounded-full border border-green-200 bg-green-100 px-3 py-1 text-xs font-medium text-green-800"
						>
							<Check class="mr-1 h-3 w-3" />
							Available Now
						</span>
					</div>

					<div
						class="mb-6 inline-block rounded-xl bg-gradient-to-r from-blue-100 to-indigo-100 p-4 transition-transform duration-300 group-hover:scale-110"
					>
						<CheckSquare class="h-8 w-8 text-blue-600" />
					</div>

					<h4 class="mb-4 text-2xl font-bold text-gray-900">Task & Activity Management</h4>
					<p class="mb-6 leading-relaxed text-gray-600">
						Never miss a follow-up with comprehensive task management. Schedule activities, set
						reminders, assign tasks to team members, and track completion rates to ensure maximum
						productivity.
					</p>

					<div class="grid grid-cols-1 gap-2 md:grid-cols-2">
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Task scheduling & reminders</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Activity logging</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Team task assignment</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Priority management</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Calendar integration</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Recurring tasks</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Task templates</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Progress tracking</span>
						</div>
					</div>
				</div>

				<!-- Communication Center -->
				<div
					class="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
				>
					<div class="absolute right-4 top-4">
						<span
							class="inline-flex items-center rounded-full border border-yellow-200 bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800"
						>
							<Clock class="mr-1 h-3 w-3" />
							Coming Soon
						</span>
					</div>

					<div
						class="mb-6 inline-block rounded-xl bg-gradient-to-r from-blue-100 to-indigo-100 p-4 transition-transform duration-300 group-hover:scale-110"
					>
						<MessageSquare class="h-8 w-8 text-blue-600" />
					</div>

					<h4 class="mb-4 text-2xl font-bold text-gray-900">Communication Center</h4>
					<p class="mb-6 leading-relaxed text-gray-600">
						Manage all customer communications from one central hub. Track emails, phone calls,
						meetings, and notes. Maintain complete conversation history and ensure no communication
						falls through the cracks.
					</p>

					<div class="grid grid-cols-1 gap-2 md:grid-cols-2">
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Email integration</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Call logging</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Meeting notes</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Communication timeline</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Email templates</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Auto-response setup</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Message scheduling</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Team communication</span>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Analytics & Reporting -->
		<div class="mb-20">
			<div class="mb-12 text-center">
				<h3 class="mb-4 text-3xl font-bold text-gray-900">Analytics & Reporting</h3>
				<p class="text-lg text-gray-600">Business intelligence and performance insights</p>
			</div>

			<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
				<!-- Real-time Analytics Dashboard -->
				<div
					class="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
				>
					<div class="absolute right-4 top-4">
						<span
							class="inline-flex items-center rounded-full border border-yellow-200 bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800"
						>
							<Clock class="mr-1 h-3 w-3" />
							Coming Soon
						</span>
					</div>

					<div
						class="mb-6 inline-block rounded-xl bg-gradient-to-r from-blue-100 to-indigo-100 p-4 transition-transform duration-300 group-hover:scale-110"
					>
						<TrendingUp class="h-8 w-8 text-blue-600" />
					</div>

					<h4 class="mb-4 text-2xl font-bold text-gray-900">Real-time Analytics Dashboard</h4>
					<p class="mb-6 leading-relaxed text-gray-600">
						Get instant insights into your business performance with customizable dashboards.
						Monitor key metrics, track trends, and make data-driven decisions to accelerate growth.
					</p>

					<div class="grid grid-cols-1 gap-2 md:grid-cols-2">
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Customizable dashboards</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Real-time data updates</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Key performance indicators</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Visual chart library</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Goal tracking</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Comparative analysis</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Export capabilities</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Mobile dashboard access</span>
						</div>
					</div>
				</div>

				<!-- Advanced Reporting System -->
				<div
					class="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
				>
					<div class="absolute right-4 top-4">
						<span
							class="inline-flex items-center rounded-full border border-yellow-200 bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800"
						>
							<Clock class="mr-1 h-3 w-3" />
							Coming Soon
						</span>
					</div>

					<div
						class="mb-6 inline-block rounded-xl bg-gradient-to-r from-blue-100 to-indigo-100 p-4 transition-transform duration-300 group-hover:scale-110"
					>
						<PieChart class="h-8 w-8 text-blue-600" />
					</div>

					<h4 class="mb-4 text-2xl font-bold text-gray-900">Advanced Reporting System</h4>
					<p class="mb-6 leading-relaxed text-gray-600">
						Generate comprehensive reports on sales performance, customer behavior, and business
						metrics. Create custom reports, schedule automated delivery, and share insights with
						stakeholders.
					</p>

					<div class="grid grid-cols-1 gap-2 md:grid-cols-2">
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Custom report builder</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Automated report scheduling</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Multiple export formats</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Interactive charts</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Data filtering options</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Report templates</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Team sharing</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Historical comparisons</span>
						</div>
					</div>
				</div>

				<!-- Sales Performance Analytics -->
				<div
					class="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
				>
					<div class="absolute right-4 top-4">
						<span
							class="inline-flex items-center rounded-full border border-yellow-200 bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800"
						>
							<Clock class="mr-1 h-3 w-3" />
							Coming Soon
						</span>
					</div>

					<div
						class="mb-6 inline-block rounded-xl bg-gradient-to-r from-blue-100 to-indigo-100 p-4 transition-transform duration-300 group-hover:scale-110"
					>
						<Target class="h-8 w-8 text-blue-600" />
					</div>

					<h4 class="mb-4 text-2xl font-bold text-gray-900">Sales Performance Analytics</h4>
					<p class="mb-6 leading-relaxed text-gray-600">
						Track and analyze sales team performance with detailed metrics. Monitor individual and
						team achievements, identify top performers, and optimize sales strategies.
					</p>

					<div class="grid grid-cols-1 gap-2 md:grid-cols-2">
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Individual performance tracking</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Team leaderboards</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Conversion rate analysis</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Activity reports</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Revenue attribution</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Performance benchmarking</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Commission calculations</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Sales coaching insights</span>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Business Management -->
		<div class="mb-20">
			<div class="mb-12 text-center">
				<h3 class="mb-4 text-3xl font-bold text-gray-900">Business Management</h3>
				<p class="text-lg text-gray-600">Comprehensive business process automation</p>
			</div>

			<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
				<!-- Invoice & Billing Management -->
				<div
					class="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
				>
					<div class="absolute right-4 top-4">
						<span
							class="inline-flex items-center rounded-full border border-yellow-200 bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800"
						>
							<Clock class="mr-1 h-3 w-3" />
							Coming Soon
						</span>
					</div>

					<div
						class="mb-6 inline-block rounded-xl bg-gradient-to-r from-blue-100 to-indigo-100 p-4 transition-transform duration-300 group-hover:scale-110"
					>
						<FileText class="h-8 w-8 text-blue-600" />
					</div>

					<h4 class="mb-4 text-2xl font-bold text-gray-900">Invoice & Billing Management</h4>
					<p class="mb-6 leading-relaxed text-gray-600">
						Streamline your billing process with integrated invoicing. Create professional invoices,
						track payments, manage recurring billing, and integrate with payment gateways.
					</p>

					<div class="grid grid-cols-1 gap-2 md:grid-cols-2">
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Professional invoice templates</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Automated invoice generation</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Payment tracking</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Recurring billing setup</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Payment gateway integration</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Tax calculations</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Late payment reminders</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Financial reporting</span>
						</div>
					</div>
				</div>

				<!-- Customer Support Center -->
				<div
					class="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
				>
					<div class="absolute right-4 top-4">
						<span
							class="inline-flex items-center rounded-full border border-yellow-200 bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800"
						>
							<Clock class="mr-1 h-3 w-3" />
							Coming Soon
						</span>
					</div>

					<div
						class="mb-6 inline-block rounded-xl bg-gradient-to-r from-blue-100 to-indigo-100 p-4 transition-transform duration-300 group-hover:scale-110"
					>
						<UserCheck class="h-8 w-8 text-blue-600" />
					</div>

					<h4 class="mb-4 text-2xl font-bold text-gray-900">Customer Support Center</h4>
					<p class="mb-6 leading-relaxed text-gray-600">
						Provide exceptional customer support with integrated ticketing system. Track support
						requests, manage resolution workflows, and maintain customer satisfaction.
					</p>

					<div class="grid grid-cols-1 gap-2 md:grid-cols-2">
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Ticket management system</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Support workflow automation</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Customer satisfaction surveys</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Knowledge base integration</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Multi-channel support</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>SLA tracking</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Escalation rules</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Support analytics</span>
						</div>
					</div>
				</div>

				<!-- Marketing Campaign Management -->
				<div
					class="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
				>
					<div class="absolute right-4 top-4">
						<span
							class="inline-flex items-center rounded-full border border-yellow-200 bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800"
						>
							<Clock class="mr-1 h-3 w-3" />
							Coming Soon
						</span>
					</div>

					<div
						class="mb-6 inline-block rounded-xl bg-gradient-to-r from-blue-100 to-indigo-100 p-4 transition-transform duration-300 group-hover:scale-110"
					>
						<Mail class="h-8 w-8 text-blue-600" />
					</div>

					<h4 class="mb-4 text-2xl font-bold text-gray-900">Marketing Campaign Management</h4>
					<p class="mb-6 leading-relaxed text-gray-600">
						Plan, execute, and track marketing campaigns with integrated tools. Manage email
						campaigns, track ROI, and nurture leads through automated marketing workflows.
					</p>

					<div class="grid grid-cols-1 gap-2 md:grid-cols-2">
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Email campaign builder</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Marketing automation</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Lead nurturing workflows</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Campaign performance tracking</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>A/B testing</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Landing page integration</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Social media management</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>ROI measurement</span>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Technical Features -->
		<div class="mb-20">
			<div class="mb-12 text-center">
				<h3 class="mb-4 text-3xl font-bold text-gray-900">Technical Features</h3>
				<p class="text-lg text-gray-600">Modern technology and infrastructure capabilities</p>
			</div>

			<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
				<!-- Mobile-First Design -->
				<div
					class="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
				>
					<div class="absolute right-4 top-4">
						<span
							class="inline-flex items-center rounded-full border border-green-200 bg-green-100 px-3 py-1 text-xs font-medium text-green-800"
						>
							<Check class="mr-1 h-3 w-3" />
							Available Now
						</span>
					</div>

					<div
						class="mb-6 inline-block rounded-xl bg-gradient-to-r from-blue-100 to-indigo-100 p-4 transition-transform duration-300 group-hover:scale-110"
					>
						<Smartphone class="h-8 w-8 text-blue-600" />
					</div>

					<h4 class="mb-4 text-2xl font-bold text-gray-900">Mobile-First Design</h4>
					<p class="mb-6 leading-relaxed text-gray-600">
						Access your CRM from anywhere with our responsive, mobile-optimized interface. Work
						offline, sync data automatically, and manage your business on-the-go.
					</p>

					<div class="grid grid-cols-1 gap-2 md:grid-cols-2">
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Responsive web design</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Offline data access</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Automatic synchronization</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Touch-optimized interface</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Mobile notifications</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Cross-device compatibility</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Progressive web app</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Fast loading times</span>
						</div>
					</div>
				</div>

				<!-- Data Security & Privacy -->
				<div
					class="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
				>
					<div class="absolute right-4 top-4">
						<span
							class="inline-flex items-center rounded-full border border-green-200 bg-green-100 px-3 py-1 text-xs font-medium text-green-800"
						>
							<Check class="mr-1 h-3 w-3" />
							Available Now
						</span>
					</div>

					<div
						class="mb-6 inline-block rounded-xl bg-gradient-to-r from-blue-100 to-indigo-100 p-4 transition-transform duration-300 group-hover:scale-110"
					>
						<Shield class="h-8 w-8 text-blue-600" />
					</div>

					<h4 class="mb-4 text-2xl font-bold text-gray-900">Data Security & Privacy</h4>
					<p class="mb-6 leading-relaxed text-gray-600">
						Protect your business data with enterprise-grade security features. Enjoy encrypted data
						storage, user access controls, and complete data ownership through self-hosting.
					</p>

					<div class="grid grid-cols-1 gap-2 md:grid-cols-2">
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>End-to-end encryption</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Role-based access control</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Data backup & recovery</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Audit trail logging</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>GDPR compliance tools</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Two-factor authentication</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>IP restrictions</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Security monitoring</span>
						</div>
					</div>
				</div>

				<!-- API & Integrations -->
				<div
					class="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
				>
					<div class="absolute right-4 top-4">
						<span
							class="inline-flex items-center rounded-full border border-yellow-200 bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800"
						>
							<Clock class="mr-1 h-3 w-3" />
							Coming Soon
						</span>
					</div>

					<div
						class="mb-6 inline-block rounded-xl bg-gradient-to-r from-blue-100 to-indigo-100 p-4 transition-transform duration-300 group-hover:scale-110"
					>
						<Code class="h-8 w-8 text-blue-600" />
					</div>

					<h4 class="mb-4 text-2xl font-bold text-gray-900">API & Integrations</h4>
					<p class="mb-6 leading-relaxed text-gray-600">
						Connect BottleCRM with your existing tools through our comprehensive API. Build custom
						integrations, automate workflows, and create a unified business ecosystem.
					</p>

					<div class="grid grid-cols-1 gap-2 md:grid-cols-2">
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>RESTful API access</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Webhook support</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Third-party integrations</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Custom field mapping</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Data import/export</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Zapier integration</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>OAuth authentication</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>API documentation</span>
						</div>
					</div>
				</div>

				<!-- Self-Hosting & Deployment -->
				<div
					class="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
				>
					<div class="absolute right-4 top-4">
						<span
							class="inline-flex items-center rounded-full border border-green-200 bg-green-100 px-3 py-1 text-xs font-medium text-green-800"
						>
							<Check class="mr-1 h-3 w-3" />
							Available Now
						</span>
					</div>

					<div
						class="mb-6 inline-block rounded-xl bg-gradient-to-r from-blue-100 to-indigo-100 p-4 transition-transform duration-300 group-hover:scale-110"
					>
						<Server class="h-8 w-8 text-blue-600" />
					</div>

					<h4 class="mb-4 text-2xl font-bold text-gray-900">Self-Hosting & Deployment</h4>
					<p class="mb-6 leading-relaxed text-gray-600">
						Deploy BottleCRM on your own infrastructure for complete control. Choose from various
						hosting options, scale as needed, and maintain full data sovereignty.
					</p>

					<div class="grid grid-cols-1 gap-2 md:grid-cols-2">
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Docker containerization</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Cloud deployment guides</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Database flexibility</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Scalable architecture</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Load balancing support</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Automated backups</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Environment configuration</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Performance monitoring</span>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Customization & Flexibility -->
		<div class="mb-20">
			<div class="mb-12 text-center">
				<h3 class="mb-4 text-3xl font-bold text-gray-900">Customization & Flexibility</h3>
				<p class="text-lg text-gray-600">Adapt BottleCRM to your unique business needs</p>
			</div>

			<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
				<!-- Complete Customization -->
				<div
					class="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
				>
					<div class="absolute right-4 top-4">
						<span
							class="inline-flex items-center rounded-full border border-green-200 bg-green-100 px-3 py-1 text-xs font-medium text-green-800"
						>
							<Check class="mr-1 h-3 w-3" />
							Available Now
						</span>
					</div>

					<div
						class="mb-6 inline-block rounded-xl bg-gradient-to-r from-blue-100 to-indigo-100 p-4 transition-transform duration-300 group-hover:scale-110"
					>
						<Settings class="h-8 w-8 text-blue-600" />
					</div>

					<h4 class="mb-4 text-2xl font-bold text-gray-900">Complete Customization</h4>
					<p class="mb-6 leading-relaxed text-gray-600">
						Tailor BottleCRM to your exact business needs with extensive customization options.
						Modify workflows, create custom fields, and adapt the interface to match your processes.
					</p>

					<div class="grid grid-cols-1 gap-2 md:grid-cols-2">
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Custom field creation</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Workflow customization</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>UI theme customization</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Form builder</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Custom data validation</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Business rule engine</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Layout customization</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Brand integration</span>
						</div>
					</div>
				</div>

				<!-- Multi-language Support -->
				<div
					class="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
				>
					<div class="absolute right-4 top-4">
						<span
							class="inline-flex items-center rounded-full border border-yellow-200 bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800"
						>
							<Clock class="mr-1 h-3 w-3" />
							Coming Soon
						</span>
					</div>

					<div
						class="mb-6 inline-block rounded-xl bg-gradient-to-r from-blue-100 to-indigo-100 p-4 transition-transform duration-300 group-hover:scale-110"
					>
						<Globe class="h-8 w-8 text-blue-600" />
					</div>

					<h4 class="mb-4 text-2xl font-bold text-gray-900">Multi-language Support</h4>
					<p class="mb-6 leading-relaxed text-gray-600">
						Use BottleCRM in your preferred language with comprehensive internationalization
						support. Easily add new languages and adapt to local business requirements.
					</p>

					<div class="grid grid-cols-1 gap-2 md:grid-cols-2">
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Multiple language support</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>RTL text support</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Currency localization</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Date/time formatting</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Number formatting</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Timezone handling</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Cultural adaptations</span>
						</div>
						<div class="flex items-center text-sm text-gray-700">
							<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
							<span>Translation management</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Technology Stack -->
<section class="bg-white py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<h2 class="mb-6 text-4xl font-extrabold text-gray-900 sm:text-5xl">
				Built with Modern Technology
			</h2>
			<p class="mx-auto max-w-3xl text-xl text-gray-600">
				BottleCRM is built using cutting-edge technologies to ensure performance, security, and
				maintainability.
			</p>
		</div>

		<div class="grid grid-cols-2 gap-8 md:grid-cols-4">
			<div class="rounded-xl bg-gray-50 p-6 text-center transition-colors hover:bg-gray-100">
				<Code class="mx-auto mb-4 h-12 w-12 text-blue-600" />
				<h4 class="mb-2 font-bold text-gray-900">SvelteKit 2.21+</h4>
				<p class="text-sm text-gray-600">Modern web framework</p>
			</div>
			<div class="rounded-xl bg-gray-50 p-6 text-center transition-colors hover:bg-gray-100">
				<Database class="mx-auto mb-4 h-12 w-12 text-green-600" />
				<h4 class="mb-2 font-bold text-gray-900">Prisma ORM</h4>
				<p class="text-sm text-gray-600">Database management</p>
			</div>
			<div class="rounded-xl bg-gray-50 p-6 text-center transition-colors hover:bg-gray-100">
				<Palette class="mx-auto mb-4 h-12 w-12 text-purple-600" />
				<h4 class="mb-2 font-bold text-gray-900">TailwindCSS 4.1+</h4>
				<p class="text-sm text-gray-600">Modern styling</p>
			</div>
			<div class="rounded-xl bg-gray-50 p-6 text-center transition-colors hover:bg-gray-100">
				<GitBranch class="mx-auto mb-4 h-12 w-12 text-orange-600" />
				<h4 class="mb-2 font-bold text-gray-900">Open Source</h4>
				<p class="text-sm text-gray-600">MIT License</p>
			</div>
		</div>
	</div>
</section>

<!-- Feature Comparison -->
<section class="bg-gradient-to-r from-gray-50 to-blue-50 py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<h2 class="mb-6 text-4xl font-extrabold text-gray-900 sm:text-5xl">
				Compare Feature Availability
			</h2>
			<p class="text-xl text-gray-600">
				See what's available now and what's coming soon in BottleCRM development roadmap.
			</p>
		</div>

		<div class="grid gap-8 lg:grid-cols-2">
			<!-- Available Now -->
			<div class="rounded-2xl bg-white p-8 shadow-xl">
				<div class="mb-6 flex items-center">
					<div class="mr-4 rounded-lg bg-green-100 p-3">
						<Check class="h-8 w-8 text-green-600" />
					</div>
					<div>
						<h3 class="text-2xl font-bold text-gray-900">Available Now</h3>
						<p class="text-gray-600">Ready to use features</p>
					</div>
				</div>

				<ul class="space-y-3">
					<li class="flex items-center">
						<Check class="mr-3 h-5 w-5 text-green-500" />
						<span>Advanced Contact Management</span>
					</li>
					<li class="flex items-center">
						<Check class="mr-3 h-5 w-5 text-green-500" />
						<span>Task & Activity Management</span>
					</li>
					<li class="flex items-center">
						<Check class="mr-3 h-5 w-5 text-green-500" />
						<span>Mobile-First Design</span>
					</li>
					<li class="flex items-center">
						<Check class="mr-3 h-5 w-5 text-green-500" />
						<span>Data Security & Privacy</span>
					</li>
					<li class="flex items-center">
						<Check class="mr-3 h-5 w-5 text-green-500" />
						<span>Self-Hosting & Deployment</span>
					</li>
					<li class="flex items-center">
						<Check class="mr-3 h-5 w-5 text-green-500" />
						<span>Complete Customization</span>
					</li>
				</ul>
			</div>

			<!-- Coming Soon -->
			<div class="rounded-2xl bg-white p-8 shadow-xl">
				<div class="mb-6 flex items-center">
					<div class="mr-4 rounded-lg bg-yellow-100 p-3">
						<Clock class="h-8 w-8 text-yellow-600" />
					</div>
					<div>
						<h3 class="text-2xl font-bold text-gray-900">Coming Soon</h3>
						<p class="text-gray-600">In active development</p>
					</div>
				</div>

				<ul class="space-y-3">
					<li class="flex items-center">
						<Clock class="mr-3 h-5 w-5 text-yellow-500" />
						<span>Sales Pipeline Management</span>
					</li>
					<li class="flex items-center">
						<Clock class="mr-3 h-5 w-5 text-yellow-500" />
						<span>Real-time Analytics Dashboard</span>
					</li>
					<li class="flex items-center">
						<Clock class="mr-3 h-5 w-5 text-yellow-500" />
						<span>Invoice & Billing Management</span>
					</li>
					<li class="flex items-center">
						<Clock class="mr-3 h-5 w-5 text-yellow-500" />
						<span>Communication Center</span>
					</li>
					<li class="flex items-center">
						<Clock class="mr-3 h-5 w-5 text-yellow-500" />
						<span>API & Integrations</span>
					</li>
					<li class="flex items-center">
						<Clock class="mr-3 h-5 w-5 text-yellow-500" />
						<span>Multi-language Support</span>
					</li>
				</ul>
			</div>
		</div>

		<div class="mt-12 text-center">
			<p class="mb-6 text-lg text-gray-600">
				Want to contribute to feature development or request a specific feature?
			</p>
			<div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0">
				<a
					href="https://github.com/MicroPyramid/opensource-startup-crm"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center justify-center rounded-lg border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-lg transition-all duration-200 hover:bg-blue-700"
				>
					<GitBranch class="mr-2 h-5 w-5" />
					Contribute on GitHub
				</a>
				<a
					href="/contact"
					class="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 shadow-lg transition-all duration-200 hover:bg-gray-50"
				>
					<MessageSquare class="mr-2 h-5 w-5" />
					Request Feature
				</a>
			</div>
		</div>
	</div>
</section>

<!-- Value Proposition Section -->
<section class="bg-white py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<h2 class="mb-6 text-4xl font-extrabold text-gray-900 sm:text-5xl">Why Choose BottleCRM?</h2>
			<p class="mx-auto max-w-3xl text-xl text-gray-600">
				Unlike traditional CRM solutions, BottleCRM offers enterprise-grade features without the
				enterprise price tag.
			</p>
		</div>

		<div class="grid gap-8 lg:grid-cols-3">
			<!-- Cost-Effective -->
			<div class="rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 p-8 text-center">
				<div class="mb-6 inline-block rounded-xl bg-green-100 p-4">
					<DollarSign class="h-8 w-8 text-green-600" />
				</div>
				<h3 class="mb-4 text-2xl font-bold text-gray-900">Cost-Effective Solution</h3>
				<p class="mb-6 text-gray-600">
					Save thousands on CRM costs while getting professional features. No per-user fees, no
					monthly subscriptions, no surprise charges.
				</p>
				<ul class="space-y-2 text-left">
					<li class="flex items-center text-sm text-gray-700">
						<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
						<span>$0 monthly fees</span>
					</li>
					<li class="flex items-center text-sm text-gray-700">
						<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
						<span>Unlimited users</span>
					</li>
					<li class="flex items-center text-sm text-gray-700">
						<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
						<span>No feature restrictions</span>
					</li>
				</ul>
			</div>

			<!-- Data Ownership -->
			<div class="rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 p-8 text-center">
				<div class="mb-6 inline-block rounded-xl bg-blue-100 p-4">
					<Lock class="h-8 w-8 text-blue-600" />
				</div>
				<h3 class="mb-4 text-2xl font-bold text-gray-900">Complete Data Control</h3>
				<p class="mb-6 text-gray-600">
					Your data stays yours. Self-host on your infrastructure with full control over security,
					privacy, and compliance.
				</p>
				<ul class="space-y-2 text-left">
					<li class="flex items-center text-sm text-gray-700">
						<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
						<span>Self-hosted deployment</span>
					</li>
					<li class="flex items-center text-sm text-gray-700">
						<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
						<span>No vendor lock-in</span>
					</li>
					<li class="flex items-center text-sm text-gray-700">
						<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
						<span>GDPR compliance ready</span>
					</li>
				</ul>
			</div>

			<!-- Customization Freedom -->
			<div class="rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 p-8 text-center">
				<div class="mb-6 inline-block rounded-xl bg-purple-100 p-4">
					<Code class="h-8 w-8 text-purple-600" />
				</div>
				<h3 class="mb-4 text-2xl font-bold text-gray-900">Unlimited Customization</h3>
				<p class="mb-6 text-gray-600">
					Modify and extend BottleCRM to fit your exact needs. Open-source means no limitations on
					customization.
				</p>
				<ul class="space-y-2 text-left">
					<li class="flex items-center text-sm text-gray-700">
						<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
						<span>Full source code access</span>
					</li>
					<li class="flex items-center text-sm text-gray-700">
						<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
						<span>Custom integrations</span>
					</li>
					<li class="flex items-center text-sm text-gray-700">
						<Check class="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
						<span>Community support</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</section>

<!-- CTA Section -->
<section class="bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 py-20 text-white">
	<div class="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
		<h2 class="mb-6 text-4xl font-extrabold md:text-5xl">
			Ready to Experience Professional CRM Features?
		</h2>
		<p class="mx-auto mb-8 max-w-3xl text-xl text-blue-100 md:text-2xl">
			Join businesses that have chosen BottleCRM for enterprise-grade features without enterprise
			costs.
		</p>

		<div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-x-6 sm:space-y-0">
			<a
				href="/login"
				class="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-lg font-bold text-blue-700 shadow-2xl transition-all duration-200 hover:scale-105 hover:bg-gray-100"
			>
				<Zap class="mr-3 h-6 w-6" />
				Start Using All Features Free
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
			🚀 No subscription fees • Enterprise features included • Deploy anywhere
		</p>
	</div>
</section>
