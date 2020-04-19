import { getTextMatrix } from './text-utils';
import { createScene } from './scene';

export const defaultConfig = {
    text: 'Hello glowio',
    particleSize: 5,
    fontSize: 30,
};

let config = { ...defaultConfig };
let scene;

export function init(app) {
    scene = createScene(app);
    displayText();
}

export function updateConfig(newConfig) {
    config = { ...newConfig };
    scene.reset();
    displayText();
}

export function updateScene() {
    scene.update();
}

function displayText() {
    const { textMatrix } = getTextMatrix(config);

    for (let x = 0; x < textMatrix.length; x++) {
        for (let y = 0; y < textMatrix[0].length; y++) {
            if (textMatrix[x][y]) {
                scene.addParticle(x, y, config);
            }
        }
    }
}
