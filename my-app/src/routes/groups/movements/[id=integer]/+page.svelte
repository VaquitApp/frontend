<script lang="ts">
	import { title } from '$lib';
	import { formatDateString, formatMoney } from '$lib/formatter';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
	const totalBudgets = data.budgets.reduce((acc, budget) => acc + budget.amount, 0);
	const totalSpendings = data.spendings.reduce((acc, spending) => acc + spending.amount, 0);
	const balance = totalBudgets - totalSpendings;
</script>

<svelte:head>
	<title>{title} - {data.group.name}</title>
</svelte:head>

<header class="row">
	<div>
		<h2>{data.group.name}</h2>
		<p>{data.group.description}</p>
	</div>
	<details class="dropdown">
		<!-- svelte-ignore a11y-no-redundant-roles -->
		<summary role="button">Opciones</summary>
		<ul>
			<li><a href="/spendings?group_id={data.group.id}">Añadir gasto</a></li>
			<li><a href="/budgets?group_id={data.group.id}">Añadir presupuesto</a></li>
			<li><a href="/categories?group_id={data.group.id}">Añadir categoría</a></li>
		</ul>
	</details>
</header>

<article class="grid">
	<article>
		<header>
			<a href="/groups/budgets/{data.group.id}">Presupuestos</a>
		</header>
		<h3>{formatMoney(totalBudgets)}</h3>
	</article>
	<article>
		<header>Gastos</header>
		<h3>{formatMoney(totalSpendings)}</h3>
	</article>
	<article>
		<header>Balance</header>
		<h3>{formatMoney(balance)}</h3>
	</article>
</article>

{#each data?.spendings as spending}
	<article class="grid">
		<p>{formatDateString(spending.date)}</p>
		<p>{spending.description}</p>
		<p class="text-right">{formatMoney(spending.amount)}</p>
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
