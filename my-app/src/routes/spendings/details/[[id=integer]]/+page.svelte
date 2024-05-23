<script lang="ts">
	import { title } from '$lib';
	import { onMount } from 'svelte';
	import type { PageServerData } from './$types';
	import { formatMoney } from '$lib/formatter';

	export let data: PageServerData;
	let timezoneOffset = 0;
	let suggestions: Map<string, Spending> = new Map();

	async function updateSuggestions(groupId: number) {
		const newSuggestions: Map<string, Spending> = new Map();
		if (groupId != 0) {
			try {
				const response = await fetch(`/api/spendings?groupId=${groupId}`);
				const body: Spending[] = await response.json();
				body.forEach((spending) => {
					newSuggestions.set(formatSuggestion(spending), spending);
				});
			} catch {}
		}
		suggestions = newSuggestions;
	}

	function formatSuggestion({ description, amount }: Spending) {
		return `${description} (${formatMoney(amount)})`;
	}

	function autocomplete(value: string) {
		const spending = suggestions.get(value);
		if (!spending) return;
		data.spending.amount = spending.amount;
		data.spending.description = spending.description;
	}

	onMount(async () => {
		timezoneOffset = new Date().getTimezoneOffset();
		await updateSuggestions(data.spending.group_id);
	});
</script>

<svelte:head>
	<title>{title} - Nuevo Gasto</title>
</svelte:head>

<nav aria-label="breadcrumb">
	<ul>
		<li><a href="/groups">Grupos</a></li>
		<li>Gastos</li>
	</ul>
</nav>

<h2>Nuevo Gasto</h2>
<form method="POST" autocomplete="off">
	<fieldset>
		<input type="hidden" name="timezoneOffset" value={timezoneOffset} required />
		<label>
			Ingrese el grupo al que pertenece el gasto
			<select
				name="groupId"
				required
				value={data.spending.group_id}
				on:change={(e) => updateSuggestions(+e.currentTarget.value)}
			>
				{#each data.groups as group}
					<option value={group.id}>{group.name}</option>
				{/each}
			</select>
		</label>
		<label>
			Ingrese una descripción para el gasto
			<input
				type="text"
				name="description"
				placeholder="Descripción"
				list="description-list"
				required
				value={data.spending.description}
				on:change={(e) => autocomplete(e.currentTarget.value)}
			/>
			<datalist id="description-list">
				{#each suggestions.keys() as suggestion}
					<option>{suggestion}</option>
				{/each}
			</datalist>
		</label>
		<label>
			Ingrese un monto para el gasto
			<input type="text" name="amount" placeholder="Monto" required value={data.spending.amount} />
		</label>
		<label>
			Ingrese la fecha del gasto
			<input
				type="datetime-local"
				name="date"
				placeholder="Fecha"
				required
				value={data.spending.date}
			/>
		</label>
		<button>Crear</button>
		<button type="button" class="outline" on:click={() => history.back()}>Cancelar</button>
	</fieldset>
</form>
