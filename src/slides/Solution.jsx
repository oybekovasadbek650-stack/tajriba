import { Reveal, Rich } from '../components/Reveal.jsx';
import { solution } from '../data/content.js';

export function Solution() {
  const p = solution.panel;

  return (
    <>
      <div className="col">
        <Reveal as="p" className="kicker">{solution.kicker}</Reveal>
        <Reveal as="h2">{solution.title}</Reveal>

        <ul className="ticks stagger">
          {solution.points.map((item, i) => (
            <Reveal as="li" key={item.who} i={i}>
              <b>{item.who}</b> — {item.what}
            </Reveal>
          ))}
        </ul>

        <Reveal as="p" className="quote">"<Rich t={solution.quote} />"</Reveal>
      </div>

      <div className="col">
        <Reveal className="mock" i={2}>
          <div className="mock-bar">
            <i /><i /><i /><span>{p.url}</span>
          </div>
          <div className="mock-body">
            <p className="mock-q">{p.question}</p>
            <p className="mock-a">
              <b className="ok">To'g'ri.</b> {p.answer}
              <span className="why">{p.why}</span>
            </p>
            <div className="mock-meter">
              <i style={{ '--w': `${p.meter}%` }} />
            </div>
            <p className="mock-cap"><Rich t={p.caption} /></p>
          </div>
        </Reveal>
      </div>
    </>
  );
}
