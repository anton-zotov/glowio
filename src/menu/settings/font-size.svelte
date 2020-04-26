<script>
    import { createEventDispatcher } from 'svelte';

    export let config;
    const min = 10;
    const max = 300;
    const dispatch = createEventDispatcher();

    function handleChange() {
        if (config.fontSize > max) config.fontSize = max;
        dispatch('change');
    }
</script>

<style>

</style>

<label class="row-label">Font size</label>
<input
    type="range"
    {min}
    {max}
    bind:value={config.fontSize}
    on:input={handleChange} />
<input
    type="number"
    {min}
    {max}
    maxlength="3"
    bind:value={config.fontSize}
    on:input={handleChange} />
