<script lang="ts">
	import { routes } from '$lib';
	import Avatar from '$lib/components/Avatar.svelte';
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
		<li><a href={routes.groups}>Grupos</a></li>
		<li>Miembros</li>
	</ul>
</nav>

<header class="row">
	<h2 style="padding: 15px">Miembros de {data.group.name}</h2>
	<a class="secondary" href="{routes.sendInvite}/{data.group.id}" role="button"
		>{@html ADD_USER_SVG}</a
	>
</header>

{#each data.members as user}
	<article>
		<Avatar seed={user.email} size={40} />
		{user.email}
	</article>
{/each}

<style>
	.row {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
</style>
