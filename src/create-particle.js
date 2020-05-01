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

	/* ------ Sine start ------ */
	particle.horzSine = {
		amplitude: config.horzSineAmplitude,
		delay: 0
	};

	if (config.horzSineRandomizeAmplitude) {
		particle.horzSine.amplitude = Math.random() * config.horzSineAmplitude;
	}

	if (config.horzSineDelay) {
		particle.horzSine.delay = instanceConfig[config.horzSineDelay];
	}

	/* ------ Vertical sine ------ */
	particle.vertSine = {
		amplitude: config.vertSineAmplitude,
		delay: 0
	};
	if (config.vertSineRandomizeAmplitude) {
		particle.vertSine.amplitude = Math.random() * config.vertSineAmplitude;
	}

	if (config.vertSineDelay) {
		particle.vertSine.delay = instanceConfig[config.vertSineDelay];
	}
	/* ------ Sine end ------ */

	// particle.vyMax = Math.random() * 4 - 1;
	// particle.vx = 0;
	// particle.vy = 0;


	particle.update = updateParticle(config);

	return particle;
}

const updateParticle = config =>
	function(frame, s, sign) {
		// this.x += this.vx;
		this.x = this.initX;
		this.y = this.initY;

		if (config.horzSineEnabled) {
			this.x += Math.cos(((frame - this.horzSine.delay) * 2 * Math.PI) / config.horzSinePeriod) * this.horzSine.amplitude;
		}

		if (config.vertSineEnabled) {
			this.y += Math.cos(((frame - this.vertSine.delay) * 2 * Math.PI) / config.vertSinePeriod) * this.vertSine.amplitude;
		}
		// this.vy = Math.sin(s + this.offset) * (this.vyMax - this.vyMax / 2);
	};
