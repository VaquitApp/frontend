import { userService } from '$lib/server/api';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	const profile: UserProfile = await userService.get(cookies);
	return { profile };
};

export const actions: Actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();
		const cbu = data.get('cbu')?.toString() || '';
		const alias = data.get('alias')?.toString() || '';

		const profile: UserProfile = { cbu, alias };
		try {
			await userService.update(profile, cookies);
		} catch {
			return { success: false };
		}

		return { success: true };
	}
};
