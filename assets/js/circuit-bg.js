/**
 * SiliconCraft — Circuit Board Trace Canvas Animation
 * Renders glowing neon pink electrical pulses traveling along PCB traces.
 * Pure Vanilla JS & HTML5 Canvas - Zero Dependencies.
 */

function initCircuitCanvas(canvasId = 'circuit-canvas') {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = (canvas.width = window.innerWidth || 1200);
  let height = (canvas.height = window.innerHeight || 800);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth || 1200;
    height = canvas.height = window.innerHeight || 800;
  });

  // Generate PCB Traces
  const traces = [];
  const numTraces = 22;

  for (let i = 0; i < numTraces; i++) {
    let x = Math.random() * width;
    let y = Math.random() * height;
    const pts = [{ x, y }];
    const segments = 3 + Math.floor(Math.random() * 3);

    for (let j = 0; j < segments; j++) {
      const dir = Math.floor(Math.random() * 4);
      const dist = 50 + Math.random() * 90;
      if (dir === 0) x += dist;
      else if (dir === 1) y += dist;
      else if (dir === 2) { x += dist * 0.7; y += dist * 0.7; }
      else { x -= dist * 0.7; y += dist * 0.7; }
      pts.push({ x, y });
    }
    traces.push(pts);
  }

  // Electrical Signal Pulses
  const pulses = traces.map((pts, i) => ({
    traceIdx: i,
    seg: 0,
    progress: Math.random(),
    speed: 0.003 + Math.random() * 0.005,
    size: 2.2 + Math.random() * 1.5,
  }));

  function draw() {
    ctx.clearRect(0, 0, width, height);

    // Draw Static Traces
    ctx.lineWidth = 1;
    traces.forEach((pts) => {
      ctx.strokeStyle = 'rgba(255, 42, 133, 0.08)';
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) {
        ctx.lineTo(pts[i].x, pts[i].y);
      }
      ctx.stroke();

      // Via Pads (Circuit junction nodes)
      pts.forEach((pt) => {
        ctx.fillStyle = 'rgba(255, 42, 133, 0.15)';
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 2.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 1, 0, Math.PI * 2);
        ctx.fill();
      });
    });

    // Draw Moving Pulses
    pulses.forEach((p) => {
      const pts = traces[p.traceIdx];
      if (!pts || pts.length < 2) return;

      const p1 = pts[p.seg];
      const p2 = pts[p.seg + 1];
      if (!p1 || !p2) return;

      p.progress += p.speed;
      if (p.progress >= 1) {
        p.progress = 0;
        p.seg++;
        if (p.seg >= pts.length - 1) {
          p.seg = 0;
          p.traceIdx = Math.floor(Math.random() * traces.length);
        }
      }

      const curX = p1.x + (p2.x - p1.x) * p.progress;
      const curY = p1.y + (p2.y - p1.y) * p.progress;

      // Glow effect
      ctx.save();
      ctx.shadowColor = '#ff2a85';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(curX, curY, p.size, 0, Math.PI * 2);
      ctx.fillStyle = '#ff2a85';
      ctx.fill();
      ctx.restore();
    });

    requestAnimationFrame(draw);
  }

  draw();
}

// Auto-initialize on load if canvas exists
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => initCircuitCanvas('circuit-canvas'));
} else {
  initCircuitCanvas('circuit-canvas');
}
