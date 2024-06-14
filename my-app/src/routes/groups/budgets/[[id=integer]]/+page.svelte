<script lang="ts">
	import { getCategoryNameById, routes, title } from '$lib';
	import CategoryFilter from '$lib/components/CategoryFilter.svelte';
	import CssIcon from '$lib/components/CssIcon.svelte';
	import { formatDateString, formatMoney } from '$lib/formatter';
	import type { PageServerData } from './$types';

	export let data: PageServerData;

	let categoryFilter: Id[] = [];

	$: filteredBudgets = categoryFilter.length
		? data.budgets.filter((b) => categoryFilter.includes(b.category_id))
		: data.budgets;
</script>

<svelte:head>
	<title>{title} - {data.group.name}</title>
</svelte:head>

<nav aria-label="breadcrumb">
	<ul>
		<li><a href={routes.groups}>Grupos</a></li>
		<li><a href="{routes.groupMovements}/{data.group.id}">{data.group.name}</a></li>
		<li>Presupuestos</li>
	</ul>
</nav>

<header class="row jc-space-between">
	<div>
		<h2>Presupuestos</h2>
		<p>{data.group.description}</p>
	</div>
	<div>
		<a href="{routes.budgetDetails}?groupId={data.group.id}" role="button">Nuevo presupuesto</a>
	</div>
</header>

<article>
	<CategoryFilter categories={data.categories} bind:filter={categoryFilter} />
</article>

{#each filteredBudgets as budget}
	<article>
		<header class="row jc-space-between">
			<b>{budget.description}</b>
			<p>{getCategoryNameById(data.categories, budget.category_id)}</p>
		</header>
		<div class="grid">
			{formatDateString(budget.start_date)} — {formatDateString(budget.end_date)}
			<div class="row">
				<p class="t-right" style="margin-left: auto; padding-right:5%">
					{formatMoney(budget.amount)}
				</p>
				<a
					class="secondary outline btn-sm"
					href="{routes.budgetDetails}/{budget.id}"
					role="button"
					data-tooltip="Editar"
				>
					<CssIcon name="pen" />
				</a>
			</div>
		</div>
	</article>
{/each}
