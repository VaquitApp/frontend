<script lang="ts">
	import { title } from '$lib';
	import type { PageData } from './$types';
	import type { Action } from 'svelte/action';
	import {
		Chart,
		type ScriptableChartContext,
		type ScriptableContext,
		type ScriptableLineSegmentContext
	} from 'chart.js/auto';

	export let data: PageData;

	export const loadSpendingsByCategoryGraph: Action<HTMLCanvasElement> = (canvas) => {
		const { labels, values } = data?.graphData.spendingSumByCategory;
		const label = 'Gastos por categoría';
		// NOTE: this is to have each bar be a different color
		const datasets = values.map((v, i) => {
			let data = Array(values.length).fill(0);
			data[i] = v;
			return { label, data };
		});

		const chart = new Chart(canvas, {
			type: 'bar',
			options: {
				plugins: {
					legend: { display: false },
					colors: { enabled: true, forceOverride: true }
				},
				scales: { x: { stacked: true }, y: { stacked: true } }
			},
			data: { labels, datasets }
		});
		return { destroy: () => chart.destroy() };
	};

	export const loadSpendingsOverTimeGraph: Action<HTMLCanvasElement> = (canvas) => {
		const { labels, datasets } = data?.graphData.spendingsOverTime;

		const prettyDatasets = datasets.map((dataset) => {
			return { ...dataset, tension: 0.1 };
		});

		const chart = new Chart(canvas, {
			type: 'line',
			options: {
				plugins: {
					colors: { enabled: true, forceOverride: true }
				}
			},
			data: { labels, datasets: prettyDatasets }
		});
		return { destroy: () => chart.destroy() };
	};

	export const loadBalanceOverTimeGraph: Action<HTMLCanvasElement> = (canvas) => {
		const { labels, datasets } = data?.graphData.balanceOverTime;

		const prettyDatasets = datasets.map((dataset) => {
			return { ...dataset, tension: 0.1, fill: 'origin' };
		});

		const chart = new Chart(canvas, {
			type: 'line',
			options: {
				plugins: {
					colors: { enabled: true, forceOverride: true }
				}
			},
			data: { labels, datasets: prettyDatasets }
		});
		return { destroy: () => chart.destroy() };
	};
</script>

<svelte:head>
	<title>{title} - Gráficos de finanzas</title>
</svelte:head>

<nav aria-label="breadcrumb">
	<ul>
		<li><a href="/groups">Grupos</a></li>
		<li><a href="/groups/movements/{data.group.id}">{data.group.name}</a></li>
		<li>Gráficos de finanzas</li>
	</ul>
</nav>

<header class="row">
	<div>
		<h2>Gráficos de finanzas</h2>
		<p>{data.group.description}</p>
	</div>
</header>

<div class="row">
	<div>
		<h4>Gastos por categoría</h4>
		<div style="width: 600px;"><canvas use:loadSpendingsByCategoryGraph></canvas></div>
	</div>
	<!-- spacing -->
	<span style="padding: 24px"></span>
	<div>
		<h4>Consumo a través del tiempo</h4>
		<div style="width: 600px;"><canvas use:loadSpendingsOverTimeGraph></canvas></div>
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
		<div style="width: 600px;"><canvas use:loadBalanceOverTimeGraph></canvas></div>
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
