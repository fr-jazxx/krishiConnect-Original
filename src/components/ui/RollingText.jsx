import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './RollingText.css';

gsap.registerPlugin(useGSAP);

/** Deterministic PRNG so the client builds stable reels. */
const mulberry32 = (seed) => () => {
  let t = (seed += 0x6d2b79f5);
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const buildReel = (charIndex, config) => {
  const rand = mulberry32(charIndex * 1013 + 7);
  const cycles = config.minCycles + Math.floor(rand() * config.cycleVariance);

  return {
    copies: cycles + 1,
    to: cycles,
    duration: config.duration + rand() * config.durationVariance,
  };
};

export default function RollingText({
  text = 'KrishiConnect',
  textColor,
  minCycles = 2,
  cycleVariance = 2,
  duration = 3.6,
  durationVariance = 1.4,
  subtitle = 'Direct Farm-to-Buyer Transparent Agricultural Platform',
  onExplore,
}) {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const reels = gsap.utils.toArray('[data-reel]', containerRef.current);

      if (reduced) {
        reels.forEach((reel) => {
          reel.style.setProperty('--k', reel.dataset.to ?? '0');
        });
        const heading = containerRef.current?.querySelector('h3');
        if (heading) {
          gsap.fromTo(
            heading,
            { opacity: 0 },
            { opacity: 1, duration: 0.8, ease: 'power2.out' }
          );
        }
        return;
      }

      reels.forEach((reel, i) => {
        const to = Number(reel.dataset.to);
        const scroll = { k: 0 };
        reel.style.setProperty('--k', '0');

        gsap.to(scroll, {
          k: to,
          duration: Number(reel.dataset.duration),
          delay: i * 0.05,
          ease: 'power3.out',
          onUpdate: () => reel.style.setProperty('--k', String(scroll.k)),
        });
      });
    },
    {
      scope: containerRef,
      dependencies: [minCycles, cycleVariance, duration, durationVariance],
    }
  );

  return (
    <div ref={containerRef} className="rolling-text-container">
      <div className="rolling-text-content">
        <div className="rolling-text-badge">
          <span className="rolling-text-badge-dot" />
          <span>Transparent Digital Mandi · Direct Farm Trade</span>
        </div>

        <h3
          aria-label={text}
          style={textColor ? { color: textColor } : {}}
          className="rolling-text-heading"
        >
          {text.split('').map((char, charIndex) => {
            if (char === ' ') {
              return (
                <span key={charIndex} className="rolling-text-space" aria-hidden>
                  &nbsp;
                </span>
              );
            }

            const reel = buildReel(charIndex, {
              minCycles,
              cycleVariance,
              duration,
              durationVariance,
            });

            return (
              <span
                key={charIndex}
                className="rolling-text-char-wrapper"
                aria-hidden
              >
                {/* Invisible anchor copy to maintain exact layout dimensions */}
                <span className="rolling-text-char-ghost">{char}</span>

                <span className="rolling-text-char-reel-window">
                  <span
                    data-reel=""
                    data-to={reel.to}
                    data-duration={reel.duration}
                    className="rolling-text-char-reel"
                  >
                    {Array.from({ length: reel.copies }, (_, copy) => (
                      <span key={copy} className="rolling-text-char-item">
                        {char}
                      </span>
                    ))}
                  </span>
                </span>
              </span>
            );
          })}
        </h3>

        {subtitle && (
          <p className="rolling-text-subtitle">{subtitle}</p>
        )}

        <div className="rolling-text-actions">
          <button
            type="button"
            className="rolling-text-explore-btn"
            onClick={onExplore}
          >
            <span>Scroll to Enter Platform</span>
            <svg
              className="rolling-text-scroll-icon"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <polyline points="19 12 12 19 5 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
