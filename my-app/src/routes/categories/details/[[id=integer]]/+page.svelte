<script lang="ts">
	import { title } from '$lib';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>{title} - Nueva Categoría</title>
</svelte:head>

<nav aria-label="breadcrumb">
	<ul>
		<li><a href="/groups">Grupos</a></li>
		<li>Categorías</li>
	</ul>
</nav>

<h2>Nueva Categoría</h2>
<form method="POST">
	<fieldset>
		<label>
			Ingrese un grupo para la categoría
			<select name="groupId" required bind:value={data.category.group_id}>
				{#each data.groups as group}
					<option value={String(group.id)}>{group.name}</option>
				{/each}
			</select>
		</label>
		<label>
			Ingrese un nombre para la categoría
			<input type="text" name="name" placeholder="Nombre" required />
		</label>
		<label>
			Ingrese una descripción para la categoría
			<input type="text" name="description" placeholder="Description" required />
		</label>
		<button>Crear</button>
		<button type="button" class="outline" on:click={() => history.back()}>Cancelar</button>
	</fieldset>
</form>
