import { inviteService } from '$lib/server/api';
import { error, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, cookies }) => {
	const token = params.id || '';
	const invite: Invite = await inviteService.get(token, cookies);
	return { invite };
};

export const actions: Actions = {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	default: async ({ cookies, request, params }) => {
		const token = params.id || '';

		// TODO: El metodo getGroup esta restringido a solo lectura de usuarios que ya forman parte del team
		// La idea era en el formulario mostrar el nombre y descripcion del grupo, pero por ahora estamos ok
		// con esto.

		if (!token || !token.length) {
			throw error(400, 'Token is required');
		}

		const invite: AcceptInvite = {
			token: token
		};
		await inviteService.accept(invite, cookies);
		redirect(302, `/groups`);
	}
};
