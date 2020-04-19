import * as PIXI from 'pixi.js';
import particle from './assets/particle.png';
import { initParticle1 } from './particle-movement/type1';

const particleImageSize = 50;
const circleTexture = PIXI.Texture.from(particle);

export function createParticle(x, y, config) {
    const particle = new PIXI.Sprite(circleTexture);

    particle.anchor.set(0.5);
    particle.x = x + 100;
    particle.y = y + 200;
    particle.scale.set(config.particleSize / particleImageSize);
    particle.alpha = 0.8;
    particle.tint = Math.random() * 0x0000ff + 0x00ff00;

    initParticle1(particle);

    return particle;
}
