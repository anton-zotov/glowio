<script>
    import RangeInput from '../components/range-input';

    export let config;
</script>

<style>

</style>

<label class="row-label">Font size</label>
<RangeInput {config} property={'fontSize'} min={10} max={300} on:change />
