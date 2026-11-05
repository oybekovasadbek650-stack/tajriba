import { Reveal } from '../components/Reveal.jsx';
import { roadmap } from '../data/content.js';

export function Roadmap() {
  return (
    <>
      <Reveal as="p" className="kicker">{roadmap.kicker}</Reveal>
      <Reveal as="h2">{roadmap.title}</Reveal>

      <ol className="timeline stagger">
        {roadmap.steps.map((s, i) => (
          <Reveal as="li" key={s.when} i={i}>
            <b>{s.when}</b>
            <span>{s.what}</span>
          </Reveal>
        ))}
      </ol>
    </>
  );
}
