<script lang="ts">
	import { title } from '$lib';
	import { confirmArchiveGroup } from '$lib/client/alerts';
	import type { PageData } from './$types';

	export let data: PageData;
	const edit = data.group.id !== 0;

	const pageTitle = `${edit ? 'Editando' : 'Creando'} Grupo`;
</script>

<svelte:head>
	<title>{title} - {pageTitle}</title>
</svelte:head>

<header>
	<hgroup>
		<h2>{pageTitle}</h2>
	</hgroup>
</header>

<form method="POST">
	<fieldset>
		<label>
			Ingrese un nombre para el grupo
			<input type="text" name="name" placeholder="Nombre" required value={data.group.name} />
		</label>
		<label>
			Ingrese una descripción para el grupo
			<input
				type="text"
				name="description"
				placeholder="Descripción"
				required
				value={data.group.description}
			/>
		</label>
		<button>Guardar</button>
		{#if edit}
			<button type="button" class="contrast" on:click={() => confirmArchiveGroup(data.group)}>
				Archivar
			</button>
		{/if}
		<button type="button" class="outline" on:click={() => history.back()}>Cancelar</button>
	</fieldset>
</form>
