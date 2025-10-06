// Fond animé effet réseau connecté (SVG dynamique)
const container = document.getElementById('background-network');
const svgNS = 'http://www.w3.org/2000/svg';
let w = window.innerWidth;
let h = window.innerHeight;
const svg = document.createElementNS(svgNS, 'svg');
svg.setAttribute('width', w);
svg.setAttribute('height', h);
svg.style.position = 'absolute';
svg.style.top = '0';
svg.style.left = '0';
svg.style.width = '100vw';
svg.style.height = '100vh';
svg.style.display = 'block';
container.appendChild(svg);

const NODES = 28;
const nodes = [];
const colorLine = '#1ec6e6';
const colorDot = '#fff';

for (let i = 0; i < NODES; i++) {
  nodes.push({
    x: Math.random() * w,
    y: Math.random() * h,
    dx: (Math.random() - 0.5) * 0.7,
    dy: (Math.random() - 0.5) * 0.7,
    r: Math.random() * 2.5 + 2.5
  });
}

function drawNetwork() {
  svg.innerHTML = '';
  // Lignes
  for (let i = 0; i < NODES; i++) {
    for (let j = i + 1; j < NODES; j++) {
      const a = nodes[i];
      const b = nodes[j];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      if (dist < 180) {
        const line = document.createElementNS(svgNS, 'line');
        line.setAttribute('x1', a.x);
        line.setAttribute('y1', a.y);
        line.setAttribute('x2', b.x);
        line.setAttribute('y2', b.y);
        line.setAttribute('stroke', colorLine);
        line.setAttribute('stroke-width', '1.2');
        line.setAttribute('opacity', (1 - dist / 180).toFixed(2));
        svg.appendChild(line);
      }
    }
  }
  // Points
  for (let n of nodes) {
    const circle = document.createElementNS(svgNS, 'circle');
    circle.setAttribute('cx', n.x);
    circle.setAttribute('cy', n.y);
    circle.setAttribute('r', n.r);
    circle.setAttribute('fill', colorDot);
    circle.setAttribute('opacity', '0.85');
    svg.appendChild(circle);
  }
}

function animateNetwork() {
  for (let n of nodes) {
    n.x += n.dx;
    n.y += n.dy;
    if (n.x < 0 || n.x > w) n.dx *= -1;
    if (n.y < 0 || n.y > h) n.dy *= -1;
  }
  drawNetwork();
  requestAnimationFrame(animateNetwork);
}

window.addEventListener('resize', () => {
  w = window.innerWidth;
  h = window.innerHeight;
  svg.setAttribute('width', w);
  svg.setAttribute('height', h);
});

drawNetwork();
animateNetwork();