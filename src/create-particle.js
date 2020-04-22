import * as PIXI from 'pixi.js';
import particle from './assets/particle.png';
import { initParticle1 } from './particle-movement/type1';
import { colorVariation } from './utils';

const particleImageSize = 50;
const circleTexture = PIXI.Texture.from(particle);

export function createParticle(x, y, config) {
    const particle = new PIXI.Sprite(circleTexture);

    particle.anchor.set(0.5);
    particle.x = x + 100;
    particle.y = y + 200;
    particle.scale.set(config.particleSize / particleImageSize);
    particle.alpha = (config.opacityMin + Math.random() * (config.opacityMax - config.opacityMin)) / 100;
    particle.tint = colorVariation(config.color, config.colorVariation);

    initParticle1(particle);

    return particle;
}
