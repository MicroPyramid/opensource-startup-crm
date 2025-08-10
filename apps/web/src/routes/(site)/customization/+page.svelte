<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import {
		Palette,
		Code,
		Wrench,
		Zap,
		Check,
		X,
		Download,
		Github,
		MessageCircle,
		Settings,
		Brush,
		Database,
		Plug,
		Users,
		Shield,
		Smartphone,
		Cloud,
		ChevronDown,
		ChevronRight,
		Star,
		Lightbulb,
		Cog,
		Layout,
		FileCode,
		ArrowRight
	} from '@lucide/svelte';

	let activeFaq: number | null = null;
	let mounted = false;

	function toggleFaq(index: number) {
		activeFaq = activeFaq === index ? null : index;
	}

	onMount(() => {
		mounted = true;
	});
</script>

<svelte:head>
	<title>BottleCRM Customization: Free Open Source CRM & Custom Development</title>
	<meta
		name="description"
		content="Customize BottleCRM, the free open-source CRM, to fit your business. DIY tools & expert services for branding, integrations, and workflow automation. Unlimited possibilities."
	/>
	<meta
		name="keywords"
		content="free crm, open source crm, crm customization, custom crm development, crm integration, svelte crm, crm workflow, crm api, bottlecrm, business crm, crm software"
	/>
	<link rel="canonical" href="https://bottlecrm.io/customization" />
	<meta name="robots" content="index, follow" />

	<!-- Open Graph -->
	<meta
		property="og:title"
		content="BottleCRM Customization: Free Open Source CRM & Custom Development"
	/>
	<meta
		property="og:description"
		content="Customize BottleCRM to fit your business. Free CRM with unlimited customization, DIY guides, and professional services."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://bottlecrm.io/customization" />
	<meta property="og:image" content="https://bottlecrm.io/og-image.png" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta
		name="twitter:title"
		content="BottleCRM Customization: Free Open Source CRM & Custom Development"
	/>
	<meta
		name="twitter:description"
		content="Customize BottleCRM to fit your business. Free CRM with unlimited customization, DIY guides, and professional services."
	/>
	<meta name="twitter:image" content="https://bottlecrm.io/og-image.png" />

	<!-- Structured Data: SoftwareApplication & Service -->
	<script type="application/ld+json">
    {JSON.stringify({
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
      "license": "https://opensource.org/licenses/MIT",
      "url": "https://bottlecrm.io",
      "description": "BottleCRM is a free, open-source CRM application with unlimited customization, DIY tools, and professional development services.",
      "publisher": {
        "@type": "Organization",
        "name": "BottleCRM"
      }
    })}
	</script>
	<script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "BottleCRM Customization Services",
      "description": "Professional and DIY CRM customization for BottleCRM: branding, integrations, workflow automation, and more.",
      "provider": {
        "@type": "Organization",
        "name": "BottleCRM"
      },
      "areaServed": "Worldwide",
      "offers": [
        {
          "@type": "Offer",
          "name": "Professional Customization",
          "price": "497",
          "priceCurrency": "USD"
        },
        {
          "@type": "Offer",
          "name": "Enterprise Customization",
          "price": "1497",
          "priceCurrency": "USD"
        }
      ]
    })}
	</script>
</svelte:head>

<!-- Hero Section -->
<section
	class="relative overflow-hidden bg-gradient-to-br from-purple-600 via-indigo-700 to-blue-800 py-20 text-white"
>
	<div class="absolute inset-0 bg-black/10"></div>
	<div class="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mx-auto max-w-4xl text-center">
			<div
				class="mb-6 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm"
			>
				<Lightbulb class="mr-2 h-4 w-4" />
				<span class="text-sm font-medium">100% Customizable • Open Source Freedom</span>
			</div>

			<h1 class="mb-6 text-4xl font-extrabold leading-tight md:text-6xl">
				Make BottleCRM <span class="text-yellow-300">Uniquely Yours</span>
			</h1>

			<p class="mb-8 text-xl leading-relaxed text-blue-100 md:text-2xl">
				Transform your free CRM into the perfect solution for your business. From simple branding
				changes to complex integrations - customize everything with complete source code access or
				professional development services.
			</p>

			<div
				class="mb-12 flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-x-6 sm:space-y-0"
			>
				<a
					href="#customization-types"
					class="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-lg font-bold text-purple-700 shadow-2xl transition-all duration-200 hover:scale-105 hover:bg-gray-100"
				>
					<Code class="mr-3 h-6 w-6" />
					Explore Customization Options
				</a>
				<a
					href="/contact"
					class="inline-flex items-center justify-center rounded-xl border-2 border-white px-8 py-4 text-lg font-bold text-white transition-all duration-200 hover:bg-white/10"
				>
					<MessageCircle class="mr-3 h-6 w-6" />
					Get Professional Help
				</a>
			</div>

			<div class="mx-auto grid max-w-2xl grid-cols-1 gap-6 md:grid-cols-3">
				<div class="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
					<div class="text-2xl font-bold text-yellow-300">100%</div>
					<div class="text-sm text-blue-200">Source Code Access</div>
				</div>
				<div class="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
					<div class="text-2xl font-bold text-yellow-300">∞</div>
					<div class="text-sm text-blue-200">Customization Possibilities</div>
				</div>
				<div class="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
					<div class="text-2xl font-bold text-yellow-300">MIT</div>
					<div class="text-sm text-blue-200">Open Source License</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Customization Types Section -->
<section id="customization-types" class="bg-gray-50 py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<h2 class="mb-6 text-4xl font-extrabold text-gray-900">Four Levels of Customization</h2>
			<p class="mx-auto max-w-3xl text-xl text-gray-600">
				From simple visual changes to complex enterprise modifications - choose the level of
				customization that fits your needs and technical expertise.
			</p>
		</div>

		<div class="grid gap-8 lg:grid-cols-2">
			<!-- Visual Customization -->
			<div
				class="rounded-2xl border border-gray-100 bg-white p-8 shadow-xl transition-all duration-300 hover:shadow-2xl"
			>
				<div class="mb-6 flex items-start justify-between">
					<div class="flex items-center">
						<div class="mr-4 rounded-xl bg-gradient-to-r from-purple-100 to-indigo-100 p-4">
							<Palette class="h-8 w-8 text-purple-600" />
						</div>
						<div>
							<h3 class="mb-2 text-2xl font-bold text-gray-900">Visual Customization</h3>
							<div class="flex items-center space-x-4 text-sm">
								<span class="rounded-full bg-blue-100 px-3 py-1 font-medium text-blue-800"
									>Beginner</span
								>
								<span class="text-gray-600">2-8 hours</span>
								<span class="rounded-full bg-green-100 px-3 py-1 font-medium text-green-800"
									>DIY Friendly</span
								>
							</div>
						</div>
					</div>
				</div>

				<p class="mb-6 leading-relaxed text-gray-600">
					Transform the look and feel of your CRM to match your brand identity perfectly.
				</p>

				<ul class="mb-6 space-y-3">
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Custom color schemes and themes</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Logo and branding integration</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Custom CSS styling</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Layout modifications</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Font and typography changes</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Dashboard widget customization</span>
					</li>
				</ul>

				<div class="flex space-x-3">
					<a
						href="https://github.com/MicroPyramid/opensource-startup-crm"
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex flex-1 items-center justify-center rounded-lg bg-purple-50 px-4 py-2 text-sm font-semibold text-purple-600 transition-colors hover:bg-purple-100"
					>
						<Download class="mr-2 h-4 w-4" />
						DIY Guide
					</a>
					<a
						href="/contact"
						class="inline-flex flex-1 items-center justify-center rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-purple-700"
					>
						<Wrench class="mr-2 h-4 w-4" />
						Get Professional Help
					</a>
				</div>
			</div>

			<!-- Functional Customization -->
			<div
				class="rounded-2xl border border-gray-100 bg-white p-8 shadow-xl transition-all duration-300 hover:shadow-2xl"
			>
				<div class="mb-6 flex items-start justify-between">
					<div class="flex items-center">
						<div class="mr-4 rounded-xl bg-gradient-to-r from-purple-100 to-indigo-100 p-4">
							<Cog class="h-8 w-8 text-purple-600" />
						</div>
						<div>
							<h3 class="mb-2 text-2xl font-bold text-gray-900">Functional Customization</h3>
							<div class="flex items-center space-x-4 text-sm">
								<span class="rounded-full bg-blue-100 px-3 py-1 font-medium text-blue-800"
									>Intermediate</span
								>
								<span class="text-gray-600">8-24 hours</span>
								<span class="rounded-full bg-green-100 px-3 py-1 font-medium text-green-800"
									>DIY Friendly</span
								>
							</div>
						</div>
					</div>
				</div>

				<p class="mb-6 leading-relaxed text-gray-600">
					Add new features and modify existing workflows to match your business processes.
				</p>

				<ul class="mb-6 space-y-3">
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Custom fields and data types</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Workflow automation rules</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Custom reporting dashboards</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Email template modifications</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">User role and permission customization</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Pipeline stage customization</span>
					</li>
				</ul>

				<div class="flex space-x-3">
					<a
						href="https://github.com/MicroPyramid/opensource-startup-crm"
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex flex-1 items-center justify-center rounded-lg bg-purple-50 px-4 py-2 text-sm font-semibold text-purple-600 transition-colors hover:bg-purple-100"
					>
						<Download class="mr-2 h-4 w-4" />
						DIY Guide
					</a>
					<a
						href="/contact"
						class="inline-flex flex-1 items-center justify-center rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-purple-700"
					>
						<Wrench class="mr-2 h-4 w-4" />
						Get Professional Help
					</a>
				</div>
			</div>

			<!-- Integration & API Development -->
			<div
				class="rounded-2xl border border-gray-100 bg-white p-8 shadow-xl transition-all duration-300 hover:shadow-2xl"
			>
				<div class="mb-6 flex items-start justify-between">
					<div class="flex items-center">
						<div class="mr-4 rounded-xl bg-gradient-to-r from-purple-100 to-indigo-100 p-4">
							<Plug class="h-8 w-8 text-purple-600" />
						</div>
						<div>
							<h3 class="mb-2 text-2xl font-bold text-gray-900">Integration & API Development</h3>
							<div class="flex items-center space-x-4 text-sm">
								<span class="rounded-full bg-blue-100 px-3 py-1 font-medium text-blue-800"
									>Advanced</span
								>
								<span class="text-gray-600">24-80 hours</span>
								<span class="rounded-full bg-orange-100 px-3 py-1 font-medium text-orange-800"
									>Professional Recommended</span
								>
							</div>
						</div>
					</div>
				</div>

				<p class="mb-6 leading-relaxed text-gray-600">
					Connect BottleCRM with your existing tools and develop custom integrations.
				</p>

				<ul class="mb-6 space-y-3">
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Third-party API integrations</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Custom webhook implementations</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Payment gateway integration</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Email service provider setup</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Social media platform connections</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Custom import/export tools</span>
					</li>
				</ul>

				<div class="flex space-x-3">
					<a
						href="/contact"
						class="inline-flex flex-1 items-center justify-center rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-purple-700"
					>
						<Wrench class="mr-2 h-4 w-4" />
						Get Professional Help
					</a>
				</div>
			</div>

			<!-- Enterprise Customization -->
			<div
				class="rounded-2xl border border-gray-100 bg-white p-8 shadow-xl transition-all duration-300 hover:shadow-2xl"
			>
				<div class="mb-6 flex items-start justify-between">
					<div class="flex items-center">
						<div class="mr-4 rounded-xl bg-gradient-to-r from-purple-100 to-indigo-100 p-4">
							<Shield class="h-8 w-8 text-purple-600" />
						</div>
						<div>
							<h3 class="mb-2 text-2xl font-bold text-gray-900">Enterprise Customization</h3>
							<div class="flex items-center space-x-4 text-sm">
								<span class="rounded-full bg-blue-100 px-3 py-1 font-medium text-blue-800"
									>Expert</span
								>
								<span class="text-gray-600">80+ hours</span>
								<span class="rounded-full bg-orange-100 px-3 py-1 font-medium text-orange-800"
									>Professional Recommended</span
								>
							</div>
						</div>
					</div>
				</div>

				<p class="mb-6 leading-relaxed text-gray-600">
					Advanced modifications for large teams and complex business requirements.
				</p>

				<ul class="mb-6 space-y-3">
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Custom module development</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Advanced security implementations</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Multi-tenant architecture</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Custom authentication systems</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Performance optimization</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Scalability enhancements</span>
					</li>
				</ul>

				<div class="flex space-x-3">
					<a
						href="/contact"
						class="inline-flex flex-1 items-center justify-center rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-purple-700"
					>
						<Wrench class="mr-2 h-4 w-4" />
						Get Professional Help
					</a>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Showcase Examples Section -->
<section class="bg-white py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<h2 class="mb-6 text-4xl font-extrabold text-gray-900">Real Customization Examples</h2>
			<p class="mx-auto max-w-3xl text-xl text-gray-600">
				See how businesses across different industries have customized BottleCRM to fit their unique
				requirements.
			</p>
		</div>

		<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
			<!-- Real Estate CRM -->
			<div class="rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 p-8 text-center">
				<div class="mb-4 text-4xl">🏠</div>
				<h3 class="mb-3 text-xl font-bold text-gray-900">Real Estate CRM</h3>
				<p class="mb-4 text-gray-600">
					Custom property management fields, automated follow-up sequences, and integration with MLS
					systems.
				</p>
				<div class="flex flex-wrap justify-center gap-2">
					<span
						class="rounded-full border border-blue-200 bg-white px-3 py-1 text-xs font-medium text-blue-700"
						>Property Fields</span
					>
					<span
						class="rounded-full border border-blue-200 bg-white px-3 py-1 text-xs font-medium text-blue-700"
						>MLS Integration</span
					>
					<span
						class="rounded-full border border-blue-200 bg-white px-3 py-1 text-xs font-medium text-blue-700"
						>Auto Follow-ups</span
					>
				</div>
			</div>

			<!-- E-commerce Integration -->
			<div class="rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 p-8 text-center">
				<div class="mb-4 text-4xl">🛒</div>
				<h3 class="mb-3 text-xl font-bold text-gray-900">E-commerce Integration</h3>
				<p class="mb-4 text-gray-600">
					Shopify integration, automated order tracking, customer lifetime value calculations, and
					purchase history.
				</p>
				<div class="flex flex-wrap justify-center gap-2">
					<span
						class="rounded-full border border-green-200 bg-white px-3 py-1 text-xs font-medium text-green-700"
						>Shopify API</span
					>
					<span
						class="rounded-full border border-green-200 bg-white px-3 py-1 text-xs font-medium text-green-700"
						>Order Tracking</span
					>
					<span
						class="rounded-full border border-green-200 bg-white px-3 py-1 text-xs font-medium text-green-700"
						>LTV Analytics</span
					>
				</div>
			</div>

			<!-- Healthcare Practice -->
			<div class="rounded-2xl bg-gradient-to-br from-red-50 to-rose-50 p-8 text-center">
				<div class="mb-4 text-4xl">🏥</div>
				<h3 class="mb-3 text-xl font-bold text-gray-900">Healthcare Practice</h3>
				<p class="mb-4 text-gray-600">
					Patient management, appointment scheduling, HIPAA compliance features, and insurance
					tracking.
				</p>
				<div class="flex flex-wrap justify-center gap-2">
					<span
						class="rounded-full border border-red-200 bg-white px-3 py-1 text-xs font-medium text-red-700"
						>Patient Records</span
					>
					<span
						class="rounded-full border border-red-200 bg-white px-3 py-1 text-xs font-medium text-red-700"
						>HIPAA Compliant</span
					>
					<span
						class="rounded-full border border-red-200 bg-white px-3 py-1 text-xs font-medium text-red-700"
						>Appointment System</span
					>
				</div>
			</div>

			<!-- SaaS Startup CRM -->
			<div class="rounded-2xl bg-gradient-to-br from-purple-50 to-violet-50 p-8 text-center">
				<div class="mb-4 text-4xl">💻</div>
				<h3 class="mb-3 text-xl font-bold text-gray-900">SaaS Startup CRM</h3>
				<p class="mb-4 text-gray-600">
					Trial tracking, usage analytics, churn prediction, and automated upgrade campaigns.
				</p>
				<div class="flex flex-wrap justify-center gap-2">
					<span
						class="rounded-full border border-purple-200 bg-white px-3 py-1 text-xs font-medium text-purple-700"
						>Trial Management</span
					>
					<span
						class="rounded-full border border-purple-200 bg-white px-3 py-1 text-xs font-medium text-purple-700"
						>Usage Analytics</span
					>
					<span
						class="rounded-full border border-purple-200 bg-white px-3 py-1 text-xs font-medium text-purple-700"
						>Churn Prevention</span
					>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Services Pricing Section -->
<section class="bg-gray-50 py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<h2 class="mb-6 text-4xl font-extrabold text-gray-900">Customization Service Options</h2>
			<p class="mx-auto max-w-3xl text-xl text-gray-600">
				Choose your path: customize it yourself with our free resources, or let our experts handle
				it for you.
			</p>
		</div>

		<div class="grid gap-8 lg:grid-cols-3">
			<!-- DIY Customization Kit -->
			<div
				class="relative rounded-2xl bg-white p-8 shadow-xl transition-all duration-300 hover:scale-105"
			>
				<div class="absolute -top-4 left-1/2 -translate-x-1/2 transform">
					<span
						class="inline-flex items-center rounded-full border border-gray-200 bg-gray-100 px-4 py-2 text-sm font-bold text-gray-700"
					>
						Perfect for Developers
					</span>
				</div>

				<div class="mb-8 pt-4 text-center">
					<div class="mb-4">
						<Code class="mx-auto h-12 w-12 text-purple-600" />
					</div>
					<h3 class="mb-2 text-2xl font-bold text-gray-900">DIY Customization Kit</h3>
					<p class="mb-4 text-gray-600">
						Everything you need to customize BottleCRM yourself with comprehensive guides and
						resources.
					</p>

					<div class="mb-6">
						<span class="text-5xl font-extrabold text-gray-900">Free</span>
						<span class="text-xl text-gray-500">/Forever</span>
					</div>

					<a
						href="https://github.com/MicroPyramid/opensource-startup-crm"
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex w-full items-center justify-center rounded-lg bg-purple-50 px-6 py-3 text-lg font-semibold text-purple-600 transition-all duration-200 hover:bg-purple-100"
					>
						Download Free
					</a>
				</div>

				<ul class="space-y-3">
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Complete source code access</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Detailed customization documentation</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Video tutorials and guides</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Community forum support</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Example customization templates</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Development environment setup guide</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Basic theming tools</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">CSS framework documentation</span>
					</li>
				</ul>
			</div>

			<!-- Professional Customization -->
			<div
				class="relative rounded-2xl bg-white p-8 shadow-xl ring-4 ring-purple-500 ring-opacity-50 transition-all duration-300 hover:scale-105"
			>
				<div class="absolute -top-4 left-1/2 -translate-x-1/2 transform">
					<span
						class="inline-flex items-center rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 px-4 py-2 text-sm font-bold text-white"
					>
						<Star class="mr-1 h-4 w-4" />
						Most Popular
					</span>
				</div>

				<div class="mb-8 pt-4 text-center">
					<div class="mb-4">
						<Brush class="mx-auto h-12 w-12 text-purple-600" />
					</div>
					<h3 class="mb-2 text-2xl font-bold text-gray-900">Professional Customization</h3>
					<p class="mb-4 text-gray-600">
						Expert customization services for businesses that want professional results without the
						learning curve.
					</p>

					<div class="mb-6">
						<span class="text-5xl font-extrabold text-gray-900">$497</span>
						<span class="text-xl text-gray-500">/per project</span>
					</div>

					<a
						href="/contact"
						class="inline-flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 text-lg font-semibold text-white transition-all duration-200 hover:from-purple-700 hover:to-indigo-700"
					>
						Get Professional Help
					</a>
				</div>

				<ul class="space-y-3">
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Everything in DIY Kit</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Custom theme development</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Logo and branding integration</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Up to 5 custom fields</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Basic workflow automation</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Email template customization</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Mobile responsive optimization</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">2 rounds of revisions</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">1-week delivery</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">30-day support included</span>
					</li>
				</ul>
			</div>

			<!-- Enterprise Customization -->
			<div
				class="relative rounded-2xl bg-white p-8 shadow-xl transition-all duration-300 hover:scale-105"
			>
				<div class="absolute -top-4 left-1/2 -translate-x-1/2 transform">
					<span
						class="inline-flex items-center rounded-full border border-gray-200 bg-gray-100 px-4 py-2 text-sm font-bold text-gray-700"
					>
						Full Service
					</span>
				</div>

				<div class="mb-8 pt-4 text-center">
					<div class="mb-4">
						<Shield class="mx-auto h-12 w-12 text-purple-600" />
					</div>
					<h3 class="mb-2 text-2xl font-bold text-gray-900">Enterprise Customization</h3>
					<p class="mb-4 text-gray-600">
						Complete custom development for complex business requirements and enterprise-level
						implementations.
					</p>

					<div class="mb-6">
						<span class="text-5xl font-extrabold text-gray-900">$1,497</span>
						<span class="text-xl text-gray-500">/per project</span>
					</div>

					<a
						href="/contact"
						class="inline-flex w-full items-center justify-center rounded-lg bg-purple-50 px-6 py-3 text-lg font-semibold text-purple-600 transition-all duration-200 hover:bg-purple-100"
					>
						Contact Enterprise Team
					</a>
				</div>

				<ul class="space-y-3">
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Everything in Professional</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Unlimited custom fields and modules</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Advanced workflow automation</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Third-party integrations (up to 3)</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Custom reporting dashboards</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Advanced user role management</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Performance optimization</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Security enhancements</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">3-week delivery</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">90-day priority support</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</section>

<!-- Technical Requirements Section -->
<section class="bg-white py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<h2 class="mb-6 text-4xl font-extrabold text-gray-900">
				Technical Requirements for DIY Customization
			</h2>
			<p class="mx-auto max-w-3xl text-xl text-gray-600">
				Planning to customize BottleCRM yourself? Here are the technical skills and technologies
				you'll need to know.
			</p>
		</div>

		<div class="grid gap-8 md:grid-cols-3">
			<!-- Frontend Development -->
			<div
				class="rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-blue-50 p-8 transition-all duration-300 hover:shadow-lg"
			>
				<div class="mb-6 flex items-center">
					<div class="mr-4 rounded-lg bg-blue-100 p-3">
						<Layout class="h-6 w-6 text-blue-600" />
					</div>
					<h3 class="text-xl font-bold text-gray-900">Frontend Development</h3>
				</div>

				<ul class="space-y-3">
					<li class="flex items-center">
						<div class="mr-3 h-2 w-2 rounded-full bg-blue-500"></div>
						<span class="font-medium text-gray-700">Svelte 5.x</span>
					</li>
					<li class="flex items-center">
						<div class="mr-3 h-2 w-2 rounded-full bg-blue-500"></div>
						<span class="font-medium text-gray-700">SvelteKit 2.21+</span>
					</li>
					<li class="flex items-center">
						<div class="mr-3 h-2 w-2 rounded-full bg-blue-500"></div>
						<span class="font-medium text-gray-700">JavaScript/TypeScript</span>
					</li>
					<li class="flex items-center">
						<div class="mr-3 h-2 w-2 rounded-full bg-blue-500"></div>
						<span class="font-medium text-gray-700">TailwindCSS 4.1+</span>
					</li>
					<li class="flex items-center">
						<div class="mr-3 h-2 w-2 rounded-full bg-blue-500"></div>
						<span class="font-medium text-gray-700">HTML5/CSS3</span>
					</li>
				</ul>
			</div>

			<!-- Backend Development -->
			<div
				class="rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-blue-50 p-8 transition-all duration-300 hover:shadow-lg"
			>
				<div class="mb-6 flex items-center">
					<div class="mr-4 rounded-lg bg-blue-100 p-3">
						<Database class="h-6 w-6 text-blue-600" />
					</div>
					<h3 class="text-xl font-bold text-gray-900">Backend Development</h3>
				</div>

				<ul class="space-y-3">
					<li class="flex items-center">
						<div class="mr-3 h-2 w-2 rounded-full bg-blue-500"></div>
						<span class="font-medium text-gray-700">Node.js</span>
					</li>
					<li class="flex items-center">
						<div class="mr-3 h-2 w-2 rounded-full bg-blue-500"></div>
						<span class="font-medium text-gray-700">Prisma ORM</span>
					</li>
					<li class="flex items-center">
						<div class="mr-3 h-2 w-2 rounded-full bg-blue-500"></div>
						<span class="font-medium text-gray-700">Database Design</span>
					</li>
					<li class="flex items-center">
						<div class="mr-3 h-2 w-2 rounded-full bg-blue-500"></div>
						<span class="font-medium text-gray-700">API Development</span>
					</li>
					<li class="flex items-center">
						<div class="mr-3 h-2 w-2 rounded-full bg-blue-500"></div>
						<span class="font-medium text-gray-700">Authentication</span>
					</li>
				</ul>
			</div>

			<!-- DevOps & Deployment -->
			<div
				class="rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-blue-50 p-8 transition-all duration-300 hover:shadow-lg"
			>
				<div class="mb-6 flex items-center">
					<div class="mr-4 rounded-lg bg-blue-100 p-3">
						<Cloud class="h-6 w-6 text-blue-600" />
					</div>
					<h3 class="text-xl font-bold text-gray-900">DevOps & Deployment</h3>
				</div>

				<ul class="space-y-3">
					<li class="flex items-center">
						<div class="mr-3 h-2 w-2 rounded-full bg-blue-500"></div>
						<span class="font-medium text-gray-700">Docker</span>
					</li>
					<li class="flex items-center">
						<div class="mr-3 h-2 w-2 rounded-full bg-blue-500"></div>
						<span class="font-medium text-gray-700">Linux/Ubuntu</span>
					</li>
					<li class="flex items-center">
						<div class="mr-3 h-2 w-2 rounded-full bg-blue-500"></div>
						<span class="font-medium text-gray-700">Cloud Platforms</span>
					</li>
					<li class="flex items-center">
						<div class="mr-3 h-2 w-2 rounded-full bg-blue-500"></div>
						<span class="font-medium text-gray-700">SSL Configuration</span>
					</li>
					<li class="flex items-center">
						<div class="mr-3 h-2 w-2 rounded-full bg-blue-500"></div>
						<span class="font-medium text-gray-700">Domain Setup</span>
					</li>
				</ul>
			</div>
		</div>

		<div class="mt-12 text-center">
			<div
				class="rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50 p-8"
			>
				<h3 class="mb-4 text-2xl font-bold text-gray-900">Don't have the technical skills?</h3>
				<p class="mb-6 text-lg text-gray-600">
					No problem! Our professional customization services handle all the technical complexity
					for you.
				</p>
				<a
					href="/contact"
					class="inline-flex items-center justify-center rounded-lg bg-purple-600 px-6 py-3 text-lg font-semibold text-white transition-colors hover:bg-purple-700"
				>
					<MessageCircle class="mr-2 h-5 w-5" />
					Get Professional Help
				</a>
			</div>
		</div>
	</div>
</section>

<!-- FAQ Section -->
<section class="bg-gray-50 py-20">
	<div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<h2 class="mb-6 text-4xl font-extrabold text-gray-900">Customization Questions & Answers</h2>
			<p class="text-xl text-gray-600">
				Everything you need to know about customizing BottleCRM for your business.
			</p>
		</div>

		<div class="space-y-4">
			<!-- FAQ 1 -->
			<div class="overflow-hidden rounded-lg border border-gray-200 bg-white">
				<button
					onclick={() => toggleFaq(0)}
					class="w-full px-6 py-5 text-left transition-colors duration-200 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
					aria-expanded={activeFaq === 0}
				>
					<div class="flex items-center justify-between">
						<h3 class="pr-4 text-lg font-semibold text-gray-900">
							Can I customize BottleCRM without coding knowledge?
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
							Yes! Basic visual customizations like colors, logos, and simple layout changes can be
							done through configuration files. For more advanced customizations, you can use our
							Professional Customization service or learn from our detailed tutorials.
						</p>
					</div>
				{/if}
			</div>

			<!-- FAQ 2 -->
			<div class="overflow-hidden rounded-lg border border-gray-200 bg-white">
				<button
					onclick={() => toggleFaq(1)}
					class="w-full px-6 py-5 text-left transition-colors duration-200 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
					aria-expanded={activeFaq === 1}
				>
					<div class="flex items-center justify-between">
						<h3 class="pr-4 text-lg font-semibold text-gray-900">
							Will my customizations be lost when BottleCRM updates?
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
							Not if done properly! We provide guidelines for creating update-safe customizations.
							Our professional service includes future-proofing your customizations to survive
							software updates.
						</p>
					</div>
				{/if}
			</div>

			<!-- FAQ 3 -->
			<div class="overflow-hidden rounded-lg border border-gray-200 bg-white">
				<button
					onclick={() => toggleFaq(2)}
					class="w-full px-6 py-5 text-left transition-colors duration-200 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
					aria-expanded={activeFaq === 2}
				>
					<div class="flex items-center justify-between">
						<h3 class="pr-4 text-lg font-semibold text-gray-900">
							How long does professional customization take?
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
							Simple customizations (branding, basic fields) take 1-2 weeks. Complex integrations
							and custom modules can take 3-6 weeks. We provide detailed timelines before starting
							any project.
						</p>
					</div>
				{/if}
			</div>

			<!-- FAQ 4 -->
			<div class="overflow-hidden rounded-lg border border-gray-200 bg-white">
				<button
					onclick={() => toggleFaq(3)}
					class="w-full px-6 py-5 text-left transition-colors duration-200 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
					aria-expanded={activeFaq === 3}
				>
					<div class="flex items-center justify-between">
						<h3 class="pr-4 text-lg font-semibold text-gray-900">
							Can you integrate BottleCRM with our existing tools?
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
							Absolutely! We've integrated BottleCRM with hundreds of tools including Shopify,
							WordPress, QuickBooks, Mailchimp, Slack, and many others. If it has an API, we can
							likely integrate it.
						</p>
					</div>
				{/if}
			</div>

			<!-- FAQ 5 -->
			<div class="overflow-hidden rounded-lg border border-gray-200 bg-white">
				<button
					onclick={() => toggleFaq(4)}
					class="w-full px-6 py-5 text-left transition-colors duration-200 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
					aria-expanded={activeFaq === 4}
				>
					<div class="flex items-center justify-between">
						<h3 class="pr-4 text-lg font-semibold text-gray-900">
							Do you provide training after customization?
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
							Yes! All our customization services include comprehensive training for your team,
							documentation of changes made, and ongoing support to ensure you get the most out of
							your customized CRM.
						</p>
					</div>
				{/if}
			</div>

			<!-- FAQ 6 -->
			<div class="overflow-hidden rounded-lg border border-gray-200 bg-white">
				<button
					onclick={() => toggleFaq(5)}
					class="w-full px-6 py-5 text-left transition-colors duration-200 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
					aria-expanded={activeFaq === 5}
				>
					<div class="flex items-center justify-between">
						<h3 class="pr-4 text-lg font-semibold text-gray-900">
							Can I start with DIY and upgrade to professional service later?
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
							Definitely! Many clients start with basic customizations and later hire us for more
							complex features. We can work with existing customizations and enhance them further.
						</p>
					</div>
				{/if}
			</div>
		</div>
	</div>
</section>

<!-- Call to Action -->
<section class="bg-gradient-to-r from-purple-700 via-purple-800 to-indigo-900 py-20 text-white">
	<div class="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
		<h2 class="mb-6 text-4xl font-extrabold md:text-5xl">Ready to Create Your Perfect CRM?</h2>
		<p class="mx-auto mb-8 max-w-3xl text-xl text-purple-100 md:text-2xl">
			Whether you're a developer ready to dive into the code or a business owner who needs
			professional help, we have the perfect solution for your customization needs.
		</p>

		<div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-x-6 sm:space-y-0">
			<a
				href="https://github.com/MicroPyramid/opensource-startup-crm"
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-lg font-bold text-purple-700 shadow-2xl transition-all duration-200 hover:scale-105 hover:bg-gray-100"
			>
				<Github class="mr-3 h-6 w-6" />
				Start DIY Customization
			</a>
			<a
				href="/contact"
				class="inline-flex items-center justify-center rounded-xl border-2 border-white px-8 py-4 text-lg font-bold text-white transition-all duration-200 hover:bg-white/10"
			>
				<Wrench class="mr-3 h-6 w-6" />
				Get Professional Service
			</a>
		</div>

		<p class="mt-8 text-purple-200">
			🚀 Free source code • Professional services • 30-day money-back guarantee
		</p>
	</div>
</section>
