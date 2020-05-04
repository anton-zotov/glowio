<script>
	import { createEventDispatcher } from 'svelte';

	export let config;
	export let property;
	export let options;

	const dispatch = createEventDispatcher();
	const group = Math.random() * 1000000;

	function handleChange() {
		setTimeout(() => {
			dispatch('change');
		});
	}
</script>

<style>
	label {
		display: flex;
		padding-right: 15px;
	}

	label span {
		padding-left: 4px;
	}
</style>

<div class="checkbox-row">
	{#each options as option}
		<label>
			<input
				type="radio"
				bind:group={config[property]}
				on:change={handleChange}
				value={option[0]} />
			<span>{option[1]}</span>
		</label>
	{/each}
</div>
