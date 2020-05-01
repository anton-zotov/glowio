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

	horzSineEnabled: true,
	horzSineAmplitude: 10,
	horzSinePeriod: 100,
	horzSineRandomizeAmplitude: false,
	horzSineDelay: "offsetY",

	vertSineEnabled: false,
	vertSineAmplitude: 10,
	vertSinePeriod: 100,
	vertSineRandomizeAmplitude: false,
	vertSineDelay: "offsetX",
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
	const { textMatrix, centerX, centerY, height, x1, y1 } = getTextMatrix(config);
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
						scene.addParticle(
							x + offsetX,
							y + offsetY,
							config,
							{ offsetX: x - x1, offsetY: y - y1 }
						);
						chance -= 1;
					} else break;
				}
			}
		}
	}
}
