<script lang="ts">
	import { title } from '$lib';
	import type { PageData } from './$types';

	export let data: PageData;
	const edit = data.group.id !== 0;
</script>

<svelte:head>
	<title>{title} - Nuevo Grupo</title>
</svelte:head>

<h2>
	{#if edit}Editando{:else}Creando{/if} Grupo
</h2>
<form method="POST">
	<fieldset>
		<label>
			Ingrese un nombre para el grupo
			<input type="text" name="name" value={data?.group.name} placeholder="Nombre" required />
		</label>
		<label>
			Ingrese una descripción para el grupo
			<input
				type="text"
				name="description"
				value={data?.group.description}
				placeholder="Descripción"
				required
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
