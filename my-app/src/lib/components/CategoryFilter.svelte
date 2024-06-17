<script lang="ts">
	import { routes } from '$lib';
	import CssIcon from './CssIcon.svelte';
	import OwnerOnly from './OwnerOnly.svelte';

	export let ownerId: Id;
	export let categories: Category[];
	export let sortedCategories: Category[];
	export let filter: Id[];

	function toggleCategoryFilter(categoryId: Id, shouldFilter: boolean) {
		filter = shouldFilter ? [...filter, categoryId] : filter.filter((id) => id !== categoryId);
	}

	function sortCategories(categories: Category[]) {
		const archived = categories.filter(({ is_archived }) => is_archived);
		const active = categories.filter(({ is_archived }) => !is_archived);
		return [...active, ...archived];
	}

	$: sortedCategories = sortCategories(categories);
</script>

<div>
	<CssIcon name="tag" />
	Categorías:
	{#each sortedCategories as category}
		{@const active = filter.includes(category.id)}
		{@const activeClass = !active ? 'outline' : ''}
		{@const archivedClass = category.is_archived ? 'contrast' : ''}
		<div style="width: auto; vertical-align: baseline; margin:5px;" role="group">
			<button
				on:click={() => toggleCategoryFilter(category.id, !active)}
				class="btn-sm {activeClass} {archivedClass}"
			>
				{category.name}
			</button>
			<OwnerOnly {ownerId}>
				<a
					class="btn-sm {activeClass} {archivedClass}"
					href={routes.categoryDetails(category.id)}
					role="button"
				>
					<CssIcon name="pen" size={0.7} />
				</a>
			</OwnerOnly>
		</div>
	{/each}
</div>
