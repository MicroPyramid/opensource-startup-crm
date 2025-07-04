<script>
	import '../../../../app.css';
	import { 
		Building2, 
		Globe, 
		Users, 
		User, 
		Shield, 
		Briefcase, 
		Edit, 
		LogOut,
		Plus,
		Check,
		X,
		Trash2,
		Headphones
	} from '@lucide/svelte';

	export let data;
	let org = data.organization;
	let editing = false;
	let formOrg = { name: org.name, domain: org.domain || '', description: org.description || '' };
	
	function startEdit() {
		formOrg = { name: org.name, domain: org.domain || '', description: org.description || '' };
		editing = true;
	}
	
	function cancelEdit() {
		editing = false;
	}

	// Get logged-in user id from data (must be provided by server load)
	let loggedInUserId = data.user?.id;
	let users = Array.isArray(data.users)
		? data.users.map((u) => ({
				id: u.user.id,
				name: u.user.name || u.user.email,
				email: u.user.email,
				role: u.role,
				joined: u.joinedAt
					? typeof u.joinedAt === 'string'
						? u.joinedAt.slice(0, 10)
						: new Date(u.joinedAt).toISOString().slice(0, 10)
					: '',
				avatar: u.user.profilePhoto || '',
				isSelf: loggedInUserId === u.user.id,
				editingRole: false
			}))
		: [];

	// Map roles to icons (cover all UserRole enum values)
	const roleIcons = {
		ADMIN: Shield,
		USER: User,
		SALES_REP: Briefcase,
		SUPPORT_REP: Headphones,
		READ_ONLY: User
	};

	const roleColors = {
		ADMIN: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800',
		USER: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800',
		SALES_REP: 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800',
		SUPPORT_REP: 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800',
		READ_ONLY: 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600'
	};
</script>

<div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
	<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
		<!-- Header with Logout -->
		<div class="mb-8 flex items-center justify-between">
			<div>
				<h1 class="text-3xl font-bold text-gray-900 dark:text-white">Organization Settings</h1>
				<p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Manage your organization and team members</p>
			</div>
			<a 
				href="/logout" 
				class="inline-flex items-center gap-2 rounded-lg bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm ring-1 ring-gray-200 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-red-600 dark:hover:text-red-400 transition-colors"
			>
				<LogOut class="h-4 w-4" />
				Logout
			</a>
		</div>

		<!-- Organization Details Card -->
		<div class="mb-8 overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-sm ring-1 ring-gray-200 dark:ring-gray-700">
			<div class="px-6 py-5">
				<div class="flex items-start justify-between">
					<div class="flex items-center gap-3">
						<div class="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
							<Building2 class="h-6 w-6 text-blue-600 dark:text-blue-400" />
						</div>
						<div>
							<h2 class="text-xl font-semibold text-gray-900 dark:text-white">{org.name}</h2>
							<div class="mt-1 flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
								{#if org.domain}
									<span class="flex items-center gap-1">
										<Globe class="h-4 w-4" />
										{org.domain}
									</span>
								{/if}
								<span class="flex items-center gap-1">
									<Users class="h-4 w-4" />
									{users.length} member{users.length !== 1 ? 's' : ''}
								</span>
							</div>
						</div>
					</div>
					{#if !editing}
						<button
							type="button"
							class="rounded-lg p-2 text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-600 dark:hover:text-gray-300"
							onclick={startEdit}
							aria-label="Edit organization"
						>
							<Edit class="h-5 w-5" />
						</button>
					{/if}
				</div>

				{#if org.description && !editing}
					<p class="mt-4 text-gray-600 dark:text-gray-300">{org.description}</p>
				{/if}

				{#if editing}
					<form method="POST" action="?/update" class="mt-6 space-y-6">
						<div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
							<div>
								<label for="org-name" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
									Organization Name <span class="text-red-500">*</span>
								</label>
								<div class="relative">
									<input
										id="org-name"
										name="name"
										type="text"
										bind:value={formOrg.name}
										required
										class="block w-full rounded-xl border-0 bg-white dark:bg-gray-700 py-3 pl-11 pr-4 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:focus:ring-blue-500 hover:ring-gray-400 dark:hover:ring-gray-500 transition-all duration-200 sm:text-sm sm:leading-6"
										placeholder="Enter organization name"
									/>
									<Building2 class="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
								</div>
							</div>

							<div>
								<label for="org-domain" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
									Domain
								</label>
								<div class="relative">
									<input
										id="org-domain"
										name="domain"
										type="text"
										bind:value={formOrg.domain}
										placeholder="yourcompany.com"
										class="block w-full rounded-xl border-0 bg-white dark:bg-gray-700 py-3 pl-11 pr-4 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:focus:ring-blue-500 hover:ring-gray-400 dark:hover:ring-gray-500 transition-all duration-200 sm:text-sm sm:leading-6"
									/>
									<Globe class="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
								</div>
							</div>
						</div>

						<div>
							<label for="org-description" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
								Description
							</label>
							<textarea
								id="org-description"
								name="description"
								rows="4"
								bind:value={formOrg.description}
								class="block w-full rounded-xl border-0 bg-white dark:bg-gray-700 py-3 px-4 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:focus:ring-blue-500 hover:ring-gray-400 dark:hover:ring-gray-500 transition-all duration-200 sm:text-sm sm:leading-6 resize-none"
								placeholder="Describe your organization..."
							></textarea>
						</div>

						<div class="flex justify-end gap-3 pt-2">
							<button
								type="button"
								class="inline-flex items-center gap-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-6 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-300 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200"
								onclick={cancelEdit}
							>
								<X class="h-4 w-4" />
								Cancel
							</button>
							<button 
								type="submit" 
								class="inline-flex items-center gap-2 rounded-xl bg-blue-600 dark:bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 dark:hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:focus-visible:outline-blue-500 transition-all duration-200"
							>
								<Check class="h-4 w-4" />
								Save Changes
							</button>
						</div>
					</form>
				{/if}
			</div>
		</div>

		<!-- Users Management Card -->
		<div class="overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-sm ring-1 ring-gray-200 dark:ring-gray-700">
			<div class="px-6 py-5">
				<div class="flex items-center justify-between">
					<div class="flex items-center gap-3">
						<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
							<Users class="h-5 w-5 text-green-600 dark:text-green-400" />
						</div>
						<h3 class="text-lg font-semibold text-gray-900 dark:text-white">Team Members</h3>
					</div>
				</div>

				<!-- Add User Form -->
				<div class="mt-6 rounded-xl bg-gray-50 dark:bg-gray-700/50 p-6 border border-gray-100 dark:border-gray-600/50">
					<h4 class="text-sm font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
						<Plus class="h-4 w-4" />
						Add New Member
					</h4>
					<form method="POST" action="?/add_user" class="flex flex-col gap-4 sm:flex-row sm:items-end">
						<div class="flex-1">
							<label for="add-user-email" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
								Email Address <span class="text-red-500">*</span>
							</label>
							<input 
								id="add-user-email" 
								name="email" 
								type="email" 
								required 
								class="block w-full rounded-xl border-0 bg-white dark:bg-gray-800 py-3 px-4 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:focus:ring-blue-500 hover:ring-gray-400 dark:hover:ring-gray-500 transition-all duration-200 sm:text-sm sm:leading-6" 
								placeholder="user@example.com" 
							/>
						</div>
						<div class="sm:w-40">
							<label for="add-user-role" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
								Role
							</label>
							<select 
								id="add-user-role" 
								name="role" 
								class="block w-full rounded-xl border-0 bg-white dark:bg-gray-800 py-3 px-4 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:focus:ring-blue-500 hover:ring-gray-400 dark:hover:ring-gray-500 transition-all duration-200 sm:text-sm sm:leading-6"
							>
								<option value="USER">User</option>
								<option value="ADMIN">Admin</option>
							</select>
						</div>
						<button 
							type="submit" 
							class="inline-flex items-center gap-2 rounded-xl bg-blue-600 dark:bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 dark:hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:focus-visible:outline-blue-500 transition-all duration-200"
						>
							<Plus class="h-4 w-4" />
							Add Member
						</button>
					</form>
				</div>

				<!-- Users Table -->
				<div class="mt-8 overflow-hidden">
					<div class="overflow-x-auto">
						<table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
							<thead class="bg-gray-50 dark:bg-gray-700/50">
								<tr>
									<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
										Member
									</th>
									<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
										Role
									</th>
									<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
										Joined
									</th>
									<th class="relative px-6 py-3">
										<span class="sr-only">Actions</span>
									</th>
								</tr>
							</thead>
							<tbody class="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
								{#each users as user, i}
									<tr class="hover:bg-gray-50 dark:hover:bg-gray-700/50">
										<td class="px-6 py-4 whitespace-nowrap">
											<div class="flex items-center">
												{#if user.avatar}
													<img
														src={user.avatar}
														alt={user.name}
														class="h-10 w-10 rounded-full object-cover"
													/>
												{:else}
													<div class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-600">
														<User class="h-5 w-5 text-gray-500 dark:text-gray-400" />
													</div>
												{/if}
												<div class="ml-4">
													<div class="text-sm font-medium text-gray-900 dark:text-white">
														{user.name}
														{#if user.isSelf}
															<span class="ml-2 inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900/30 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:text-blue-300">
																You
															</span>
														{/if}
													</div>
													<div class="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
												</div>
											</div>
										</td>
										<td class="px-6 py-4 whitespace-nowrap">
											{#if user.isSelf}
												<span class="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium {roleColors[user.role]}">
													{#snippet roleIcon(role)}
														{@const RoleIcon = roleIcons[role] || User}
														<RoleIcon class="h-3.5 w-3.5" />
													{/snippet}
													{@render roleIcon(user.role)}
													{user.role}
												</span>
											{:else}
												{#if user.editingRole}
													<form method="POST" action="?/edit_role" class="flex items-center gap-2">
														<input type="hidden" name="user_id" value={user.id} />
														<label for="role-select-{user.id}" class="sr-only">User Role</label>
														<select 
															id="role-select-{user.id}"
															name="role" 
															class="rounded-lg border-0 bg-white dark:bg-gray-700 py-2 px-3 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:focus:ring-blue-500 hover:ring-gray-400 dark:hover:ring-gray-500 transition-all duration-200 text-xs"
														>
															<option value="USER" selected={user.role === 'USER'}>User</option>
															<option value="ADMIN" selected={user.role === 'ADMIN'}>Admin</option>
															<option value="SALES_REP" selected={user.role === 'SALES_REP'}>Sales Rep</option>
															<option value="SUPPORT_REP" selected={user.role === 'SUPPORT_REP'}>Support Rep</option>
															<option value="READ_ONLY" selected={user.role === 'READ_ONLY'}>Read Only</option>
														</select>
														<button 
															type="submit" 
															class="rounded-lg bg-green-600 dark:bg-green-600 p-2 text-white hover:bg-green-700 dark:hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 dark:focus-visible:outline-green-500 transition-all duration-200 shadow-sm"
															title="Save"
														>
															<Check class="h-3.5 w-3.5" />
														</button>
														<button 
															type="button" 
															class="rounded-lg bg-gray-600 dark:bg-gray-600 p-2 text-white hover:bg-gray-700 dark:hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 dark:focus-visible:outline-gray-500 transition-all duration-200 shadow-sm" 
															onclick={() => { users[i].editingRole = false }}
															title="Cancel"
														>
															<X class="h-3.5 w-3.5" />
														</button>
													</form>
												{:else}
													<button
														type="button"
														class="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-all duration-200 {roleColors[user.role]} hover:bg-opacity-80 dark:hover:bg-opacity-80 hover:shadow-sm"
														onclick={() => { users[i].editingRole = true }}
														title="Click to edit role"
													>
														{#snippet roleIcon(role)}
															{@const RoleIcon = roleIcons[role] || User}
															<RoleIcon class="h-3.5 w-3.5" />
														{/snippet}
														{@render roleIcon(user.role)}
														{user.role}
														<Edit class="h-3 w-3" />
													</button>
												{/if}
											{/if}
										</td>
										<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
											{user.joined}
										</td>
										<td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
											{#if user.isSelf}
												<span class="text-gray-300 dark:text-gray-600 cursor-not-allowed">—</span>
											{:else}
												<form 
													method="POST" 
													action="?/remove_user" 
													class="inline"
													onsubmit={(e) => {
														if (!confirm('Remove this user from the organization?')) {
															e.preventDefault();
														}
													}}
												>
													<input type="hidden" name="user_id" value={user.id} />
													<button 
														type="submit" 
														class="rounded-lg p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-700 dark:hover:text-red-300"
														title="Remove user"
													>
														<Trash2 class="h-4 w-4" />
													</button>
												</form>
											{/if}
										</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
