<script lang="ts">
	import { title } from '$lib';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const edit = data.budget.id !== 0;
	let timezoneOffset = 0;

	onMount(() => {
		timezoneOffset = new Date().getTimezoneOffset();
	});
</script>

<svelte:head>
	<title>{title} - Nuevo Presupuesto</title>
</svelte:head>

<h2>
	{#if edit}Editando{:else}Creando{/if} Presupuesto
</h2>
<form method="POST">
	<fieldset>
		<input type="hidden" name="timezoneOffset" bind:value={timezoneOffset} required />
		<label>
			Ingrese el grupo al que pertenece el presupuesto
			<select name="groupId" required value={data.budget.group_id}>
				{#each data.groups as group}
					<option value={group.id}>{group.name}</option>
				{/each}
			</select>
		</label>
		<label>
			Ingrese una descripción
			<input
				type="text"
				name="description"
				placeholder="Descripción"
				value={data.budget.description || ''}
			/>
		</label>
		<label>
			Ingrese un monto
			<input type="number" name="amount" placeholder="Monto" value={data.budget.amount} required />
		</label>
		<label>
			Ingrese la fecha de inicio del presupuesto
			<input
				type="datetime-local"
				name="startDate"
				placeholder="Fecha"
				value={data.budget.start_date}
				required
			/>
		</label>
		<label>
			Ingrese la fecha de fin del presupuesto
			<input
				type="datetime-local"
				name="endDate"
				placeholder="Fecha"
				value={data.budget.end_date}
			/>
		</label>
		{#if edit}
			<button>Editar</button>
		{:else}
			<button>Crear</button>
		{/if}
		<button type="button" class="outline" on:click={() => history.back()}>Cancelar</button>
	</fieldset>
</form>
