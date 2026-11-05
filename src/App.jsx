import { Background } from './components/Background.jsx';
import { Nav } from './components/Nav.jsx';
import { useDeck } from './lib/useDeck.js';
import { meta, slides } from './data/content.js';
import { Hero } from './slides/Hero.jsx';
import { Problem } from './slides/Problem.jsx';
import { Solution } from './slides/Solution.jsx';
import { Architecture } from './slides/Architecture.jsx';
import { Results } from './slides/Results.jsx';
import { Ethics } from './slides/Ethics.jsx';
import { Roadmap } from './slides/Roadmap.jsx';
import { Team } from './slides/Team.jsx';
import { Conclusion } from './slides/Conclusion.jsx';

const DECK = [Hero, Problem, Solution, Architecture, Results, Ethics, Roadmap, Team, Conclusion];

export default function App() {
  const { active, progress, kiosk, setKiosk, go } = useDeck(slides.length);

  return (
    <>
      <Background />

      <Nav
        brand={meta.brand}
        slides={slides}
        active={active}
        progress={progress}
        kiosk={kiosk}
        setKiosk={setKiosk}
        go={go}
      />

      <main>
        {slides.map((s, i) => {
          const Slide = DECK[i];
          const cls = ['slide', s.hero && 'hero', s.split && 'split'].filter(Boolean).join(' ');
          return (
            <section key={s.id} id={s.id} className={cls} data-title={s.title}>
              {Slide === Conclusion
                ? <Conclusion onStage={() => setKiosk(true)} onPdf={() => window.print()} />
                : <Slide />}
            </section>
          );
        })}
      </main>
    </>
  );
}
