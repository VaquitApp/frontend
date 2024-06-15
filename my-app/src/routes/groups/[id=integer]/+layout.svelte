<script lang="ts">
	import { routes } from '$lib';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<nav aria-label="breadcrumb">
	<ul>
		<li><a href={routes.groups}>Grupos</a></li>
		<li>
			<a href={routes.groupMovements(data.group.id)} data-tooltip={data.group.description}>
				{data.group.name}
			</a>
		</li>
	</ul>
</nav>

<slot />
