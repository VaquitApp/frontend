<script lang="ts">
	import { title } from '$lib';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>{title} - Grupos</title>
</svelte:head>

<header class="row">
	<h2>Grupos</h2>
	<a href="/groups/details" role="button">Nuevo grupo</a>
</header>
<main>
	{#if !data.groups.length}
		<article class="centered">
			<p>Todavía no pertenece a ningún grupo. ¿Por qué no crea uno?</p>
			<a href="/groups/details">Crear un nuevo grupo</a>
		</article>
	{/if}
	{#each data.groups as group}
		<article>
			<header>{group.name}</header>
			<p>{group.description}</p>
			<a href="/groups/details/{group.id}">Ver en detalle</a>
		</article>
	{/each}
</main>

<style>
	.row {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.centered {
		text-align: center;
	}
</style>
