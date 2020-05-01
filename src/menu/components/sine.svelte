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
	<CheckboxRow {config} property={prefix + 'SineEnabled'} on:change={handleChange}>
		<slot />
	</CheckboxRow>
	{#if config[prefix + 'SineEnabled']}
		<div class="row">
			<label class="row-label">Delay</label>
			<select bind:value={config[prefix + 'SineDelay']} on:change={handleChange}>
				<option value="">None</option>
				<option value="offsetX">Horizontal</option>
				<option value="offsetY">Vertical</option>
			</select>
		</div>
		<!-- <CheckboxRow {config} property={prefix + 'SineWithDelay'} on:change={handleChange}>
			With delay
		</CheckboxRow> -->
		<CheckboxRow {config} property={prefix + 'SineRandomizeAmplitude'} on:change={handleChange}>
			Randomize amplitude
		</CheckboxRow>
		<div class="row">
			<label class="row-label">Amplitude</label>
			<RangeInput {config} property={prefix + 'SineAmplitude'} min={0} max={100} on:change />
		</div>
		<div class="row">
			<label class="row-label">Perion</label>
			<RangeInput {config} property={prefix + 'SinePeriod'} min={10} max={200} on:change />
		</div>
	{/if}
</div>
