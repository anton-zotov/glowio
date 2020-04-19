<script>
    import MenuToggle from './menu-toggle';
    import { resize } from '../particle-system';

    let expanded = true;

    function handleToggle() {
        expanded = !expanded;
        resize();
    }
</script>

<style>
    h1 {
        color: purple;
    }

    .hidden {
        display: none;
    }
</style>

<aside id="menu" class={expanded ? '' : 'hidden'}>
    <h1>Glowio</h1>
</aside>
<MenuToggle {expanded} on:toggle={handleToggle} />
