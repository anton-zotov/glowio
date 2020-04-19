<script>
    import { resize, defaultConfig, updateConfig } from '../particle-system';
    import MenuToggle from './menu-toggle';
    import Text from './settings/text';

    let expanded = true;
    let config = { ...defaultConfig };

    function handleToggle() {
        expanded = !expanded;
        resize();
    }

    function handleConfigChange() {
        updateConfig(config);
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
    <Text {config} on:change={handleConfigChange} />
</aside>
<MenuToggle {expanded} on:toggle={handleToggle} />
