<script>
	import { resizeTheater } from '../index';
	import { updateConfig } from '../particle-system';
	import { defaultConfig } from '../particle-config';
	import MenuToggle from './components/menu-toggle';
	import Sine from './components/sine';
	import ToggleLabel from './components/toggle-label';
	import PredefinedConfigSelect from './components/predefined-config-select';
	import Text from './settings/text';
	import ParticleSize from './settings/particle-size';
	import FontSize from './settings/font-size';
	import ParticlesPerPixel from './settings/particles-per-pixel';
	import Color from './settings/color';
	import Opacity from './settings/opacity';

	let settingsExpanded = true;
	let expanded = true;
	let config = { ...defaultConfig };

	function handleToggle() {
		expanded = !expanded;
		resizeTheater();
	}

	function handleSettingsToggle() {
		settingsExpanded = !settingsExpanded;
	}

	function handleConfigChange() {
		config = config;
		updateConfig(config);
	}
</script>

<style>
	h1 {
		color: purple;
		padding-bottom: 20px;
	}

	.hidden {
		display: none;
	}

	.config-block {
		padding-bottom: 10px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>

<aside id="menu" class={expanded ? '' : 'hidden'}>
	<h1>Glowio</h1>

	<div class="config-block">
		<Text {config} on:change={handleConfigChange} />
	</div>

	<div class="config-block">
		<PredefinedConfigSelect {config} on:change={handleConfigChange} />
	</div>

	<ToggleLabel expanded={settingsExpanded} on:toggle={handleSettingsToggle}>
		Custom settings
	</ToggleLabel>

	{#if settingsExpanded}
		<div class="config-block">
			<ParticleSize {config} on:change={handleConfigChange} />
		</div>

		<div class="config-block">
			<FontSize {config} on:change={handleConfigChange} />
		</div>

		<div class="config-block">
			<ParticlesPerPixel {config} on:change={handleConfigChange} />
		</div>

		<div class="config-block">
			<Color {config} on:change={handleConfigChange} />
		</div>

		<div class="config-block">
			<Opacity {config} on:change={handleConfigChange} />
		</div>

		<h2>Movement</h2>

		<div class="config-block">
			<Sine {config} prefix="horz" on:change={handleConfigChange}>Horizontal sine</Sine>
		</div>

		<div class="config-block">
			<Sine {config} prefix="vert" on:change={handleConfigChange}>Vertical sine</Sine>
		</div>
	{/if}
</aside>
<MenuToggle {expanded} on:toggle={handleToggle} />
