<script lang="ts">
	import { routes, title } from '$lib';
	import { confirmArchiveGroup } from '$lib/client/alerts';
	import CssIcon from '$lib/components/CssIcon.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const activeGroups = data.groups.filter((g) => !g.is_archived);
	const archivedGroups = data.groups.filter((g) => g.is_archived);
</script>

<svelte:head>
	<title>{title} - Grupos</title>
</svelte:head>

<header class="row jc-space-between">
	<div>
		<h2>Grupos</h2>
		<p>Ingrese a un grupo para poder ver sus movimientos y agregar nuevos</p>
	</div>
	<div>
		<details class="dropdown">
			<!-- svelte-ignore a11y-no-redundant-roles -->
			<summary role="button">Opciones</summary>
			<ul dir="rtl">
				<li><a href={routes.groupDetails}>Añadir grupo</a></li>
				<li><a href={routes.spendingDetails}>Añadir gasto</a></li>
				<li><a href={routes.budgetDetails}>Añadir presupuesto</a></li>
				<li><a href={routes.categoryDetails}>Añadir categoría</a></li>
			</ul>
		</details>
	</div>
</header>
<main>
	{#if !data.groups.length}
		<article class="t-center">
			<p>Todavía no pertenece a ningún grupo. ¿Por qué no crea uno?</p>
			<a href={routes.groupDetails}>Crear un nuevo grupo</a>
		</article>
	{/if}
	{#each activeGroups as group}
		<article>
			<header>
				<strong>
					{group.name}
				</strong>
			</header>
			<p>{group.description}</p>
			<footer class="grid">
				<a href="{routes.groupMovements}/{group.id}" role="button" class="outline">
					<CssIcon name="enter" />
					Moovimientos</a
				>
				<a href="{routes.groupMembers}/{group.id}" role="button" class="outline secondary">
					<CssIcon name="user-list" />
					Miembros
				</a>
				<a href="{routes.groupDetails}/{group.id}" role="button" class="outline secondary">
					<CssIcon name="pen" />
					Editar
				</a>
				<button class="outline contrast" on:click={() => confirmArchiveGroup(group)}>
					<CssIcon name="lock" />
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
						<CssIcon name="lock-unlock" />
						Desarchivar {group.name}
					</button>
				{/each}
			</details>
		</article>
	{/if}
</main>
