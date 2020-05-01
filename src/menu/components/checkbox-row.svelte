<script>
	import { createEventDispatcher } from 'svelte';

	export let config;
	export let property;

	const dispatch = createEventDispatcher();
	const id = Math.random()
		.toString(36)
		.substring(7);

	function handleChange() {
		setTimeout(() => {
			dispatch('change');
		});
	}
</script>

<div class="checkbox-row">
	<label for={id}>
		<slot />
	</label>
	<input {id} type="checkbox" bind:checked={config[property]} on:input={handleChange} />
</div>
