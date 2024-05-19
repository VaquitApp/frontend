<script lang="ts">
	import { title } from '$lib';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;
</script>

<svelte:head>
	<title>{title} - Nuevo Presupuesto</title>
</svelte:head>

<h2>Nuevo Presupuesto</h2>
<form method="POST">
	<fieldset>
		<label>
			Ingrese una descripción para el presupuesto
			<input type="text" name="description" placeholder="Descripción" required />
		</label>
		<label>
			Ingrese un monto para el presupuesto
			<input type="number" name="amount" placeholder="Monto" required />
		</label>
		<button>Crear</button>
		<button type="button" class="outline" on:click={() => history.back()}>Cancelar</button>
	</fieldset>
</form>
