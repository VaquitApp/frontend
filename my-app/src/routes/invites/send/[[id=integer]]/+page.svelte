<script lang="ts">
	import { routes } from '$lib';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>{data.group.name} - Invitar</title>
</svelte:head>

<header>
	<hgroup>
		<h2>Invitar Usuario a {data.group.name}</h2>
	</hgroup>
</header>

<form method="POST" action="?/submit">
	<fieldset>
		<label>
			Ingrese el email de la persona a ser invitada
			<input type="text" name="email" placeholder="Email Invitado" required />
		</label>
		<button>Invitar</button>
		<button type="button" class="outline" on:click={() => history.back()}>Cancelar</button>
		<button class="secondary" formaction="?/devSubmit">Agregar al grupo (dev)</button>
	</fieldset>
</form>
