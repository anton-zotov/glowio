<script>
    import { createEventDispatcher } from 'svelte';
    import RangeInput from '../components/range-input';

    export let config;
    const dispatch = createEventDispatcher();

    function handleChange(event) {
        dispatch('change');
    }
</script>

Color
<input type="color" bind:value={config.color} on:input={handleChange} />
Variation
<RangeInput
    class="short-range"
    {config}
    property={'colorVariation'}
    min={0}
    max={100}
    on:change />
