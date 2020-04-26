import * as PIXI from 'pixi.js';
import './main.css';
import Menu from './menu/menu.svelte';
import { init, updateScene, scheduleUpdate } from './particle-system';

new Menu({
	target: document.body,
});

const theater = document.getElementById('theater');
const app = new PIXI.Application({
	resizeTo: theater,
});

theater.appendChild(app.view);
app.resize();

app.ticker.add(() => {
	updateScene();
});

init(app);

window.addEventListener("resize", () => {
	scheduleUpdate();
});

export function resizeTheater() {
	setTimeout(() => {
		app.resize();
		scheduleUpdate();
	});
}
