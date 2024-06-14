<script lang="ts">
	import { BUDGET_NEAR_LIMIT_THRESHOLD } from '$lib';
	import { formatMoney } from '$lib/formatter';
	import CssIcon from './CssIcon.svelte';

	export let balance: {
		budgets: number;
		spendings: number;
	};
	$: total = balance.budgets - balance.spendings;
	$: isOverLimit = total < 0;
	$: isNearLimit = balance.spendings / balance.budgets >= BUDGET_NEAR_LIMIT_THRESHOLD;
	$: balanceColor = isOverLimit ? '#da3633' : isNearLimit ? '#d29922' : null;
</script>

<div class="grid">
	<article>
		<header>
			<!-- <a href="{routes.groupBudgets}/{data.group.id}"> -->
			Presupuestos
			<!-- </a> -->
		</header>
		<h3>{formatMoney(balance.budgets)}</h3>
	</article>
	<article>
		<header>Gastos</header>
		<h3>{formatMoney(balance.spendings)}</h3>
	</article>
	<article>
		<header>
			<!-- <a href="{routes.groupCategoryBalance}/{data.group.id}"> -->
			Saldo
			<!-- </a> -->
		</header>
		<h3 style="color: {balanceColor}">
			<span class="balance">{formatMoney(total)}</span>
			<span
				hidden={!isOverLimit}
				class="balance no-underline"
				data-tooltip="Presupuesto sobrepasado"
			>
				<CssIcon name="danger" />
			</span>
			<span
				hidden={isOverLimit || !isNearLimit}
				class="balance no-underline"
				data-tooltip="Presupuesto cercano a su límite"
			>
				<CssIcon name="danger" />
			</span>
		</h3>
	</article>
</div>
