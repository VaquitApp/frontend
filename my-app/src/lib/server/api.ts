import { env } from '$env/dynamic/private';
import { getAuthHeader } from '$lib/auth';
import { error, type Cookies } from '@sveltejs/kit';

type Method = 'GET' | 'POST' | 'DELETE' | 'PUT';
type Headers = { [key: string]: string };
type Request = {
	path: string;
	data?: object;
	headers?: Headers;
};
type Opts = {
	method: Method;
	headers: Headers;
	body?: string;
};

function stripTrailingSlash(url: string): string {
	return url?.endsWith('/') ? stripTrailingSlash(url.slice(0, -1)) : url;
}

const base = stripTrailingSlash(env.VITE_API_URL);

async function send(method: Method, { path, data, headers = {} }: Request) {
	const opts: Opts = { method, headers };

	if (data) {
		opts.headers['Content-Type'] = 'application/json';
		opts.body = JSON.stringify(data);
	}

	const res = await fetch(`${base}/${path}`, opts);
	if (res.ok) {
		const text = await res.text();
		return text ? JSON.parse(text) : {};
	}

	throw error(res.status, await res.text());
}

function get(path: string, headers?: Headers) {
	return send('GET', { path, headers });
}

function del(path: string, headers?: Headers) {
	return send('DELETE', { path, headers });
}

function post(path: string, data: object, headers?: Headers) {
	return send('POST', { path, data, headers });
}

function put(path: string, data: object, headers?: Headers) {
	return send('PUT', { path, data, headers });
}

export const userService = {
	register: (data: { email: string; password: string }) => post('user/register', data),
	login: (data: { email: string; password: string }) => post('user/login', data)
};
export const groupService = {
	save: (data: Group, cookies: Cookies) =>
		data.id > 0
			? put('group', data, getAuthHeader(cookies))
			: post('group', data, getAuthHeader(cookies)),
	list: (cookies: Cookies) =>
		groupService.listAll(cookies).then((data: Group[]) => data.filter((g) => !g.is_archived)),
	listAll: (cookies: Cookies) => get('group', getAuthHeader(cookies)),
	get: (id: Id, cookies: Cookies) => get(`group/${id}`, getAuthHeader(cookies)),
	archive: (id: Id, cookies: Cookies) =>
		put(`group/${id}/archive`, undefined!, getAuthHeader(cookies)),
	unarchive: (id: Id, cookies: Cookies) =>
		put(`group/${id}/unarchive`, undefined!, getAuthHeader(cookies)),
	listAllMembers: (id: Id, cookies: Cookies) => get(`group/${id}/member`, getAuthHeader(cookies)),
	listAllMemberBalances: (id: Id, cookies: Cookies) =>
		get(`group/${id}/balance`, getAuthHeader(cookies)),
	addMember: (id: Id, user_identifier: Id | string, cookies: Cookies) =>
		post(`group/${id}/member`, { user_identifier }, getAuthHeader(cookies))
};
export const spendingService = {
	list: (groupId: Id, cookies: Cookies) => get(`group/${groupId}/spending`, getAuthHeader(cookies)),

	saveUniqueSpending: (data: UniqueSpending, cookies: Cookies) =>
		post('unique-spending', data, getAuthHeader(cookies)),
	listUniqueSpendings: (groupId: Id, cookies: Cookies) =>
		get(`group/${groupId}/unique-spending`, getAuthHeader(cookies)),

	saveInstallmentSpending: (data: InstallmentSpending, cookies: Cookies) =>
		post('installment-spending', data, getAuthHeader(cookies)),
	listInstallmentSpendings: (groupId: Id, cookies: Cookies) =>
		get(`group/${groupId}/installment-spending`, getAuthHeader(cookies)),

	saveRecurringSpending: (data: RecurringSpending, cookies: Cookies) =>
		data.id > 0
			? put(`recurring-spending/${data.id}`, data, getAuthHeader(cookies))
			: post('recurring-spending', data, getAuthHeader(cookies)),
	listRecurringSpendings: (groupId: Id, cookies: Cookies) =>
		get(`group/${groupId}/recurring-spending`, getAuthHeader(cookies)),

	listAllSpendings: (groupId: Id, cookies: Cookies) =>
		get(`group/${groupId}/spending`, getAuthHeader(cookies))
};

export const paymentService = {
	save: (data: Payment, cookies: Cookies) =>
		data.id > 0
			? put(`payment/${data.id}`, data, getAuthHeader(cookies))
			: post('payment', data, getAuthHeader(cookies)),
	list: (groupId: Id, cookies: Cookies) => get(`group/${groupId}/payment`, getAuthHeader(cookies))
};
export const budgetService = {
	save: (data: Budget, cookies: Cookies) =>
		data.id > 0
			? put(`budget/${data.id}`, data, getAuthHeader(cookies))
			: post('budget', data, getAuthHeader(cookies)),
	get: (id: Id, cookies: Cookies) => get(`budget/${id}`, getAuthHeader(cookies)),
	list: (groupId: Id, cookies: Cookies) => get(`group/${groupId}/budget`, getAuthHeader(cookies))
};
export const categoryService = {
	save: (data: Category, cookies: Cookies) =>
		data.id > 0
			? put(`category/${data.id}`, data, getAuthHeader(cookies))
			: post('category', data, getAuthHeader(cookies)),
	get: (id: Id, cookies: Cookies) => get(`category/${id}`, getAuthHeader(cookies)),
	list: (groupId: Id, cookies: Cookies) => get(`group/${groupId}/category`, getAuthHeader(cookies))
};
export const inviteService = {
	get: (token: string, cookies: Cookies) => get(`invite/${token}`, getAuthHeader(cookies)),
	send: (data: SendInvite, cookies: Cookies) => post(`invite`, data, getAuthHeader(cookies)),
	accept: (data: AcceptInvite, cookies: Cookies) =>
		post(`invite/join/${data.token}`, undefined!, getAuthHeader(cookies))
};
export const paymentReminderService = {
	send: (data: PaymentReminder, cookies: Cookies) =>
		post(`payment_reminder`, data, getAuthHeader(cookies))
};
