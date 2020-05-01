import { createParticle } from './create-particle';
import * as PIXI from 'pixi.js';

export function createScene(app) {
	let particles = [];
	let frame = 0;
	let s = 0;
	let sign = 1;
	let container;

	createContainer();

	function createContainer() {
		if (container) {
			app.stage.removeChild(container);
		}
		container = new PIXI.Container();
		app.stage.addChild(container);
	}

	function reset() {
		frame = 0;
		s = 0;
		sign = 1;
		createContainer();
		particles = [];
	}

    function update() {
		particles.forEach(particle => particle.update(frame, s, sign));

		if (frame % 102 === 0) {
			sign = -sign;
		}

		frame = (frame + 1) % 1000000000;
		s = s + (Math.PI / 51) * 3;
	}

	function addParticle(x, y, config, instanceConfig) {
		const particle = createParticle(x, y, config, instanceConfig);
		particles.push(particle);
		container.addChild(particle);
	}

	function getWidth() {
		return app.renderer.width;
	}

	function getHeight() {
		return app.renderer.height;
	}

	return { reset, update, addParticle, getWidth, getHeight };
}
