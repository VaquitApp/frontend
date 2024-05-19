<script lang="ts">
	import { title } from '$lib';
	import type { PageServerData } from './$types';

	export let data: PageServerData;

	function formatDateString(dateString: string): string {
		const date = new Date(Date.parse(dateString));
		const day = date.getDay();
		const month = date.getMonth();
		const year = date.getFullYear();
		const hour = date.getHours();
		const minute = date.getMinutes();
		return `${day}/${month}/${year}, ${hour}:${minute}`;
	}
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
		<a href="/budgets?group_id={data.group.id}" role="button">Nuevo presupuesto</a>
	</div>
</header>
{#each data.budgets as budget}
	<article>
		<header>{budget.description}</header>
		<div class="grid">
			{formatDateString(budget.start_date)} — {formatDateString(budget.end_date)}
			<p>Categoría: {budget.category_id}</p>
			<p class="text-right">$ {budget.amount.toFixed(2)}</p>
		</div>
	</article>
{/each}

<style>
	.row {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.text-right {
		text-align: right;
	}
</style>
