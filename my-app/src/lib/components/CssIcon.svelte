<script lang="ts">
	import type { ICONS } from '$lib';

	export let name: (typeof ICONS)[number];
	export let size = 1;
	export let color = 'currentColor';
</script>

<svelte:head></svelte:head>

<span>
	<i class="gg-{name}" style="--ggs:{size}; color:{color};"></i>
</span>
