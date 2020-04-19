const canvasWidth = 500;
const canvasHeight = 40;

const canvas = new OffscreenCanvas(canvasWidth, canvasHeight);
const ctx = canvas.getContext('2d');

export function getTextMatrix(text) {
    drawText(text);

    const imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight).data;
    const textMatrix = [];
    let x1 = null,
        x2 = null;
    let pixels = 0;

    for (let x = 0; x < canvasWidth; x++) {
        textMatrix.push([]);
        for (let y = 0; y < canvasHeight; y++) {
            let bit = hasColor(x, y, canvasWidth, imageData);
            textMatrix[x].push(bit);
            if (bit) {
                if (x1 === null) x1 = x;
                x2 = x;
                pixels++;
            }
        }
    }

    let width = x2 ? x2 - x1 + 1 : 0;
    let center = x2 ? Math.round(x2 / x1 / 2) : 0;

    return { x1, x2, center, width, textMatrix, pixels };
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
