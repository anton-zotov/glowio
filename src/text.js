const textCanvas = document.getElementById('text-canvas');
const textCtx = textCanvas.getContext('2d');

const width = textCanvas.width;
const height = textCanvas.height;

function drawText(text) {
    textCtx.font = '30px Arial';
    textCtx.fillStyle = 'black';
    textCtx.fillRect(0, 0, textCanvas.width, textCanvas.height);
    textCtx.fillStyle = 'white';
    textCtx.fillText(text, 0, 30);
}

export function getTextMatrix(text) {
    drawText(text);

    const imageData = textCtx.getImageData(0, 0, width, height).data;
    const textMatrix = [];

    for (let x = 0; x < width; x++) {
        textMatrix.push([]);
        for (let y = 0; y < height; y++) {
            textMatrix[x].push(hasColor(x, y, width, imageData));
        }
    }

    return textMatrix;
}

function getColor(x, y, width, imageData) {
    let redPos = y * (width * 4) + x * 4;
    return [imageData[redPos], imageData[redPos + 1], imageData[redPos + 2]];
}

function hasColor(x, y, width, imageData) {
    const threshold = 127;
    let redPos = y * (width * 4) + x * 4;
    return imageData[redPos] >= threshold ? 1 : 0;
}
