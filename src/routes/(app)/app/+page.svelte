<script>
    import { 
        Users, 
        Target, 
        Building, 
        Phone, 
        CheckSquare, 
        DollarSign,
        TrendingUp,
        Calendar,
        Activity,
        AlertCircle,
        Plus
    } from '@lucide/svelte';
    
    export let data;
    
    $: metrics = data.metrics || {};
    $: recentData = data.recentData || {};
    
    function formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    }
    
    function formatDate(date) {
        return new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });
    }
    
    function getStatusColor(status) {
        const colors = {
            'NEW': 'bg-blue-100 text-blue-800',
            'PENDING': 'bg-yellow-100 text-yellow-800',
            'CONTACTED': 'bg-green-100 text-green-800',
            'QUALIFIED': 'bg-purple-100 text-purple-800',
            'High': 'bg-red-100 text-red-800',
            'Normal': 'bg-blue-100 text-blue-800',
            'Low': 'bg-gray-100 text-gray-800'
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    }
</script>

<svelte:head>
    <title>Dashboard - BottleCRM</title>
</svelte:head>

<div class="p-6 space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
            <p class="text-gray-600 dark:text-gray-400">Welcome back! Here's what's happening with your CRM.</p>
        </div>
        
    </div>

    {#if data.error}
        <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-center gap-3">
            <AlertCircle class="text-red-500 dark:text-red-400" size={20} />
            <span class="text-red-700 dark:text-red-300">{data.error}</span>
        </div>
    {:else}
        <!-- Metrics Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Active Leads</p>
                        <p class="text-2xl font-bold text-gray-900 dark:text-white">{metrics.totalLeads}</p>
                    </div>
                    <div class="h-12 w-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                        <Users class="text-blue-600 dark:text-blue-400" size={24} />
                    </div>
                </div>
            </div>

            <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Opportunities</p>
                        <p class="text-2xl font-bold text-gray-900 dark:text-white">{metrics.totalOpportunities}</p>
                    </div>
                    <div class="h-12 w-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                        <Target class="text-green-600 dark:text-green-400" size={24} />
                    </div>
                </div>
            </div>

            <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Accounts</p>
                        <p class="text-2xl font-bold text-gray-900 dark:text-white">{metrics.totalAccounts}</p>
                    </div>
                    <div class="h-12 w-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                        <Building class="text-purple-600 dark:text-purple-400" size={24} />
                    </div>
                </div>
            </div>

            <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Contacts</p>
                        <p class="text-2xl font-bold text-gray-900 dark:text-white">{metrics.totalContacts}</p>
                    </div>
                    <div class="h-12 w-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                        <Phone class="text-orange-600 dark:text-orange-400" size={24} />
                    </div>
                </div>
            </div>

            <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Pending Tasks</p>
                        <p class="text-2xl font-bold text-gray-900 dark:text-white">{metrics.pendingTasks}</p>
                    </div>
                    <div class="h-12 w-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
                        <CheckSquare class="text-yellow-600 dark:text-yellow-400" size={24} />
                    </div>
                </div>
            </div>

            <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Pipeline Value</p>
                        <p class="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(metrics.opportunityRevenue)}</p>
                    </div>
                    <div class="h-12 w-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
                        <DollarSign class="text-emerald-600 dark:text-emerald-400" size={24} />
                    </div>
                </div>
            </div>
        </div>

        <!-- Content Grid -->
        <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <!-- Recent Leads -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                    <div class="flex items-center justify-between">
                        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Recent Leads</h2>
                        <TrendingUp class="text-gray-400 dark:text-gray-500" size={20} />
                    </div>
                </div>
                <div class="p-6">
                    {#if recentData.leads?.length > 0}
                        <div class="space-y-4">
                            {#each recentData.leads as lead}
                                <div class="flex items-center justify-between">
                                    <div>
                                        <p class="font-medium text-gray-900 dark:text-white">{lead.firstName} {lead.lastName}</p>
                                        <p class="text-sm text-gray-500 dark:text-gray-400">{lead.company || 'No company'}</p>
                                    </div>
                                    <div class="text-right">
                                        <span class="inline-block px-2 py-1 text-xs font-medium rounded-full {getStatusColor(lead.status)}">
                                            {lead.status}
                                        </span>
                                        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">{formatDate(lead.createdAt)}</p>
                                    </div>
                                </div>
                            {/each}
                        </div>
                    {:else}
                        <p class="text-gray-500 dark:text-gray-400 text-center py-8">No recent leads</p>
                    {/if}
                </div>
            </div>

            <!-- Recent Opportunities -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                    <div class="flex items-center justify-between">
                        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Recent Opportunities</h2>
                        <Target class="text-gray-400 dark:text-gray-500" size={20} />
                    </div>
                </div>
                <div class="p-6">
                    {#if recentData.opportunities?.length > 0}
                        <div class="space-y-4">
                            {#each recentData.opportunities as opportunity}
                                <div class="flex items-center justify-between">
                                    <div>
                                        <p class="font-medium text-gray-900 dark:text-white">{opportunity.name}</p>
                                        <p class="text-sm text-gray-500 dark:text-gray-400">{opportunity.account?.name || 'No account'}</p>
                                    </div>
                                    <div class="text-right">
                                        {#if opportunity.amount}
                                            <p class="font-medium text-green-600 dark:text-green-400">{formatCurrency(opportunity.amount)}</p>
                                        {/if}
                                        <p class="text-xs text-gray-500 dark:text-gray-400">{formatDate(opportunity.createdAt)}</p>
                                    </div>
                                </div>
                            {/each}
                        </div>
                    {:else}
                        <p class="text-gray-500 dark:text-gray-400 text-center py-8">No recent opportunities</p>
                    {/if}
                </div>
            </div>

            <!-- Upcoming Tasks -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                    <div class="flex items-center justify-between">
                        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Upcoming Tasks</h2>
                        <Calendar class="text-gray-400 dark:text-gray-500" size={20} />
                    </div>
                </div>
                <div class="p-6">
                    {#if recentData.tasks?.length > 0}
                        <div class="space-y-4">
                            {#each recentData.tasks as task}
                                <div class="flex items-center justify-between">
                                    <div>
                                        <p class="font-medium text-gray-900 dark:text-white">{task.subject}</p>
                                        <p class="text-sm text-gray-500 dark:text-gray-400">{task.status}</p>
                                    </div>
                                    <div class="text-right">
                                        <span class="inline-block px-2 py-1 text-xs font-medium rounded-full {getStatusColor(task.priority)}">
                                            {task.priority}
                                        </span>
                                        {#if task.dueDate}
                                            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">{formatDate(task.dueDate)}</p>
                                        {/if}
                                    </div>
                                </div>
                            {/each}
                        </div>
                    {:else}
                        <p class="text-gray-500 dark:text-gray-400 text-center py-8">No upcoming tasks</p>
                    {/if}
                </div>
            </div>
        </div>

        <!-- Recent Activities -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                <div class="flex items-center justify-between">
                    <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Recent Activities</h2>
                    <Activity class="text-gray-400 dark:text-gray-500" size={20} />
                </div>
            </div>
            <div class="p-6">
                {#if recentData.activities?.length > 0}
                    <div class="space-y-4">
                        {#each recentData.activities as activity}
                            <div class="flex items-start gap-3">
                                <div class="h-8 w-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Activity class="text-gray-500 dark:text-gray-400" size={16} />
                                </div>
                                <div class="flex-1 min-w-0">
                                    <p class="text-sm text-gray-900 dark:text-white">
                                        <span class="font-medium">{activity.user?.name || 'Someone'}</span>
                                        {activity.description || `performed ${activity.action.toLowerCase()} on ${activity.entityType}`}
                                    </p>
                                    <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">{formatDate(activity.timestamp)}</p>
                                </div>
                            </div>
                        {/each}
                    </div>
                {:else}
                    <p class="text-gray-500 dark:text-gray-400 text-center py-8">No recent activities</p>
                {/if}
            </div>
        </div>
    {/if}
</div>
