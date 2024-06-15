<script lang="ts">
	import MovementRow from './MovementRow.svelte';

	export let categories: Category[];
	export let members: User[];
	export let movements: (Spending | Payment)[];
</script>

<table class="striped">
	<thead>
		<th>Fecha</th>
		<th>De</th>
		<th>A</th>
		<th>Detalle</th>
		<th class="t-right">Monto</th>
	</thead>
	<tbody>
		{#each movements as movement}
			<MovementRow {categories} {members} {movement} />
		{/each}
	</tbody>
</table>
