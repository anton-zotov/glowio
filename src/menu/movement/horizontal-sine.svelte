<script>
    import { createEventDispatcher } from 'svelte';
    import RangeInput from '../components/range-input';

    export let config;
    const dispatch = createEventDispatcher();

    function handleChange(event) {
        setTimeout(() => {
            dispatch('change');
        });
    }
</script>

<div class="multi-line">
    <div class="checkbox-row">
        <label for="enable-horizontal-sine">Horizontal sine</label>
        <input
            id="enable-horizontal-sine"
            type="checkbox"
            bind:checked={config.enableHorizontalSine}
            on:input={handleChange} />
    </div>
    <div class="row">
        <label class="row-label">Amplitude</label>
        <RangeInput
            {config}
            property={'horizontalSineAmplitude'}
            min={0}
            max={100}
            on:change />
    </div>
    <div class="row">
        <label class="row-label">Perion</label>
        <RangeInput
            {config}
            property={'horizontalSinePeriod'}
            min={10}
            max={200}
            on:change />
    </div>
</div>
