<script lang="ts">
	import { title } from '$lib';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<svelte:head>
	<title>{title} - {data.group.name}</title>
</svelte:head>

<header class="row">
	<div>
		<h2>{data.group.name}</h2>
		<p>{data.group.description}</p>
	</div>
	<div>
		<a href="/spendings" role="button">Nuevo gasto</a>
	</div>
</header>
{#each data.spendings as spending}
	<article class="row">
		<p>{spending.date.toLocaleString()}</p>
		<p>{spending.description}</p>
		<p>$ {spending.amount.toLocaleString()}</p>
	</article>
{/each}

<style>
	.row {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
</style>
