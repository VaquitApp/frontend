<script>
	import { routes, title } from '$lib';
</script>

<svelte:head>
	<title>{title} - Registro</title>
</svelte:head>

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
	<a href={routes.login}>Ya tengo una cuenta</a>
</form>
