import { Chart, type ChartData } from 'chart.js/auto';
import type { Action } from 'svelte/action';
import type { GraphData } from './graphs-utils';

type GraphAction = Action<HTMLCanvasElement, GraphData>;
type LoadGraphData = (graphData: GraphData) => ChartData;

function handleChartLifeCycle(chart: Chart, load: LoadGraphData) {
	return {
		update: (graphData: GraphData) => {
			chart.data = load(graphData);
			chart.update();
		},
		destroy: () => {
			chart.destroy();
		}
	};
}

export const loadSpendingsByCategoryGraph: GraphAction = (canvas, graphData) => {
	const load: LoadGraphData = (graphData) => {
		const { labels, values } = graphData.spendingSumByCategory;
		const label = 'Gastos por categoría';
		// NOTE: this is to have each bar be a different color
		const datasets = values.map((v, i) => {
			let data = Array(values.length).fill(0);
			data[i] = v;
			return { label, data };
		});
		return { labels, datasets };
	};

	const chart = new Chart(canvas, {
		type: 'bar',
		options: {
			plugins: {
				legend: { display: false },
				colors: { enabled: true, forceOverride: true }
			},
			scales: { x: { stacked: true }, y: { stacked: true } }
		},
		data: load(graphData)
	});

	return handleChartLifeCycle(chart, load);
};

export const loadSpendingsOverTimeGraph: GraphAction = (canvas, graphData) => {
	const load: LoadGraphData = (graphData) => {
		const { labels, datasets } = graphData.spendingsOverTime;

		const prettyDatasets = datasets.map((dataset) => {
			return { ...dataset, tension: 0.1 };
		});
		return { labels, datasets: prettyDatasets };
	};

	const chart = new Chart(canvas, {
		type: 'line',
		options: {
			plugins: {
				colors: { enabled: true, forceOverride: true }
			}
		},
		data: load(graphData)
	});

	return handleChartLifeCycle(chart, load);
};

export const loadBalanceOverTimeGraph: GraphAction = (canvas, graphData) => {
	const load: LoadGraphData = (graphData) => {
		const { labels, datasets } = graphData.balanceOverTime;
		const prettyDatasets = datasets.map((dataset) => {
			return { ...dataset, tension: 0.1, fill: 'origin' };
		});
		return { labels, datasets: prettyDatasets } as any;
	};

	const chart = new Chart(canvas, {
		type: 'line',
		options: {
			plugins: {
				colors: { enabled: true, forceOverride: true }
			}
		},
		data: load(graphData)
	});

	return handleChartLifeCycle(chart, load);
};
