import { useInView } from '../lib/useInView.js';

const W = 320, H = 190, TOP = 12, BOTTOM = 178;

function toPoints(values) {
  const step = W / (values.length - 1);
  return values.map((v, i) => [i * step, BOTTOM - (v / 100) * (BOTTOM - TOP)]);
}

const path = pts => pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');

/* Ikki qatorli animatsion chiziq diagrammasi. */
export function Chart({ ours, control, legend }) {
  const [ref, inView] = useInView();
  const a = toPoints(ours);
  const b = toPoints(control);
  const line = path(a);

  return (
    <figure className={`chart reveal ${inView ? 'in' : ''}`} ref={ref}>
      <div className="chart-grid" />
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Haftalar bo'yicha o'zlashtirish">
        <defs>
          <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5eead4" stopOpacity=".38" />
            <stop offset="100%" stopColor="#5eead4" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path className="area" d={`${line} L${W},${H} L0,${H}Z`} />
        <path className="line" d={line} />
        <path className="base" d={path(b)} />
        <g className="dots">
          {a.slice(-4).map((p, i) => (
            <circle key={i} cx={p[0]} cy={p[1]} r={i === 3 ? 4.5 : 3.5} />
          ))}
        </g>
      </svg>
      <figcaption>
        <b>{legend[0]}</b>
        <span className="dim">{legend[1]}</span>
        {legend[2]}
      </figcaption>
    </figure>
  );
}
