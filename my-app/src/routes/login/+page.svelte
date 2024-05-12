<script>
	import { title } from '$lib';

	/** @type {import('./$types').ActionData} */
	export let form;
</script>

<svelte:head>
	<title>{title} - Login</title>
</svelte:head>

{#if form?.success}
	<!-- this message is ephemeral; it exists because the page was rendered in
		   response to a form submission. it will vanish if the user reloads -->
	<p>Successfully logged in!</p>
{:else}
	<form method="POST">
		<fieldset>
			<label>
				Ingrese su email
				<input type="email" name="email" placeholder="Email" />
			</label>
			<label>
				Ingrese su contraseña
				<input type="password" name="password" placeholder="Contaseña" />
				<a href="/recover">Olvidé mi contraseña</a>
			</label>
		</fieldset>

		<button type="submit">Ingresar</button>
		<a href="/register">Registrarme</a>
	</form>
{/if}
