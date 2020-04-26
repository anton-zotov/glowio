<script>
    import { createEventDispatcher } from 'svelte';

    export let config;
    const min = 0;
    const max = 100;
    const dispatch = createEventDispatcher();

    function handleChange(event) {
        dispatch('change');
    }
</script>

<style>
    .range {
        width: 40px;
    }
</style>


    Color
    <input type="color" bind:value={config.color} on:input={handleChange} />


Variation
<input
    type="range"
    class="range"
    {min}
    {max}
    bind:value={config.colorVariation}
    on:input={handleChange} />
<input
    type="number"
    {min}
    {max}
    maxlength="3"
    bind:value={config.colorVariation}
    on:input={handleChange} />
