import { OAuth2Client, type TokenPayload } from 'google-auth-library';
import type { RequestHandler } from './$types';
import { GOOGLE_CLIENT_ID, routes } from '$lib';
import { userService } from '$lib/server/api';
import { saveUserCredentials } from '$lib/auth';
import type { Cookies } from '@sveltejs/kit';

const client = new OAuth2Client();

export const POST: RequestHandler = async ({ request, cookies }) => {
	const { action, credential }: { action: 'signup' | 'signin'; credential: string } =
		await request.json();

	const payload = await verify(credential);

	if (action == 'signup') {
		await signup(payload, cookies);
	} else {
		await signin(payload, cookies);
	}

	const body = { redirect: routes.groups };
	return new Response(JSON.stringify(body));
};

export const PUT: RequestHandler = async ({ request, cookies }) => {
	const { credential }: { credential: string } = await request.json();

	const payload = await verify(credential);
	await link(payload, cookies);

	const body = { redirect: routes.profile };
	return new Response(JSON.stringify(body));
};

export const DELETE: RequestHandler = async ({ cookies }) => {
	await userService.googleUnlink(cookies);
	const body = { redirect: routes.profile };
	return new Response(JSON.stringify(body));
};

async function verify(token: string): Promise<TokenPayload> {
	const ticket = await client.verifyIdToken({
		idToken: token,
		audience: GOOGLE_CLIENT_ID
	});
	const payload = ticket.getPayload()!;
	// If the request specified a Google Workspace domain:
	// const domain = payload['hd'];
	return payload;
}

async function signin({ sub }: TokenPayload, cookies: Cookies) {
	const data = await userService.googleSignIn({ token: sub });
	saveUserCredentials(cookies, data);
}

async function link({ sub }: TokenPayload, cookies: Cookies) {
	await userService.googleLink({ token: sub }, cookies);
}

async function signup(payload: TokenPayload, cookies: Cookies) {
	try {
		await signin(payload, cookies);
	} catch {
		const { email } = payload;
		if (!email) return;

		const data = await userService.register({ email, password: crypto.randomUUID() });
		saveUserCredentials(cookies, data);
		link(payload, cookies);
	}
}
