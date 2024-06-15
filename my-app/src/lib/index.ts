// place files you want to import through the `$lib` alias in this folder.

export const title = 'VaquitApp';

// icons from CSS.GG
export const ICONS = [
	'sun',
	'moon',
	'color-picker',
	'pen',
	'enter',
	'lock',
	'lock-unlock',
	'user-list',
	'user-add',
	'tag',
	'bell',
	'info',
	'danger',
	'loadbar-doc',
	'add'
] as const;

// app routes
export const routes = {
	index: '/',
	// user
	login: '/user/login',
	logout: '/user/logout',
	register: '/user/register',
	recover: '/user/recover',
	// groups
	groups: '/groups',
	groupDetails: '/groups/details',
	groupAggregations: (groupId: Id) => `/groups/${groupId}/aggregations`,
	groupBalance: (groupId: Id) => `/groups/${groupId}/balance`,
	groupBudgets: (groupId: Id) => `/groups/${groupId}/budgets`,
	groupCategoryBalance: (groupId: Id) => `/groups/${groupId}/categoryBalance`,
	groupGraphs: (groupId: Id) => `/groups/${groupId}/graphs`,
	groupMembers: (groupId: Id) => `/groups/${groupId}/members`,
	groupMovements: (groupId: Id) => `/groups/${groupId}/movements`,
	// categories
	categoryDetails: '/categories/details',
	// budgets
	budgetDetails: '/budgets/details',
	// spendings
	spendingDetails: '/spendings/details',
	// invites
	acceptInvite: '/invites/accept',
	sendInvite: '/invites/send',
	// payments
	paymentDetails: '/payments/details',
	// api
	apiBudgets: '/api/budgets',
	apiCategories: '/api/categories',
	apiGroups: '/api/groups',
	apiMembers: '/api/members',
	apiReminders: '/api/reminders',
	apiSpendings: '/api/spendings'
} as const;

export function getCategoryNameById(categories: Category[], id: Id): Category['name'] {
	return categories.find((c) => c.id === id)?.name || id.toString();
}
export function getUserEmailById(users: User[], id: number): User['email'] {
	return users.find((p) => p.id === id)?.email || id.toString();
}

/// When a budget is greater or equal to this threshold, it is considered to be near its limit.
export const BUDGET_NEAR_LIMIT_THRESHOLD = 0.9;
