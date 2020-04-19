<script>
    import { resizeTheater } from '../index';
    import { defaultConfig, updateConfig } from '../particle-system';
    import MenuToggle from './menu-toggle';
    import Text from './settings/text';
    import ParticleSize from './settings/particle-size';

    let expanded = true;
    let config = { ...defaultConfig };

    function handleToggle() {
        expanded = !expanded;
        resizeTheater();
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

    .config-block {
        padding-bottom: 10px;
        display: flex;
        justify-content: space-between;
    }
</style>

<aside id="menu" class={expanded ? '' : 'hidden'}>
    <h1>Glowio</h1>

    <div class="config-block">
        <Text {config} on:change={handleConfigChange} />
    </div>

    <div class="config-block">
        <ParticleSize {config} on:change={handleConfigChange} />
    </div>
</aside>
<MenuToggle {expanded} on:toggle={handleToggle} />
