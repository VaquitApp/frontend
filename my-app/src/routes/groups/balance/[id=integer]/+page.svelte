<script lang="ts">
	import { title } from '$lib';
	import { formatMoney } from '$lib/formatter';
	import type { PageServerData } from './$types';

	export let data: PageServerData;

	// Green for positive, red for negative, default for zero
	export function balanceColor(balance: number) {
		return balance > 0 ? '#056517' : balance < 0 ? '#bf1029' : null;
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

{#each data?.memberBalances as { email, balance }}
	<article class="grid">
		<p>{email}</p>
		<p class="text-right" style="color: {balanceColor(balance)}">{formatMoney(balance)}</p>
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
</style>
