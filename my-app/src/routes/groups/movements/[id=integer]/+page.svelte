<script lang="ts">
	import { BUDGET_NEAR_LIMIT_THRESHOLD, title } from '$lib';
	import { formatDateTimeString, formatMoney } from '$lib/formatter';
	import { ARROW_DOLLAR_SVG, CAUTION_SVG, WARNING_SVG, pencil_svg } from '$lib/svgs';
	import type { PageServerData } from './$types';

	export let data: PageServerData;

	const movements = [...data.spendings, ...data.payments];
	movements.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

	const totalBudgets = data?.categoryBalances.reduce((acc, { budgets }) => acc + budgets, 0);
	const totalSpendings = data?.categoryBalances.reduce((acc, { spendings }) => acc + spendings, 0);
	const totalBalance = totalBudgets - totalSpendings;

	const overspentCategories = data?.categoryBalances.filter(
		({ budgets, spendings }) => budgets < spendings
	);
	const isOverLimit = overspentCategories.length > 0;

	const nearlyOverspentCategories = data?.categoryBalances.filter(
		({ budgets, spendings }) => spendings / budgets >= BUDGET_NEAR_LIMIT_THRESHOLD
	);
	const isNearLimit = nearlyOverspentCategories.length > 0;

	const balanceColor = isOverLimit ? '#da3633' : isNearLimit ? '#d29922' : null;
	const tooltipInfo = isOverLimit
		? `Presupuesto sobrepasado en categorías: ${formatCategoryList(overspentCategories)}`
		: isNearLimit
			? `Presupuesto cercano al límite en categorías: ${formatCategoryList(nearlyOverspentCategories)}`
			: '';

	function formatCategoryList(categoryList: { categoryName: string }[]) {
		return categoryList.map(({ categoryName }) => `"${categoryName}"`).join(', ');
	}

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

	let categoryFilters: Id[] = [];
	$: filteredMovements = movements.filter(
		(m) =>
			categoryFilters.length === 0 || (is_spending(m) && categoryFilters.includes(m.category_id))
	);

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
				<li><a href="/installment_spendings/details?groupId={data.group.id}">Añadir gasto en cuotas</a></li>
				<li><a href="/recurring_spendings/details?groupId={data.group.id}">Añadir gasto recurrente</a></li>
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
			<h3>{formatMoney(totalBudgets)}</h3>
		</article>
		<article>
			<header>Gastos</header>
			<h3>{formatMoney(totalSpendings)}</h3>
		</article>
		<article>
			<header><a href="/groups/categoryBalance/{data.group.id}">Saldo</a></header>
			<h3 style="color: {balanceColor}">
				<span class="balance">{formatMoney(totalBalance)}</span>
				<span hidden={!isOverLimit} class="balance no-underline" data-tooltip={tooltipInfo}
					>{@html CAUTION_SVG}</span
				>
				<span
					hidden={isOverLimit || !isNearLimit}
					class="balance no-underline"
					data-tooltip={tooltipInfo}>{@html WARNING_SVG}</span
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
