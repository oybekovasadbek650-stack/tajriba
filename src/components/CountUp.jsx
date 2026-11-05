import { useEffect, useState } from 'react';
import { useInView, REDUCED } from '../lib/useInView.js';

/* Raqam ko'ringanda 0 dan to'g'ri qiymatgacha o'sadi. */
export function CountUp({ to, suffix = '' }) {
  const [ref, inView] = useInView();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (REDUCED) { setValue(to); return; }

    const t0 = performance.now();
    const dur = 1400;
    let raf;
    const step = now => {
      const k = Math.min((now - t0) / dur, 1);
      setValue(Math.round(to * (1 - Math.pow(1 - k, 3))));
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return <b ref={ref}>{value}{suffix}</b>;
}
