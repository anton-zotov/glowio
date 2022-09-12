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

function buildScene({ matrix, centerX, centerY, particlePerPixel, scale, withColor }) {
	const screenCX = scene.getWidth() / 2;
	const screenCY = scene.getHeight() / 2;
	const offsetX = screenCX - centerX * scale;
	const offsetY = screenCY - centerY * scale;

	for (let x = 0; x < matrix.length; x++) {
		for (let y = 0; y < matrix[0].length; y++) {
			if (matrix[x][y]) {
				let chance = particlePerPixel;
				while (chance > 0) {
					if (chance >= 1 || chance >= Math.random()) {
						scene.addParticle(
							x * scale + offsetX,
							y * scale + offsetY,
							config,
							{ offsetX: x, offsetY: y, color: withColor ? matrix[x][y] : null }
						);
						chance -= 1;
					} else break;
				}
			}
		}
	}
}

function displayText() {
	const { matrix, centerX, centerY } = getTextMatrix(config);
	const particlePerPixel = config.particlePer100Pixels / 100;
	buildScene({ matrix, centerX, centerY, particlePerPixel, scale: 1, withColor: false });
}

async function displayImage(imageName) {
	const { matrix, centerX, centerY } = await getImageMatrix(imageName);
	buildScene({ matrix, centerX, centerY, particlePerPixel: 1, scale: 3, withColor: true });
}