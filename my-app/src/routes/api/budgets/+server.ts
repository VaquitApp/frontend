import { budgetService } from '$lib/server/api';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, cookies }) => {
	const groupId = url.searchParams.get('groupId') || 0;
	const body = await budgetService.list(+groupId, cookies);
	return new Response(JSON.stringify(body));
};
