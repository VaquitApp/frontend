<script lang="ts">
	import { title } from '$lib';
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

	const categoryNameById = Object.fromEntries(data.categories.map(({ id, name }) => [id, name]));
	function getCategoryNameById(id: number) {
		return categoryNameById[id];
	}
	const userEmailById = Object.fromEntries(data.members.map(({ id, email }) => [id, email]));
	function getUserEmailById(id: number) {
		return userEmailById[id];
	}

	function is_spending(movement: Spending | Payment) {
		return 'category_id' in movement;
	}

	function toggleCategoryFilter(categoryId: Id, shouldFilter: boolean) {
		categoryFilters = shouldFilter
			? [...categoryFilters, categoryId]
			: categoryFilters.filter((id) => id !== categoryId);
	}
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
				<li><a href="/groups/aggregations/{data.group.id}">Agregación por fecha</a></li>
			</ul>
		</details>
		<details class="dropdown" style="margin-left: 10px">
			<!-- svelte-ignore a11y-no-redundant-roles -->
			<summary role="button">Añadir</summary>
			<ul>
				<li><a href="/unique_spendings/details?groupId={data.group.id}">Añadir gasto unico</a></li>
				<li>
					<a href="/installment_spendings/details?groupId={data.group.id}">Añadir gasto en cuotas</a
					>
				</li>
				<li>
					<a href="/recurring_spendings/details?groupId={data.group.id}">Añadir gasto recurrente</a>
				</li>
				<li><a href="/budgets/details?groupId={data.group.id}">Añadir presupuesto</a></li>
				<li><a href="/categories/details?groupId={data.group.id}">Añadir categoría</a></li>
				<li><a href="/payments/details?groupId={data.group.id}">Añadir pago</a></li>
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
			<h3>{formatMoney(balances.totalBudgets)}</h3>
		</article>
		<article>
			<header>Gastos</header>
			<h3>{formatMoney(balances.totalSpendings)}</h3>
		</article>
		<article>
			<header><a href="/groups/categoryBalance/{data.group.id}">Saldo</a></header>
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
	<div>
		Categorías:
		{#each data.categories as category}
			{@const active = categoryFilters.includes(category.id)}
			<div style="width: auto; vertical-align: baseline;" role="group">
				<button
					on:click={() => toggleCategoryFilter(category.id, !active)}
					class="btn-sm {!active ? 'outline' : ''}"
					style="margin-right: 0px">{category.name}</button
				>
				<a
					class="btn-sm {!active ? 'outline' : ''}"
					style="margin-left: 0px"
					href="/categories/details/{category.id}"
					role="button">{@html pencil_svg(12, 12)}</a
				>
			</div>
		{/each}
	</div>
</article>

<article class="grid">
	<b>Fecha</b>
	<b>Pago/Gasto</b>
	<b>De/Categoría</b>
	<b>A/Descripción</b>
	<b class="text-right">Monto</b>
</article>

{#each filteredMovements as movement}
	{#if is_spending(movement)}
		{@const spending = movement}
		<article class="grid">
			<p>{formatDateTimeString(spending.date)}</p>
			<p>Gasto</p>
			<p>{getCategoryNameById(spending.category_id)}</p>
			<p>{spending.description}</p>
			<p class="text-right">{formatMoney(spending.amount)}</p>
		</article>
	{:else}
		{@const payment = movement}
		<article class="grid">
			<p>{formatDateTimeString(payment.date)}</p>
			<p>Pago</p>
			<p>
				{getUserEmailById(payment.from_id)} &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; {@html ARROW_DOLLAR_SVG}
			</p>
			<p>{getUserEmailById(payment.to_id)}</p>
			<p class="text-right">{formatMoney(payment.amount)}</p>
		</article>
	{/if}
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

	.balance {
		display: inline-block;
	}

	.no-underline {
		border-bottom: 0px;
	}
</style>
