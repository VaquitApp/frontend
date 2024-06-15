<script lang="ts">
	import { title } from '$lib';
	import type { PageData } from './$types';

	export let data: PageData;
	const pageTitle = `Unirse`;
</script>

<svelte:head>
	<title>{title} - {pageTitle}</title>
</svelte:head>

<header>
	<hgroup>
		<h2>¡Has sido Invitad@ a un grupo!</h2>
	</hgroup>
</header>

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
