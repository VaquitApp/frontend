<script lang="ts">
	import { title } from '$lib';
	import { archivedCategoriesLast } from '$lib/balance-utils';
	import BalanceDisplay from '$lib/components/BalanceDisplay.svelte';
	import CssIcon from '$lib/components/CssIcon.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	let sortedCategories = archivedCategoriesLast(data.categories);
</script>

<svelte:head>
	<title>{title} - {data.group.name}</title>
</svelte:head>

<header>
	<hgroup>
		<h2>Saldos por categoría</h2>
	</hgroup>
</header>

{#each sortedCategories as category}
	{@const spendings = data.spendings.filter((s) => s.category_id === category.id)}
	{@const budgets = data.budgets.filter((b) => b.category_id === category.id)}
	<article>
		<header class="row jc-space-between">
			<p>
				{#if category.is_archived}
					<span class="no-underline" data-tooltip="Archivada">
						<CssIcon name="lock" />
					</span>
				{/if}
				<b>{category.name}</b> -
				{category.description}
			</p>
		</header>
		<BalanceDisplay {spendings} {budgets} categories={[category]} />
	</article>
{/each}
