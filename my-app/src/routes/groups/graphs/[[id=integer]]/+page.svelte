<script lang="ts">
	import { routes, title } from '$lib';
	import type { PageData } from './$types';
	import { computeGraphDataWithFilters } from './graphs-utils';
	import { formatDateInput } from '$lib/formatter';
	import {
		loadSpendingsByCategoryGraph,
		loadSpendingsOverTimeGraph,
		loadBalanceOverTimeGraph
	} from './graphs-actions';

	export let data: PageData;

	const graphFilter = {
		since: formatDateInput(
			new Date(
				data.spendings.reduce((d, s) => Math.min(d, Date.parse(s.date)), Date.now())
			).toJSON()
		),
		upto: formatDateInput(new Date().toJSON())
	};

	$: graphData = computeGraphDataWithFilters(data, {
		since: new Date(graphFilter.since),
		upto: new Date(graphFilter.upto)
	});
</script>

<svelte:head>
	<title>{title} - Gráficos de finanzas</title>
</svelte:head>

<nav aria-label="breadcrumb">
	<ul>
		<li><a href={routes.groups}>Grupos</a></li>
		<li><a href="{routes.groupMovements}/{data.group.id}">{data.group.name}</a></li>
		<li>Gráficos de finanzas</li>
	</ul>
</nav>

<header class="row">
	<div>
		<h2>Gráficos de finanzas</h2>
		<p>{data.group.description}</p>
	</div>
</header>

<form>
	<fieldset class="grid">
		<label>Desde <input type="date" bind:value={graphFilter.since} /></label>
		<label>Hasta <input type="date" bind:value={graphFilter.upto} /></label>
	</fieldset>
</form>

<div class="row">
	<div>
		<h4>Gastos por categoría</h4>
		<div style="width: 600px;"><canvas use:loadSpendingsByCategoryGraph={graphData}></canvas></div>
	</div>
	<!-- spacing -->
	<span style="padding: 24px"></span>
	<div>
		<h4>Consumo a través del tiempo</h4>
		<div style="width: 600px;"><canvas use:loadSpendingsOverTimeGraph={graphData}></canvas></div>
	</div>
</div>

<div class="row">
	<!-- <div>
		<h4>Gastos por categoría</h4>
		<div style="width: 600px;"><canvas use:loadSpendingsByCategoryGraph></canvas></div>
	</div> -->
	<!-- spacing -->
	<!-- <span style="padding: 24px"></span> -->
	<div>
		<h4>Saldo a través del tiempo</h4>
		<div style="width: 600px;"><canvas use:loadBalanceOverTimeGraph={graphData}></canvas></div>
	</div>
</div>

<!-- to allow scrolling down a bit -->
<div style="padding: 100px"></div>

<style>
	.row {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
</style>
