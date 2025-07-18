<script>
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import { enhance } from '$app/forms';
    import { 
        Search, 
        Filter, 
        Plus, 
        MoreVertical, 
        Eye, 
        Edit, 
        Trash2, 
        Users, 
        Mail, 
        Phone, 
        Building, 
        Calendar,
        ChevronLeft,
        ChevronRight,
        User
    } from '@lucide/svelte';

    /** @type {{ data: import('./$types').PageData }} */
    let { data } = $props();

    let searchQuery = $state(data.search || '');
    let selectedOwner = $state(data.ownerId || '');
    let showFilters = $state(false);

    // Search functionality
    function handleSearch() {
        const params = new URLSearchParams($page.url.searchParams);
        if (searchQuery) {
            params.set('search', searchQuery);
        } else {
            params.delete('search');
        }
        params.set('page', '1');
        goto(`?${params.toString()}`);
    }

    // Filter functionality
    function applyFilters() {
        const params = new URLSearchParams($page.url.searchParams);
        if (selectedOwner) {
            params.set('owner', selectedOwner);
        } else {
            params.delete('owner');
        }
        params.set('page', '1');
        goto(`?${params.toString()}`);
    }

    function clearFilters() {
        searchQuery = '';
        selectedOwner = '';
        goto('/app/contacts');
    }

    // Pagination
    function goToPage(pageNum) {
        const params = new URLSearchParams($page.url.searchParams);
        params.set('page', pageNum.toString());
        goto(`?${params.toString()}`);
    }

    // Modal functions
    function editContact(contact) {
        goto(`/app/contacts/${contact.id}/edit`);
    }

    function formatDate(dateString) {
        return new Date(dateString).toLocaleDateString();
    }

    function formatPhone(phone) {
        if (!phone) return '';
        // Basic phone formatting - can be enhanced
        return phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    }
</script>

<svelte:head>
    <title>Contacts - BottleCRM</title>
</svelte:head>

<div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Header -->
    <div class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div class="px-4 sm:px-6 lg:px-8 py-6">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div class="flex items-center gap-3">
                    <div class="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                        <Users class="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Contacts</h1>
                        <p class="text-sm text-gray-500 dark:text-gray-400">
                            {data.totalCount} total contacts
                        </p>
                    </div>
                </div>
                <div class="flex items-center gap-3">
                    <button
                        onclick={() => showFilters = !showFilters}
                        class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <Filter class="w-4 h-4" />
                        Filters
                    </button>
                    <a
                        href="/app/contacts/new"
                        class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <Plus class="w-4 h-4" />
                        Add Contact
                    </a>
                </div>
            </div>

            <!-- Search Bar -->
            <div class="mt-6">
                <div class="relative">
                    <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        bind:value={searchQuery}
                        placeholder="Search contacts by name, email, phone, title..."
                        onkeydown={(e) => e.key === 'Enter' && handleSearch()}
                        class="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {#if searchQuery}
                        <button
                            onclick={() => { searchQuery = ''; handleSearch(); }}
                            class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                            ×
                        </button>
                    {/if}
                </div>
            </div>

            <!-- Filters Panel -->
            {#if showFilters}
                <div class="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Owner
                            </label>
                            <select
                                bind:value={selectedOwner}
                                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">All owners</option>
                                {#each data.owners as owner}
                                    <option value={owner.id}>{owner.name || owner.email}</option>
                                {/each}
                            </select>
                        </div>
                    </div>
                    <div class="flex gap-2 mt-4">
                        <button
                            onclick={applyFilters}
                            class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Apply Filters
                        </button>
                        <button
                            onclick={clearFilters}
                            class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Clear
                        </button>
                    </div>
                </div>
            {/if}
        </div>
    </div>

    <!-- Contacts List -->
    <div class="px-4 sm:px-6 lg:px-8 py-6">
        {#if data.contacts.length === 0}
            <div class="text-center py-12">
                <Users class="mx-auto w-12 h-12 text-gray-400" />
                <h3 class="mt-4 text-lg font-medium text-gray-900 dark:text-white">No contacts found</h3>
                <p class="mt-2 text-gray-500 dark:text-gray-400">
                    {data.search ? 'Try adjusting your search criteria.' : 'Get started by creating your first contact.'}
                </p>
                {#if !data.search}
                    <a
                        href="/app/contacts/new"
                        class="mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                    >
                        <Plus class="w-4 h-4" />
                        Add Contact
                    </a>
                {/if}
            </div>
        {:else}
            <!-- Desktop Table View -->
            <div class="hidden lg:block bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead class="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                Contact
                            </th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                Title & Department
                            </th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                Contact Info
                            </th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                Owner
                            </th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                Activity
                            </th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                Created
                            </th>
                            <th class="relative px-6 py-3">
                                <span class="sr-only">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {#each data.contacts as contact}
                            <tr class="hover:bg-gray-50 dark:hover:bg-gray-700">
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex items-center">
                                        <div class="flex-shrink-0 w-10 h-10">
                                            <div class="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                                                <User class="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                            </div>
                                        </div>
                                        <div class="ml-4">
                                            <div class="text-sm font-medium text-gray-900 dark:text-white">
                                                <button 
                                                    onclick={() => goto(`/app/contacts/${contact.id}`)}
                                                    class="hover:text-blue-600 dark:hover:text-blue-400 hover:underline text-left"
                                                >
                                                    {contact.firstName} {contact.lastName}
                                                </button>
                                            </div>
                                            {#if contact.relatedAccounts.length > 0}
                                                <div class="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                                    <Building class="w-3 h-3" />
                                                    {contact.relatedAccounts[0].account.name}
                                                </div>
                                            {/if}
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-gray-900 dark:text-white">{contact.title || '—'}</div>
                                    <div class="text-sm text-gray-500 dark:text-gray-400">{contact.department || '—'}</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    {#if contact.email}
                                        <div class="text-sm text-gray-900 dark:text-white flex items-center gap-1">
                                            <Mail class="w-3 h-3" />
                                            {contact.email}
                                        </div>
                                    {/if}
                                    {#if contact.phone}
                                        <div class="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                            <Phone class="w-3 h-3" />
                                            {formatPhone(contact.phone)}
                                        </div>
                                    {/if}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-gray-900 dark:text-white">
                                        {contact.owner.name || contact.owner.email}
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex gap-2 text-xs">
                                        {#if contact._count.tasks > 0}
                                            <span class="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
                                                {contact._count.tasks} tasks
                                            </span>
                                        {/if}
                                        {#if contact._count.opportunities > 0}
                                            <span class="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded">
                                                {contact._count.opportunities} opps
                                            </span>
                                        {/if}
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                    <div class="flex items-center gap-1">
                                        <Calendar class="w-3 h-3" />
                                        {formatDate(contact.createdAt)}
                                    </div>
                                </td>
                                
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>

            <!-- Mobile Card View -->
            <div class="lg:hidden space-y-4">
                {#each data.contacts as contact}
                    <div class="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                        <div class="flex items-start justify-between">
                            <button 
                                onclick={() => goto(`/app/contacts/${contact.id}`)}
                                class="flex items-center space-x-3 text-left hover:opacity-75"
                            >
                                <div class="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                                    <User class="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                    <h3 class="text-sm font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
                                        {contact.firstName} {contact.lastName}
                                    </h3>
                                    <p class="text-sm text-gray-500 dark:text-gray-400">{contact.title || 'No title'}</p>
                                </div>
                            </button>
                            <button
                                onclick={() => goto(`/app/contacts/${contact.id}`)}
                                class="p-1.5 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                            >
                                <Eye class="w-4 h-4" />
                            </button>
                        </div>
                        
                        <div class="mt-3 space-y-2">
                            {#if contact.email}
                                <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                    <Mail class="w-4 h-4" />
                                    {contact.email}
                                </div>
                            {/if}
                            {#if contact.phone}
                                <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                    <Phone class="w-4 h-4" />
                                    {formatPhone(contact.phone)}
                                </div>
                            {/if}
                            {#if contact.relatedAccounts.length > 0}
                                <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                    <Building class="w-4 h-4" />
                                    {contact.relatedAccounts[0].account.name}
                                </div>
                            {/if}
                        </div>

                        <div class="mt-3 flex justify-between items-center">
                            <div class="flex gap-2">
                                {#if contact._count.tasks > 0}
                                    <span class="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
                                        {contact._count.tasks} tasks
                                    </span>
                                {/if}
                                {#if contact._count.opportunities > 0}
                                    <span class="px-2 py-1 text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded">
                                        {contact._count.opportunities} opps
                                    </span>
                                {/if}
                            </div>
                            <div class="flex gap-2">
                                <button
                                    onclick={() => goto(`/app/contacts/${contact.id}`)}
                                    class="p-1.5 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                                >
                                    <Eye class="w-4 h-4" />
                                </button>
                                <button
                                    onclick={() => editContact(contact)}
                                    class="p-1.5 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"
                                >
                                    <Edit class="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                {/each}
            </div>

            <!-- Pagination -->
            {#if data.totalPages > 1}
                <div class="mt-6 flex items-center justify-between">
                    <div class="text-sm text-gray-700 dark:text-gray-300">
                        Showing {((data.currentPage - 1) * data.limit) + 1} to {Math.min(data.currentPage * data.limit, data.totalCount)} of {data.totalCount} contacts
                    </div>
                    <div class="flex items-center gap-2">
                        <button
                            onclick={() => goToPage(data.currentPage - 1)}
                            disabled={data.currentPage === 1}
                            class="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft class="w-4 h-4" />
                        </button>
                        
                        {#each Array.from({length: Math.min(5, data.totalPages)}, (_, i) => {
                            const start = Math.max(1, data.currentPage - 2);
                            return start + i;
                        }) as pageNum}
                            {#if pageNum <= data.totalPages}
                                <button
                                    onclick={() => goToPage(pageNum)}
                                    class="px-3 py-1 text-sm {pageNum === data.currentPage 
                                        ? 'bg-blue-600 text-white' 
                                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'} rounded"
                                >
                                    {pageNum}
                                </button>
                            {/if}
                        {/each}
                        
                        <button
                            onclick={() => goToPage(data.currentPage + 1)}
                            disabled={data.currentPage === data.totalPages}
                            class="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronRight class="w-4 h-4" />
                        </button>
                    </div>
                </div>
            {/if}
        {/if}
    </div>
</div>