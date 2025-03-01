/* script.js */
document.getElementById("surpriseBtn").addEventListener("click", function() {
    launchFireworks();
});

const canvas = document.getElementById("fireworksCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function launchFireworks() {
    let particles = [];
    for (let i = 0; i < 100; i++) {
        particles.push(new HeartParticle(window.innerWidth / 2, window.innerHeight / 2));
    }
    animateParticles(particles);
}

function HeartParticle(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 15 + 5;
    this.speedX = (Math.random() - 0.5) * 12;
    this.speedY = (Math.random() - 0.5) * 12;
    this.opacity = 1;
    this.color = "red";
}

function drawHeart(x, y, size, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
    ctx.bezierCurveTo(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
    ctx.fill();
}

function animateParticles(particles) {
    let animationFrame;
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((p, index) => {
            drawHeart(p.x, p.y, p.size, `rgba(255, 0, 0, ${p.opacity})`);
            p.x += p.speedX;
            p.y += p.speedY;
            p.opacity -= 0.01;
            if (p.opacity <= 0) particles.splice(index, 1);
        });
        if (particles.length > 0) {
            animationFrame = requestAnimationFrame(animate);
        } else {
            cancelAnimationFrame(animationFrame);
        }
    }
    animate();
}
