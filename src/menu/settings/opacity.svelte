<script>
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

<style>
    .two-lines {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    .two-lines div {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>

<div class="two-lines">
    <div>
        <label class="row-label">Opacity min</label>
        <input
            type="range"
            {min}
            {max}
            bind:value={config.opacityMin}
            on:input={handleMinChange} />
        <input
            type="number"
            {min}
            {max}
            maxlength="3"
            bind:value={config.opacityMin}
            on:input={handleMinChange} />
    </div>

    <div>
        <label class="row-label">Opacity max</label>
        <input
            type="range"
            {min}
            {max}
            bind:value={config.opacityMax}
            on:input={handleMaxChange} />
        <input
            type="number"
            {min}
            {max}
            maxlength="3"
            bind:value={config.opacityMax}
            on:input={handleMaxChange} />
    </div>
</div>
