<script lang="ts">
	import { title } from '$lib';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>{title} - Nuevo Grupo</title>
</svelte:head>

<h2>Nuevo Grupo</h2>
<form method="POST">
	<fieldset>
		<label>
			Ingrese un nombre para el grupo
			<input type="text" name="name" value={data.group.name} placeholder="Nombre" required />
		</label>
		<label>
			Ingrese una descripción para el grupo
			<input
				type="text"
				name="description"
				value={data.group.description}
				placeholder="Descripcion"
				required
			/>
		</label>
		<button>Crear</button>
		<button type="button" class="outline" on:click={() => history.back()}>Cancelar</button>
	</fieldset>
</form>
