import * as PIXI from 'pixi.js';
import particle from './assets/particle.png';
import { colorVariation } from './utils';

const particleImageSize = 50;
const circleTexture = PIXI.Texture.from(particle);

export function createParticle(x, y, config) {
	const particle = new PIXI.Sprite(circleTexture);

	particle.anchor.set(0.5);
	particle.x = x;
	particle.y = y;
	particle.scale.set(config.particleSize / particleImageSize);
	particle.alpha = (config.opacityMin + Math.random() * (config.opacityMax - config.opacityMin)) / 100;
	particle.tint = colorVariation(config.color, config.colorVariation);

	particle.vxMax = Math.random() * config.horizontalSineAmplitude;
	particle.vyMax = Math.random() * 4 - 1;
	particle.vx = 0;
	particle.vy = 0;
	particle.offset = Math.random();

	particle.update = updateParticle(config);

	return particle;
}

const updateParticle = config => function(frame, s, sign) {
	this.x += this.vx;
	this.y += this.vy;

	if (config.enableHorizontalSine) {
		this.vx = Math.cos(frame * 2 * Math.PI / config.horizontalSinePeriod) * (this.vxMax);
	}
	// this.vy = Math.sin(s + this.offset) * (this.vyMax - this.vyMax / 2);
}