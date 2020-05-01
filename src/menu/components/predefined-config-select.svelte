<script>
	import { createEventDispatcher, onMount } from 'svelte';

	export let config;

	const customAnimationsKey = 'customAnimations';
	const dispatch = createEventDispatcher();

	let predefinedAnimations = {};
	let customAnimations = {};
	let selected;
	let animationName = 'new amination';

	onMount(() => {
		customAnimations = JSON.parse(localStorage.getItem(customAnimationsKey) || '{}');
		selected = Object.values(predefinedAnimations)[0];
		if (!selected) {
			selected = Object.values(customAnimations)[0];
		}
		handleAnimationSelect();
	});

	function handleAnimationSelect() {
		if (!selected) return;
		animationName = selected.name;
		Object.assign(config, selected);
		dispatch('change');
	}

	function handleSave() {
		customAnimations[animationName] = { ...config, name: animationName };
		selected = customAnimations[animationName];
		saveCustomAnimations();
	}

	function handleDelete() {
		delete customAnimations[selected.name];
		selected = Object.values(customAnimations)[0];
		if (!selected) {
			selected = Object.values(predefinedAnimations)[0];
		}
		customAnimations = customAnimations;
		saveCustomAnimations();
	}

	function saveCustomAnimations() {
		localStorage.setItem(customAnimationsKey, JSON.stringify(customAnimations));
	}
</script>

<style>
	.component-container {
		width: 100%;
	}
	.config-select-container {
		padding-bottom: 2px;
		display: flex;
	}
	.config-select-container button {
		width: 70px;
	}
	.config-select,
	#name-input {
		flex-grow: 1;
		margin-right: 5px;
	}
	#name-input {
		margin-left: 5px;
		padding: 0 4px;
		width: 100px;
	}
	.name-input-label {
		line-height: 23px;
	}
	.config-select {
		height: 24px;
	}
</style>

<div class="component-container">
	<label>Select animation</label>
	<div class="config-select-container">
		<select class="config-select" bind:value={selected} on:change={handleAnimationSelect}>
			<optgroup label="Predefined animations">
				{#each Object.entries(predefinedAnimations) as [name, animation]}
					<option value={animation}>{name}</option>
				{/each}
			</optgroup>
			<optgroup label="Custom animations">
				{#each Object.entries(customAnimations) as [name, animation]}
					<option value={animation}>{name}</option>
				{/each}
			</optgroup>
		</select>
		<button disabled={!selected} on:click={handleDelete}>Delete</button>
	</div>
	<div class="config-select-container">
		<label class="name-input-label" for="name-input">Name</label>
		<input type="text" id="name-input" bind:value={animationName} />
		<button disabled={!animationName} on:click={handleSave}>Save</button>
	</div>
</div>
