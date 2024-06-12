<script lang="ts">
	import { title } from '$lib';
	import { confirmArchiveGroup } from '$lib/client/alerts';
	import { pencil_svg } from '$lib/svgs';
	import type { PageData } from './$types';

	export let data: PageData;
	const activeGroups = data.groups.filter((g) => !g.is_archived);
	const archivedGroups = data.groups.filter((g) => g.is_archived);
</script>

<svelte:head>
	<title>{title} - Grupos</title>
</svelte:head>

<header class="row">
	<div>
		<h2>Grupos</h2>
		<p>Ingrese a un grupo para poder ver sus movimientos y agregar nuevos</p>
	</div>
	<div>
		<details class="dropdown">
			<!-- svelte-ignore a11y-no-redundant-roles -->
			<summary role="button">Opciones</summary>
			<ul>
				<li><a href="/groups/details">Añadir grupo</a></li>
				<li><a href="/unique_spendings/details">Añadir gasto unico</a></li>
				<li><a href="/installment_spendings/details">Añadir gasto en cuotas</a></li>
				<li><a href="/recurring_spendings/details">Añadir gasto recurrente</a></li>
				<li><a href="/budgets/details">Añadir presupuesto</a></li>
				<li><a href="/categories/details">Añadir categoría</a></li>
			</ul>
		</details>
	</div>
</header>
<main>
	{#if !data.groups.length}
		<article class="centered">
			<p>Todavía no pertenece a ningún grupo. ¿Por qué no crea uno?</p>
			<a href="/groups/details">Crear un nuevo grupo</a>
		</article>
	{/if}
	{#each activeGroups as group}
		<article>
			<header class="row">
				<b style="padding: 15px">{group.name}</b>
				<a class="secondary" href="/groups/details/{group.id}" role="button"
					>{@html pencil_svg(25, 25)}</a
				>
			</header>
			<p>{group.description}</p>
			<footer class="grid">
				<a href="/groups/movements/{group.id}" role="button" class="outline">Ver moovimientos</a>
				<a href="/groups/details/{group.id}" role="button" class="outline secondary">
					Editar grupo
				</a>
				<a href="/groups/members/{group.id}" role="button" class="outline secondary"> Miembros </a>
				<button class="outline contrast" on:click={() => confirmArchiveGroup(group)}>
					Archivar
				</button>
			</footer>
		</article>
	{/each}

	{#if archivedGroups.length}
		<article>
			<details>
				<summary> Archivados </summary>
				{#each archivedGroups as group}
					<button class="outline contrast" on:click={() => confirmArchiveGroup(group)}>
						Desarchivar {group.name}
					</button>
				{/each}
			</details>
		</article>
	{/if}
</main>

<style>
	.row {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.centered {
		text-align: center;
	}
</style>
