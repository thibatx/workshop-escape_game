// Animation de particules futuristes
const canvas = document.createElement('canvas');
canvas.className = 'particles';
document.getElementById('background-anim').appendChild(canvas);
const ctx = canvas.getContext('2d');

let w = window.innerWidth;
let h = window.innerHeight;
canvas.width = w;
canvas.height = h;

window.addEventListener('resize', () => {
  w = window.innerWidth;
  h = window.innerHeight;
  canvas.width = w;
  canvas.height = h;
});

const particles = [];
const colors = ['#00fff7', '#00ff85', '#00bfff', '#0ff', '#0fffcf'];
const num = 60;

for (let i = 0; i < num; i++) {
  particles.push({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 2 + 1,
    dx: (Math.random() - 0.5) * 1.5,
    dy: (Math.random() - 0.5) * 1.5,
    color: colors[Math.floor(Math.random() * colors.length)]
  });
}

function draw() {
  ctx.clearRect(0, 0, w, h);
  for (let p of particles) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
    ctx.fillStyle = p.color;
    ctx.shadowColor = p.color;
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.shadowBlur = 0;
  }
  // Lignes entre particules proches
  for (let i = 0; i < num; i++) {
    for (let j = i + 1; j < num; j++) {
      let a = particles[i];
      let b = particles[j];
      let dist = Math.hypot(a.x - b.x, a.y - b.y);
      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = a.color + '55';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }
}

function animate() {
  for (let p of particles) {
    p.x += p.dx;
    p.y += p.dy;
    if (p.x < 0 || p.x > w) p.dx *= -1;
    if (p.y < 0 || p.y > h) p.dy *= -1;
  }
  draw();
  requestAnimationFrame(animate);
}

animate();