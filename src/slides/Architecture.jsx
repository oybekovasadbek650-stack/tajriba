import { Fragment } from 'react';
import { Reveal } from '../components/Reveal.jsx';
import { architecture } from '../data/content.js';

export function Architecture() {
  const last = architecture.steps.length - 1;

  return (
    <>
      <Reveal as="p" className="kicker">{architecture.kicker}</Reveal>
      <Reveal as="h2">{architecture.title}</Reveal>

      <div className="pipe">
        {architecture.steps.map((s, i) => (
          <Fragment key={s.n}>
            <Reveal className={`node${i === last ? ' end' : ''}`} i={i}>
              <span>{s.n}</span>
              <h4>{s.h}</h4>
              <p>{s.p}</p>
            </Reveal>
            {i < last && <Reveal className="wire" i={i} />}
          </Fragment>
        ))}
      </div>

      <Reveal className="chips stagger" i={2}>
        {architecture.stack.map((t, i) => (
          <span className="chip" key={t} style={{ '--i': i }}>{t}</span>
        ))}
      </Reveal>
    </>
  );
}
