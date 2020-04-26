const canvasWidth = 2000;
const canvasHeight = 500;
const canvasBottonPadding = 100;

const canvas = new OffscreenCanvas(canvasWidth, canvasHeight);
const ctx = canvas.getContext('2d');

export function getTextMatrix({ text, fontSize }) {
    drawText(text, fontSize);

    const imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight).data;
    const textMatrix = [];
    let x1 = null;
    let x2 = null;
    let y1 = null;
    let y2 = null;
    let pixels = 0;

    for (let x = 0; x < canvasWidth; x++) {
        textMatrix.push([]);
        for (let y = 0; y < canvasHeight; y++) {
            let bit = hasColor(x, y, canvasWidth, imageData);
            textMatrix[x].push(bit);
            if (bit) {
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

    return { x1, x2, centerX, centerY, width, textMatrix, pixels };
}

function drawText(text, fontSize) {
    ctx.font = `${fontSize}px Arial`;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = 'white';
    ctx.fillText(text, 0, canvasHeight - canvasBottonPadding);
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
