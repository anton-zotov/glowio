function updateParticle1(frame, s, sign) {
    this.x += this.vx;
    this.y += this.vy;

    this.vx = Math.cos(s + this.offset) * (this.vxMax - this.vxMax / 2);
    this.vy = Math.sin(s + this.offset) * (this.vyMax - this.vyMax / 2);

    // this.x += this.vx2;
    // this.y += this.vy2;

    // this.vx2 += this.ax2 * sign;
    // this.vy2 += this.ay2 * sign;
}

export function initParticle1(particle) {
    particle.vxMax = Math.random() * 4 - 1;
    particle.vyMax = Math.random() * 4 - 1;
    particle.vx = 0;
    particle.vy = 0;
    particle.offset = Math.random();
    particle.update = updateParticle1;

    particle.vx2 = Math.random() * 6 - 3;
    particle.vy2 = Math.random() * 6 - 3;
    particle.ax2 = particle.vx2 / 50;
    particle.ay2 = particle.vy2 / 50;
}
