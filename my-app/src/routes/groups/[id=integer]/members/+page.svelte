<script lang="ts">
	import { routes } from '$lib';
	import { confirmLeaveGroup } from '$lib/client/alerts';
	import Avatar from '$lib/components/Avatar.svelte';
	import CssIcon from '$lib/components/CssIcon.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const pageTitle = `Miembros`;

	const isOwner = data?.group?.owner_id === data?.userId;
</script>

<svelte:head>
	<title>{data.group.name} - {pageTitle}</title>
</svelte:head>

<header class="row jc-space-between mb">
	<hgroup>
		<h2>Miembros de {data.group.name}</h2>
	</hgroup>
	<div>
		<a href="{routes.sendInvite}/{data.group.id}" role="button">
			<CssIcon name="user-add" />
			Invitar
		</a>
	</div>
</header>

{#each data.members as user}
	{@const isActiveUser = data?.userId === user.id}
	<article class="grid ai-center">
		<div>
			<Avatar seed={user.email} size={40} />
			{user.email}
		</div>
		<div>
			<div>
				CBU / CVU:
				{user.cbu}
			</div>
			<div>
				Alias:
				{user.alias}
			</div>
		</div>
		<div class="t-right">
			{#if !isOwner && isActiveUser}
				<button class="outline" on:click={() => confirmLeaveGroup(data?.group)}>
					<CssIcon name="log-out" />
					Abandonar grupo
				</button>
			{/if}
		</div>
	</article>
{/each}
