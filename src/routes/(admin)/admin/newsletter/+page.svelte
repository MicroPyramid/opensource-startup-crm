<script>
  import { onMount } from 'svelte';
  import { Mail, Users, TrendingUp, UserCheck, Calendar } from '@lucide/svelte';
  
  /** @type {{ data: import('./$types').PageData }} */
  let { data } = $props();
  
  // Format date helper
  function formatDate(/** @type {any} */ dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  
  // Get status badge class
  function getStatusClass(/** @type {any} */ isActive, /** @type {any} */ isConfirmed) {
    if (!isActive) return 'bg-red-100 text-red-800';
    if (isConfirmed) return 'bg-green-100 text-green-800';
    return 'bg-yellow-100 text-yellow-800';
  }
  
  // Get status text
  function getStatusText(/** @type {any} */ isActive, /** @type {any} */ isConfirmed) {
    if (!isActive) return 'Unsubscribed';
    if (isConfirmed) return 'Active';
    return 'Pending';
  }
</script>

<svelte:head>
  <title>Newsletter Subscribers - Admin</title>
</svelte:head>

<div class="min-h-screen bg-gray-50 py-8">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Newsletter Management</h1>
      <p class="text-gray-600">Manage and view newsletter subscribers</p>
    </div>
    
    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <Users class="h-8 w-8 text-blue-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Total Subscribers</p>
            <p class="text-2xl font-bold text-gray-900">{data.totalCount}</p>
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <UserCheck class="h-8 w-8 text-green-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Active Subscribers</p>
            <p class="text-2xl font-bold text-gray-900">{data.activeCount}</p>
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <TrendingUp class="h-8 w-8 text-purple-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Active Rate</p>
            <p class="text-2xl font-bold text-gray-900">
              {data.totalCount > 0 ? Math.round((data.activeCount / data.totalCount) * 100) : 0}%
            </p>
          </div>
        </div>
      </div>
    </div>
    
    {#if data.error}
      <div class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <p class="text-red-800">{data.error}</p>
      </div>
    {/if}
    
    <!-- Subscribers Table -->
    <div class="bg-white shadow rounded-lg overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-200">
        <h2 class="text-lg font-medium text-gray-900 flex items-center">
          <Mail class="h-5 w-5 mr-2" />
          Newsletter Subscribers
        </h2>
      </div>
      
      {#if data.subscribers.length === 0}
        <div class="text-center py-12">
          <Mail class="mx-auto h-12 w-12 text-gray-400" />
          <h3 class="mt-2 text-sm font-medium text-gray-900">No subscribers yet</h3>
          <p class="mt-1 text-sm text-gray-500">Get started by promoting your newsletter.</p>
        </div>
      {:else}
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subscribed
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Confirmed
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  IP Address
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              {#each data.subscribers as subscriber}
                <tr class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900">{subscriber.email}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium {getStatusClass(subscriber.isActive, subscriber.isConfirmed)}">
                      {getStatusText(subscriber.isActive, subscriber.isConfirmed)}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div class="flex items-center">
                      <Calendar class="h-4 w-4 mr-1" />
                      {formatDate(subscriber.subscribedAt)}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {#if subscriber.confirmedAt}
                      <div class="flex items-center">
                        <Calendar class="h-4 w-4 mr-1" />
                        {formatDate(subscriber.confirmedAt)}
                      </div>
                    {:else}
                      <span class="text-gray-400">Not confirmed</span>
                    {/if}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {subscriber.ipAddress || 'N/A'}
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      {/if}
    </div>
  </div>
</div>
