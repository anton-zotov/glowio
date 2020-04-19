<script>
    import { createEventDispatcher } from 'svelte';

    export let config;
    const min = 10;
    const max = 1000;
    const dispatch = createEventDispatcher();

    function handleChange() {
        if (config.particlePer100Pixels > max) config.particlePer100Pixels = max;
        dispatch('change');
    }
</script>

<style>

</style>

Particles per 100 pixels
<input
    type="range"
    {min}
    {max}
    bind:value={config.particlePer100Pixels}
    on:input={handleChange} />
<input
    type="number"
    {min}
    {max}
    maxlength={`${max}`.length}
    bind:value={config.particlePer100Pixels}
    on:input={handleChange} />
