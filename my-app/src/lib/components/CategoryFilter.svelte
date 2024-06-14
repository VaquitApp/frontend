<script lang="ts">
	import { routes } from '$lib';
	import CssIcon from './CssIcon.svelte';

	export let categories: Category[];
	export let filter: Id[];

	function toggleCategoryFilter(categoryId: Id, shouldFilter: boolean) {
		filter = shouldFilter ? [...filter, categoryId] : filter.filter((id) => id !== categoryId);
	}
</script>

<div>
	Categorías:
	{#each categories as category}
		{@const active = filter.includes(category.id)}
		<div style="width: auto; vertical-align: baseline; margin:5px;" role="group">
			<button
				on:click={() => toggleCategoryFilter(category.id, !active)}
				class="btn-sm {!active ? 'outline' : ''}"
			>
				{category.name}
			</button>
			<a
				class="btn-sm {!active ? 'outline' : ''}"
				href="{routes.categoryDetails}/{category.id}"
				role="button"
			>
				<CssIcon name="pen" size={0.7} />
			</a>
		</div>
	{/each}
</div>

<style>
	.btn-sm {
		font-size: small;
		padding: 0.5em;
		display: flex;
		align-items: center;
	}
</style>
