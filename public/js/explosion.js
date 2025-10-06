// Animation d'explosion simple en canvas
export function explosionAt(x, y, parent = document.body) {
  const canvas = document.createElement('canvas');
  canvas.width = 200;
  canvas.height = 200;
  canvas.style.position = 'fixed';
  canvas.style.left = (x - 100) + 'px';
  canvas.style.top = (y - 100) + 'px';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = 9999;
  parent.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  const particles = [];
  const colors = ['#ffae00', '#ff0040', '#fff', '#ffec00', '#ff6a00'];
  for (let i = 0; i < 40; i++) {
    particles.push({
      x: 100,
      y: 100,
      r: Math.random() * 7 + 3,
      dx: Math.cos((i / 40) * 2 * Math.PI) * (Math.random() * 4 + 2),
      dy: Math.sin((i / 40) * 2 * Math.PI) * (Math.random() * 4 + 2),
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1
    });
  }

  let frame = 0;
  function animate() {
    ctx.clearRect(0, 0, 200, 200);
    for (let p of particles) {
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 20;
      ctx.fill();
      ctx.restore();
      p.x += p.dx;
      p.y += p.dy;
      p.dx *= 0.93;
      p.dy *= 0.93;
      p.alpha *= 0.94;
    }
    frame++;
    if (frame < 40) {
      requestAnimationFrame(animate);
    } else {
      canvas.remove();
    }
  }
  animate();
}

// Pour usage direct sans import ES6
window.explosionAt = explosionAt;
