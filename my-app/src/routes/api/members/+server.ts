import { groupService } from '$lib/server/api';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, cookies }) => {
	const groupId = url.searchParams.get('groupId') || 0;
	const body = await groupService.listAllMembers(+groupId, cookies);
	return new Response(JSON.stringify(body));
};

export const DELETE: RequestHandler = async ({ url, cookies }) => {
	const groupId = url.searchParams.get('groupId') || 0;
	const body = await groupService.leaveGroup(+groupId, cookies);
	return new Response(JSON.stringify(body));
};
