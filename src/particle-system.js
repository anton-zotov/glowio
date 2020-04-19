import { getTextMatrix } from './text-utils';
import { createScene } from './scene';
import { debounce } from './utils';

export const defaultConfig = {
    text: 'Hello glowio',
    particleSize: 5,
    fontSize: 30,
    particlePer100Pixels: 100,
};

let config = { ...defaultConfig };
let scene;

function doUpdate() {
    scene.reset();
    displayText();
}

const scheduleUpdate = debounce(doUpdate, 500);

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
    const { textMatrix } = getTextMatrix(config);
    const particlePerPixel = config.particlePer100Pixels / 100;

    for (let x = 0; x < textMatrix.length; x++) {
        for (let y = 0; y < textMatrix[0].length; y++) {
            if (textMatrix[x][y]) {
                let chance = particlePerPixel;
                while (chance > 0) {
                    if (chance >= 1 || Math.random() >= chance) {
                        scene.addParticle(x, y, config);
                        chance -= 1;
                    } else break;
                }
            }
        }
    }
}
