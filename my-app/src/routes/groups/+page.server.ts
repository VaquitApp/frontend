import { get } from '$lib/api';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	const token = cookies.get('jwt')!;
	const headers = {
		'x-user': token
	};
	const groups: Group[] = await get('group', headers);
	return { groups };
};
