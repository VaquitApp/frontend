<script lang="ts">
	import { ICONS, routes, title } from '$lib';
	import Avatar from '$lib/components/Avatar.svelte';
	import CssIcon from '$lib/components/CssIcon.svelte';
	import { onMount } from 'svelte';
	import type { LayoutServerData } from './$types';
	import { assets } from '$app/paths';

	export let data: LayoutServerData;

	let useDarkTheme = false;
	let color = 'azure';
	let version = '';

	const colorOptions =
		'azure, amber, blue, cyan, fuchsia, green, grey, indigo, jade, lime, orange, pink, pumpkin, purple, red, sand, slate, violet, yellow, zinc'.split(
			', '
		);

	function changeTheme(active: boolean) {
		const theme = active ? 'dark' : 'light';
		document.getElementsByTagName('html')[0].setAttribute('data-theme', theme);
		localStorage.setItem('theme', theme);
	}

	function changeColor(color: string) {
		version = color === 'azure' ? '' : '.' + color;
		localStorage.setItem('color', color);
	}

	onMount(() => {
		let value;

		value = localStorage.getItem('theme');
		if (value) {
			useDarkTheme = value === 'dark';
			changeTheme(useDarkTheme);
		}

		value = localStorage.getItem('color');
		if (value) {
			color = value;
			changeColor(color);
		}
	});
</script>

<svelte:head>
	<title>{title}</title>
	<!-- Google -->
	<script src="https://accounts.google.com/gsi/client" async defer></script>
	<!-- Pico -->
	<meta name="color-scheme" content="light dark" />
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico{version}.min.css"
	/>
	<!-- CSS:GG -->
	{#each ICONS as iconName}
		<link href="https://unpkg.com/css.gg@2.0.0/icons/css/{iconName}.css" rel="stylesheet" />
	{/each}
	<!-- Custom -->
	<link rel="stylesheet" href="{assets}/styles.css" />
</svelte:head>

<main class="container">
	<nav>
		<ul>
			<li>
				<a href={routes.index} title="Inicio"><h1>🐮 {title}</h1></a>
			</li>
		</ul>
		<ul>
			<li>
				<details class="dropdown" style="min-width: 200px;">
					<summary>
						{#if data.user}
							<Avatar seed={data.user} size={30} />
							{data.user}
						{:else}
							<Avatar seed="guest" size={30} />
							Invitado
						{/if}
					</summary>
					<ul>
						<li>
							{#if data.user}
								<a href={routes.groups}> Ver grupos </a>
								<a href={routes.profile}> Ver perfil </a>
								<a href={routes.logout}> Cerrar sesión </a>
							{:else}
								<a href={routes.login}> Iniciar sesión </a>
								<a href={routes.register}> Registrarse </a>
							{/if}
						</li>
						<li>
							<label>
								<input
									id="theme"
									type="checkbox"
									role="switch"
									on:change={(e) => changeTheme(e.currentTarget.checked)}
									bind:checked={useDarkTheme}
								/>
								<CssIcon name={useDarkTheme ? 'moon' : 'sun'} />
							</label>
						</li>
						<li>
							<select bind:value={color} on:change={(e) => changeColor(e.currentTarget.value)}>
								{#each colorOptions as option}
									<option>{option}</option>
								{/each}
							</select>
						</li>
					</ul>
				</details>
			</li>
		</ul>
	</nav>
	<slot />
</main>
