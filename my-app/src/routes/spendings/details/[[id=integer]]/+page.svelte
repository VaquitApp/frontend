<script lang="ts">
	import { routes, title } from '$lib';
	import { onMount } from 'svelte';
	import type { PageServerData } from './$types';
	import { fixDateString, formatMoney } from '$lib/formatter';
	import { spendingType } from './spending-utils';

	export let data: PageServerData;
	let timezoneOffset = 0;
	let suggestions: Map<string, Spending> = new Map();
	let categories: Category[] = [];
	let type = spendingType.unique;

	$: isInstallment = type === spendingType.installment;

	async function onGroupUpdate(groupId: number) {
		await Promise.all([updateSuggestions(groupId), updateCategories(groupId)]);
	}

	async function updateSuggestions(groupId: number) {
		const newSuggestions: Map<string, Spending> = new Map();
		if (groupId != 0) {
			try {
				const response = await fetch(`${routes.apiSpendings}?groupId=${groupId}`);
				const body: Spending[] = await response.json();
				body.forEach((spending) => {
					newSuggestions.set(spending.description, spending);
				});
			} catch {}
		}
		suggestions = newSuggestions;
	}

	async function updateCategories(groupId: number) {
		if (groupId != 0) {
			try {
				const response = await fetch(`${routes.apiCategories}?groupId=${groupId}`);
				categories = await response.json();
				categories = categories.filter((category) => !category.is_archived);
				return;
			} catch {}
		}
		categories = [];
	}

	function autocomplete(value: string) {
		const spending = suggestions.get(value);
		if (!spending) return;
		data.spending.amount = spending.amount;
		data.spending.description = spending.description;
		data.spending.category_id = spending.category_id;
	}

	onMount(async () => {
		timezoneOffset = new Date().getTimezoneOffset();
		data.spending.date = fixDateString(data.spending.date, timezoneOffset).slice(0, 16);
		await onGroupUpdate(data.spending.group_id);
	});
</script>

<svelte:head>
	<title>{title} - Nuevo Gasto Unico</title>
</svelte:head>

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
				on:change={(e) => onGroupUpdate(+e.currentTarget.value)}
			>
				{#each data.groups as group}
					<option value={group.id}>{group.name}</option>
				{/each}
			</select>
		</label>
		<label>
			Ingrese la categoría a la que pertenece el gasto
			<select name="categoryId" required value={data.spending.category_id}>
				{#each categories as category}
					<option value={category.id}>{category.name}</option>
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
				{#each suggestions.values() as spending}
					<option value={spending.description}>{formatMoney(spending.amount)}</option>
				{/each}
			</datalist>
		</label>
		<fieldset class="grid">
			Seleccione una forma de pago
			<label>
				<input type="radio" name="type" value={spendingType.unique} bind:group={type} /> Único
			</label>
			<label>
				<input type="radio" name="type" value={spendingType.installment} bind:group={type} /> En Cuotas
			</label>
			<label>
				<input type="radio" name="type" value={spendingType.recurring} bind:group={type} /> Recurrente
			</label>
		</fieldset>
		<label>
			Ingrese un monto para {isInstallment ? 'las cuotas' : 'el gasto'}
			<input type="text" name="amount" placeholder="Monto" required value={data.spending.amount} />
		</label>
		{#if isInstallment}
			<label>
				Ingrese la cantidad de cuotas
				<input
					type="text"
					name="amountOfInstallments"
					placeholder="Cuotas"
					required={isInstallment}
				/>
			</label>
		{/if}
		<label>
			Fecha del gasto
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
