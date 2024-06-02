<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>{data.group.name} - Invitar</title>
</svelte:head>

<nav aria-label="breadcrumb">
	<ul>
		<li><a href="/groups">Grupos</a></li>
		<li><a href="/groups/members/{data.group.id}">Miembros</a></li>
		<li>Invitar</li>
	</ul>
</nav>

<h2>Invitar Usuario a {data.group.name}</h2>
<form method="POST">
	<fieldset>
		<label>
			Ingrese el email de la persona a ser invitada
			<input type="text" name="email" placeholder="Email Invitado" required />
		</label>
		<button>Invitar</button>
		<button type="button" class="outline" on:click={() => history.back()}>Cancelar</button>
	</fieldset>
</form>
