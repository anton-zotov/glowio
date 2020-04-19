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
        width: 40px;
        height: 40px;
        top: 0px;
        left: 0px;
        font-size: 26px;
        line-height: 30px;
    }

    .expanded {
        left: 260px;
    }
</style>

<button class={expanded ? 'expanded' : ''} on:click={handleClick}>☰</button>
