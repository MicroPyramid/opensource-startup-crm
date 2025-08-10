<script lang="ts">
	import '../../../app.css';
	import { fade, fly } from 'svelte/transition';

	import imgGoogle from '$lib/assets/images/google.svg';
	import imgLogo from '$lib/assets/images/logo.png';
	import {
		Users,
		BarChart3,
		CheckSquare,
		TrendingUp,
		Zap,
		Check,
		Shield,
		Github,
		Star
	} from '@lucide/svelte';
	import { authClient } from '$lib/auth-client';
	import { goto, invalidateAll } from '$app/navigation';
	let { data } = $props();

	let mounted = $state(false);
	let isLoading = $state(false);
	let email = $state('');
	let password = $state('');

	const features = [
		{ icon: Users, text: 'Unlimited Contacts' },
		{ icon: BarChart3, text: 'Sales Pipeline' },
		{ icon: CheckSquare, text: 'Task Management' },
		{ icon: TrendingUp, text: 'Analytics & Reports' }
	];

	const benefits = [
		'100% Free Forever',
		'No Credit Card Required',
		'Complete Data Ownership',
		'Self-Hostable Solution'
	];

	$effect(() => {
		mounted = true;
	});

	function handleGoogleLogin() {
		isLoading = true;
		// The actual navigation will happen via the href
		setTimeout(() => {
			isLoading = false;
		}, 3000);
	}

	let errorMsg = $state<string | null>(null);
	let isEmailLoading = $state(false);

	async function handleEmailLogin() {
		if (!email || !password) return;
		isEmailLoading = true;
		errorMsg = null;
		try {
			const result = await authClient.signIn.email({ email, password, callbackURL: '/app' });
			if (result?.error) {
				errorMsg = typeof result.error.message === 'string' ? result.error.message : 'Login failed';
				return;
			}
			await invalidateAll();
			await goto('/app', { invalidateAll: true, replaceState: true });
		} catch (e) {
			errorMsg = 'Login failed';
		} finally {
			isEmailLoading = false;
		}
	}

	async function handleEmailSignup() {
		if (!email || !password) return;
		isEmailLoading = true;
		errorMsg = null;
		try {
			const name = email.split('@')[0] ?? undefined;
			const result = await authClient.signUp.email({ email, password, name, callbackURL: '/app' });
			if (result?.error) {
				errorMsg =
					typeof result.error.message === 'string' ? result.error.message : 'Signup failed';
				return;
			}
			await invalidateAll();
			await goto('/app', { invalidateAll: true, replaceState: true });
		} catch (e) {
			errorMsg = 'Signup failed';
		} finally {
			isEmailLoading = false;
		}
	}
</script>

<svelte:head>
	<title>Login | BottleCRM - Free Open-Source CRM for Startups</title>
	<meta
		name="description"
		content="Sign in to BottleCRM - the completely free, open-source CRM solution for startups and small businesses. No subscription fees, unlimited users."
	/>
</svelte:head>

<!-- Main Container with Gradient Background -->
<div
	class="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800"
>
	<!-- Animated Background Elements -->
	<div class="absolute inset-0 bg-black/10"></div>
	<div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>

	<!-- Floating Background Shapes -->
	<div
		class="absolute left-10 top-10 h-72 w-72 animate-pulse rounded-full bg-white/5 blur-3xl"
	></div>
	<div
		class="absolute bottom-10 right-10 h-96 w-96 animate-pulse rounded-full bg-blue-400/10 blur-3xl"
		style="animation-delay: 1s;"
	></div>

	<div class="relative z-10 flex min-h-screen items-center justify-center p-4">
		<div class="mx-auto w-full max-w-6xl">
			<div class="grid items-center gap-12 lg:grid-cols-2">
				<!-- Left Side - Branding & Features -->
				<div class="hidden text-white lg:block">
					{#if mounted}
						<div in:fly={{ x: -50, duration: 800, delay: 200 }}>
							<div class="mb-8">
								<div
									class="mb-6 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm"
								>
									<Star class="mr-2 h-4 w-4" />
									<span class="text-sm font-medium">Free & Open Source CRM</span>
								</div>

								<h1 class="mb-6 text-4xl font-extrabold leading-tight xl:text-5xl">
									Welcome to <span class="text-yellow-300">BottleCRM</span>
								</h1>

								<p class="mb-8 text-xl leading-relaxed text-blue-100">
									The completely free, self-hostable CRM solution built specifically for startups
									and growing businesses.
								</p>
							</div>

							<!-- Key Benefits -->
							<div class="mb-8">
								<h3 class="mb-4 text-lg font-semibold">Why Choose BottleCRM?</h3>
								<ul class="space-y-3">
									{#each benefits as benefit, i}
										<li
											class="flex items-center"
											in:fly={{ x: -30, duration: 600, delay: 400 + i * 100 }}
										>
											<Check class="mr-3 h-5 w-5 flex-shrink-0 text-green-400" />
											<span>{benefit}</span>
										</li>
									{/each}
								</ul>
							</div>

							<!-- Feature Icons -->
							<div class="grid grid-cols-2 gap-4">
								{#each features as feature, i}
									{@const FeatureIcon = feature.icon}
									<div
										class="flex items-center rounded-xl border border-white/20 bg-white/10 p-3 backdrop-blur-sm"
										in:fly={{ y: 30, duration: 600, delay: 600 + i * 100 }}
									>
										<div class="mr-3 rounded-lg bg-white/20 p-2">
											<FeatureIcon class="h-5 w-5" />
										</div>
										<span class="text-sm font-medium">{feature.text}</span>
									</div>
								{/each}
							</div>

							<!-- Stats -->
							<div class="mt-8 border-t border-white/20 pt-8">
								<div class="grid grid-cols-3 gap-4 text-center">
									<div>
										<div class="text-2xl font-bold text-yellow-300">100%</div>
										<div class="text-sm text-blue-200">Free</div>
									</div>
									<div>
										<div class="text-2xl font-bold text-yellow-300">∞</div>
										<div class="text-sm text-blue-200">Users</div>
									</div>
									<div>
										<div class="text-2xl font-bold text-yellow-300">MIT</div>
										<div class="text-sm text-blue-200">License</div>
									</div>
								</div>
							</div>
						</div>
					{/if}
				</div>

				<!-- Right Side - Login Form -->
				<div class="flex justify-center lg:justify-end">
					{#if mounted}
						<div class="w-full max-w-md" in:fly={{ y: 50, duration: 800, delay: 100 }}>
							<!-- Login Card -->
							<div
								class="relative overflow-hidden rounded-3xl border border-white/20 bg-white/95 p-8 shadow-2xl backdrop-blur-lg"
							>
								<!-- Card Background Pattern -->
								<div class="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-white/50"></div>

								<!-- Card Content -->
								<div class="relative z-10">
									<!-- Logo and Header -->
									<div class="mb-8 text-center">
										<div class="mb-6" in:fade={{ duration: 600, delay: 300 }}>
											<img src={imgLogo} alt="BottleCRM Logo" class="mx-auto h-16 w-auto" />
										</div>

										<div in:fade={{ duration: 600, delay: 400 }}>
											<h2 class="mb-2 text-2xl font-bold text-gray-900">Welcome Back</h2>
											<p class="text-sm leading-relaxed text-gray-600">
												Sign in to your free BottleCRM account and start managing your customer
												relationships more effectively.
											</p>
										</div>
									</div>

									<!-- Benefits List for Mobile -->
									<div class="mb-6 lg:hidden" in:fade={{ duration: 600, delay: 500 }}>
										<div class="rounded-xl border border-blue-100 bg-blue-50 p-4">
											<div class="mb-3 flex items-center">
												<Zap class="mr-2 h-5 w-5 text-blue-600" />
												<span class="text-sm font-semibold text-blue-900">Free CRM Features</span>
											</div>
											<ul class="space-y-2 text-xs text-blue-700">
												<li class="flex items-center">
													<Check class="mr-2 h-3 w-3 flex-shrink-0" />
													<span>Unlimited contacts & users</span>
												</li>
												<li class="flex items-center">
													<Check class="mr-2 h-3 w-3 flex-shrink-0" />
													<span>Self-hosted solution</span>
												</li>
												<li class="flex items-center">
													<Check class="mr-2 h-3 w-3 flex-shrink-0" />
													<span>No subscription fees</span>
												</li>
											</ul>
										</div>
									</div>

									<!-- Auth Heading -->
									<div class="mb-4 text-center" in:fade={{ duration: 600, delay: 550 }}>
										<p class="text-sm text-gray-500">Sign in with Google or use your email</p>
									</div>

									<!-- Google Sign In Button -->
									<div in:fade={{ duration: 600, delay: 600 }}>
										<a
											href={'/api/auth/social/google?callbackURL=/app'}
											onclick={() => handleGoogleLogin()}
											class="group relative flex w-full transform items-center justify-center gap-3 overflow-hidden rounded-xl border-2 border-gray-200 bg-white px-6 py-4 font-semibold text-gray-800 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-200"
										>
											<div
												class="absolute inset-0 translate-x-[-100%] transform bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 transition-transform duration-1000 group-hover:translate-x-[100%]"
											></div>
											{#if isLoading}
												<div
													class="h-5 w-5 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"
												></div>
											{:else}
												<img
													src={imgGoogle}
													alt="Google"
													class="h-5 w-5 transition-transform duration-200 group-hover:scale-110"
												/>
											{/if}
											<span class="relative z-10"
												>{isLoading ? 'Connecting...' : 'Continue with Google'}</span
											>
										</a>
									</div>

									<!-- Divider -->
									<div class="my-4 flex items-center">
										<div class="h-px flex-1 bg-gray-200"></div>
										<span class="px-3 text-xs uppercase text-gray-400">or</span>
										<div class="h-px flex-1 bg-gray-200"></div>
									</div>

									<!-- Email/Password Form (client-side with authClient) -->
									<div class="space-y-3" in:fade={{ duration: 600, delay: 650 }}>
										{#if errorMsg}
											<div class="rounded-md bg-red-50 p-3 text-sm text-red-700">{errorMsg}</div>
										{/if}
										<input
											class="w-full rounded-md border px-3 py-2 text-sm"
											type="email"
											placeholder="Email"
											bind:value={email}
										/>
										<input
											class="w-full rounded-md border px-3 py-2 text-sm"
											type="password"
											placeholder="Password"
											bind:value={password}
										/>
										<div class="flex gap-2">
											<button
												class="flex-1 rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
												onclick={handleEmailLogin}
												disabled={isEmailLoading || !email || !password}
											>
												{isEmailLoading ? 'Signing in...' : 'Sign In'}
											</button>
											<button
												class="flex-1 rounded-md border border-blue-600 px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50 disabled:opacity-50"
												onclick={handleEmailSignup}
												disabled={isEmailLoading || !email || !password}
											>
												{isEmailLoading ? 'Signing up...' : 'Sign Up'}
											</button>
										</div>
									</div>

									<!-- Security Notice -->
									<div class="mt-6 text-center" in:fade={{ duration: 600, delay: 700 }}>
										<div class="mb-3 flex items-center justify-center text-xs text-gray-500">
											<Shield class="mr-1 h-4 w-4" />
											<span>Your data is secure and private</span>
										</div>

										<!-- Footer Links -->
										<div class="flex items-center justify-center space-x-4 text-xs">
											<a
												href="https://github.com/MicroPyramid/opensource-startup-crm"
												target="_blank"
												rel="noopener noreferrer"
												class="flex items-center text-gray-600 transition-colors duration-200 hover:text-blue-600"
											>
												<Github class="mr-1 h-3 w-3" />
												<span>Open Source</span>
											</a>
											<span class="text-gray-300">•</span>
											<a
												href="/features"
												class="text-gray-600 transition-colors duration-200 hover:text-blue-600"
											>
												Features
											</a>
											<span class="text-gray-300">•</span>
											<a
												href="/contact"
												class="text-gray-600 transition-colors duration-200 hover:text-blue-600"
											>
												Support
											</a>
										</div>
									</div>
								</div>
							</div>

							<!-- Below Card Notice -->
							<div class="mt-6 text-center" in:fade={{ duration: 600, delay: 800 }}>
								<p class="text-sm text-blue-100">
									New to BottleCRM?
									<a
										href="/"
										class="font-medium text-yellow-300 underline transition-colors duration-200 hover:text-yellow-200"
									>
										Learn more about our free CRM
									</a>
								</p>
							</div>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	@keyframes pulse {
		0%,
		100% {
			transform: scale(1);
			opacity: 0.5;
		}
		50% {
			transform: scale(1.05);
			opacity: 0.8;
		}
	}

	.animate-pulse {
		animation: pulse 4s ease-in-out infinite;
	}
</style>
