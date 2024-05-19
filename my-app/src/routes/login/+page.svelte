<script>
	import { title } from '$lib';
</script>

<svelte:head>
	<title>{title} - Login</title>
</svelte:head>

<form method="POST">
	<fieldset>
		<label>
			Ingrese su email
			<input type="email" name="email" placeholder="Email" required />
		</label>
		<label>
			Ingrese su contraseña
			<input type="password" name="password" placeholder="Contaseña" required />
			<a href="/recover">Olvidé mi contraseña</a>
		</label>
	</fieldset>

	<button type="submit">Ingresar</button>
	<a href="/register">Registrarme</a>
</form>
