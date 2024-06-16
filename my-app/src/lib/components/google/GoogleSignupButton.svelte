<script lang="ts">
	import { GOOGLE_CLIENT_ID, routes } from '$lib';
	import { alertUnexpectedError } from '$lib/client/alerts';
	import GoogleButton from './GoogleButton.svelte';
</script>

<GoogleButton
	clientId={GOOGLE_CLIENT_ID}
	callback={async ({ credential }) => {
		try {
			const response = await fetch(routes.google, {
				method: 'POST',
				body: JSON.stringify({
					action: 'signup',
					credential
				})
			});

			const { redirect } = await response.json();
			window.location.href = redirect;
		} catch {
			alertUnexpectedError();
		}
	}}
	text="signup_with"
	prompt={false}
/>
