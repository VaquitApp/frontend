<script lang="ts">
	import { goto } from '$app/navigation';
	import { getCategoryNameById, routes, title } from '$lib';
	import CategoryFilter from '$lib/components/CategoryFilter.svelte';
	import CssIcon from '$lib/components/CssIcon.svelte';
	import { formatDateString, formatMoney } from '$lib/formatter';
	import type { PageData } from './$types';

	export let data: PageData;

	let categoryFilter: Id[] = [];

	$: filteredBudgets = categoryFilter.length
		? data.budgets.filter((b) => categoryFilter.includes(b.category_id))
		: data.budgets;
</script>

<svelte:head>
	<title>{title} - {data.group.name}</title>
</svelte:head>

<header class="row jc-space-between mb">
	<hgroup>
		<h2>Presupuestos</h2>
	</hgroup>
	<div>
		<a href="{routes.budgetDetails}?groupId={data.group.id}" role="button">
			<CssIcon name="add" />
			Nuevo
		</a>
	</div>
</header>

<article>
	<CategoryFilter
		ownerId={data.group.owner_id}
		categories={data.categories}
		bind:filter={categoryFilter}
	/>
</article>

{#each filteredBudgets as budget}
	{@const isReadOnly = data.categories.find((c) => c.id === budget.category_id).is_archived}
	<article>
		<header class="row jc-space-between">
			<b>{budget.description}</b>
			<p>
				{#if isReadOnly}
					<span class="no-underline" data-tooltip="Archivada">
						<CssIcon name="lock" />
					</span>
				{/if}
				{getCategoryNameById(data.categories, budget.category_id)}
			</p>
		</header>
		<div class="grid">
			{formatDateString(budget.start_date)} — {formatDateString(budget.end_date)}
			<div class="row">
				<p class="t-right" style="margin-left: auto; padding-right:5%">
					{formatMoney(budget.amount)}
				</p>
				<button
					class="secondary outline btn-sm"
					on:click={() => goto(`${routes.budgetDetails}/${budget.id}`)}
					disabled={isReadOnly}
					data-tooltip="Editar"
				>
					<CssIcon name="pen" />
				</button>
			</div>
		</div>
	</article>
{/each}
