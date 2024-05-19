<script lang="ts">
	import { title } from '$lib';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>{title} - Nuevo Presupuesto</title>
</svelte:head>

<h2>
	{#if data?.editing}Editando{:else}Creando{/if} Presupuesto
</h2>
<form method="POST">
	<fieldset>
		<label>
			Ingrese una descripción
			<input
				type="text"
				name="description"
				placeholder="Descripción"
				value={data?.budget.description || ''}
			/>
		</label>
		<label>
			Ingrese un monto
			<input type="number" name="amount" placeholder="Monto" value={data?.budget.amount} required />
		</label>
		{#if data?.editing}
			<button>Editar</button>
		{:else}
			<button>Crear</button>
		{/if}
		<button type="button" class="outline" on:click={() => history.back()}>Cancelar</button>
	</fieldset>
</form>
