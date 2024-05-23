import { groupService } from '$lib/server/api';
import type { RequestHandler } from './$types';

export const PUT: RequestHandler = async ({ url, cookies, request }) => {
	const groupId = Number(url.searchParams.get('groupId'));
	const archive = url.searchParams.get('archive') === 'true';
	const body = archive
		? await groupService.archive(groupId, cookies)
		: await groupService.unarchive(groupId, cookies);
	return new Response(JSON.stringify(body));
};
