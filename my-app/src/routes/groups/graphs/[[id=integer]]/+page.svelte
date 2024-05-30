<script lang="ts">
	import { title } from '$lib';
	import type { PageData } from './$types';
	import type { Action } from 'svelte/action';
	import { Chart } from 'chart.js/auto';

	export let data: PageData;

	export const loadGraph: Action<HTMLCanvasElement> = (canvas) => {
		const { labels, values } = data?.graphData;
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

<div style="width: 600px;"><canvas use:loadGraph></canvas></div>
