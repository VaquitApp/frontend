import { get } from '$lib/api';
import { getAuthHeader } from '$lib/auth';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies, params }) => {
	const id = Number(params.id);
	const group: Group = await get(`group/${id}`, getAuthHeader(cookies));
	const spendings: Spending[] = await get(`group/${id}/spending`, getAuthHeader(cookies));
	return { group, spendings };
};
