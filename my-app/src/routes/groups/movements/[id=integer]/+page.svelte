<script lang="ts">
	import { title } from '$lib';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<svelte:head>
	<title>{title} - {data.group.name}</title>
</svelte:head>

<header>
	<h2>{data.group.name}</h2>
	<p>{data.group.description}</p>
</header>
{#each data.spendings as spending}
	<article>
		<header class="row">
			<p>{spending.description}</p>
			<p>$ {spending.amount.toLocaleString()}</p>
		</header>
		{spending.date.toLocaleString()}
	</article>
{/each}

<style>
	.row {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
</style>
