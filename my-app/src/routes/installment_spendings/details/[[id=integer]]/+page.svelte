<script lang="ts">
	import { title } from '$lib';
	import { onMount } from 'svelte';
	import type { PageServerData } from './$types';
	import { fixDateString, formatMoney } from '$lib/formatter';

	export let data: PageServerData;
	let timezoneOffset = 0;
	let suggestions: Map<string, Spending> = new Map();
	let categories: Category[] = [];

	async function onGroupUpdate(groupId: number) {
		await Promise.all([updateSuggestions(groupId), updateCategories(groupId)]);
	}

	async function updateSuggestions(groupId: number) {
		const newSuggestions: Map<string, Spending> = new Map();
		if (groupId != 0) {
			try {
				const response = await fetch(`/api/spendings?groupId=${groupId}`);
				const body: Spending[] = await response.json();
				body.forEach((spending) => {
					newSuggestions.set(spending.description, spending);
				});
			} catch {}
		}
		suggestions = newSuggestions;
	}

	function autocomplete(value: string) {
		const spending = suggestions.get(value);
		if (!spending) return;
		data.spending.amount = spending.amount;
		data.spending.description = spending.description;
		data.spending.category_id = spending.category_id;
	}

	async function updateCategories(groupId: number) {
		if (groupId != 0) {
			try {
				const response = await fetch(`/api/categories?groupId=${groupId}`);
				categories = await response.json();
				return;
			} catch {}
		}
		categories = [];
	}

	onMount(async () => {
		timezoneOffset = new Date().getTimezoneOffset();
		data.spending.date = fixDateString(data.spending.date, timezoneOffset).slice(0, 16);
		await onGroupUpdate(data.spending.group_id);
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

<h2>Nuevo Gasto en Cuotas</h2>
<form method="POST" autocomplete="off">
	<fieldset>
		<input type="hidden" name="timezoneOffset" value={timezoneOffset} required />
		<label>
			Ingrese el grupo al que pertenece el gasto en cuotas
			<select
				name="groupId"
				required
				value={data.spending.group_id}
				on:change={(e) => onGroupUpdate(+e.currentTarget.value)}
			>
				{#each data.groups as group}
					<option value={group.id}>{group.name}</option>
				{/each}
			</select>
		</label>
		<label>
			Ingrese la categoría a la que pertenece el gasto en cuotas
			<select name="categoryId" required value={data.spending.category_id}>
				{#each categories as category}
					<option value={category.id}>{category.name}</option>
				{/each}
			</select>
		</label>
		<label>
			Ingrese una descripción para el gasto en cuotas
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
				{#each suggestions.values() as spending}
					<option value={spending.description}>{formatMoney(spending.amount)}</option>
				{/each}
			</datalist>
		</label>
		<label>
			Ingrese un el monto de la cuota
			<input type="text" name="amount" placeholder="Monto" required value={data.spending.amount} />
		</label>
		<label>
			Ingrese la cantidad de cuotas
			<input
				type="text"
				name="amountOfInstallments"
				placeholder="Cuotas"
				required
				value={data.spending.amount_of_installments}
			/>
		</label>
		<label>
			Fecha del gasto en cuotas
			<input
				type="datetime-local"
				name="date"
				placeholder="Fecha"
				required
				readonly
				value={data.spending.date}
			/>
		</label>
		<button>Crear</button>
		<button type="button" class="outline" on:click={() => history.back()}>Cancelar</button>
	</fieldset>
</form>
