import { Reveal } from '../components/Reveal.jsx';
import { team } from '../data/content.js';

export function Team() {
  const solo = team.people.length === 1;

  return (
    <>
      <Reveal as="p" className="kicker">{team.kicker}</Reveal>
      <Reveal as="h2">{team.title}</Reveal>

      <div className={solo ? '' : 'grid g4 stagger'}>
        {team.people.map((p, i) => (
          <Reveal className={`person${solo ? ' solo' : ''}`} key={p.name} i={i}>
            <i>{p.initials}</i>
            <h3>{p.name}</h3>
            <p>{p.role}</p>
            {p.bio && <p className="bio">{p.bio}</p>}
          </Reveal>
        ))}
      </div>
    </>
  );
}
