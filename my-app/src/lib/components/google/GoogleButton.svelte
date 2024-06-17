<script lang="ts">
	import { onMount } from 'svelte';

	export let clientId;
	export let callback: (response: { credential: string; select_by: string }) => void;
	export let text: 'signin_with' | 'signup_with' | 'continue_with' | 'signin';
	export let prompt: boolean;

	let div: HTMLDivElement;

	onMount(() => {
		let { google } = window as any;
		google.accounts.id.initialize({
			client_id: clientId,
			callback
		});
		google.accounts.id.renderButton(
			div,
			{ theme: 'outline', size: 'large', text } // customization attributes
		);

		if (prompt) {
			google.accounts.id.prompt(); // also display the One Tap dialog
		}
	});
</script>

<div bind:this={div}></div>

<style>
	div {
		display: inline-block;
		width: min-content;
	}
</style>
