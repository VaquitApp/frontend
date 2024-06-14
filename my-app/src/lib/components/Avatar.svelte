<script lang="ts">
	import { funEmoji } from '@dicebear/collection';
	import { createAvatar } from '@dicebear/core';

	export let seed: string;
	export let size: number | undefined = undefined;
	const avatar = createAvatar(funEmoji, { seed, size });
	const svg = avatar.toString();
</script>

{@html svg}
