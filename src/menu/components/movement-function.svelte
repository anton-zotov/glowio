<script>
	import { createEventDispatcher } from 'svelte';
	import RangeInput from '../components/range-input';
	import CheckboxRow from '../components/checkbox-row';

	export let config;
	export let prefix;

	const dispatch = createEventDispatcher();

	function handleChange() {
		config = config;
		dispatch('change');
	}
</script>

<div class="multi-line">
	<CheckboxRow {config} property={prefix + 'Enabled'} on:change={handleChange}>
		<slot />
	</CheckboxRow>
	{#if config[prefix + 'Enabled']}
		<div class="row">
			<label class="row-label">Delay</label>
			<select bind:value={config[prefix + 'Delay']} on:change={handleChange}>
				<option value="">None</option>
				<option value="offsetX">Horizontal</option>
				<option value="offsetY">Vertical</option>
			</select>
		</div>
		<CheckboxRow {config} property={prefix + 'RandomizeAmplitude'} on:change={handleChange}>
			Randomize amplitude
		</CheckboxRow>
		<CheckboxRow {config} property={prefix + 'Modulo'} on:change={handleChange}>
			Take modulo
		</CheckboxRow>
		<div class="row">
			<label class="row-label">Amplitude</label>
			<RangeInput {config} property={prefix + 'Amplitude'} min={0} max={100} on:change />
		</div>
		<div class="row">
			<label class="row-label">Period</label>
			<RangeInput {config} property={prefix + 'Period'} min={10} max={200} on:change />
		</div>
	{/if}
</div>
