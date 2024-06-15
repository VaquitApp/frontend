<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';
	import { formatDateInput } from '$lib/formatter';

	export let form;
	export let data: PageData;

	const now = new Date();
	const last_week = new Date();
	last_week.setDate(now.getDay() - 7);

	let initDate = last_week.toJSON();
	let finDate = now.toJSON();

	function getCategoryName(id: number): string {
		return data.categories.filter((category: Category) => {
			return category.id == id;
		})[0].name;
	}
</script>

<svelte:head>
	<title>{data.group.name} - Agregaciones</title>
</svelte:head>

<header>
	<hgroup>
		<h2>Rango de la Agregación</h2>
	</hgroup>
</header>

<form method="POST" autocomplete="off" use:enhance>
	<fieldset>
		<label>
			Fecha de Inicio
			<input
				type="date"
				name="dateIni"
				placeholder="Fecha Inicial"
				required
				value={formatDateInput(initDate)}
			/>
		</label>
		<label>
			Fecha de Fin
			<input
				type="date"
				name="dateFin"
				placeholder="Fecha Final"
				required
				value={formatDateInput(finDate)}
			/>
		</label>
		<button>Generar</button>
		<button type="button" class="outline" on:click={() => history.back()}>Cancelar</button>
	</fieldset>
</form>

{#if form !== null}
	<div>
		<h3>Total</h3>
		<ul>
			<li>{form.totalSum}</li>
		</ul>

		<h3>Por Categorias</h3>
		<ul>
			{#each Object.entries(form.sumPerCategory) as [category_id, sum]}
				<li>{getCategoryName(+category_id)}: {sum}</li>
			{/each}
		</ul>
	</div>
{/if}
