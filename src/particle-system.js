import { getTextMatrix } from './text-utils';
import { getImageMatrix } from './image-utils';
import { createScene } from './scene';
import { debounce } from './utils';

let config = {};
let scene;

function doUpdate() {
	scene.reset();
	display();
}

export const scheduleUpdate = debounce(doUpdate, 500);

export function init(app) {
	scene = createScene(app);
	// display();
}

export function updateConfig(newConfig) {
	config = { ...newConfig };
	scheduleUpdate();
}

export function updateScene() {
	scene.update();
}

function display() {
	if (config.type === 'text') displayText();
	else displayImage(config.type);
}

function displayText() {
	const { matrix, centerX, centerY } = getTextMatrix(config);
	const particlePerPixel = config.particlePer100Pixels / 100;
	const screenCX = scene.getWidth() / 2;
	const screenCY = scene.getHeight() / 2;
	const offsetX = screenCX - centerX;
	const offsetY = screenCY - centerY;

	for (let x = 0; x < matrix.length; x++) {
		for (let y = 0; y < matrix[0].length; y++) {
			if (matrix[x][y]) {
				let chance = particlePerPixel;
				while (chance > 0) {
					if (chance >= 1 || chance >= Math.random()) {
						scene.addParticle(
							x + offsetX,
							y + offsetY,
							config,
							{ offsetX: x, offsetY: y }
						);
						chance -= 1;
					} else break;
				}
			}
		}
	}
}

async function displayImage(imageName) {
	const { matrix, centerX, centerY } = await getImageMatrix(imageName);
	const particlePerPixel = 1;
	const screenCX = scene.getWidth() / 2;
	const screenCY = scene.getHeight() / 2;
	const offsetX = screenCX - centerX;
	const offsetY = screenCY - centerY;

	for (let x = 0; x < matrix.length; x++) {
		for (let y = 0; y < matrix[0].length; y++) {
			if (matrix[x][y]) {
				let chance = particlePerPixel;
				while (chance > 0) {
					if (chance >= 1 || chance >= Math.random()) {
						scene.addParticle(
							x + offsetX,
							y + offsetY,
							config,
							{ offsetX: x, offsetY: y, color: matrix[x][y] }
						);
						chance -= 1;
					} else break;
				}
			}
		}
	}
}