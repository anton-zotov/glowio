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

<label class="row-label">Text</label>
<input bind:value={config.text} on:input={handleChange} />
