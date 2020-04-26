<script>
    import RangeInput from '../components/range-input';

    export let config;
</script>

<label class="row-label">Particle size</label>
<RangeInput {config} property={'particleSize'} min={1} max={50} on:change />
