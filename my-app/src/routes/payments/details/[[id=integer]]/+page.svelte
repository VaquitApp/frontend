<script lang="ts">
	import { routes, title } from '$lib';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	export let members: User[] = [];

	async function updateMembers(groupId: Id) {
		members = [];
		if (groupId != 0) {
			try {
				const response = await fetch(`${routes.apiMembers}?groupId=${groupId}`);
				members = await response.json();
			} catch {}
		}
	}

	onMount(async () => {
		await updateMembers(data.groupId);
	});
</script>

<svelte:head>
	<title>{title} - Nuevo Pago</title>
</svelte:head>

<h2>Registrando Pago</h2>
<form method="POST">
	<fieldset>
		<label>
			Ingrese un grupo para el pago
			<select name="groupId" required value={data.groupId}>
				{#each data.groups as group}
					<option value={group.id}>{group.name}</option>
				{/each}
			</select>
		</label>
		<label>
			Ingrese el receptor del pago
			<select name="payeeId" required>
				{#each members as member}
					<option disabled={member.id === data.userId} value={member.id}>{member.email}</option>
				{/each}
			</select>
		</label>
		<label>
			Ingrese el monto del pago
			<input type="number" name="amount" placeholder="Monto" required />
		</label>
		<button>Crear</button>
		<button type="button" class="outline" on:click={() => history.back()}>Cancelar</button>
	</fieldset>
</form>
