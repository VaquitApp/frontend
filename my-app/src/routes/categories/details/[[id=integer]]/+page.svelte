<script lang="ts">
	import { title } from '$lib';
</script>

<svelte:head>
	<title>{title} - Nueva Categoría</title>
</svelte:head>

<h2>Nueva Categoría</h2>
<form method="POST">
	<fieldset>
		<label>
			Ingrese un nombre para la categoría
			<input type="text" name="name" placeholder="Nombre" required />
		</label>
		<button>Crear</button>
		<button type="button" class="outline" on:click={() => history.back()}>Cancelar</button>
	</fieldset>
</form>
