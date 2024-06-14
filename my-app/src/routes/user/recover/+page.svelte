<script>
	import { routes } from '$lib';
</script>

<form method="POST">
	<fieldset>
		<label>
			Ingrese su email
			<input type="text" name="email" placeholder="Email" required />
		</label>
	</fieldset>
	<button type="submit"> Enviar </button>
	<a href={routes.register}>Registrarme</a>
</form>
