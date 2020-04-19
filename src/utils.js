export function debounce(callback, wait) {
    let timeout = null;

    return function () {
        const next = () => callback.apply(this, arguments);

        clearTimeout(timeout);
        timeout = setTimeout(next, wait);
    };
}
