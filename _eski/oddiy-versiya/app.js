/* ═══════════════ ALGORA · prezentatsiya dvizhoki ═══════════════ */
(() => {
  'use strict';

  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const DPR = Math.min(devicePixelRatio || 1, 2);
  const slides = [...document.querySelectorAll('.slide')];
  const rail = document.getElementById('rail');
  const bar = document.getElementById('bar');
  const secName = document.getElementById('secName');
  const toastEl = document.getElementById('toast');

  /* ─────────── 1. Yong'ul tori (canvas) ─────────── */
  const cv = document.getElementById('net');
  const cx = cv.getContext('2d');
  let W = 0, H = 0, pts = [], lastY = 0;

  function seed() {
    W = cv.width = Math.floor(innerWidth * DPR);
    H = cv.height = Math.floor(innerHeight * DPR);
    cv.style.width = innerWidth + 'px';
    cv.style.height = innerHeight + 'px';

    const n = Math.round(Math.min(innerWidth * innerHeight / 15000, 118));
    pts = Array.from({ length: n }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - .5) * .16 * DPR,
      vy: (Math.random() - .5) * .16 * DPR,
      r: (Math.random() * 1.5 + .5) * DPR,
      depth: Math.random() * .6 + .3
    }));
  }

  function frame() {
    cx.clearRect(0, 0, W, H);
    const L = 132 * DPR;
    const off = lastY * .05 * DPR;

    for (const p of pts) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x += W; else if (p.x > W) p.x -= W;
      if (p.y < 0) p.y += H; else if (p.y > H) p.y -= H;
    }

    cx.lineWidth = DPR * .6;
    for (let i = 0; i < pts.length; i++) {
      const a = pts[i], ay = a.y - off * a.depth;
      for (let j = i + 1; j < pts.length; j++) {
        const b = pts[j];
        const d = Math.hypot(a.x - b.x, ay - (b.y - off * b.depth));
        if (d > L) continue;
        cx.strokeStyle = 'rgba(140,160,255,' + (1 - d / L) * .18 + ')';
        cx.beginPath();
        cx.moveTo(a.x, ay);
        cx.lineTo(b.x, b.y - off * b.depth);
        cx.stroke();
      }
    }

    for (const p of pts) {
      cx.fillStyle = 'rgba(190,215,255,' + p.depth * .8 + ')';
      cx.beginPath();
      cx.arc(p.x, p.y - off * p.depth, p.r, 0, 6.2832);
      cx.fill();
    }
    if (!RM) requestAnimationFrame(frame);
  }

  seed();
  addEventListener('resize', () => { seed(); if (RM) frame(); });
  frame();

  /* ─────────── 2. Yorug' dog'i kursor ortidan ─────────── */
  const spot = document.getElementById('spot');
  if (matchMedia('(hover:hover)').matches && !RM) {
    let tx = innerWidth / 2, ty = innerHeight / 2, sx = tx, sy = ty;
    addEventListener('pointermove', e => { tx = e.clientX; ty = e.clientY; }, { passive: true });
    (function loop() {
      sx += (tx - sx) * .07; sy += (ty - sy) * .07;
      spot.style.transform = 'translate3d(' + sx + 'px,' + sy + 'px,0)';
      requestAnimationFrame(loop);
    })();
  }

  /* ─────────── 3. Yon yo'liq (rail) ─────────── */
  slides.forEach((s, i) => {
    const a = document.createElement('a');
    a.href = '#' + s.id;
    a.innerHTML = '<span>' + s.dataset.title + '</span><i></i>';
    a.addEventListener('click', e => { e.preventDefault(); go(i); });
    rail.appendChild(a);
  });
  const dots = [...rail.children];

  /* ─────────── 4. Reveal + stagger ─────────── */
  document.querySelectorAll('.stagger').forEach(g =>
    [...g.children].forEach((c, i) => c.style.setProperty('--i', i)));

  const io = new IntersectionObserver(entries => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      e.target.classList.add('in');
      const n = e.target.querySelector ? e.target.querySelector('[data-count]') : null;
      if (e.target.dataset.count !== undefined) countUp(e.target);
      else if (n) countUp(n);
      io.unobserve(e.target);
    }
  }, { threshold: .15, rootMargin: '0px 0px -6% 0px' });

  document.querySelectorAll('.reveal, .slide').forEach(el => io.observe(el));

  /* ─────────── 5. Raqam o'sishi ─────────── */
  function countUp(el) {
    const to = +el.dataset.count, suf = el.dataset.suffix || '';
    if (RM) { el.textContent = to + suf; return; }
    const t0 = performance.now(), dur = 1400;
    (function step(now) {
      const k = Math.min((now - t0) / dur, 1);
      el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))) + suf;
      if (k < 1) requestAnimationFrame(step);
    })(t0);
  }

  /* ─────────── 6. Progress va faol slayd ─────────── */
  let active = -1;
  function onScroll() {
    const y = window.scrollY;
    lastY = y;
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(y / max, 1) : 0) + ')';

    const line = y + innerHeight * .42;
    let idx = 0;
    slides.forEach((s, i) => { if (s.offsetTop <= line) idx = i; });

    if (idx !== active) {
      active = idx;
      dots.forEach((d, i) => d.classList.toggle('on', i === idx));
      secName.textContent = slides[idx].dataset.title;
    }
  }
  addEventListener('scroll', () => requestAnimationFrame(onScroll), { passive: true });
  onScroll();

  /* ─────────── 7. Slayd bo'yicha yurish ─────────── */
  function go(i, instant) {
    i = Math.max(0, Math.min(slides.length - 1, i));
    slides[i].scrollIntoView({ behavior: instant || RM ? 'auto' : 'smooth', block: 'start' });
  }

  /* ─────────── 8. Ma'ruza (kiosk) rejimi ─────────── */
  const kBtn = document.getElementById('kioskBtn');
  const kLabel = kBtn.querySelector('span');
  let kiosk = false;

  function setKiosk(on) {
    kiosk = on;
    document.documentElement.classList.toggle('kiosk', on);
    document.body.classList.toggle('kiosk', on);
    kBtn.setAttribute('aria-pressed', String(on));
    kLabel.textContent = on ? 'Chiqish (Esc)' : "Ma'ruza rejimi";
    if (!on) go(active, true);
    say(on ? "Ma'ruza rejimi: ← → yoki Probel bilan boshqaring" : 'Erkin aylantirish rejimi');
  }
  kBtn.addEventListener('click', () => setKiosk(!kiosk));

  /* ─────────── 9. Klaviatura ─────────── */
  addEventListener('keydown', e => {
    if (e.target.isContentEditable) { if (e.key === 'Escape') e.target.blur(); return; }
    const k = e.key;
    if (k === 'ArrowRight' || k === ' ' || k === 'PageDown' || k === 'ArrowDown') { e.preventDefault(); go(active + 1); }
    else if (k === 'ArrowLeft' || k === 'PageUp' || k === 'ArrowUp') { e.preventDefault(); go(active - 1); }
    else if (k === 'Home') { e.preventDefault(); go(0); }
    else if (k === 'End') { e.preventDefault(); go(slides.length - 1); }
    else if (k === 'Escape' && kiosk) setKiosk(false);
    else if (k === 'f') { e.preventDefault(); toggleFs(); }
    else if (k === 'p') { e.preventDefault(); toPdf(); }
    else if (/^[1-9]$/.test(k)) { e.preventDefault(); go(+k - 1); }
  });

  function toggleFs() {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen?.();
  }

  /* ─────────── 10. Bo'sh joylarni bosib to'ldirish ─────────── */
  const KEY = 'algora-fillin-v1';
  const store = JSON.parse(localStorage.getItem(KEY) || '{}');
  document.querySelectorAll('.fillin').forEach((el, i) => {
    const id = 'f' + i;
    el.dataset.id = id;
    if (store[id]) el.textContent = store[id];
    el.title = 'Bosing — ozingizning molozingizni yozing';
    el.addEventListener('click', () => { el.contentEditable = 'true'; el.focus(); });
    el.addEventListener('blur', () => {
      el.contentEditable = 'false';
      store[id] = el.textContent.trim();
      localStorage.setItem(KEY, JSON.stringify(store));
      say('Saqlandi: ' + el.textContent.trim());
    });
  });

  /* ─────────── 11. Toast ─────────── */
  let tid;
  function say(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(tid);
    tid = setTimeout(() => toastEl.classList.remove('show'), 2800);
  }

  function toPdf() {
    say('Slaydlarni PDF ga saqlash oynasi ochilmoqda…');
    setTimeout(() => window.print(), 340);
  }

  document.querySelector('[data-demo]').addEventListener('click', e => {
    e.preventDefault(); setKiosk(true);
  });
  document.querySelector('[data-slide]').addEventListener('click', e => {
    e.preventDefault(); toPdf();
  });

  /* ─────────── 12. Start ─────────── */
  requestAnimationFrame(() => { slides[0].classList.add('in'); onScroll(); });
  addEventListener('load', onScroll);
})();
