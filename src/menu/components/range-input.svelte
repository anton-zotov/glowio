<script>
	import { createEventDispatcher } from 'svelte';

	export let config;
	export let property;
	export let min = 0;
	export let max = 100;

	const dispatch = createEventDispatcher();
	const maxLen = `${max}`.length;

	function handleChange(event) {
		if (config[property] > max) config[property] = max;
		dispatch('change');
	}
</script>

<input
	class={$$props.class}
	type="range"
	{min}
	{max}
	bind:value={config[property]}
	on:input={handleChange} />
<input
	type="number"
	{min}
	{max}
	maxlength={maxLen}
	bind:value={config[property]}
	on:input={handleChange} />
