import { useCallback, useEffect, useRef, useState } from 'react';
import { REDUCED } from './useInView.js';

/* Dek boshqaruvi: faol slayd, progress, ma'ruza rejimi, klaviatura. */
export function useDeck(slideCount) {
  const slides = useRef([]);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [kiosk, setKiosk] = useState(false);

  useEffect(() => {
    slides.current = Array.from(document.querySelectorAll('.slide'));
  }, [slideCount]);

  useEffect(() => {
    let raf = 0;
    const measure = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(y / max, 1) : 0);

      const line = y + window.innerHeight * 0.42;
      let idx = 0;
      slides.current.forEach((s, i) => { if (s.offsetTop <= line) idx = i; });
      setActive(prev => (prev === idx ? prev : idx));
    };
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(measure); };

    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    measure();
    return () => {
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const go = useCallback((i, instant) => {
    const el = slides.current[i];
    if (!el) return;
    el.scrollIntoView({ behavior: instant || REDUCED ? 'auto' : 'smooth', block: 'start' });
  }, []);

  useEffect(() => {
    const onKey = e => {
      if (e.target.isContentEditable) { if (e.key === 'Escape') e.target.blur(); return; }
      // Ctrl+F (qidiruv), Ctrl+P, Ctrl+1 kabi brauzer tugmalarini buzmaslik uchun.
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      // Tugma yoki maydon fokusda bo'lsa, Space/Enter o'z ishini qilsin.
      if (e.target.closest?.('button, input, textarea, select, [role="button"]') && (e.key === ' ' || e.key === 'Enter')) return;
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (k === 'ArrowRight' || k === ' ' || k === 'PageDown' || k === 'ArrowDown') { e.preventDefault(); go(active + 1); }
      else if (k === 'ArrowLeft' || k === 'PageUp' || k === 'ArrowUp') { e.preventDefault(); go(active - 1); }
      else if (k === 'Home') { e.preventDefault(); go(0); }
      else if (k === 'End') { e.preventDefault(); go(slides.current.length - 1); }
      else if (k === 'Escape' && kiosk) setKiosk(false);
      else if (k === 'f') { e.preventDefault(); document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen?.(); }
      else if (k === 'p') { e.preventDefault(); window.print(); }
      else if (/^[1-9]$/.test(k)) { e.preventDefault(); go(+k - 1); }
    };
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, [active, kiosk, go]);

  useEffect(() => {
    document.documentElement.classList.toggle('kiosk', kiosk);
    document.body.classList.toggle('kiosk', kiosk);
  }, [kiosk]);

  return { active, progress, kiosk, setKiosk, go };
}
