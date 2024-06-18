<script lang="ts">
	import { strategies, title } from '$lib';
	import type { PageData } from './$types';

	export let data: PageData;

	const edit = data.category.id !== 0;
</script>

<svelte:head>
	{#if edit}
		<title>{title} - Nueva Categoría</title>
	{:else}
		<title>{title} - Editar Categoría</title>
	{/if}
</svelte:head>

<h2>
	{#if edit}Editando{:else}Creando{/if} Categoría
</h2>
<form method="POST">
	<fieldset>
		<label>
			Ingrese un grupo para la categoría
			<select name="groupId" required value={data.category.group_id}>
				{#each data.groups as group}
					<option disabled={edit && group.id !== data.category.group_id} value={group.id}
						>{group.name}</option
					>
				{/each}
			</select>
		</label>
		<label>
			Ingrese un nombre para la categoría
			<input type="text" name="name" placeholder="Nombre" required value={data.category.name} />
		</label>
		<label>
			Ingrese una descripción para la categoría
			<input
				type="text"
				name="description"
				placeholder="Description"
				required
				value={data.category.description}
			/>
		</label>
		<label>
			Elija una estrategia de distribución de gastos por default
			<select name="stategy" value={data.category.strategy}>
				{#each Object.entries(strategies) as [strategy, description]}
					<option value={strategy}>{description}</option>
				{/each}
			</select>
		</label>
		{#if edit}
			<button>Editar</button>
		{:else}
			<button>Crear</button>
		{/if}
		<button type="button" class="outline" on:click={() => history.back()}>Cancelar</button>
	</fieldset>
</form>
