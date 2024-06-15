<script lang="ts">
	import { routes, title } from '$lib';
	import Avatar from '$lib/components/Avatar.svelte';
	import CssIcon from '$lib/components/CssIcon.svelte';
	import { formatMoney } from '$lib/formatter';
	import type { PageData } from './$types';

	export let data: PageData;

	export let popupEmail: string = '';
	export let message: string = '';

	// Green for positive, red for negative, default for zero
	export function balanceColor(balance: number) {
		return balance > 0 ? '#056517' : balance < 0 ? '#bf1029' : null;
	}
	export const personalBalanceTooltip = balanceTooltip(data.userBalance);

	export function balanceTooltip(balance: number) {
		return balance > 0 ? 'Debe dinero' : balance < 0 ? 'Se le debe dinero' : 'Sin deudas';
	}

	export async function sendReminder() {
		const headers = { 'content-type': 'application/json' };
		const body = JSON.stringify({ receiver_email: popupEmail, message, group_id: data.group.id });
		await fetch(routes.apiReminders, { method: 'POST', body, headers });
		popupEmail = '';
		message = '';
	}
</script>

<svelte:head>
	<title>{title} - {data.group.name}</title>
</svelte:head>

<header>
	<hgroup>
		<h2>Estado de cuenta grupal</h2>
	</hgroup>
</header>

<article class="grid">
	<p>Tu balance</p>
	<p class="t-right">
		<span style="color: {balanceColor(data?.userBalance)}">{formatMoney(data?.userBalance)}</span>
		<span class="no-underline" data-tooltip={personalBalanceTooltip}>
			<CssIcon name="info" />
		</span>
	</p>
</article>

<dialog open={popupEmail !== ''}>
	<article>
		<header>
			<p>
				<strong>🔔 Enviando recordatorio de pago</strong>
			</p>
		</header>
		<p>El recordatorio se enviará a {popupEmail}, junto con el mensaje:</p>
		<textarea
			name="message"
			placeholder="Mensaje (opcional)"
			cols="40"
			rows="2"
			maxlength="255"
			bind:value={message}
		/>
		<footer>
			<button class="secondary" on:click={() => (popupEmail = '')}>Cancelar</button>
			<button on:click={sendReminder}>Enviar</button>
		</footer>
	</article>
</dialog>

{#each data?.balances as { email, balance }}
	<article class="grid">
		<p>
			<Avatar seed={email} size={40} />
			{email}
			<button
				class="outline secondary btn-sm"
				data-tooltip="Enviar recordatorio"
				disabled={balance >= 0}
				on:click={() => (popupEmail = email)}
			>
				<CssIcon name="bell" />
			</button>
		</p>
		<p class="t-right">
			<span style="color: {balanceColor(balance)}">{formatMoney(balance)}</span>
			<span class="no-underline" data-tooltip={balanceTooltip(balance)}>
				<CssIcon name="info" />
			</span>
		</p>
	</article>
{/each}

<style>
	.no-underline {
		border-bottom: 0px;
	}
</style>
