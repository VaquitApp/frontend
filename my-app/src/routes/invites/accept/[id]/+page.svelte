<script lang="ts">
	import { routes, title } from '$lib';
	import type { PageData } from './$types';

	export let data: PageData;
	const pageTitle = `Unirse`;
</script>

<svelte:head>
	<title>{title} - {pageTitle}</title>
</svelte:head>

<nav aria-label="breadcrumb">
	<ul>
		<li><a href={routes.groups}>Grupos</a></li>
		<li>Invitaciones</li>
		<li>Aceptar</li>
	</ul>
</nav>

<h2>¡Has sido Invitad@ a un grupo!</h2>
<form method="POST">
	<fieldset>
		<!--TODO: TRAERNOS DATOS DEL GRUPO..-->
		<label>
			ID del Grupo
			<input type="text" name="group_id" value={data.invite.group_id} disabled />
		</label>
		<label>
			Token de la Invitación
			<input type="text" name="token" value={data.invite.token} disabled />
		</label>
		<button>Unirse</button>
		<button type="button" class="outline" on:click={() => history.back()}>Cancelar</button>
	</fieldset>
</form>
