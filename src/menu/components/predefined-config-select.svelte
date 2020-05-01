<script>
	import { createEventDispatcher, onMount } from 'svelte';
	import { predefinedConfigs } from '../../predefined-configs';

	export let config;

	const customConfigsKey = 'customConfigs';
	const dispatch = createEventDispatcher();

	let customConfigs = {};
	let selected;
	let animationName = 'new amination';

	onMount(() => {
		customConfigs = JSON.parse(localStorage.getItem(customConfigsKey) || '{}');
		Object.values(customConfigs).forEach(anim => (anim.isCustom = true));
		selected = Object.values(predefinedConfigs)[0];
		if (!selected) {
			selected = Object.values(customConfigs)[0];
		}
		handleConfigSelect();
	});

	function handleConfigSelect() {
		if (!selected) return;
		animationName = selected.name;
		Object.assign(config, selected);
		dispatch('change');
	}

	function handleSave() {
		customConfigs[animationName] = { ...filterConfig(config), name: animationName, isCustom: true };
		selected = customConfigs[animationName];
		saveCustomConfigs();
	}

	function handleDelete() {
		delete customConfigs[selected.name];
		selected = Object.values(customConfigs)[0];
		if (!selected) {
			selected = Object.values(predefinedConfigs)[0];
		}
		customConfigs = customConfigs;
		saveCustomConfigs();
		handleConfigSelect();
	}

	function saveCustomConfigs() {
		localStorage.setItem(customConfigsKey, JSON.stringify(customConfigs));
	}

	function filterConfig(config) {
		const restrictedKeys = ['text'];
		let filtered = { ...config };
		for (let key of restrictedKeys) {
			delete filtered[key];
		}
		return filtered;
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
		<select class="config-select" bind:value={selected} on:change={handleConfigSelect}>
			<optgroup label="Predefined animations">
				{#each Object.entries(predefinedConfigs) as [name, animation]}
					<option value={animation}>{name}</option>
				{/each}
			</optgroup>
			<optgroup label="Custom animations">
				{#each Object.entries(customConfigs) as [name, animation]}
					<option value={animation}>{name}</option>
				{/each}
			</optgroup>
		</select>
		<button disabled={!selected || !selected.isCustom} on:click={handleDelete}>Delete</button>
	</div>
	<div class="config-select-container">
		<label class="name-input-label" for="name-input">Name</label>
		<input type="text" id="name-input" bind:value={animationName} />
		<button disabled={!animationName} on:click={handleSave}>Save</button>
	</div>
</div>
