import { createParticle } from './create-particle';

export function createScene(app) {
    let particles = [];
    let frame = 0;
    let s = 0;
    let sign = 1;

    function reset() {
        frame = 0;
        s = 0;
        sign = 1;
        clear();
    }

    function update() {
        particles.forEach(particle => particle.update(frame, s, sign));

        if (frame % 102 === 0) {
            sign = -sign;
        }

        frame = (frame + 1) % 1000000000;
        s = s + (Math.PI / 51) * 3;
    }

    function addParticle(x, y, config) {
        const particle = createParticle(x, y, config);
        particles.push(particle);
        app.stage.addChild(particle);
    }

    function clear() {
        for (let particle of particles) {
            app.stage.removeChild(particle);
        }
        particles = [];
	}
	
	function getWidth() {
		return app.renderer.width;
	}

	function getHeight() {
		return app.renderer.height;
	}

    return { reset, update, addParticle, getWidth, getHeight };
}
