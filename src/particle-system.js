import { getTextMatrix } from './text-utils';
import { createScene } from './scene';
import { debounce } from './utils';

export const defaultConfig = {
    text: 'Hello glowio',
    particleSize: 5,
    fontSize: 100,
    particlePer100Pixels: 50,
    color: '#00ff90',
    colorVariation: 5,
    opacityMin: 60,
	opacityMax: 90,
	enableHorizontalSine: true,
	horizontalSineAmplitude: 10,
	horizontalSinePeriod: 100,
};

let config = { ...defaultConfig };
let scene;

function doUpdate() {
    scene.reset();
    displayText();
}

export const scheduleUpdate = debounce(doUpdate, 500);

export function init(app) {
    scene = createScene(app);
    displayText();
}

export function updateConfig(newConfig) {
    config = { ...newConfig };
    scheduleUpdate();
}

export function updateScene() {
    scene.update();
}

function displayText() {
    const { textMatrix, centerX, centerY, height } = getTextMatrix(config);
	const particlePerPixel = config.particlePer100Pixels / 100;
	const screenCX = scene.getWidth() / 2;
	const screenCY = scene.getHeight() / 2;
	const offsetX = screenCX - centerX;
	const offsetY = screenCY - centerY;

    for (let x = 0; x < textMatrix.length; x++) {
        for (let y = 0; y < textMatrix[0].length; y++) {
            if (textMatrix[x][y]) {
                let chance = particlePerPixel;
                while (chance > 0) {
                    if (chance >= 1 || chance >= Math.random()) {
                        scene.addParticle(x + offsetX, y + offsetY, config);
                        chance -= 1;
                    } else break;
                }
            }
        }
    }
}
