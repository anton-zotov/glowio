<script>
    import { createEventDispatcher } from 'svelte';

    export let config;
    const min = 1;
    const max = 50;
    const dispatch = createEventDispatcher();

    function handleChange() {
        if (config.particleSize > max) config.particleSize = max;
        dispatch('change');
    }
</script>

<style>

</style>

Particle size 
<input
    type="range"
    {min}
    {max}
    bind:value={config.particleSize}
    on:input={handleChange} />
<input
    type="number"
    {min}
    {max}
    maxlength="3"
    bind:value={config.particleSize}
    on:input={handleChange} />
