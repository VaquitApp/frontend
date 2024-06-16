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
				method: 'PUT',
				body: JSON.stringify({ credential })
			});

			const { redirect } = await response.json();
			window.location.href = redirect;
		} catch {
			alertUnexpectedError();
		}
	}}
	text="continue_with"
	prompt={false}
/>
