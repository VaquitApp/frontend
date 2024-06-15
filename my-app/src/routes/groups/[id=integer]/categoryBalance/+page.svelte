<script lang="ts">
	import { title } from '$lib';
	import BalanceDisplay from '$lib/components/BalanceDisplay.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>{title} - {data.group.name}</title>
</svelte:head>

<header>
	<hgroup>
		<h2>Saldos por categoría</h2>
	</hgroup>
</header>

{#each data.categories as category}
	{@const spendings = data.spendings.filter((s) => s.category_id === category.id)}
	{@const budgets = data.budgets.filter((b) => b.category_id === category.id)}
	<article>
		<header class="row jc-space-between">
			<p>
				<b>{category.name}</b> -
				{category.description}
			</p>
		</header>
		<BalanceDisplay {spendings} {budgets} categories={[category]} />
	</article>
{/each}
