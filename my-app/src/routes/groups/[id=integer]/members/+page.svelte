<script lang="ts">
	import { routes } from '$lib';
	import { confirmLeaveGroup } from '$lib/client/alerts';
	import Avatar from '$lib/components/Avatar.svelte';
	import CssIcon from '$lib/components/CssIcon.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const pageTitle = `Miembros`;

	function leaveGroup() {
		confirmLeaveGroup(data.group);
		console.log('left');
	}
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
	<article class="grid ai-center">
		<span class="centered">
			<Avatar seed={user.email} size={40} />
			{user.email}
		</span>

		{#if data?.userId == user.id && data?.group?.owner_id != user.id}
			<span class="t-right">
				<button class="outline" on:click={leaveGroup}>
					<CssIcon name="log-out" />
					Abandonar grupo
				</button>
			</span>
		{/if}
	</article>
{/each}
