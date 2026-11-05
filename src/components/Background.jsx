import { useEffect, useRef } from 'react';
import { REDUCED } from '../lib/useInView.js';
import { ScrollVideo } from './ScrollVideo.jsx';

/* Jonli fon: aurora bloblari + yong'ul tori (canvas) + kursor dog'i. */
export function Background() {
  const canvas = useRef(null);
  const spot = useRef(null);

  useEffect(() => {
    const cv = canvas.current;
    const cx = cv.getContext('2d');
    const dpr = Math.min(devicePixelRatio || 1, 2);
    let w = 0, h = 0, pts = [], scroll = 0, raf = 0;

    const seed = () => {
      w = cv.width = Math.floor(innerWidth * dpr);
      h = cv.height = Math.floor(innerHeight * dpr);
      cv.style.width = innerWidth + 'px';
      cv.style.height = innerHeight + 'px';
      const n = Math.round(Math.min(innerWidth * innerHeight / 15000, 118));
      pts = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.16 * dpr,
        vy: (Math.random() - 0.5) * 0.16 * dpr,
        r: (Math.random() * 1.5 + 0.5) * dpr,
        depth: Math.random() * 0.6 + 0.3
      }));
    };

    const frame = () => {
      cx.clearRect(0, 0, w, h);
      const link = 132 * dpr;
      const off = scroll * 0.05 * dpr;

      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x += w; else if (p.x > w) p.x -= w;
        if (p.y < 0) p.y += h; else if (p.y > h) p.y -= h;
      }

      cx.lineWidth = dpr * 0.6;
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i], ay = a.y - off * a.depth;
        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j], by = b.y - off * b.depth;
          const d = Math.hypot(a.x - b.x, ay - by);
          if (d > link) continue;
          cx.strokeStyle = `rgba(140,160,255,${(1 - d / link) * 0.18})`;
          cx.beginPath();
          cx.moveTo(a.x, ay);
          cx.lineTo(b.x, by);
          cx.stroke();
        }
      }

      for (const p of pts) {
        cx.fillStyle = `rgba(190,215,255,${p.depth * 0.8})`;
        cx.beginPath();
        cx.arc(p.x, p.y - off * p.depth, p.r, 0, 6.2832);
        cx.fill();
      }
      raf = requestAnimationFrame(frame);
    };

    const onScroll = () => { scroll = window.scrollY; };
    const onResize = () => { seed(); if (REDUCED) frameOnce(); };
    const frameOnce = () => { cancelAnimationFrame(raf); frame(); cancelAnimationFrame(raf); };

    seed();
    if (REDUCED) frameOnce(); else raf = requestAnimationFrame(frame);
    addEventListener('resize', onResize);
    addEventListener('scroll', onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener('resize', onResize);
      removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    if (REDUCED || !matchMedia('(hover:hover)').matches) return;
    const node = spot.current;
    let tx = innerWidth / 2, ty = innerHeight / 2, sx = tx, sy = ty, raf = 0;

    const move = e => { tx = e.clientX; ty = e.clientY; };
    const loop = () => {
      sx += (tx - sx) * 0.07;
      sy += (ty - sy) * 0.07;
      node.style.transform = `translate3d(${sx}px,${sy}px,0)`;
      raf = requestAnimationFrame(loop);
    };
    addEventListener('pointermove', move, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => { removeEventListener('pointermove', move); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <ScrollVideo
        src={`${import.meta.env.BASE_URL}fon.mp4`}
        poster={`${import.meta.env.BASE_URL}fon-poster.jpg`}
      />
      <div className="aurora" aria-hidden="true">
        <span className="blob b1" /><span className="blob b2" />
        <span className="blob b3" /><span className="blob b4" />
      </div>
      <canvas id="net" ref={canvas} aria-hidden="true" />
      <div className="mesh" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <div className="spot" ref={spot} aria-hidden="true" />
    </>
  );
}
