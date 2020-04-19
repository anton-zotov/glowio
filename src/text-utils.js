const width = 500;
const height = 40;

const canvas = new OffscreenCanvas(width, height);
const ctx = canvas.getContext('2d');

export function getTextMatrix(text) {
    drawText(text);

    const imageData = ctx.getImageData(0, 0, width, height).data;
    const textMatrix = [];

    for (let x = 0; x < width; x++) {
        textMatrix.push([]);
        for (let y = 0; y < height; y++) {
            textMatrix[x].push(hasColor(x, y, width, imageData));
        }
    }

    return textMatrix;
}

function drawText(text) {
    ctx.font = '30px Arial';
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 500, 40);
    ctx.fillStyle = 'white';
    ctx.fillText(text, 0, 30);
}

function getColor(x, y, width, imageData) {
    const redPos = y * (width * 4) + x * 4;
    return [imageData[redPos], imageData[redPos + 1], imageData[redPos + 2]];
}

function hasColor(x, y, width, imageData) {
    const threshold = 127;
    const redPos = y * (width * 4) + x * 4;
    return imageData[redPos] >= threshold ? 1 : 0;
}
