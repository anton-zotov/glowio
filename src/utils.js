export function debounce(callback, wait) {
    let timeout = null;

    return function () {
        const next = () => callback.apply(this, arguments);

        clearTimeout(timeout);
        timeout = setTimeout(next, wait);
    };
}

export function colorVariation(colorString, variation) {
    let baseColor = Number('0x' + colorString.slice(1));
    let r = (baseColor & 0xff0000) >> 16;
    let g = (baseColor & 0x00ff00) >> 8;
    let b = baseColor & 0x0000ff;
    return (
        (colorComponentVariation(r, variation) << 16) +
        (colorComponentVariation(g, variation) << 8) +
        colorComponentVariation(b, variation)
    );
}

function colorComponentVariation(colorComponent, variation) {
    let c = colorComponent + (Math.random() - 0.5) * 512 * variation / 100;
    return Math.max(0, Math.min(255, Math.round(c)));
}
