import { paymentReminderService } from '$lib/server/api';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, cookies }) => {
	const body = await request.json();
	const response = await paymentReminderService.send(body, cookies);
	return new Response(JSON.stringify(response));
};
