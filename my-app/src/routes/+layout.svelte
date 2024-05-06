<script lang="ts">
	const title = 'VaquitApp';
	const colorOptions =
		'azure, amber, blue, cyan, fuchsia, green, grey, indigo, jade, lime, orange, pink, pumpkin, purple, red, sand, slate, violet, yellow, zinc'.split(
			', '
		);
	let color = '';

	function setThemeToDark(active: boolean) {
		const theme = active ? 'dark' : 'light';
		document.getElementsByTagName('html')[0].setAttribute('data-theme', theme);
	}

	function changeColor(value: string) {
		color = value === 'azure' ? '' : '.' + value;
	}
</script>

<svelte:head>
	<title>
		{title}
	</title>
	<!-- Pico -->
	<meta name="color-scheme" content="light dark" />
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico{color}.min.css"
	/>
	<!-- CSS:GG -->
	<link href="https://unpkg.com/css.gg@2.0.0/icons/css/sun.css" rel="stylesheet" />
	<link href="https://unpkg.com/css.gg@2.0.0/icons/css/moon.css" rel="stylesheet" />
	<link href="https://unpkg.com/css.gg@2.0.0/icons/css/color-bucket.css" rel="stylesheet" />
</svelte:head>

<main class="container">
	<nav>
		<ul>
			<li>
				<a href="/" title="Inicio"><h1>🐮 {title}</h1></a>
			</li>
		</ul>
		<ul>
			<li><label for="theme"><i class="gg-sun"></i></label></li>
			<li>
				<fieldset>
					<input
						id="theme"
						type="checkbox"
						role="switch"
						on:change={(e) => setThemeToDark(e.currentTarget.checked)}
					/>
				</fieldset>
			</li>
			<li><label for="theme"><i class="gg-moon"></i></label></li>
			<li>
				<fieldset>
					<select on:change={(e) => changeColor(e.currentTarget.value)} placeholder="color">
						{#each colorOptions as option}
							<option>{option}</option>
						{/each}
					</select>
				</fieldset>
			</li>
		</ul>
	</nav>
	<slot />
</main>
