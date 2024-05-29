<script lang="ts">
	import { ADD_USER_SVG } from '$lib/svgs';
	import type { PageData } from './$types';

	export let data: PageData;
	const pageTitle = `Miembros`;
</script>

<svelte:head>
	<title>{data.group.name} - {pageTitle}</title>
</svelte:head>

<nav aria-label="breadcrumb">
	<ul>
		<li><a href="/groups">Grupos</a></li>
		<li>Miembros</li>
	</ul>
</nav>

<header class="row">
	<h2 style="padding: 15px">Miembros de {data.group.name}</h2>
	<a class="secondary" href="/invites/send/{data.group.id}" role="button">{@html ADD_USER_SVG}</a>
</header>

{#each data.members as user}
	<p style="padding: 15px" class="row">{user.email}</p>
{/each}

<style>
	.row {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
</style>
