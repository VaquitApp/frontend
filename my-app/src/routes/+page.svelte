<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<header>
	<h2>Gestionar tus finanzas</h2>
	<h3>ahora es <em>mooocho</em> más fácil</h3>
	{#if data.user}
		<a role="button" href="/groups">Ir a Grupos</a>
		<a role="button" class="outline" href="/logout">Salir</a>
	{:else}
		<a role="button" href="/login">Ingresar</a>
		<a role="button" class="outline" href="/register">Registrarme</a>
	{/if}
</header>

<style>
	header {
		text-align: center;
	}

	header h2 {
		font-size: 4em;
	}

	header h3 {
		font-size: 3em;
	}
</style>
