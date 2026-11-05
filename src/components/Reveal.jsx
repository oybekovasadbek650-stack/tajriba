import { useInView } from '../lib/useInView.js';

/* Scroll bilan jonlanuvchi konteyner. `i` — stagger tartib raqami. */
export function Reveal({ as: Tag = 'div', i = 0, className = '', children, ...rest }) {
  const [ref, inView] = useInView();
  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? 'in' : ''} ${className}`.trim()}
      style={{ '--i': i }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* Matndagi {shu qism} gradient/emphasis bo'lib chiqadi. */
export function Rich({ t }) {
  const parts = String(t).split(/\{([^}]*)\}/g);
  return parts.map((p, idx) => (idx % 2 === 1 ? <em key={idx}>{p}</em> : p));
}
