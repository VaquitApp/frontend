<script lang="ts">
	import { routes } from '$lib';
	import Avatar from '$lib/components/Avatar.svelte';
	import CssIcon from '$lib/components/CssIcon.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const pageTitle = `Miembros`;
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
	<article>
		<Avatar seed={user.email} size={40} />
		{user.email}
	</article>
{/each}
