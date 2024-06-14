<script lang="ts">
	import { getCategoryNameById, getUserEmailById } from '$lib';
	import { formatDateTimeString, formatMoney } from '$lib/formatter';
	import { ARROW_DOLLAR_SVG } from '$lib/svgs';

	export let categories: Category[];
	export let members: User[];
	export let movement: Spending | Payment;

	const spending = movement as Spending;
	const payment = movement as Payment;

	const isSpending = 'category_id' in movement;
</script>

{#if isSpending}
	<article class="grid">
		<p>{formatDateTimeString(spending.date)}</p>
		<p>Gasto</p>
		<p>{getCategoryNameById(categories, spending.category_id)}</p>
		<p>{spending.description}</p>
		<p class="text-right">{formatMoney(spending.amount)}</p>
	</article>
{:else}
	<article class="grid">
		<p>{formatDateTimeString(payment.date)}</p>
		<p>Pago</p>
		<p>
			{getUserEmailById(members, payment.from_id)} &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;
			{@html ARROW_DOLLAR_SVG}
		</p>
		<p>{getUserEmailById(members, payment.to_id)}</p>
		<p class="text-right">{formatMoney(payment.amount)}</p>
	</article>
{/if}
