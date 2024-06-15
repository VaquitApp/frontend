<script lang="ts">
	import { page } from '$app/stores';

	export let ownerId: Id;
</script>

{#if $page.data.userId === ownerId}
	<slot />
{/if}
