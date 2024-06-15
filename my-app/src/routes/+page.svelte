<script lang="ts">
	import { routes } from '$lib';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<header>
	{#if data.user}
		<h3>Bienvenido, {data.user}</h3>
		<a role="button" href={routes.groups}>Ver mis grupos</a>
		<a role="button" class="outline" href={routes.logout}>Salir</a>
	{:else}
		<h2>Gestionar tus finanzas</h2>
		<h3>ahora es <em>muucho</em> más fácil</h3>
		<a role="button" href={routes.login}>Ingresar</a>
		<a role="button" class="outline" href={routes.register}>Registrarme</a>
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
