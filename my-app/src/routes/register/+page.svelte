<script>
	import { title } from '$lib';
</script>

<svelte:head>
	<title>{title} - Registro</title>
</svelte:head>

<form method="POST">
	<fieldset>
		<label>
			Ingrese su email
			<input type="email" name="email" placeholder="Email" />
		</label>
		<label>
			Ingrese una contraseña
			<input type="password" name="password1" placeholder="Contraseña" />
		</label>
		<label>
			Vuelva a repetir su contraseña
			<input type="password" name="password2" placeholder="Contraseña" />
		</label>
	</fieldset>
	<button type="submit"> Registrarse </button>
	<a href="/login">Ya tengo una cuenta</a>
</form>
