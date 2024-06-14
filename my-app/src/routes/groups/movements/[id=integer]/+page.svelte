<script lang="ts">
	import { routes, title } from '$lib';
	import { computeBalance } from '$lib/balance-utils';
	import BalanceDisplay from '$lib/components/BalanceDisplay.svelte';
	import CategoryFilter from '$lib/components/CategoryFilter.svelte';
	import type { PageServerData } from './$types';
	import MovementsTable from './MovementsTable.svelte';

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

	$: balance = computeBalance(filteredSpendings, filteredBudgets, data.categories);
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

<header class="row jc-space-between">
	<div>
		<h2>Moovimientos</h2>
		<p>{data.group.description}</p>
	</div>
	<div class="row">
		<details class="dropdown">
			<!-- svelte-ignore a11y-no-redundant-roles -->
			<summary role="button" class="outline">Resumenes</summary>
			<ul dir="rtl">
				<li><a href="{routes.groupBalance}/{data.group.id}">Estado de cuenta grupal</a></li>
				<li><a href="{routes.groupGraphs}/{data.group.id}">Gráficos de finanzas</a></li>
				<li><a href="{routes.groupAggregations}/{data.group.id}">Agregación por fecha</a></li>
			</ul>
		</details>
		<details class="dropdown" style="margin-left: 10px">
			<!-- svelte-ignore a11y-no-redundant-roles -->
			<summary role="button">Añadir</summary>
			<ul dir="rtl">
				<li><a href="{routes.spendingDetails}?groupId={data.group.id}">Añadir gasto</a></li>
				<li><a href="{routes.budgetDetails}?groupId={data.group.id}">Añadir presupuesto</a></li>
				<li><a href="{routes.categoryDetails}?groupId={data.group.id}">Añadir categoría</a></li>
				<li><a href="{routes.paymentDetails}?groupId={data.group.id}">Añadir pago</a></li>
			</ul>
		</details>
	</div>
</header>

<article>
	<BalanceDisplay {balance} />
	<CategoryFilter categories={data.categories} bind:filter={categoryFilters} />
</article>

<article>
	<MovementsTable
		categories={data.categories}
		members={data.members}
		movements={filteredMovements}
	/>
</article>
