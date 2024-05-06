<script lang="ts">
	const title = '🐮 VaquitApp';
	const themeOptions = ['', 'light', 'dark'];
	const colorOptions = ['', 'purple', 'red', 'orange', 'yellow', 'green', 'blue', 'zinc'];
	let color = '';

	function changeTheme(value: string) {
		document.getElementsByTagName('html')[0].setAttribute('data-theme', value);
	}

	function changeColor(value: string) {
		color = value + (value ? '.' : '');
	}
</script>

<svelte:head>
	<meta name="color-scheme" content="light dark" />
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.{color}min.css"
	/>
	<title>
		{title}
	</title>
</svelte:head>

<main class="container">
	<nav>
		<ul>
			<li>
				<h1>{title}</h1>
			</li>
		</ul>
		<ul>
			<li>
				<select on:change={(e) => changeTheme(e.currentTarget.value)} placeholder="tema">
					{#each themeOptions as option}
						<option>{option}</option>
					{/each}
				</select>
			</li>
			<li>
				<select on:change={(e) => changeColor(e.currentTarget.value)} placeholder="color">
					{#each colorOptions as option}
						<option>{option}</option>
					{/each}
				</select>
			</li>
		</ul>
	</nav>
	<slot />
</main>
