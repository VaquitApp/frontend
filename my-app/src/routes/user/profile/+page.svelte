<script lang="ts">
	import type { ActionData, PageData } from './$types.js';

	export let data: PageData;
	export let form: ActionData;
</script>

<header>
	<hgroup>
		<h2>Perfil</h2>
		<p>
			{#if form == undefined}
				Actualice sus datos personales
			{:else if form.success}
				¡Tus datos ya se encuentran actualizados!
			{:else}
				Ocurrió un error
			{/if}
		</p>
	</hgroup>
</header>

<form method="POST">
	<fieldset>
		<label>
			<input type="text" name="email" placeholder="Email" readonly value={data.user} />
		</label>
		<label>
			Ingrese el CBU/CVU de su cuenta bancaria
			<input type="text" name="cbu" placeholder="CBU/CVU" value={data.profile.cbu} />
		</label>
		<label>
			Ingrese el alias de su cuenta bancaria
			<input type="text" name="alias" placeholder="Alias" value={data.profile.alias} />
		</label>
	</fieldset>
	<button type="submit">Guardar</button>
</form>
