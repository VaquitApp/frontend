<script lang="ts">
	import SpendingRow from './SpendingRow.svelte';
	import PaymentRow from './PaymentRow.svelte';

	export let categories: Category[];
	export let members: User[];
	export let movement: Spending | Payment;
</script>

{#if 'category_id' in movement}
	<SpendingRow {...{ categories, members }} spending={movement} />
{:else}
	<PaymentRow {...{ categories, members }} payment={movement} />
{/if}
