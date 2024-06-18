<script lang="ts">
	import { routes, strategies, title } from '$lib';
	import { onMount } from 'svelte';
	import type { ActionData, PageData } from './$types';
	import { fixDateString, formatMoney } from '$lib/formatter';
	import { spendingType } from './spending-utils';
	import Avatar from '$lib/components/Avatar.svelte';

	export let form: ActionData;
	export let data: PageData;
	let timezoneOffset = 0;
	let suggestions: Map<string, Spending> = new Map();
	let categories: Category[] = [];
	let members: User[] = [];
	let distribution: Distribution[] = [];
	let type = spendingType.unique;
	let strategy: Strategy;

	$: isInstallment = type === spendingType.installment;
	$: strategy =
		categories.find((c) => c.id === data.spending.category_id)?.strategy || 'equalparts';
	$: distributionValueText = strategy === 'percentage' ? 'Porcentaje' : 'Monto';
	$: total = sum(distribution.map((d) => getSubtotal(d.value)));

	async function onGroupUpdate(groupId: number) {
		await Promise.all([
			updateSuggestions(groupId),
			updateCategories(groupId),
			updaterMembers(groupId)
		]);
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
			} catch {
				//
			}
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
			} catch {
				//
			}
		}
		categories = [];
	}

	async function updaterMembers(groupId: number) {
		if (groupId != 0) {
			try {
				const response = await fetch(`${routes.apiMembers}?groupId=${groupId}`);
				members = await response.json();
				distribution = members.map(({ id: user_id }) => ({ user_id, value: 0 }));
				return;
			} catch {
				//
			}
		}
		members = [];
		distribution = [];
	}

	function autocomplete(value: string) {
		const spending = suggestions.get(value);
		if (!spending) return;
		data.spending.amount = spending.amount;
		data.spending.description = spending.description;
		data.spending.category_id = spending.category_id;
	}

	function getSubtotal(aValue: number) {
		if (strategy === 'percentage') {
			return (aValue / 100) * data.spending.amount;
		}
		return aValue;
	}

	function sum(values: number[]) {
		return values.reduce((acc, value) => acc + value, 0);
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

{#if form && form.success}
	Ocurrió un error
{/if}

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
			<select name="categoryId" required bind:value={data.spending.category_id}>
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
			<input
				type="text"
				name="amount"
				placeholder="Monto"
				required
				bind:value={data.spending.amount}
			/>
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
		{#if strategy}
			<label>
				Estrategia
				<input type="text" readonly value={strategies[strategy]} />
			</label>
			{#if strategy === 'percentage' || strategy === 'custom'}
				<table>
					<thead>
						<tr>
							<th>Miembro</th>
							<th>{distributionValueText}</th>
							<th class="t-right">Subtotal</th>
						</tr>
					</thead>
					<tbody>
						{#each members as member, i}
							{@const subtotal = getSubtotal(distribution[i].value)}
							<tr>
								<td>
									<Avatar seed={member.email} size={40} />
									{member.email}
								</td>
								<td>
									<input
										class="t-right"
										type="number"
										name="distribution[{i}].value"
										placeholder={distributionValueText}
										bind:value={distribution[i].value}
									/>
									<input type="hidden" name="distribution[{i}].user_id" value={member.id} />
								</td>
								<td class="t-right {subtotal > data.spending.amount ? 'invalid' : ''}">
									{formatMoney(subtotal)}
								</td>
							</tr>
						{/each}
					</tbody>
					<tfoot>
						<tr>
							<th>Total</th>
							<td class="t-right">{sum(distribution.map((d) => d.value))}</td>
							<td class="t-right {total !== data.spending.amount ? 'invalid' : ''}">
								{formatMoney(total)}
							</td>
						</tr>
					</tfoot>
				</table>
			{/if}
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
