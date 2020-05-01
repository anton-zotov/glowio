<script>
    import RangeInput from '../components/range-input';

    export let config;
</script>

<label class="row-label">Particles per 100 pixels</label>
<RangeInput
    {config}
    property={'particlePer100Pixels'}
    min={1}
    max={500}
    on:change />
