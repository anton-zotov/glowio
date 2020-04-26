<script>
    import { createEventDispatcher } from 'svelte';

    export let expanded = true;
    const dispatch = createEventDispatcher();

    function handleClick() {
        dispatch('toggle');
    }
</script>

<style>
    button {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 40px;
        height: 40px;
        font-size: 26px;
        line-height: 30px;
    }

    .expanded {
        left: 237px;
    }
</style>

<button class={expanded ? 'expanded' : ''} on:click={handleClick}>☰</button>
