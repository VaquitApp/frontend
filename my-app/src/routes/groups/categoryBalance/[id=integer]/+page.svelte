<script lang="ts">
	import { BUDGET_NEAR_LIMIT_THRESHOLD, title } from '$lib';
	import { formatMoney } from '$lib/formatter';
	import { CAUTION_SVG, WARNING_SVG } from '$lib/svgs';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<svelte:head>
	<title>{title} - {data.group.name}</title>
</svelte:head>

<nav aria-label="breadcrumb">
	<ul>
		<li><a href="/groups">Grupos</a></li>
		<li><a href="/groups/movements/{data.group.id}">{data.group.name}</a></li>
		<li>Saldos por categoría</li>
	</ul>
</nav>

<header class="row">
	<div>
		<h2>Saldos por categoría</h2>
		<p>{data.group.description}</p>
	</div>
</header>

{#each data?.categoryBalances as balance}
	{@const total = balance.budgets - balance.spendings}
	{@const isOverLimit = total < 0}
	{@const isNearLimit = balance.spendings / balance.budgets >= BUDGET_NEAR_LIMIT_THRESHOLD}
	{@const balanceColor = isOverLimit ? '#da3633' : isNearLimit ? '#d29922' : null}
	<article>
		<header class="row">
			<p>
				<b>{balance.categoryName}</b> -
				{balance.categoryDescription}
			</p>
		</header>
		<div class="grid">
			<article>
				<header>Presupuestos</header>
				<h3>{formatMoney(balance.budgets)}</h3>
			</article>
			<article>
				<header>Gastos</header>
				<h3>{formatMoney(balance.spendings)}</h3>
			</article>
			<article>
				<header>Saldo</header>
				<h3 style="color: {balanceColor}">
					<span class="balance">{formatMoney(total)}</span>
					<span
						hidden={!isOverLimit}
						class="balance no-underline"
						data-tooltip="Presupuesto sobrepasado">{@html CAUTION_SVG}</span
					>
					<span
						hidden={isOverLimit || !isNearLimit}
						class="balance no-underline"
						data-tooltip="Presupuesto cercano a su límite">{@html WARNING_SVG}</span
					>
				</h3>
			</article>
		</div>
	</article>
{/each}

<style>
	.row {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.balance {
		display: inline-block;
	}

	.no-underline {
		border-bottom: 0px;
	}
</style>
