import { useEffect, useRef, useState } from 'react';

/* Orqa fondagi video: sahifa scroll qilinganda video ham oldinga/orqaga yuradi.
   Video fayli: public/fon.mp4. Fayl bo'lmasa yoki yuklanmasa — eski jonli fon qoladi. */
export function ScrollVideo({ src, poster }) {
  const video = useRef(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    let raf = 0, target = 0, current = 0, duration = 0;

    const measure = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      target = max > 0 ? (scrollY / max) * duration : 0;
    };

    // Silliq harakat: video vaqti scroll'ga sekin yetib boradi.
    const tick = () => {
      current += (target - current) * 0.12;
      if (!v.seeking && Math.abs(v.currentTime - current) > 0.02) {
        v.currentTime = Math.min(Math.max(current, 0), duration - 0.05);
      }
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      duration = v.duration || 0;
      if (!duration || !isFinite(duration)) return;
      // iPhone'da seek ishlashi uchun video bir marta "play" qilinishi kerak.
      v.play().then(() => v.pause()).catch(() => {});
      measure();
      current = target;
      setReady(true);
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    };

    v.addEventListener('loadedmetadata', start);
    if (v.readyState >= 1) start();
    addEventListener('scroll', measure, { passive: true });
    addEventListener('resize', measure);

    return () => {
      cancelAnimationFrame(raf);
      v.removeEventListener('loadedmetadata', start);
      removeEventListener('scroll', measure);
      removeEventListener('resize', measure);
    };
  }, [src]);

  useEffect(() => {
    document.body.classList.toggle('has-video', !failed);
  }, [failed]);

  return (
    <div className={`bgvideo${failed ? '' : ' on'}`} aria-hidden="true">
      <video
        ref={video}
        src={src}
        poster={poster}
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        onError={() => { setReady(false); setFailed(true); }}
      />
      <div className="bgvideo-shade" />
    </div>
  );
}
