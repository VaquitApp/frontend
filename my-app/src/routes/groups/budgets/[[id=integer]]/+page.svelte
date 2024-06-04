<script lang="ts">
	import { title } from '$lib';
	import { formatDateString, formatMoney } from '$lib/formatter';
	import { pencil_svg } from '$lib/svgs';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<svelte:head>
	<title>{title} - {data.group.name}</title>
</svelte:head>

<nav aria-label="breadcrumb">
	<ul>
		<li><a href="/groups">Grupos</a></li>
		<li><a href="/groups/movements/{data.group.id}">{data.group.name}</a></li>
		<li>Presupuestos</li>
	</ul>
</nav>

<header class="row">
	<div>
		<h2>Presupuestos</h2>
		<p>{data.group.description}</p>
	</div>
	<div>
		<a href="/budgets/details?groupId={data.group.id}" role="button">Nuevo presupuesto</a>
	</div>
</header>

<article>
	Categorias:
	{#each data.categories as category}
		<button class="btn-sm outline"> {category.name} </button>
	{/each}
</article>

{#each data?.budgets as budget}
	<article>
		<header class="row">
			<b>{budget.description}</b>
			<!-- TODO: show category name -->
			<p>Categoría: {budget.category_id}</p>
		</header>
		<div class="grid">
			{formatDateString(budget.start_date)} — {formatDateString(budget.end_date)}
			<div class="row">
				<p class="text-right" style="margin-left: auto; padding-right:5%">
					{formatMoney(budget.amount)}
				</p>
				<a class="secondary" href="/budgets/details/{budget.id}" role="button"
					>{@html pencil_svg(25, 25)}</a
				>
			</div>
		</div>
	</article>
{/each}

<style>
	.row {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.text-right {
		text-align: right;
	}

	.btn-sm {
		font-size: small;
		padding: 0.5em;
		margin: 0.3em;
	}
</style>
