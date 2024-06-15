<script lang="ts">
	import { getCategoryNameById, getUserEmailById } from '$lib';
	import Avatar from '$lib/components/Avatar.svelte';
	import CssIcon from '$lib/components/CssIcon.svelte';
	import { formatDateTimeString, formatMoney } from '$lib/formatter';

	export let categories: Category[];
	export let members: User[];
	export let spending: Spending;

	const userEmail = getUserEmailById(members, spending.owner_id);
</script>

<tr>
	<td>{formatDateTimeString(spending.date)}</td>
	<td>
		<Avatar seed={userEmail} size={40} />
		{userEmail}
	</td>
	<td>
		<CssIcon name="tag" />
		{getCategoryNameById(categories, spending.category_id)}
	</td>
	<td>{spending.description}</td>
	<td class="t-right">{formatMoney(spending.amount)}</td>
</tr>
