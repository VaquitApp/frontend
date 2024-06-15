<script>
	import { invalidateAll } from '$app/navigation';
	import { title } from '$lib';

	invalidateAll();
</script>

<svelte:head>
	<title>{title} - Logout</title>
</svelte:head>

<p>Esperamos verte de nuevo</p>
