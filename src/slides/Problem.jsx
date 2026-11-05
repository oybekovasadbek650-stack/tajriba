import { Reveal, Rich } from '../components/Reveal.jsx';
import { problem } from '../data/content.js';

export function Problem() {
  return (
    <>
      <Reveal as="p" className="kicker">{problem.kicker}</Reveal>
      <Reveal as="h2">{problem.title}</Reveal>

      <div className="grid g3 stagger">
        {problem.cards.map((c, i) => (
          <Reveal as="article" className="card" key={c.h} i={i}>
            <span className="ico">{c.icon}</span>
            <h3>{c.h}</h3>
            <p>{c.p}</p>
          </Reveal>
        ))}
      </div>

      <Reveal as="p" className="note"><Rich t={problem.note} /></Reveal>
    </>
  );
}
