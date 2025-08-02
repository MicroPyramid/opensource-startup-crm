<script>
    import { enhance } from '$app/forms';
    import { page } from '$app/state';
    import { ArrowLeft, User, Mail, Phone, Building, MapPin, FileText, Save } from '@lucide/svelte';
    import { validatePhoneNumber } from '$lib/utils/phone.js';
    
    /** @type {{ data: import('./$types').PageData, form: import('./$types').ActionData }} */
    let { data, form } = $props();
    
    let isSubmitting = $state(false);
    let phoneError = $state('');
    
    // Get accountId from URL parameters
    const accountId = page.url.searchParams.get('accountId');
    
    // Form values with defaults from form data if validation failed
    let formValues = $state({
        firstName: form?.values?.firstName || '',
        lastName: form?.values?.lastName || '',
        email: form?.values?.email || '',
        phone: form?.values?.phone || '',
        title: form?.values?.title || '',
        department: form?.values?.department || '',
        street: form?.values?.street || '',
        city: form?.values?.city || '',
        state: form?.values?.state || '',
        postalCode: form?.values?.postalCode || '',
        country: form?.values?.country || '',
        description: form?.values?.description || '',
        organizationId: form?.values?.organizationId || (data.organizations?.[0]?.id || ''),
        accountId: form?.values?.accountId || accountId || '',
        isPrimary: form?.values?.isPrimary || false,
        role: form?.values?.role || ''
    });
    
    /** @type {Record<string, string>} */
    const errors = $derived(form?.errors || {});
    
    // Find the selected account for display
    const selectedAccount = $derived(
        accountId ? data.accounts?.find(acc => acc.id === accountId) : null
    );
    
    function handleSubmit() {
        isSubmitting = true;
        return async (/** @type {{ update: Function }} */ { update }) => {
            await update();
            isSubmitting = false;
        };
    }
    
    // Validate phone number on input
    function validatePhone() {
        if (!formValues.phone.trim()) {
            phoneError = '';
            return;
        }
        
        const validation = validatePhoneNumber(formValues.phone);
        if (!validation.isValid) {
            phoneError = validation.error || 'Invalid phone number';
        } else {
            phoneError = '';
        }
    }
</script>

<svelte:head>
    <title>New Contact - BottleCRM</title>
</svelte:head>

<div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Header -->
    <div class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4">
                    <a 
                        href={accountId ? `/app/accounts/${accountId}` : "/app/contacts"}
                        class="inline-flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                    >
                        <ArrowLeft class="w-5 h-5 mr-2" />
                        {accountId ? 'Back to Account' : 'Back to Contacts'}
                    </a>
                    <div class="border-l border-gray-300 dark:border-gray-600 pl-4">
                        <h1 class="text-2xl font-semibold text-gray-900 dark:text-white">New Contact</h1>
                        <p class="text-sm text-gray-500 dark:text-gray-400">
                            {#if selectedAccount}
                                Add a new contact to {selectedAccount.name}
                            {:else}
                                Add a new contact to your CRM
                            {/if}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Error Alert -->
        {#if errors.general}
            <div class="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p class="text-red-800 dark:text-red-200">{errors.general}</p>
            </div>
        {/if}

        <!-- Account Selection Alert -->
        {#if selectedAccount}
            <div class="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <div class="flex items-center">
                    <Building class="w-5 h-5 text-blue-500 mr-2" />
                    <p class="text-blue-800 dark:text-blue-200">
                        This contact will be added to <strong>{selectedAccount.name}</strong>
                    </p>
                </div>
            </div>
        {/if}

        <form method="POST" action="?/create" use:enhance={handleSubmit} class="space-y-8">
            <!-- Hidden fields -->
            {#if accountId}
                <input type="hidden" name="accountId" value={accountId} />
            {/if}

            <!-- Basic Information -->
            <div class="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
                <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <div class="flex items-center">
                        <User class="w-5 h-5 text-blue-500 mr-2" />
                        <h2 class="text-lg font-medium text-gray-900 dark:text-white">Basic Information</h2>
                    </div>
                </div>
                <div class="p-6 space-y-6">
                    <!-- Organization Selection (only show if no account is selected) -->
                    {#if !accountId}
                        <div>
                            <label for="organizationId" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Organization
                            </label>
                            <select 
                                id="organizationId" 
                                name="organizationId" 
                                bind:value={formValues.organizationId}
                                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Select an organization</option>
                                {#each data.organizations as org}
                                    <option value={org.id}>{org.name}</option>
                                {/each}
                            </select>
                        </div>
                    {/if}

                    <!-- Account Selection (only show if no accountId in URL) -->
                    {#if !accountId && data.accounts?.length > 0}
                        <div>
                            <label for="accountSelect" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Account (Optional)
                            </label>
                            <select 
                                id="accountSelect" 
                                name="accountId" 
                                bind:value={formValues.accountId}
                                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Select an account (optional)</option>
                                {#each data.accounts as account}
                                    <option value={account.id}>{account.name}</option>
                                {/each}
                            </select>
                        </div>
                    {/if}

                    <!-- Name Fields -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label for="firstName" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                First Name *
                            </label>
                            <input 
                                type="text" 
                                id="firstName" 
                                name="firstName" 
                                bind:value={formValues.firstName}
                                required
                                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 {errors.firstName ? 'border-red-300 dark:border-red-600' : ''}"
                                placeholder="Enter first name"
                            />
                            {#if errors.firstName}
                                <p class="mt-1 text-sm text-red-600 dark:text-red-400">{errors.firstName}</p>
                            {/if}
                        </div>
                        <div>
                            <label for="lastName" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Last Name *
                            </label>
                            <input 
                                type="text" 
                                id="lastName" 
                                name="lastName" 
                                bind:value={formValues.lastName}
                                required
                                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 {errors.lastName ? 'border-red-300 dark:border-red-600' : ''}"
                                placeholder="Enter last name"
                            />
                            {#if errors.lastName}
                                <p class="mt-1 text-sm text-red-600 dark:text-red-400">{errors.lastName}</p>
                            {/if}
                        </div>
                    </div>

                    <!-- Contact Fields -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                <Mail class="w-4 h-4 inline mr-1" />
                                Email
                            </label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                bind:value={formValues.email}
                                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 {errors.email ? 'border-red-300 dark:border-red-600' : ''}"
                                placeholder="contact@example.com"
                            />
                            {#if errors.email}
                                <p class="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
                            {/if}
                        </div>
                        <div>
                            <label for="phone" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                <Phone class="w-4 h-4 inline mr-1" />
                                Phone
                            </label>
                            <input 
                                type="tel" 
                                id="phone" 
                                name="phone" 
                                bind:value={formValues.phone}
                                oninput={validatePhone}
                                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 {errors.phone ? 'border-red-300 dark:border-red-600' : ''}"
                                placeholder="+1 (555) 123-4567"
                            />
                            {#if errors.phone}
                                <p class="mt-1 text-sm text-red-600 dark:text-red-400">{errors.phone}</p>
                            {/if}
                            {#if phoneError}
                                <p class="mt-1 text-sm text-red-600 dark:text-red-400">{phoneError}</p>
                            {/if}
                        </div>
                    </div>
                </div>
            </div>

            <!-- Account Relationship (only show if account is selected) -->
            {#if selectedAccount || formValues.accountId}
                <div class="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
                    <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                        <div class="flex items-center">
                            <Building class="w-5 h-5 text-blue-500 mr-2" />
                            <h2 class="text-lg font-medium text-gray-900 dark:text-white">Account Relationship</h2>
                        </div>
                    </div>
                    <div class="p-6 space-y-6">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label for="role" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Role
                                </label>
                                <input 
                                    type="text" 
                                    id="role" 
                                    name="role" 
                                    bind:value={formValues.role}
                                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="e.g., Decision Maker, Influencer"
                                />
                            </div>
                            <div class="flex items-center pt-8">
                                <input 
                                    type="checkbox" 
                                    id="isPrimary" 
                                    name="isPrimary" 
                                    bind:checked={formValues.isPrimary}
                                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label for="isPrimary" class="ml-2 block text-sm text-gray-900 dark:text-white">
                                    Primary Contact
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            {/if}

            <!-- Professional Information -->
            <div class="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
                <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <div class="flex items-center">
                        <Building class="w-5 h-5 text-blue-500 mr-2" />
                        <h2 class="text-lg font-medium text-gray-900 dark:text-white">Professional Information</h2>
                    </div>
                </div>
                <div class="p-6 space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label for="title" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Job Title
                            </label>
                            <input 
                                type="text" 
                                id="title" 
                                name="title" 
                                bind:value={formValues.title}
                                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="e.g., Sales Manager"
                            />
                        </div>
                        <div>
                            <label for="department" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Department
                            </label>
                            <input 
                                type="text" 
                                id="department" 
                                name="department" 
                                bind:value={formValues.department}
                                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="e.g., Sales"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <!-- Address Information -->
            <div class="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
                <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <div class="flex items-center">
                        <MapPin class="w-5 h-5 text-blue-500 mr-2" />
                        <h2 class="text-lg font-medium text-gray-900 dark:text-white">Address Information</h2>
                    </div>
                </div>
                <div class="p-6 space-y-6">
                    <div>
                        <label for="street" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Street Address
                        </label>
                        <input 
                            type="text" 
                            id="street" 
                            name="street" 
                            bind:value={formValues.street}
                            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="123 Main Street"
                        />
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div>
                            <label for="city" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                City
                            </label>
                            <input 
                                type="text" 
                                id="city" 
                                name="city" 
                                bind:value={formValues.city}
                                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="New York"
                            />
                        </div>
                        <div>
                            <label for="state" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                State/Province
                            </label>
                            <input 
                                type="text" 
                                id="state" 
                                name="state" 
                                bind:value={formValues.state}
                                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="NY"
                            />
                        </div>
                        <div>
                            <label for="postalCode" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Postal Code
                            </label>
                            <input 
                                type="text" 
                                id="postalCode" 
                                name="postalCode" 
                                bind:value={formValues.postalCode}
                                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="10001"
                            />
                        </div>
                        <div>
                            <label for="country" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Country
                            </label>
                            <input 
                                type="text" 
                                id="country" 
                                name="country" 
                                bind:value={formValues.country}
                                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="United States"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <!-- Additional Information -->
            <div class="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
                <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <div class="flex items-center">
                        <FileText class="w-5 h-5 text-blue-500 mr-2" />
                        <h2 class="text-lg font-medium text-gray-900 dark:text-white">Additional Information</h2>
                    </div>
                </div>
                <div class="p-6">
                    <div>
                        <label for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Description
                        </label>
                        <textarea 
                            id="description" 
                            name="description" 
                            bind:value={formValues.description}
                            rows="4"
                            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Add any additional notes or description about this contact..."
                        ></textarea>
                    </div>
                </div>
            </div>

            <!-- Form Actions -->
            <div class="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                <a 
                    href={accountId ? `/app/accounts/${accountId}` : "/app/contacts"}
                    class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                    Cancel
                </a>
                <button 
                    type="submit" 
                    disabled={isSubmitting}
                    class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {#if isSubmitting}
                        <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Creating...
                    {:else}
                        <Save class="w-4 h-4 mr-2" />
                        Create Contact
                    {/if}
                </button>
            </div>
        </form>
    </div>
</div>