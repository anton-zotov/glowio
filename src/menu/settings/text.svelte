<script>
    import { createEventDispatcher } from 'svelte';

    export let config;
    const dispatch = createEventDispatcher();

    function handleChange(event) {
        dispatch('change');
    }
</script>

<style>

</style>

<input bind:value={config.text} on:input={handleChange} />
