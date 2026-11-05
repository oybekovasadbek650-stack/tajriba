/* Yuqori panel + progress chizig'i + yon yo'liq. */
export function Nav({ brand, slides, active, progress, kiosk, setKiosk, go }) {
  return (
    <>
      <div className="progress" aria-hidden="true">
        <i style={{ transform: `scaleX(${progress})` }} />
      </div>

      <header className="topbar">
        <div className="brand">
          <span className="mark" />
          {brand}
          <span>·</span>
          <em>{slides[active]?.title}</em>
        </div>
        <button
          className="btn-ghost"
          type="button"
          aria-pressed={kiosk}
          onClick={() => setKiosk(!kiosk)}
        >
          <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
            <path d="M3 5h18v11H3z M8 21h8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <span>{kiosk ? 'Chiqish (Esc)' : "Ma'ruza rejimi"}</span>
        </button>
      </header>

      <nav className="rail" aria-label="Slaydlar">
        {slides.map((s, i) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={i === active ? 'on' : ''}
            onClick={e => { e.preventDefault(); go(i); }}
          >
            <span>{s.title}</span>
            <i />
          </a>
        ))}
      </nav>
    </>
  );
}
