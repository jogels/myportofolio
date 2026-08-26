import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './KineticWovenClothSection.css';

export default function KineticWovenClothSection() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let animId;
    let isRunning = false;
    let t = 0;

    // 1. Generate Procedural Woven Fabric Canvas Texture (Optimized 640x400)
    function makeClothTexture() {
      const W = 640;
      const H = 400;
      const c = document.createElement('canvas');
      c.width = W;
      c.height = H;
      const x = c.getContext('2d');
      if (!x) return new THREE.CanvasTexture(c);

      // Ivory Ground Gradient
      const g = x.createLinearGradient(0, 0, 0, H);
      g.addColorStop(0, '#efe6d4');
      g.addColorStop(0.5, '#e9dfca');
      g.addColorStop(1, '#e3d7bf');
      x.fillStyle = g;
      x.fillRect(0, 0, W, H);

      // Top solid crimson band connecting directly to marquee
      x.fillStyle = '#a5202c';
      x.fillRect(0, 0, W, 23);

      // Crimson Hem Borders
      x.strokeStyle = '#a5202c';
      x.lineWidth = 5;
      x.strokeRect(23, 23, W - 46, H - 46);
      x.lineWidth = 1.5;
      x.strokeStyle = '#7c1622';
      x.strokeRect(33, 33, W - 66, H - 66);

      // Top Title: Erzadev
      x.fillStyle = '#a5202c';
      x.font = 'bold 37px Georgia, "Times New Roman", serif';
      x.textAlign = 'center';
      x.textBaseline = 'middle';
      x.fillText('ERZADEV', W / 2, 100);

      x.font = 'normal 10px "Helvetica Neue", Arial, sans-serif';
      x.fillStyle = '#7c1622';
      x.fillText('· JAKARTA · INDONESIA ·', W / 2, 131);

      // Main Display: Welcome to My Website
      x.fillStyle = '#9e1e2a';
      x.font = 'bold 56px Georgia, "Times New Roman", serif';
      x.fillText('WELCOME TO', W / 2, 210);
      x.fillText('MY WEBSITE', W / 2, 272);

      // Weave Thread Grid Overlay
      x.globalAlpha = 1;
      for (let yy = 0; yy < H; yy += 4) {
        x.strokeStyle = 'rgba(60,30,20,0.05)';
        x.lineWidth = 1;
        x.beginPath();
        x.moveTo(0, yy + 0.5);
        x.lineTo(W, yy + 0.5);
        x.stroke();
      }
      for (let xx = 0; xx < W; xx += 4) {
        x.strokeStyle = 'rgba(255,250,235,0.06)';
        x.lineWidth = 1;
        x.beginPath();
        x.moveTo(xx + 0.5, 0);
        x.lineTo(xx + 0.5, H);
        x.stroke();
      }

      // Fabric Slub Noise (Optimized)
      try {
        const id = x.getImageData(0, 0, W, H);
        const d = id.data;
        for (let i = 0; i < d.length; i += 32) {
          const n = (Math.random() * 2 - 1) * 8;
          d[i] += n;
          d[i + 1] += n;
          d[i + 2] += n;
        }
        x.putImageData(id, 0, 0);
      } catch (e) {
        // fallback if getImageData fails
      }

      const tex = new THREE.CanvasTexture(c);
      tex.anisotropy = 1;
      tex.colorSpace = THREE.SRGBColorSpace;
      return tex;
    }

    // 2. Three.js Scene Setup (Optimized for 60fps performance)
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25));

    const BW = 4.4;
    const BH = 2.75;
    const GX = 14;
    const GY = 9;
    const geo = new THREE.PlaneGeometry(BW, BH, GX, GY);
    const mat = new THREE.MeshPhongMaterial({
      map: makeClothTexture(),
      side: THREE.DoubleSide,
      shininess: 6,
      specular: 0x2a1410,
      color: 0xffffff,
    });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    // Lighting
    scene.add(new THREE.AmbientLight(0xffe9d0, 0.65));
    const key = new THREE.DirectionalLight(0xfff0dc, 1.15);
    key.position.set(-3, 3.5, 3.2);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xb02330, 0.45);
    rim.position.set(3, -1.5, 2.0);
    scene.add(rim);

    // 3. Verlet Physics Setup
    const pos = geo.attributes.position;
    const N = (GX + 1) * (GY + 1);
    const cur = new Float32Array(N * 3);
    const prev = new Float32Array(N * 3);
    const rest = new Float32Array(N * 3);
    const pinned = new Uint8Array(N);

    for (let i = 0; i < N; i++) {
      const ax = pos.getX(i);
      const ay = pos.getY(i);
      const az = 0;
      cur[i * 3] = prev[i * 3] = rest[i * 3] = ax;
      cur[i * 3 + 1] = prev[i * 3 + 1] = rest[i * 3 + 1] = ay;
      cur[i * 3 + 2] = prev[i * 3 + 2] = rest[i * 3 + 2] = az;
    }

    // Pin top edge
    for (let ix = 0; ix <= GX; ix++) {
      pinned[ix] = 1;
    }
    const idx = (ix, iy) => ix + iy * (GX + 1);

    const restH = BW / GX;
    const restV = BH / GY;
    const GRAV = -3.1;
    const DAMP = 0.985;
    const DT = 0.016;

    function wind(ix, iy, time) {
      const cx = ix / GX;
      const cy = iy / GY;
      const travel = time * 1.7 - cy * 4.2;
      const gust = 0.6 + 0.42 * Math.sin(time * 0.6) + 0.18 * Math.sin(time * 1.9 + 1.3);
      const amp = 4.3 * cy;
      const fz = (Math.sin(travel + cx * 3.3) + 0.5 * Math.sin(travel * 1.7 + cx * 6.0)) * amp * gust;
      const fx = Math.sin(time * 0.9 + cy * 2.2) * 0.6 * cy;
      const fy = -0.4 * cy;
      return [fx, fy, fz];
    }

    function stepPhysics(time) {
      for (let iy = 0; iy <= GY; iy++) {
        for (let ix = 0; ix <= GX; ix++) {
          const i = idx(ix, iy);
          if (pinned[i]) continue;
          const [fx, fy, fz] = wind(ix, iy, time);
          for (let k = 0; k < 3; k++) {
            const j = i * 3 + k;
            const a = k === 0 ? fx : k === 1 ? fy + GRAV : fz;
            const v = (cur[j] - prev[j]) * DAMP;
            prev[j] = cur[j];
            cur[j] = cur[j] + v + a * DT * DT;
          }
        }
      }

      for (let it = 0; it < 2; it++) {
        for (let iy = 0; iy <= GY; iy++) {
          for (let ix = 0; ix < GX; ix++) {
            solve(idx(ix, iy), idx(ix + 1, iy), restH);
          }
        }
        for (let iy = 0; iy < GY; iy++) {
          for (let ix = 0; ix <= GX; ix++) {
            solve(idx(ix, iy), idx(ix, iy + 1), restV);
          }
        }
      }

      for (let ix = 0; ix <= GX; ix++) {
        const i = ix;
        cur[i * 3] = rest[i * 3];
        cur[i * 3 + 1] = rest[i * 3 + 1];
        cur[i * 3 + 2] = rest[i * 3 + 2];
        prev[i * 3] = rest[i * 3];
        prev[i * 3 + 1] = rest[i * 3 + 1];
        prev[i * 3 + 2] = rest[i * 3 + 2];
      }
    }

    function solve(a, b, rl) {
      const ax = cur[a * 3], ay = cur[a * 3 + 1], az = cur[a * 3 + 2];
      const bx = cur[b * 3], by = cur[b * 3 + 1], bz = cur[b * 3 + 2];
      let dx = bx - ax;
      let dy = by - ay;
      let dz = bz - az;
      const d = Math.sqrt(dx * dx + dy * dy + dz * dz) || 1e-6;
      const diff = (d - rl) / d * 0.5;
      dx *= diff;
      dy *= diff;
      dz *= diff;

      const pa = pinned[a];
      const pb = pinned[b];
      if (!pa && !pb) {
        cur[a * 3] += dx;
        cur[a * 3 + 1] += dy;
        cur[a * 3 + 2] += dz;
        cur[b * 3] -= dx;
        cur[b * 3 + 1] -= dy;
        cur[b * 3 + 2] -= dz;
      } else if (pa && !pb) {
        cur[b * 3] -= dx * 2;
        cur[b * 3 + 1] -= dy * 2;
        cur[b * 3 + 2] -= dz * 2;
      } else if (!pa && pb) {
        cur[a * 3] += dx * 2;
        cur[a * 3 + 1] += dy * 2;
        cur[a * 3 + 2] += dz * 2;
      }
    }

    let frameCounter = 0;
    function commit() {
      for (let i = 0; i < N; i++) {
        pos.setXYZ(i, cur[i * 3], cur[i * 3 + 1], cur[i * 3 + 2]);
      }
      pos.needsUpdate = true;
      frameCounter++;
      // Recompute vertex normals only once every 3 frames to save CPU
      if (frameCounter % 3 === 0) {
        geo.computeVertexNormals();
      }
    }

    // 4. Camera & Sizing Fit — Align top of cloth flush into marquee tape with 0px gap
    let camera;
    let lastW = 0;
    let lastH = 0;
    function fit() {
      const w = container.clientWidth || 1200;
      const h = container.clientHeight || 560;
      if (w === lastW && h === lastH) return;
      lastW = w;
      lastH = h;
      renderer.setSize(w, h, false);
      const aspect = w / h;
      camera = new THREE.PerspectiveCamera(42, aspect, 0.1, 100);
      const vFit = BH / 2 / Math.tan((42 * Math.PI) / 360);
      const hFit = BW / 2 / Math.tan((42 * Math.PI) / 360) / aspect;
      const dist = Math.max(vFit, hFit) * 1.05;
      const halfVisibleH = dist * Math.tan((42 * Math.PI) / 360);
      // Lift cloth up so the top pinned edge connects seamlessly with the marquee tape
      const targetCamY = BH / 2 - halfVisibleH - 0.18;
      camera.position.set(0, targetCamY, dist);
      camera.lookAt(0, targetCamY, 0);
    }

    const resizeObserver = new ResizeObserver(() => fit());
    resizeObserver.observe(container);
    fit();

    // Warm up physics so cloth doesn't start in rigid plane
    for (let s = 0; s < 40; s++) stepPhysics(s * DT);
    t = 40 * DT;

    // 5. Render Loop
    function loop() {
      if (!isRunning) return;
      t += DT;
      stepPhysics(t);
      commit();
      if (camera) {
        renderer.render(scene, camera);
      }
      animId = requestAnimationFrame(loop);
    }

    let isIntersecting = false;
    let isTabVisible = !document.hidden;

    function updateRunningState() {
      const shouldRun = isIntersecting && isTabVisible;
      if (shouldRun && !isRunning) {
        isRunning = true;
        animId = requestAnimationFrame(loop);
      } else if (!shouldRun && isRunning) {
        isRunning = false;
        cancelAnimationFrame(animId);
      }
    }

    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
      updateRunningState();
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Pause animation when element is offscreen for maximum performance
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isIntersecting = entry.isIntersecting;
      updateRunningState();
    }, { threshold: 0.1 });
    intersectionObserver.observe(container);

    return () => {
      isRunning = false;
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      renderer.dispose();
      mat.dispose();
      geo.dispose();
    };
  }, []);

  return (
    <section ref={containerRef} className="kinetic-cloth-section-container">
      {/* Background Aura Texture */}
      <div className="cloth-aura-bg"></div>

      {/* Three.js Cloth Canvas Simulation */}
      <div className="cloth-canvas-wrapper">
        <canvas ref={canvasRef} className="cloth-three-canvas" />
        <div className="cloth-vignette-overlay"></div>
      </div>
    </section>
  );
}
