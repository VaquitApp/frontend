<script lang="ts">
	import { title, getUserEmailById } from '$lib';
	import { formatDateInput } from '$lib/formatter';
	import type { PageData } from './$types';
	import CssIcon from '$lib/components/CssIcon.svelte';

	export let data: PageData;
	const payment: Payment = data.currentPayment;
	const emisor: string = getUserEmailById(data.members, payment.from_id);
	const receptor: string = getUserEmailById(data.members, payment.to_id);
	const pageTitle = `Pagos`;
</script>

<svelte:head>
	<title>{title} - {pageTitle}</title>
</svelte:head>

<header>
	<hgroup>
		<h2>Informacion del Pago</h2>
	</hgroup>
</header>
<form method="POST">
	<fieldset>
		<label class="hidden-field">
			ID del Grupo
			<input type="text" name="groupId" value={payment.group_id} required disabled />
		</label>
		<label>
			Emisor del Pago
			<input type="text" name="payer" value={emisor} disabled />
		</label>
		<label>
			Receptor del Pago
			<input type="text" name="payee" value={receptor} disabled />
		</label>
		<label>
			Monto del Pago
			<input type="text" name="amount" value={payment.amount} disabled />
		</label>
		<label>
			Fecha del Pago
			<input type="text" name="date" value={formatDateInput(payment.date)} disabled />
		</label>
		{#if payment.to_id == data.currentUserId && !payment.confirmed}
			<button>
				<CssIcon name="check-o" />
				Confirmar Pago
			</button>
		{/if}
		<button type="button" class="outline" on:click={() => history.back()}>
			<CssIcon name="arrow-left" />
			Volver
		</button>
	</fieldset>
</form>

<style>
	.hidden-field {
		visibility: hidden;
		display: none;
	}
</style>
