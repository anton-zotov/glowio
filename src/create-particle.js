import * as PIXI from 'pixi.js';
import particle from './assets/particle.png';
import { colorVariation } from './utils';

const particleImageSize = 50;
const circleTexture = PIXI.Texture.from(particle);

export function createParticle(x, y, config, instanceConfig) {
	const particle = new PIXI.Sprite(circleTexture);

	particle.anchor.set(0.5);
	particle.initX = x;
	particle.initY = y;
	particle.scale.set(config.particleSize / particleImageSize);
	particle.alpha = (config.opacityMin + Math.random() * (config.opacityMax - config.opacityMin)) / 100;
	particle.tint = colorVariation(config.color, config.colorVariation);

	configParticleFunction(particle, 'horzSine', config, instanceConfig);
	configParticleFunction(particle, 'vertSine', config, instanceConfig);
	configParticleFunction(particle, 'horzTan', config, instanceConfig);
	configParticleFunction(particle, 'vertTan', config, instanceConfig);

	particle.update = updateParticle(config);

	return particle;
}

function configParticleFunction(particle, functionPrefix, config, instanceConfig) {
	particle[functionPrefix] = {
		amplitude: config[functionPrefix + 'Amplitude'],
		delay: 0
	};

	if (config[functionPrefix + 'RandomizeAmplitude']) {
		particle[functionPrefix].amplitude = Math.random() * config[functionPrefix + 'Amplitude'];
	}

	if (config[functionPrefix + 'Delay']) {
		particle[functionPrefix].delay = instanceConfig[config[functionPrefix + 'Delay']];
	}
}

const updateParticle = config =>
	function(frame, s, sign) {
		// this.x += this.vx;
		this.x = this.initX;
		this.y = this.initY;

		if (config.horzSineEnabled) {
			let dx = Math.sin(((frame - this.horzSine.delay) * 2 * Math.PI) / config.horzSinePeriod) * this.horzSine.amplitude;
			if (config.horzSineModulo) dx = Math.abs(dx);
			this.x += dx;
		}

		if (config.vertSineEnabled) {
			let dy = Math.sin(((frame - this.vertSine.delay) * 2 * Math.PI) / config.vertSinePeriod) * this.vertSine.amplitude;
			if (config.vertSineModulo) dy = Math.abs(dy);
			this.y += dy;
		}

		if (config.horzTanEnabled) {
			let dx = Math.tan(((frame - this.horzTan.delay) * 2 * Math.PI) / config.horzTanPeriod) * this.horzTan.amplitude;
			if (config.horzTanModulo) dx = Math.abs(dx);
			this.x += dx;
		}

		if (config.vertTanEnabled) {
			let dy = Math.tan(((frame - this.vertTan.delay) * 2 * Math.PI) / config.vertTanPeriod) * this.vertTan.amplitude;
			if (config.vertTanModulo) dy = Math.abs(dy);
			this.y += dy;
		}

		// this.x += Math.acos()
		// this.vy = Math.sin(s + this.offset) * (this.vyMax - this.vyMax / 2);
	};
