<script lang="ts">
	import { getUserEmailById } from '$lib';
	import Avatar from '$lib/components/Avatar.svelte';
	import { formatDateTimeString, formatMoney } from '$lib/formatter';

	export let members: User[];
	export let payment: Payment;

	const emisor = getUserEmailById(members, payment.from_id);
	const receptor = getUserEmailById(members, payment.to_id);
</script>

<tr>
	<td>{formatDateTimeString(payment.date)}</td>
	<td>
		<Avatar seed={emisor} size={40} />
		{emisor}
	</td>
	<td>
		<Avatar seed={receptor} size={40} />
		{receptor}
	</td>
	<td>Pago</td>
	<td class="t-right">{formatMoney(payment.amount)}</td>
</tr>
