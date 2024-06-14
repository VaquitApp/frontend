<script lang="ts">
	import { routes, title } from '$lib';
	import BalanceDisplay from '$lib/components/BalanceDisplay.svelte';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<svelte:head>
	<title>{title} - {data.group.name}</title>
</svelte:head>

<nav aria-label="breadcrumb">
	<ul>
		<li><a href={routes.groups}>Grupos</a></li>
		<li><a href="{routes.groupMovements}/{data.group.id}">{data.group.name}</a></li>
		<li>Saldos por categoría</li>
	</ul>
</nav>

<header>
	<h2>Saldos por categoría</h2>
	<p>{data.group.description}</p>
</header>

{#each data?.categoryBalances as balance}
	<article>
		<header class="row jc-space-between">
			<p>
				<b>{balance.categoryName}</b> -
				{balance.categoryDescription}
			</p>
		</header>
		<BalanceDisplay {balance} />
	</article>
{/each}
