import { Reveal } from '../components/Reveal.jsx';
import { conclusion, meta } from '../data/content.js';

export function Conclusion({ onStage, onPdf }) {
  return (
    <>
      <Reveal as="p" className="kicker">{conclusion.kicker}</Reveal>
      <Reveal as="h2">{conclusion.title}<i className="dot" /></Reveal>

      <div className="concl stagger">
        {conclusion.points.map((p, i) => (
          <Reveal as="p" key={i} i={i}>
            <b>{i + 1}</b> {p}
          </Reveal>
        ))}
      </div>

      <Reveal as="div" className="cta" i={4}>
        <button className="btn" type="button" onClick={onStage}>
          Sahnada ko'rsatish <span>→</span>
        </button>
        <button className="btn ghost" type="button" onClick={onPdf}>
          Slaydlarni yuklab olish <span>↓</span>
        </button>
        <p className="sign">
          {conclusion.thanks} — {meta.author}
        </p>
        <p className="credit">{meta.videoCredit}</p>
      </Reveal>
    </>
  );
}
