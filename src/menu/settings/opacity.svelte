<script>
    import RangeInput from '../components/range-input';
    import { createEventDispatcher } from 'svelte';

    export let config;
    const min = 1;
    const max = 100;
    const dispatch = createEventDispatcher();

    function handleMinChange() {
        if (config.opacityMin > config.opacityMax)
            config.opacityMin = config.opacityMax;
        dispatch('change');
    }

    function handleMaxChange() {
        if (config.opacityMin > config.opacityMax)
            config.opacityMax = config.opacityMin;
        if (config.particleSize > max) config.particleSize = max;
        dispatch('change');
    }
</script>

<div class="multi-line">
    <div class="row">
        <label class="row-label">Opacity min</label>
        <RangeInput
            {config}
            property={'opacityMin'}
            min={1}
            max={100}
            on:change={handleMinChange} />
    </div>

    <div class="row">
        <label class="row-label">Opacity max</label>
        <RangeInput
            {config}
            property={'opacityMax'}
            min={1}
            max={100}
            on:change={handleMaxChange} />
    </div>
</div>
