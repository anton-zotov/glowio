import * as PIXI from 'pixi.js';
import particle from './assets/particle.png';
import { getTextMatrix } from './text-utils';

export const defaultConfig = {
    text: 'Hello glowio',
    particleSize: 5,
};

let config = { ...defaultConfig };

const particleSize = 50;
const theater = document.getElementById('theater');
const app = new PIXI.Application({
    resizeTo: theater,
});
const circleTexture = PIXI.Texture.from(particle);
let particles = [];

let frame = 0;
let s = 0;
let sign = 1;

theater.appendChild(app.view);
resize();

displayText();
startTicker();

export function updateConfig(newConfig) {
    config = { ...newConfig };
    resetScene();
    displayText();
}

function resetScene() {
    frame = 0;
    s = 0;
    sign = 1;
    clearScene();
}

function clearScene() {
    for (let particle of particles) {
        app.stage.removeChild(particle);
    }
    particles = [];
}

function displayText() {
    const { textMatrix } = getTextMatrix(config.text);

    for (let x = 0; x < textMatrix.length; x++) {
        for (let y = 0; y < textMatrix[0].length; y++) {
            if (textMatrix[x][y]) {
                const circle = new PIXI.Sprite(circleTexture);

                circle.anchor.set(0.5);
                circle.x = x + 100;
                circle.y = y + 200;
                circle.tint = Math.random() * 0x0000ff + 0x00ff00;
                circle.scale.set(config.particleSize / particleSize);
                circle.alpha = 0.8;
                circle.vxMax = Math.random() * 4 - 1;
                circle.vyMax = Math.random() * 4 - 1;
                circle.vx = 0;
                circle.vy = 0;
                circle.offset = Math.random();

                circle.vx2 = Math.random() * 6 - 3;
                circle.vy2 = Math.random() * 6 - 3;
                circle.ax2 = circle.vx2 / 50;
                circle.ay2 = circle.vy2 / 50;

                particles.push(circle);
                app.stage.addChild(circle);
            }
        }
    }
}

function startTicker() {
    app.ticker.add(() => {
        particles.forEach((particle) => {
            particle.x += particle.vx;
            particle.y += particle.vy;

            particle.vx = Math.cos(s + particle.offset) * particle.vxMax;
            particle.vy = Math.sin(s + particle.offset) * particle.vyMax;

            particle.x += particle.vx2;
            particle.y += particle.vy2;

            particle.vx2 += particle.ax2 * sign;
            particle.vy2 += particle.ay2 * sign;
        });

        if (frame % 102 === 0) {
            sign = -sign;
        }

        frame = (frame + 1) % 1000000000;
        s = s + (Math.PI / 51) * 3;
    });
}

export function resize() {
    setTimeout(() => {
        app.resize();
    });
}
