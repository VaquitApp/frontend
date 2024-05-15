import { get } from '$lib/api';
import { getAuthHeader } from '$lib/auth';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies, params }) => {
	const id = Number(params.id);
	const group: Group = await get(`group/${id}`, getAuthHeader(cookies));
	// TODO: load real spendings
	const spendings: Spending[] = [
		{
			id: 1,
			description: 'Entradas de Taylor Swift',
			amount: 100_000,
			date: new Date()
		},
		{
			id: 2,
			description: 'Entradas de Tan Biónica',
			amount: 20_000,
			date: new Date()
		},
		{
			id: 3,
			description: 'Entradas de Boca-River',
			amount: 180_000,
			date: new Date()
		}
	];
	return { group, spendings };
};
