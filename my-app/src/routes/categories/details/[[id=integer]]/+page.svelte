<script lang="ts">
	import { goto } from '$app/navigation';
	import { routes, strategies, title } from '$lib';
	import CssIcon from '$lib/components/CssIcon.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const edit = data.category.id !== 0;
	const isArchived = data.category.is_archived;
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
<form method="POST" action="?/update">
	<fieldset>
		<label>
			Ingrese un grupo para la categoría
			<select name="groupId" required disabled={isArchived} value={data.category.group_id}>
				{#each data.groups as group}
					<option disabled={edit && group.id !== data.category.group_id} value={group.id}
						>{group.name}</option
					>
				{/each}
			</select>
		</label>
		<label>
			Ingrese un nombre para la categoría
			<input
				type="text"
				name="name"
				placeholder="Nombre"
				required
				disabled={isArchived}
				value={data.category.name}
			/>
		</label>
		<label>
			Ingrese una descripción para la categoría
			<input
				type="text"
				name="description"
				placeholder="Description"
				required
				disabled={isArchived}
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
			{#if isArchived}
				<button class="contrast" formaction="?/unarchive">
					<CssIcon name="lock-unlock" />
					Desarchivar
				</button>
			{:else}
				<button>Editar</button>
				<button class="outline contrast" formaction="?/archive">
					<CssIcon name="lock" />
					Archivar
				</button>
			{/if}
		{:else}
			<button>Crear</button>
		{/if}
		<button
			type="button"
			class="outline"
			on:click={() => goto(routes.groupMovements(data.category.group_id))}>Volver</button
		>
	</fieldset>
</form>
