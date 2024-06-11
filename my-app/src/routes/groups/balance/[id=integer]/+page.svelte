<script lang="ts">
	import { title } from '$lib';
	import { formatMoney } from '$lib/formatter';
	import { BELL_SVG, INFO_SVG } from '$lib/svgs';
	import type { PageServerData } from './$types';

	export let data: PageServerData;

	// Green for positive, red for negative, default for zero
	export function balanceColor(balance: number) {
		return balance > 0 ? '#056517' : balance < 0 ? '#bf1029' : null;
	}
	export const personalBalanceTooltip =
		data?.userBalance < 0
			? 'Les debes dinero'
			: data?.userBalance > 0
				? 'Te deben dinero'
				: 'Están a mano';

	export function balanceTooltip(balance: number) {
		return balance > 0 ? 'Le debes dinero' : balance < 0 ? 'Te debe dinero' : 'Están a mano';
	}
</script>

<svelte:head>
	<title>{title} - {data.group.name}</title>
</svelte:head>

<nav aria-label="breadcrumb">
	<ul>
		<li><a href="/groups">Grupos</a></li>
		<li><a href="/groups/movements/{data.group.id}">{data.group.name}</a></li>
		<li>Estado de cuenta grupal</li>
	</ul>
</nav>

<header class="row">
	<div>
		<h2>Estado de cuenta grupal</h2>
	</div>
</header>

<article class="grid">
	<p>Tu balance</p>
	<p class="text-right">
		<span style="color: {balanceColor(data?.userBalance)}">{formatMoney(data?.userBalance)}</span>
		<span class="no-underline" data-tooltip={personalBalanceTooltip}>{@html INFO_SVG}</span>
	</p>
</article>

{#each data?.balances as { email, balance }}
	<article class="grid">
		<p>
			{email}
			<button
				class="outline secondary bell"
				data-tooltip="Enviar recordatorio"
				disabled={balance >= 0}
				on:click={() => alert('WIP')}>{@html BELL_SVG}</button
			>
		</p>
		<p class="text-right">
			<span style="color: {balanceColor(balance)}">{formatMoney(balance)}</span>
			<span class="no-underline" data-tooltip={balanceTooltip(balance)}>{@html INFO_SVG}</span>
		</p>
	</article>
{/each}

<style>
	.row {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.text-right {
		text-align: right;
	}

	.no-underline {
		border-bottom: 0px;
	}

	.bell {
		width: 32px;
		padding: 0px;
	}
</style>
