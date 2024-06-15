<script lang="ts">
	import { routes } from '$lib';
	import { buildBalance } from '$lib/balance-utils';
	import { formatMoney } from '$lib/formatter';
	import CssIcon from './CssIcon.svelte';

	export let spendings: Spending[];
	export let budgets: Budget[];
	export let categories: Category[];
	export let group: Group | undefined = undefined;
	$: balances = buildBalance(spendings, budgets, categories);
</script>

<div class="grid">
	<article>
		<header>
			{#if group}
				<a href={routes.groupBudgets(group.id)}> Presupuestos </a>
			{:else}
				Presupuestos
			{/if}
		</header>
		<h3>{formatMoney(balances.totalBudgets)}</h3>
	</article>
	<article>
		<header>Gastos</header>
		<h3>{formatMoney(balances.totalSpendings)}</h3>
	</article>
	<article>
		<header>
			{#if group}
				<a href={routes.groupCategoryBalance(group.id)}> Saldo </a>
			{:else}
				Saldo
			{/if}
		</header>
		<h3 style="color: {balances.balanceColor}">
			<span class="balance">{formatMoney(balances.totalBalance)}</span>
			<span
				hidden={!balances.isOverLimit}
				class="balance no-underline"
				data-tooltip={balances.tooltipInfo}
			>
				<CssIcon name="danger" />
			</span>
			<span
				hidden={balances.isOverLimit || !balances.isNearLimit}
				class="balance no-underline"
				data-tooltip={balances.tooltipInfo}
			>
				<CssIcon name="danger" />
			</span>
		</h3>
	</article>
</div>
