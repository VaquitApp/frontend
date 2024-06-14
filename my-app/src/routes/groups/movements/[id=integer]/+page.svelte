<script lang="ts">
	import { getUserEmailById, routes, title, getCategoryNameById } from '$lib';
	import CategoryFilter from '$lib/components/CategoryFilter.svelte';
	import MovementCard from '$lib/components/MovementCard.svelte';
	import { formatDateTimeString, formatMoney } from '$lib/formatter';
	import { ARROW_DOLLAR_SVG, CAUTION_SVG, WARNING_SVG, pencil_svg } from '$lib/svgs';
	import type { PageServerData } from './$types';
	import { buildBalances } from './balance-utils';

	export let data: PageServerData;

	const now = new Date();
	const spendings = data.spendings.filter((s) => new Date(s.date) <= now);
	const movements = [...spendings, ...data.payments];
	movements.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

	let categoryFilters: Id[] = [];

	$: filteredSpendings = spendings.filter(
		(spending) => categoryFilters.length === 0 || categoryFilters.includes(spending.category_id)
	);

	$: filteredBudgets = data.budgets.filter(
		(budget) => categoryFilters.length === 0 || categoryFilters.includes(budget.category_id)
	);

	$: filteredMovements = categoryFilters.length ? filteredSpendings : movements;

	$: balances = buildBalances(filteredSpendings, filteredBudgets, data.categories);
</script>

<svelte:head>
	<title>{title} - {data.group.name}</title>
</svelte:head>

<nav aria-label="breadcrumb">
	<ul>
		<li><a href={routes.groups}>Grupos</a></li>
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
				<li><a href="{routes.groupBalance}/{data.group.id}">Estado de cuenta grupal</a></li>
				<li><a href="{routes.groupGraphs}/{data.group.id}">Gráficos de finanzas</a></li>
				<li><a href="{routes.groupAggregations}/{data.group.id}">Agregación por fecha</a></li>
			</ul>
		</details>
		<details class="dropdown" style="margin-left: 10px">
			<!-- svelte-ignore a11y-no-redundant-roles -->
			<summary role="button">Añadir</summary>
			<ul>
				<li><a href="{routes.spendingDetails}?groupId={data.group.id}">Añadir gasto</a></li>
				<li><a href="{routes.budgetDetails}?groupId={data.group.id}">Añadir presupuesto</a></li>
				<li><a href="{routes.categoryDetails}?groupId={data.group.id}">Añadir categoría</a></li>
				<li><a href="{routes.paymentDetails}?groupId={data.group.id}">Añadir pago</a></li>
			</ul>
		</details>
	</div>
</header>

<article>
	<div class="grid">
		<article>
			<header>
				<a href="{routes.groupBudgets}/{data.group.id}">Presupuestos</a>
			</header>
			<h3>{formatMoney(balances.totalBudgets)}</h3>
		</article>
		<article>
			<header>Gastos</header>
			<h3>{formatMoney(balances.totalSpendings)}</h3>
		</article>
		<article>
			<header><a href="{routes.groupBalance}/{data.group.id}">Saldo</a></header>
			<h3 style="color: {balances.balanceColor}">
				<span class="balance">{formatMoney(balances.totalBalance)}</span>
				<span
					hidden={!balances.isOverLimit}
					class="balance no-underline"
					data-tooltip={balances.tooltipInfo}>{@html CAUTION_SVG}</span
				>
				<span
					hidden={balances.isOverLimit || !balances.isNearLimit}
					class="balance no-underline"
					data-tooltip={balances.tooltipInfo}>{@html WARNING_SVG}</span
				>
			</h3>
		</article>
	</div>
	<CategoryFilter categories={data.categories} bind:filter={categoryFilters} />
</article>

<article class="grid">
	<b>Fecha</b>
	<b>Pago/Gasto</b>
	<b>De/Categoría</b>
	<b>A/Descripción</b>
	<b class="text-right">Monto</b>
</article>

{#each filteredMovements as movement}
	<MovementCard categories={data.categories} members={data.members} {movement} />
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

	.balance {
		display: inline-block;
	}

	.no-underline {
		border-bottom: 0px;
	}
</style>
