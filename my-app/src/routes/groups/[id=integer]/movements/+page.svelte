<script lang="ts">
	import { routes, title } from '$lib';
	import BalanceDisplay from '$lib/components/BalanceDisplay.svelte';
	import CategoryFilter from '$lib/components/CategoryFilter.svelte';
	import CssIcon from '$lib/components/CssIcon.svelte';
	import type { PageData } from './$types';
	import MovementsTable from './MovementsTable.svelte';

	export let data: PageData;

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
</script>

<svelte:head>
	<title>{title} - {data.group.name}</title>
</svelte:head>

<header class="row jc-space-between">
	<hgroup>
		<h2>Moovimientos</h2>
	</hgroup>
	<div class="row">
		<div>
			<a href={routes.groupMembers(data.group.id)} role="button" class="outline secondary">
				<CssIcon name="user-list" />
				Miembros
			</a>
		</div>
		<details class="dropdown ml">
			<!-- svelte-ignore a11y-no-redundant-roles -->
			<summary role="button" class="outline">
				<CssIcon name="loadbar-doc" />
				Resumenes
			</summary>
			<ul dir="rtl">
				<li><a href={routes.groupBalance(data.group.id)}>Estado de cuenta grupal</a></li>
				<li><a href={routes.groupGraphs(data.group.id)}>Gráficos de finanzas</a></li>
				<li><a href={routes.groupAggregations(data.group.id)}>Agregación por fecha</a></li>
			</ul>
		</details>
		<details class="dropdown ml">
			<!-- svelte-ignore a11y-no-redundant-roles -->
			<summary role="button">
				<CssIcon name="add" />
				Nuevo
			</summary>
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
	<BalanceDisplay
		spendings={filteredSpendings}
		budgets={filteredBudgets}
		categories={data.categories}
		group={data.group}
	/>
	<CategoryFilter
		ownerId={data.group.owner_id}
		categories={data.categories}
		bind:filter={categoryFilters}
	/>
</article>

<article>
	<MovementsTable
		categories={data.categories}
		members={data.members}
		movements={filteredMovements}
	/>
</article>
