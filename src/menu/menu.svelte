<script>
	import { resizeTheater } from '../index';
	import { updateConfig } from '../particle-system';
	import { defaultConfig } from '../particle-config';
	import MenuToggle from './components/menu-toggle';
	import MovementFunction from './components/movement-function';
	import ToggleLabel from './components/toggle-label';
	import PredefinedConfigSelect from './components/predefined-config-select';
	import Text from './settings/text';
	import ParticleSize from './settings/particle-size';
	import FontSize from './settings/font-size';
	import ParticlesPerPixel from './settings/particles-per-pixel';
	import Color from './settings/color';
	import Opacity from './settings/opacity';

	let settingsExpanded = false;
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
	.title {
		background-color: #c3c3c3;
		padding-right: 32px;
		font-size: 35px;
		color: #fff;
		text-align: center;
		animation: glow 0.8s ease-in-out infinite alternate;
	}

	@keyframes glow {
		from {
			text-shadow: 0 0 5px #fff;
		}
		to {
			text-shadow: 0 0 20px #fff;
		}
	}

	#menu.hidden {
		display: none;
	}

	.panel-block,
	.config-block {
		padding-bottom: 4px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.config-block {
		padding-bottom: 10px;
	}

	.settings-container {
		flex-grow: 1;
		padding: 10px 8px 8px 8px;
		overflow-y: auto;
	}

	h3 {
		padding-top: 10px;
	}
</style>

<aside id="menu" class={expanded ? '' : 'hidden'}>
	<h1 class="title">Glowio</h1>

	<div class="settings-container">
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
			<div class="panel">

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
			</div>

			<h3>Movement</h3>

			<div class="panel-block">
				<MovementFunction {config} prefix="horzSine" on:change={handleConfigChange}>
					Horizontal sine
				</MovementFunction>
			</div>

			<div class="panel-block">
				<MovementFunction {config} prefix="vertSine" on:change={handleConfigChange}>
					Vertical sine
				</MovementFunction>
			</div>

			<div class="panel-block">
				<MovementFunction {config} prefix="horzTan" on:change={handleConfigChange}>
					Horizontal tangent
				</MovementFunction>
			</div>

			<div class="panel-block">
				<MovementFunction {config} prefix="vertTan" on:change={handleConfigChange}>
					Vertical tangent
				</MovementFunction>
			</div>
		{/if}
	</div>
</aside>
<MenuToggle {expanded} on:toggle={handleToggle} />
