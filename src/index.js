import App from './App.svelte';
import './particle-system';

const app = new App({
    target: document.getElementById('svelte'),
});

window.app = app;

export default app;
