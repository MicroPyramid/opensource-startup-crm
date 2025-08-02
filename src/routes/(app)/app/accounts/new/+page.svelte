<script>
  import { enhance } from '$app/forms';
  import { goto } from '$app/navigation';
  import { fade } from 'svelte/transition';
  
  // Lucide icons
  import { 
    Building, 
    Phone, 
    Globe, 
    MapPin, 
    DollarSign,
    Users,
    Save,
    X,
    CheckCircle,
    AlertCircle,
    Briefcase,
    TrendingUp,
    Hash
  } from '@lucide/svelte';

  /** @type {{ form: import('./$types').ActionData, data: any }} */
  let { form, data } = $props();
  
  // Toast state
  let showToast = $state(false);
  let toastMessage = $state('');
  let toastType = $state('success'); // 'success' | 'error'
  
  /**
   * Object holding the form fields.
   * @type {{
   *   name: string;
   *   type: string;
   *   industry: string;
   *   website: string;
   *   phone: string;
   *   street: string;
   *   city: string;
   *   state: string;
   *   postalCode: string;
   *   country: string;
   *   description: string;
   *   numberOfEmployees: string;
   *   annualRevenue: string;
   *   accountOwnership: string;
   *   tickerSymbol: string;
   *   rating: string;
   *   sicCode: string;
   * }}
   */
  let formData = $state({
    name: '',
    type: '',
    industry: '',
    website: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    description: '',
    numberOfEmployees: '',
    annualRevenue: '',
    accountOwnership: '',
    tickerSymbol: '',
    rating: '',
    sicCode: ''
  });

  /**
   * Object to store field errors.
   * @type {Record<string, string>}
   */
  let errors = $state({});
  
  /**
   * Handles changes to form inputs
   * @param {Event} event
   */
  function handleChange(event) {
    const target = /** @type {HTMLInputElement} */ (event.target);
    const { name, value } = target;
    formData[/** @type {keyof typeof formData} */ (name)] = value;
    // Clear error when user starts typing
    if (errors[name]) {
      errors[name] = '';
    }
  }
  
  /**
   * Validates the form before submission.
   */
  function validateForm() {
    errors = {};
    let isValid = true;
    
    // Required fields
    if (!formData.name?.trim()) {
      errors.name = 'Account name is required';
      isValid = false;
    }
    
    // Validate website URL if provided
    if (formData.website && !/^https?:\/\/.+/.test(formData.website)) {
      errors.website = 'Please enter a valid website URL (include http:// or https://)';
      isValid = false;
    }
    
    // Validate phone format if provided
    if (formData.phone && !/^[\d\s\-+()]*$/.test(formData.phone)) {
      errors.phone = 'Please enter a valid phone number';
      isValid = false;
    }
    
    // Validate number of employees if provided
    if (formData.numberOfEmployees && (isNaN(Number(formData.numberOfEmployees)) || Number(formData.numberOfEmployees) < 0)) {
      errors.numberOfEmployees = 'Please enter a valid number of employees';
      isValid = false;
    }
    
    // Validate annual revenue if provided
    if (formData.annualRevenue && (isNaN(Number(formData.annualRevenue)) || Number(formData.annualRevenue) < 0)) {
      errors.annualRevenue = 'Please enter a valid annual revenue amount';
      isValid = false;
    }
    
    return isValid;
  }

  // Submitting indicator
  let isSubmitting = $state(false);
  
  /**
   * Resets the form to its initial state
   */
  function resetForm() {
    formData = {
      name: '',
      type: '',
      industry: '',
      website: '',
      phone: '',
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
      description: '',
      numberOfEmployees: '',
      annualRevenue: '',
      accountOwnership: '',
      tickerSymbol: '',
      rating: '',
      sicCode: ''
    };
    errors = {};
  }

  /**
   * @param {string} message
   * @param {string} type
   */
  function showNotification(message, type = 'success') {
    toastMessage = message;
    toastType = type;
    showToast = true;
    setTimeout(() => showToast = false, 5000);
  }
</script>

<!-- Main container -->
<div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
  <!-- Toast notification -->
  {#if showToast}
    <div class="fixed top-4 right-4 z-50" in:fade>
      <div class="flex items-center p-4 rounded-lg shadow-lg {toastType === 'success' ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'}">
        <div class="flex-shrink-0">
          {#if toastType === 'success'}
            <CheckCircle class="w-5 h-5 text-green-400 dark:text-green-400" />
          {:else}
            <AlertCircle class="w-5 h-5 text-red-400 dark:text-red-400" />
          {/if}
        </div>
        <div class="ml-3">
          <p class="text-sm font-medium {toastType === 'success' ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'}">{toastMessage}</p>
        </div>
        <button 
          onclick={() => showToast = false}
          class="ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 {toastType === 'success' ? 'text-green-500 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-800/30' : 'text-red-500 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-800/30'}">
          <X class="w-4 h-4" />
        </button>
      </div>
    </div>
  {/if}

  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Header -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
      <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Building class="w-6 h-6 text-blue-600 dark:text-blue-400" />
              Create New Account
            </h1>
            <p class="text-gray-600 dark:text-gray-300 mt-1">Add a new company or organization to your CRM</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Show error if returned from server -->
    {#if form?.error}
      <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
        <div class="flex items-center">
          <AlertCircle class="w-5 h-5 text-red-400 dark:text-red-400 mr-2" />
          <span class="font-medium text-red-800 dark:text-red-200">Error:</span>
          <span class="ml-1 text-red-700 dark:text-red-300">{form.error}</span>
        </div>
      </div>
    {/if}

    <!-- Main Form -->
    <form method="POST" use:enhance={({ cancel }) => {
      if (!validateForm()) {
        cancel();
        return;
      }
      
      isSubmitting = true;
      
      return async ({ result }) => {
        isSubmitting = false;
        
        if (result.type === 'success') {
          showNotification('Account created successfully!', 'success');
          resetForm();
          setTimeout(() => goto('/app/accounts'), 1500);
        } else if (result.type === 'failure') {
          const errorMessage = (result.data && typeof result.data === 'object' && 'error' in result.data && typeof result.data.error === 'string') 
            ? result.data.error 
            : 'Failed to create account';
          showNotification(errorMessage, 'error');
        }
      };
    }} class="space-y-6">

      <!-- Basic Information Section -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <Briefcase class="w-5 h-5 text-blue-600 dark:text-blue-400" />
            Basic Information
          </h2>
        </div>
        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Account Name -->
            <div class="md:col-span-2">
              <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Account Name *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                bind:value={formData.name}
                oninput={handleChange}
                placeholder="Enter account name"
                required
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 transition-colors {errors.name ? 'border-red-500 dark:border-red-400 ring-1 ring-red-500 dark:ring-red-400' : ''}" />
              {#if errors.name}
                <p class="text-red-500 dark:text-red-400 text-sm mt-1">{errors.name}</p>
              {/if}
            </div>
            
            <!-- Account Type -->
            <div>
              <label for="type" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Account Type
              </label>
              <select 
                id="type" 
                name="type" 
                bind:value={formData.type} 
                onchange={handleChange}
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 transition-colors">
                {#each data.data.accountTypes as [value, label] (value)}
                  <option value={value}>{label}</option>
                {/each}
              </select>
            </div>

            <!-- Industry -->
            <div>
              <label for="industry" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Industry
              </label>
              <select 
                id="industry" 
                name="industry" 
                bind:value={formData.industry} 
                onchange={handleChange}
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 transition-colors">
                {#each data.data.industries as [value, label] (value)}
                  <option value={value}>{label}</option>
                {/each}
              </select>
            </div>
            
            <!-- Rating -->
            <div>
              <label for="rating" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Rating
              </label>
              <select 
                id="rating" 
                name="rating" 
                bind:value={formData.rating} 
                onchange={handleChange}
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 transition-colors">
                {#each data.data.ratings as [value, label] (value)}
                  <option value={value}>{label}</option>
                {/each}
              </select>
            </div>
            
            <!-- Account Ownership -->
            <div>
              <label for="accountOwnership" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Ownership
              </label>
              <select 
                id="accountOwnership" 
                name="accountOwnership" 
                bind:value={formData.accountOwnership} 
                onchange={handleChange}
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 transition-colors">
                {#each data.data.accountOwnership as [value, label] (value)}
                  <option value={value}>{label}</option>
                {/each}
              </select>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Contact Information Section -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <Phone class="w-5 h-5 text-blue-600 dark:text-blue-400" />
            Contact Information
          </h2>
        </div>
        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Website -->
            <div>
              <label for="website" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Globe class="w-4 h-4 inline mr-1" />
                Website
              </label>
              <input
                id="website"
                name="website"
                type="url"
                bind:value={formData.website}
                oninput={handleChange}
                placeholder="https://company.com"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 transition-colors {errors.website ? 'border-red-500 dark:border-red-400 ring-1 ring-red-500 dark:ring-red-400' : ''}" />
              {#if errors.website}
                <p class="text-red-500 dark:text-red-400 text-sm mt-1">{errors.website}</p>
              {/if}
            </div>
            
            <!-- Phone Number -->
            <div>
              <label for="phone" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Phone class="w-4 h-4 inline mr-1" />
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                bind:value={formData.phone}
                oninput={handleChange}
                placeholder="+1 (555) 123-4567"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 transition-colors {errors.phone ? 'border-red-500 dark:border-red-400 ring-1 ring-red-500 dark:ring-red-400' : ''}" />
              {#if errors.phone}
                <p class="text-red-500 dark:text-red-400 text-sm mt-1">{errors.phone}</p>
              {/if}
            </div>
          </div>
        </div>
      </div>
      
      <!-- Address Section -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <MapPin class="w-5 h-5 text-blue-600 dark:text-blue-400" />
            Address Information
          </h2>
        </div>
        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Street Address -->
            <div class="md:col-span-2">
              <label for="street" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Street Address
              </label>
              <input
                id="street"
                name="street"
                type="text"
                bind:value={formData.street}
                oninput={handleChange}
                placeholder="Street address"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 transition-colors" />
            </div>
            
            <div>
              <label for="city" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">City</label>
              <input
                id="city"
                name="city"
                type="text"
                bind:value={formData.city}
                oninput={handleChange}
                placeholder="City"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 transition-colors" />
            </div>
            
            <div>
              <label for="state" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">State</label>
              <input
                id="state"
                name="state"
                type="text"
                bind:value={formData.state}
                oninput={handleChange}
                placeholder="State"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 transition-colors" />
            </div>
            
            <div>
              <label for="postalCode" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Postal Code</label>
              <input
                id="postalCode"
                name="postalCode"
                type="text"
                bind:value={formData.postalCode}
                oninput={handleChange}
                placeholder="Postal code"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 transition-colors" />
            </div>
            
            <div>
              <label for="country" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Country</label>
              <select 
                id="country" 
                name="country" 
                bind:value={formData.country} 
                onchange={handleChange}
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 transition-colors">
                {#each data.data.countries as [value, label] (value)}
                  <option value={value}>{label}</option>
                {/each}
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- Company Details Section -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <TrendingUp class="w-5 h-5 text-blue-600 dark:text-blue-400" />
            Company Details
          </h2>
        </div>
        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Number of Employees -->
            <div>
              <label for="numberOfEmployees" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Users class="w-4 h-4 inline mr-1" />
                Number of Employees
              </label>
              <input
                id="numberOfEmployees"
                name="numberOfEmployees"
                type="number"
                min="0"
                bind:value={formData.numberOfEmployees}
                oninput={handleChange}
                placeholder="100"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 transition-colors {errors.numberOfEmployees ? 'border-red-500 dark:border-red-400 ring-1 ring-red-500 dark:ring-red-400' : ''}" />
              {#if errors.numberOfEmployees}
                <p class="text-red-500 dark:text-red-400 text-sm mt-1">{errors.numberOfEmployees}</p>
              {/if}
            </div>
            
            <!-- Annual Revenue -->
            <div>
              <label for="annualRevenue" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <DollarSign class="w-4 h-4 inline mr-1" />
                Annual Revenue
              </label>
              <input
                id="annualRevenue"
                name="annualRevenue"
                type="number"
                min="0"
                step="0.01"
                bind:value={formData.annualRevenue}
                oninput={handleChange}
                placeholder="1000000"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 transition-colors {errors.annualRevenue ? 'border-red-500 dark:border-red-400 ring-1 ring-red-500 dark:ring-red-400' : ''}" />
              {#if errors.annualRevenue}
                <p class="text-red-500 dark:text-red-400 text-sm mt-1">{errors.annualRevenue}</p>
              {/if}
            </div>
            
            <!-- Ticker Symbol -->
            <div>
              <label for="tickerSymbol" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Hash class="w-4 h-4 inline mr-1" />
                Ticker Symbol
              </label>
              <input
                id="tickerSymbol"
                name="tickerSymbol"
                type="text"
                bind:value={formData.tickerSymbol}
                oninput={handleChange}
                placeholder="AAPL"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 transition-colors" />
            </div>
            
            <!-- SIC Code -->
            <div>
              <label for="sicCode" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                SIC Code
              </label>
              <input
                id="sicCode"
                name="sicCode"
                type="text"
                bind:value={formData.sicCode}
                oninput={handleChange}
                placeholder="7372"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 transition-colors" />
            </div>
          </div>
        </div>
      </div>
        
      <!-- Additional Details Section -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Additional Details</h2>
        </div>
        <div class="p-6">
          <!-- Description -->
          <div>
            <label for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              bind:value={formData.description}
              oninput={handleChange}
              placeholder="Additional notes about this account..."
              rows="4"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 transition-colors resize-vertical"></textarea>
          </div>
        </div>
      </div>

      <!-- Submit Button -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div class="px-6 py-4">
          <div class="flex justify-end gap-4">
            <button
              type="button"
              onclick={() => goto('/app/accounts')}
              disabled={isSubmitting}
              class="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
              <X class="w-4 h-4" />
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              class="px-6 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
              {#if isSubmitting}
                <div class="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                Creating...
              {:else}
                <Save class="w-4 h-4" />
                Create Account
              {/if}
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</div>