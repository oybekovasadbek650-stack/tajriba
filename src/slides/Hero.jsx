import { Reveal, Rich } from '../components/Reveal.jsx';
import { meta } from '../data/content.js';

export function Hero() {
  return (
    <>
      <Reveal as="p" className="eyebrow">
        {meta.event} · {meta.university}
      </Reveal>

      <Reveal as="h1"><Rich t={meta.title} /></Reveal>

      <Reveal as="p" className="lede" i={1}>{meta.lede}</Reveal>

      <Reveal className="meta stagger" i={2}>
        {meta.contacts.map((c, i) => (
          <div key={c.label}>
            <span>{c.label}</span>
            <strong>{c.value}</strong>
          </div>
        ))}
      </Reveal>

      <Reveal as="div" className="cue" i={3}>
        <i /><span>Sharchani aylantiring — yoki ↓ bosing</span>
      </Reveal>
    </>
  );
}
