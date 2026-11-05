import { Reveal } from '../components/Reveal.jsx';
import { CountUp } from '../components/CountUp.jsx';
import { Chart } from '../components/Chart.jsx';
import { results } from '../data/content.js';

export function Results() {
  return (
    <>
      <div className="col">
        <Reveal as="p" className="kicker">{results.kicker}</Reveal>
        <Reveal as="h2">{results.title}</Reveal>

        <div className="stats stagger">
          {results.stats.map((s, i) => (
            <Reveal className="stat" key={s.label} i={i}>
              <CountUp to={s.value} suffix={s.suffix} />
              <span>{s.label}</span>
            </Reveal>
          ))}
        </div>

        <Reveal as="p" className="note">{results.note}</Reveal>
      </div>

      <div className="col">
        <Chart {...results.chart} />
      </div>
    </>
  );
}
