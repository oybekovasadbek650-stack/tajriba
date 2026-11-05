import { Reveal } from '../components/Reveal.jsx';
import { ethics } from '../data/content.js';

export function Ethics() {
  return (
    <>
      <Reveal as="p" className="kicker">{ethics.kicker}</Reveal>
      <Reveal as="h2">{ethics.title}</Reveal>

      <div className="grid g4 stagger">
        {ethics.cards.map((c, i) => (
          <Reveal className="card" key={c.h} i={i}>
            <h3>{c.h}</h3>
            <p>{c.p}</p>
          </Reveal>
        ))}
      </div>
    </>
  );
}
