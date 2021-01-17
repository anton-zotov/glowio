import face from './assets/face_s.png';
import cat from './assets/cat.jpg';

const images = {
	face,
	cat
};

function loadImage(source) {
	return new Promise(resolve => {
		const img = new Image();
		img.onload = () => resolve(img);
		img.src = source;
	});
}

function getImageData(image) {
	const canvas = new OffscreenCanvas(image.width, image.height);
	const ctx = canvas.getContext('2d');
	ctx.drawImage(image, 0, 0);
	return ctx.getImageData(0, 0, image.width, image.height).data;
}

export async function getImageMatrix(imageName) {
	const imageFile = images[imageName];
	const image = await loadImage(imageFile);
	const imageData = getImageData(image);
	const matrix = [];
	let x1 = null;
	let x2 = null;
	let y1 = null;
	let y2 = null;
	let pixels = 0;

	for (let x = 0; x < image.width; x++) {
		matrix.push([]);
		for (let y = 0; y < image.height; y++) {
			let color = getColor(x, y, image.width, imageData);
			matrix[x].push(color);
			if (true) {
				if (x1 === null) x1 = x;
				x2 = Math.max(x, x2);
				if (y1 === null) y1 = y;
				y2 = Math.max(y, y2);
				pixels++;
			}
		}
	}

	let width = x2 ? x2 - x1 + 1 : 0;
	let height = y2 ? y2 - y1 + 1 : 0;
	let centerX = x2 ? Math.round(x1 + width / 2) : 0;
	let centerY = y2 ? Math.round(y1 + height / 2) : 0;

	return { x1, x2, y1, y2, centerX, centerY, width, matrix, pixels };
}

export function getColor(x, y, width, imageData) {
	const redPos = y * (width * 4) + x * 4;
	const [r, g, b, a] = [imageData[redPos], imageData[redPos + 1], imageData[redPos + 2], imageData[redPos + 3]];
	if (!a) return 0;
	return (r << 16) + (g << 8) + b;
}
