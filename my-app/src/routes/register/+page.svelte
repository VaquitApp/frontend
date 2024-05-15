<script>
	import { title } from '$lib';

	/** @type {import('./$types').ActionData} */
	export let form;
</script>

<svelte:head>
	<title>{title} - Registro</title>
</svelte:head>

{#if form?.success}
	<!-- this message is ephemeral; it exists because the page was rendered in
		   response to a form submission. it will vanish if the user reloads -->
	<p>Successfully registered!</p>
{:else}
	<form method="POST">
		<fieldset>
			<label>
				Ingrese su email
				<input type="email" name="email" placeholder="Email" required />
			</label>
			<label>
				Ingrese una contraseña
				<input type="password" name="password1" placeholder="Contraseña" required />
			</label>
			<label>
				Vuelva a repetir su contraseña
				<input type="password" name="password2" placeholder="Contraseña" required />
			</label>
		</fieldset>
		<button type="submit"> Registrarse </button>
		<a href="/login">Ya tengo una cuenta</a>
	</form>
{/if}
