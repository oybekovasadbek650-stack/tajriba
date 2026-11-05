import { useEffect, useRef, useState } from 'react';

export const REDUCED = typeof matchMedia === 'function'
  ? matchMedia('(prefers-reduced-motion: reduce)').matches
  : false;

/* Element bir marta ko'rinsa — `inView` true bo'ladi va kuzatuv uziladi. */
export function useInView({ threshold = 0.15, rootMargin = '0px 0px -6% 0px' } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') { setInView(true); return; }

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        io.disconnect();
      }
    }, { threshold, rootMargin });

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return [ref, inView];
}
