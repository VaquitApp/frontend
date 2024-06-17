<script lang="ts">
	import { routes } from '$lib';
	import { alertUnexpectedError } from '$lib/client/alerts';
	import CssIcon from '../CssIcon.svelte';
</script>

<button
	class="outline contrast"
	on:click={async () => {
		try {
			const response = await fetch(routes.google, {
				method: 'DELETE'
			});

			const { redirect } = await response.json();
			window.location.href = redirect;
		} catch {
			alertUnexpectedError();
		}
	}}
>
	<CssIcon name="google" />
	Desvicular
</button>
