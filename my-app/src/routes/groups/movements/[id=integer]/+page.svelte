<script lang="ts">
	import { title } from '$lib';
	import { formatDateTimeString, formatMoney } from '$lib/formatter';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
	const totalBudgets = data.budgets.reduce((acc, budget) => acc + budget.amount, 0);
	const totalSpendings = data.spendings.reduce((acc, spending) => acc + spending.amount, 0);
	const balance = totalBudgets - totalSpendings;
</script>

<svelte:head>
	<title>{title} - {data.group.name}</title>
</svelte:head>

<nav aria-label="breadcrumb">
	<ul>
		<li><a href="/groups">Grupos</a></li>
		<li>{data.group.name}</li>
	</ul>
</nav>

<header class="row">
	<div>
		<h2>Moovimientos</h2>
		<p>{data.group.description}</p>
	</div>
	<div class="row">
		<details class="dropdown">
			<!-- svelte-ignore a11y-no-redundant-roles -->
			<summary role="button" class="outline">Resumenes</summary>
			<ul>
				<li><a href="/groups/balance/{data.group.id}">Estado de cuenta grupal</a></li>
				<li><a href="/groups/graphs/{data.group.id}">Gráficos de finanzas</a></li>
			</ul>
		</details>
		<details class="dropdown" style="margin-left: 10px">
			<!-- svelte-ignore a11y-no-redundant-roles -->
			<summary role="button">Añadir</summary>
			<ul>
				<li><a href="/spendings/details?groupId={data.group.id}">Añadir gasto</a></li>
				<li><a href="/budgets/details?groupId={data.group.id}">Añadir presupuesto</a></li>
				<li><a href="/categories/details?groupId={data.group.id}">Añadir categoría</a></li>
			</ul>
		</details>
	</div>
</header>

<article>
	<div class="grid">
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
	</div>
	<div>
		Categorías:
		{#each data.categories as category}
			<button class="btn-sm outline"> {category.name} </button>
		{/each}
	</div>
</article>

{#each data.spendings as spending}
	<article class="grid">
		<p>{formatDateTimeString(spending.date)}</p>
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

	.btn-sm {
		font-size: small;
		padding: 0.5em;
		margin: 0.3em;
	}
</style>
