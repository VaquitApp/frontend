<script>
	import { routes, title } from '$lib';
	import GoogleSigninButton from '$lib/components/google/GoogleSigninButton.svelte';
</script>

<svelte:head>
	<title>{title} - Login</title>
</svelte:head>

<header>
	<h2>Iniciar sesión</h2>
	<p>Ingrese los datos cargados al momento de registrarse</p>
</header>

<article>
	<form method="POST">
		<fieldset>
			<label>
				Ingrese su email
				<input type="email" name="email" placeholder="Email" required />
			</label>
			<label>
				Ingrese su contraseña
				<input type="password" name="password" placeholder="Contaseña" required />
			</label>
		</fieldset>

		<button type="submit">Ingresar</button>
		<div><GoogleSigninButton /></div>
		<a href={routes.register}>Registrarme</a>
	</form>
</article>
