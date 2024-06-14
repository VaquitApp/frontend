<script lang="ts">
	import { page } from '$app/stores';

	export let ownerId: number;
</script>

{#if ownerId === $page.data.userId}
	<slot />
{/if}
