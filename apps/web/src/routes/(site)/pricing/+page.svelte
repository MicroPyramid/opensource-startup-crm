<!-- pricing page -->
<script lang="ts">
	import {
		Check,
		X,
		Star,
		Calculator,
		Download,
		MessageCircle,
		Settings,
		HeadphonesIcon,
		ChevronDown,
		AlertCircle,
	} from '@lucide/svelte';

	let activeFaq: number | null = $state(null);
	let teamSize: number = $state(5);
	let selectedCompetitor: string = $state('Enterprise CRM A');
	let calculatedSavings: number = $state(1500);

	function toggleFaq(index: number) {
		activeFaq = activeFaq === index ? null : index;
	}

	function updateSavings(): void {
		if (selectedCompetitor === 'Enterprise CRM A') {
			calculatedSavings = 25 * 12 * teamSize;
		} else if (selectedCompetitor === 'Popular CRM B') {
			calculatedSavings = 50 * 12 * teamSize;
		} else if (selectedCompetitor === 'Business CRM C') {
			calculatedSavings = 15 * 12 * teamSize;
		}
	}

	$effect(() => {
		if (teamSize && selectedCompetitor) updateSavings();
	});
</script>

<svelte:head>
	<title>BottleCRM Pricing – Free Open Source CRM & Affordable Support</title>
	<meta
		name="description"
		content="BottleCRM is a 100% free, open-source CRM with unlimited users and no monthly fees. Compare costs, calculate your savings, and discover optional professional support for easy setup and customization."
	/>
	<meta
		name="keywords"
		content="free crm, open source crm, crm pricing, crm cost, crm comparison, affordable crm, crm software, unlimited users crm, crm support, crm setup"
	/>

	<!-- Open Graph -->
	<meta
		property="og:title"
		content="BottleCRM Pricing – Free Open Source CRM & Affordable Support"
	/>
	<meta
		property="og:description"
		content="BottleCRM is a free, open-source CRM with unlimited users. Calculate your savings and see how it compares to paid CRM solutions."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://bottlecrm.io/pricing" />
	<meta property="og:image" content="https://bottlecrm.io/og-image.png" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta
		name="twitter:title"
		content="BottleCRM Pricing – Free Open Source CRM & Affordable Support"
	/>
	<meta
		name="twitter:description"
		content="BottleCRM is a free, open-source CRM with unlimited users. Calculate your savings and see how it compares to paid CRM solutions."
	/>
	<meta name="twitter:image" content="https://bottlecrm.io/og-image.png" />

	<!-- Structured Data -->
	<script type="application/ld+json">
    {`{
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "BottleCRM",
      "description": "Free, open-source CRM software with unlimited users and optional professional support.",
      "brand": {
        "@type": "Brand",
        "name": "BottleCRM"
      },
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      },
      "url": "https://bottlecrm.io/pricing"
    }`}
	</script>
</svelte:head>

<!-- Hero Section -->
<section class="bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 py-20 text-white">
	<div class="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
		<div class="mx-auto max-w-4xl">
			<div
				class="mb-6 inline-flex items-center rounded-full bg-green-500 px-4 py-2 text-sm font-semibold text-white"
			>
				<Check class="mr-2 h-4 w-4" />
				100% Free Forever • No Credit Card Required
			</div>

			<h1 class="mb-6 text-4xl font-extrabold md:text-6xl">
				CRM That's <span class="text-green-300">Actually Free</span>
			</h1>

			<p class="mb-8 text-xl leading-relaxed text-blue-100 md:text-2xl">
				Stop paying $1,800-50,000 per year for CRM software. BottleCRM gives you enterprise-grade
				features without the enterprise price tag. Professional support available when you need it.
			</p>

			<div
				class="mb-12 flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-x-6 sm:space-y-0"
			>
				<a
					href="https://github.com/MicroPyramid/opensource-startup-crm"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-lg font-bold text-blue-700 shadow-2xl transition-all duration-200 hover:scale-105 hover:bg-gray-100"
				>
					<Download class="mr-3 h-6 w-6" />
					Download Free CRM
				</a>
				<a
					href="#calculator"
					class="inline-flex items-center justify-center rounded-xl border-2 border-white px-8 py-4 text-lg font-bold text-white transition-all duration-200 hover:bg-white/10"
				>
					<Calculator class="mr-3 h-6 w-6" />
					Calculate Your Savings
				</a>
			</div>

			<div class="mx-auto grid max-w-2xl grid-cols-1 gap-6 md:grid-cols-3">
				<div class="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
					<div class="text-2xl font-bold text-green-300">$0</div>
					<div class="text-sm text-blue-200">Monthly Cost</div>
				</div>
				<div class="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
					<div class="text-2xl font-bold text-green-300">∞</div>
					<div class="text-sm text-blue-200">Users Included</div>
				</div>
				<div class="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
					<div class="text-2xl font-bold text-green-300">100%</div>
					<div class="text-sm text-blue-200">Data Ownership</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Pricing Cards Section -->
<section class="bg-gray-50 py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<h2 class="mb-6 text-4xl font-extrabold text-gray-900">Choose Your BottleCRM Experience</h2>
			<p class="mx-auto max-w-3xl text-xl text-gray-600">
				Start with our free CRM software. Add professional support services when you need expert
				help with setup, customization, or deployment.
			</p>
		</div>

		<div class="grid gap-8 lg:grid-cols-3">
			<!-- BottleCRM Core -->
			<div
				class="relative rounded-2xl bg-white p-8 shadow-xl transition-all duration-300 hover:scale-105"
			>
				<div class="absolute -top-4 left-1/2 -translate-x-1/2 transform">
					<span
						class="inline-flex items-center rounded-full border border-gray-200 bg-gray-100 px-4 py-2 text-sm font-bold text-gray-700"
					>
						100% Free
					</span>
				</div>

				<div class="mb-8 pt-4 text-center">
					<div class="mb-4">
						<Download class="mx-auto h-12 w-12 text-blue-600" />
					</div>
					<h3 class="mb-2 text-2xl font-bold text-gray-900">BottleCRM Core</h3>
					<p class="mb-4 text-gray-600">
						Complete CRM solution with all essential features. Perfect for startups and small
						businesses.
					</p>

					<div class="mb-6">
						<span class="text-5xl font-extrabold text-gray-900">Free</span>
						<span class="text-xl text-gray-500">/Forever</span>
					</div>

					<a
						href="https://github.com/MicroPyramid/opensource-startup-crm"
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex w-full items-center justify-center rounded-lg bg-blue-50 px-6 py-3 text-lg font-semibold text-blue-600 transition-all duration-200 hover:bg-blue-100"
					>
						Download Free
					</a>
				</div>

				<ul class="space-y-3">
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Unlimited contacts & leads</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Complete sales pipeline</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Task & project management</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Basic reporting & analytics</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Email integration</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Mobile responsive interface</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Self-hosting ready</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Full source code access</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">MIT open-source license</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Community support</span>
					</li>
				</ul>
			</div>

			<!-- Professional Support -->
			<div
				class="relative rounded-2xl bg-white p-8 shadow-xl ring-4 ring-blue-500 ring-opacity-50 transition-all duration-300 hover:scale-105"
			>
				<div class="absolute -top-4 left-1/2 -translate-x-1/2 transform">
					<span
						class="inline-flex items-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 text-sm font-bold text-white"
					>
						<Star class="mr-1 h-4 w-4" />
						Most Popular
					</span>
				</div>

				<div class="mb-8 pt-4 text-center">
					<div class="mb-4">
						<HeadphonesIcon class="mx-auto h-12 w-12 text-blue-600" />
					</div>
					<h3 class="mb-2 text-2xl font-bold text-gray-900">Professional Support</h3>
					<p class="mb-4 text-gray-600">
						Get expert help with setup, customization, and deployment. Perfect for teams that want
						quick implementation.
					</p>

					<div class="mb-6">
						<span class="text-5xl font-extrabold text-gray-900">$197</span>
						<span class="text-xl text-gray-500">/one-time</span>
					</div>

					<a
						href="/contact"
						class="inline-flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-lg font-semibold text-white transition-all duration-200 hover:from-blue-700 hover:to-purple-700"
					>
						Get Support
					</a>
				</div>

				<ul class="space-y-3">
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Everything in Core (free)</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Professional installation & setup</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Custom domain configuration</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">SSL certificate setup</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Database optimization</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Basic customization (colors, logo)</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Email configuration</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">1-month support included</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Video walkthrough session</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Documentation & best practices</span>
					</li>
				</ul>
			</div>

			<!-- Enterprise Setup -->
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
						<Settings class="mx-auto h-12 w-12 text-blue-600" />
					</div>
					<h3 class="mb-2 text-2xl font-bold text-gray-900">Enterprise Setup</h3>
					<p class="mb-4 text-gray-600">
						Complete enterprise deployment with advanced customization and training. Ideal for
						growing companies.
					</p>

					<div class="mb-6">
						<span class="text-5xl font-extrabold text-gray-900">$497</span>
						<span class="text-xl text-gray-500">/one-time</span>
					</div>

					<a
						href="/contact"
						class="inline-flex w-full items-center justify-center rounded-lg bg-blue-50 px-6 py-3 text-lg font-semibold text-blue-600 transition-all duration-200 hover:bg-blue-100"
					>
						Contact Sales
					</a>
				</div>

				<ul class="space-y-3">
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Everything in Professional Support</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Advanced custom development</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Third-party integrations</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Advanced reporting setup</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Custom workflows & automation</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Team training sessions (2 hours)</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Advanced security configuration</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Performance optimization</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">3-month priority support</span>
					</li>
					<li class="flex items-start">
						<Check class="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
						<span class="text-gray-700">Migration from existing CRM</span>
					</li>
				</ul>
			</div>
		</div>

		<div class="mt-12 text-center">
			<p class="mb-4 text-lg text-gray-600">
				Need something custom? We also offer bespoke development, hosting, and enterprise
				consulting.
			</p>
			<a
				href="/contact"
				class="inline-flex items-center font-semibold text-blue-600 hover:text-blue-700"
			>
				<MessageCircle class="mr-2 h-5 w-5" />
				Contact us for custom pricing
			</a>
		</div>
	</div>
</section>

<!-- Cost Calculator Section -->
<section id="calculator" class="bg-white py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<h2 class="mb-6 text-4xl font-extrabold text-gray-900">Calculate Your Annual Savings</h2>
			<p class="mx-auto max-w-3xl text-xl text-gray-600">
				See how much money your business can save by switching to BottleCRM from typical
				subscription-based CRM solutions.
			</p>
		</div>

		<div class="rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 p-8 lg:p-12">
			<div class="grid gap-8 lg:grid-cols-2">
				<div>
					<h3 class="mb-6 text-2xl font-bold text-gray-900">Savings Calculator</h3>

					<div class="space-y-6">
						<div>
							<label for="team-size" class="mb-2 block text-sm font-medium text-gray-700">
								Team Size (Number of Users)
							</label>
							<input
								type="range"
								id="team-size"
								bind:value={teamSize}
								min="1"
								max="100"
								step="1"
								class="slider h-3 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
							/>
							<div class="mt-1 flex justify-between text-sm text-gray-500">
								<span>1</span>
								<span class="text-lg font-semibold text-blue-600">{teamSize} users</span>
								<span>100+</span>
							</div>
						</div>

						<div>
							<label for="competitor" class="mb-2 block text-sm font-medium text-gray-700">
								Compare Against Typical Market Pricing
							</label>
							<select
								id="competitor"
								bind:value={selectedCompetitor}
								class="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
							>
								<option value="Enterprise CRM A">Enterprise CRM A (~$25/user/month)</option>
								<option value="Popular CRM B">Popular CRM B (~$50/user/month)</option>
								<option value="Business CRM C">Business CRM C (~$15/user/month)</option>
							</select>
							<p class="mt-1 text-xs text-gray-500">
								*Pricing based on publicly available market research
							</p>
						</div>
					</div>
				</div>

				<div class="rounded-xl bg-white p-8 shadow-lg">
					<h4 class="mb-6 text-2xl font-bold text-gray-900">Your Potential Savings</h4>

					<div class="space-y-4">
						<div class="flex items-center justify-between border-b border-gray-200 py-3">
							<span class="text-gray-600">Annual cost with {selectedCompetitor}:</span>
							<span class="text-xl font-bold text-red-600"
								>${calculatedSavings.toLocaleString()}</span
							>
						</div>
						<div class="flex items-center justify-between border-b border-gray-200 py-3">
							<span class="text-gray-600">Annual cost with BottleCRM:</span>
							<span class="text-xl font-bold text-green-600">$0</span>
						</div>
						<div class="flex items-center justify-between rounded-lg bg-green-50 px-4 py-4">
							<span class="font-semibold text-gray-900">Total Annual Savings:</span>
							<span class="text-3xl font-extrabold text-green-600"
								>${calculatedSavings.toLocaleString()}</span
							>
						</div>
					</div>

					<div class="mt-6 rounded-lg bg-blue-50 p-4">
						<p class="text-sm text-blue-800">
							<strong>Note:</strong> Even with our most expensive Enterprise Setup ($497), you'd
							still save ${(calculatedSavings - 497).toLocaleString()} in the first year alone!
						</p>
					</div>
				</div>
			</div>

			<!-- Add disclaimer -->
			<div class="mt-8 rounded-lg border border-yellow-200 bg-yellow-50 p-4">
				<p class="text-sm text-yellow-800">
					<AlertCircle class="mr-2 inline h-4 w-4" />
					<strong>Disclaimer:</strong> Pricing comparisons are based on publicly available information
					and market research as of 2024. Actual costs may vary. We recommend checking current pricing
					with individual vendors for exact comparisons.
				</p>
			</div>
		</div>
	</div>
</section>

<!-- Detailed Comparison Table -->
<section class="bg-gray-50 py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<h2 class="mb-6 text-4xl font-extrabold text-gray-900">
				Feature & Cost Comparison vs Market Leaders
			</h2>
			<p class="text-xl text-gray-600">
				See how BottleCRM compares to typical enterprise CRM solutions across key factors.
			</p>
		</div>

		<div class="overflow-x-auto">
			<table class="w-full overflow-hidden rounded-xl bg-white shadow-lg">
				<thead class="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
					<tr>
						<th class="px-6 py-4 text-left text-sm font-semibold">Feature</th>
						<th class="bg-green-600 px-6 py-4 text-center text-sm font-semibold">BottleCRM</th>
						<th class="px-6 py-4 text-center text-sm font-semibold">Enterprise CRM A</th>
						<th class="px-6 py-4 text-center text-sm font-semibold">Popular CRM B</th>
						<th class="px-6 py-4 text-center text-sm font-semibold">Business CRM C</th>
					</tr>
				</thead>
				<tbody>
					<tr class="border-b border-gray-200 hover:bg-gray-50">
						<td class="px-6 py-4 font-medium text-gray-900">Monthly Cost (per user)</td>
						<td class="bg-green-50 px-6 py-4 text-center font-bold text-green-600">$0</td>
						<td class="px-6 py-4 text-center text-gray-700">~$25/user</td>
						<td class="px-6 py-4 text-center text-gray-700">~$50/user</td>
						<td class="px-6 py-4 text-center text-gray-700">~$15/user</td>
					</tr>
					<tr class="border-b border-gray-200 hover:bg-gray-50">
						<td class="px-6 py-4 font-medium text-gray-900">Annual Cost (10 users)</td>
						<td class="bg-green-50 px-6 py-4 text-center font-bold text-green-600">$0</td>
						<td class="px-6 py-4 text-center text-gray-700">~$3,000</td>
						<td class="px-6 py-4 text-center text-gray-700">~$6,000</td>
						<td class="px-6 py-4 text-center text-gray-700">~$1,800</td>
					</tr>
					<tr class="border-b border-gray-200 hover:bg-gray-50">
						<td class="px-6 py-4 font-medium text-gray-900">Setup/Onboarding</td>
						<td class="px-6 py-4 text-center text-sm text-gray-700">Optional ($197-497)</td>
						<td class="px-6 py-4 text-center text-sm text-gray-700">Varies*</td>
						<td class="px-6 py-4 text-center text-sm text-gray-700">Varies*</td>
						<td class="px-6 py-4 text-center text-sm text-gray-700">Varies*</td>
					</tr>
					<tr class="border-b border-gray-200 hover:bg-gray-50">
						<td class="px-6 py-4 font-medium text-gray-900">User Limits</td>
						<td class="px-6 py-4 text-center text-sm text-gray-700">Unlimited</td>
						<td class="px-6 py-4 text-center text-sm text-gray-700">Per seat**</td>
						<td class="px-6 py-4 text-center text-sm text-gray-700">Limited**</td>
						<td class="px-6 py-4 text-center text-sm text-gray-700">Per seat**</td>
					</tr>
					<tr class="border-b border-gray-200 hover:bg-gray-50">
						<td class="px-6 py-4 font-medium text-gray-900">Storage Limits</td>
						<td class="px-6 py-4 text-center text-sm text-gray-700">Unlimited</td>
						<td class="px-6 py-4 text-center text-sm text-gray-700">Limited**</td>
						<td class="px-6 py-4 text-center text-sm text-gray-700">Limited**</td>
						<td class="px-6 py-4 text-center text-sm text-gray-700">Limited**</td>
					</tr>
					<tr class="border-b border-gray-200 hover:bg-gray-50">
						<td class="px-6 py-4 font-medium text-gray-900">Self-Hosted Option</td>
						<td class="px-6 py-4 text-center">
							<Check class="mx-auto h-5 w-5 text-green-500" />
						</td>
						<td class="px-6 py-4 text-center">
							<X class="mx-auto h-5 w-5 text-red-500" />
						</td>
						<td class="px-6 py-4 text-center">
							<X class="mx-auto h-5 w-5 text-red-500" />
						</td>
						<td class="px-6 py-4 text-center">
							<X class="mx-auto h-5 w-5 text-red-500" />
						</td>
					</tr>
					<tr class="border-b border-gray-200 hover:bg-gray-50">
						<td class="px-6 py-4 font-medium text-gray-900">Open Source</td>
						<td class="px-6 py-4 text-center">
							<Check class="mx-auto h-5 w-5 text-green-500" />
						</td>
						<td class="px-6 py-4 text-center">
							<X class="mx-auto h-5 w-5 text-red-500" />
						</td>
						<td class="px-6 py-4 text-center">
							<X class="mx-auto h-5 w-5 text-red-500" />
						</td>
						<td class="px-6 py-4 text-center">
							<X class="mx-auto h-5 w-5 text-red-500" />
						</td>
					</tr>
					<tr class="hover:bg-gray-50">
						<td class="px-6 py-4 font-medium text-gray-900">Data Ownership</td>
						<td class="px-6 py-4 text-center text-sm text-gray-700">100% yours</td>
						<td class="px-6 py-4 text-center text-sm text-gray-700">Vendor hosted</td>
						<td class="px-6 py-4 text-center text-sm text-gray-700">Vendor hosted</td>
						<td class="px-6 py-4 text-center text-sm text-gray-700">Vendor hosted</td>
					</tr>
				</tbody>
			</table>

			<!-- Add table disclaimer -->
			<div class="mt-6 rounded-lg bg-gray-100 p-4">
				<p class="text-sm text-gray-600">
					<strong>**</strong> Features and limitations vary by plan tier.
					<strong>*</strong> Pricing varies by vendor and implementation requirements. Information based
					on publicly available market research as of 2024. Please verify current pricing and features
					with individual vendors.
				</p>
			</div>
		</div>
	</div>
</section>

<!-- FAQ Section -->
<section class="bg-white py-20">
	<div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<h2 class="mb-6 text-4xl font-extrabold text-gray-900">Pricing Questions & Answers</h2>
			<p class="text-xl text-gray-600">
				Everything you need to know about BottleCRM pricing and support services.
			</p>
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
							Is BottleCRM really completely free?
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
					<div class="px-6 pb-5">
						<p class="leading-relaxed text-gray-700">
							Yes! BottleCRM core software is 100% free with no hidden costs, user limits, or
							subscription fees. You only pay if you want professional setup, customization, or
							ongoing support services.
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
							What's included in the free version?
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
					<div class="px-6 pb-5">
						<p class="leading-relaxed text-gray-700">
							The free version includes all core CRM features: unlimited contacts, sales pipeline,
							task management, reporting, email integration, and mobile access. It's the complete
							software with full source code.
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
							Why do you charge for support if the software is free?
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
					<div class="px-6 pb-5">
						<p class="leading-relaxed text-gray-700">
							The software remains free forever. Support services help businesses save time on
							setup, customization, and training. This sustainable model allows us to maintain and
							improve the free software.
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
							Can I switch from paid support back to free?
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
					<div class="px-6 pb-5">
						<p class="leading-relaxed text-gray-700">
							Absolutely! There are no contracts or ongoing commitments. Support services are
							one-time purchases. You maintain full control over your self-hosted installation.
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
							How much can I save compared to other CRMs?
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
					<div class="px-6 pb-5">
						<p class="leading-relaxed text-gray-700">
							For a 10-person team, you can save $1,800-6,000 per year compared to typical
							enterprise CRM solutions. Enterprise teams often save $10,000-50,000 annually. Actual
							savings depend on your current CRM vendor and plan.
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
							Do you offer refunds for support services?
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
					<div class="px-6 pb-5">
						<p class="leading-relaxed text-gray-700">
							Yes, we offer a 30-day money-back guarantee on all support services. If you're not
							satisfied with the professional setup or customization, we'll refund your payment.
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
		<h2 class="mb-6 text-4xl font-extrabold md:text-5xl">Ready to Save Thousands on CRM?</h2>
		<p class="mx-auto mb-8 max-w-3xl text-xl text-blue-100 md:text-2xl">
			Join the growing community of businesses that ditched expensive CRM subscriptions. Start with
			our free software today, add professional support when you need it.
		</p>

		<div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-x-6 sm:space-y-0">
			<a
				href="https://github.com/MicroPyramid/opensource-startup-crm"
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-lg font-bold text-blue-700 shadow-2xl transition-all duration-200 hover:scale-105 hover:bg-gray-100"
			>
				<Download class="mr-3 h-6 w-6" />
				Download Free CRM
			</a>
			<a
				href="/contact"
				class="inline-flex items-center justify-center rounded-xl border-2 border-white px-8 py-4 text-lg font-bold text-white transition-all duration-200 hover:bg-white/10"
			>
				<MessageCircle class="mr-3 h-6 w-6" />
				Get Professional Support
			</a>
		</div>

		<p class="mt-8 text-blue-200">
			🚀 No credit card required • 30-day money-back guarantee on services
		</p>
	</div>
</section>

<style>
	.slider::-webkit-slider-thumb {
		appearance: none;
		height: 24px;
		width: 24px;
		border-radius: 50%;
		background: #3b82f6;
		cursor: pointer;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
	}

	.slider::-moz-range-thumb {
		height: 24px;
		width: 24px;
		border-radius: 50%;
		background: #3b82f6;
		cursor: pointer;
		border: none;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
	}
</style>
