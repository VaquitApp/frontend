import { groupService } from '$lib/server/api';
import type { LayoutServerLoad } from '../../$types';

export const load: LayoutServerLoad = async ({ params, cookies }) => {
	const id = Number(params.id);
	const group: Group = await groupService.get(id, cookies);
	return { group };
};
