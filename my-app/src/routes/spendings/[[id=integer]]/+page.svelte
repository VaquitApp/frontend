<script lang="ts">
	import { title } from '$lib';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<svelte:head>
	<title>{title} - Nuevo Gasto</title>
</svelte:head>

<h2>Nuevo Gasto</h2>
<form method="POST">
	<fieldset>
		<label>
			Ingrese una descripción para el gasto
			<input type="text" name="description" placeholder="Descripción" required />
		</label>
		<label>
			Ingrese un monto para el gasto
			<input type="text" name="amount" placeholder="Monto" required />
		</label>
		<label>
			Ingrese el grupo al que pertenece el gasto
			<select name="group_id" required value={data.spending.group_id}>
				{#each data.groups as group}
					<option value={group.id}>{group.name}</option>
				{/each}
			</select>
		</label>
		<button>Crear</button>
		<button type="button" class="outline" on:click={() => history.back()}>Cancelar</button>
	</fieldset>
</form>
