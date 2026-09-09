import React from 'react';

/**
 * Premium SVG Crop Illustrations
 * Designed with rich gradients, organic contours, and agricultural fidelity
 * Replaces childish emojis with studio-grade botanical graphics
 */
export function TomatoIcon({ size = 40, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="tomBody" cx="38%" cy="32%" r="65%">
          <stop offset="0%" stopColor="#ff5252" />
          <stop offset="45%" stopColor="#e52d27" />
          <stop offset="90%" stopColor="#b31217" />
          <stop offset="100%" stopColor="#7a090e" />
        </radialGradient>
        <linearGradient id="tomGloss" x1="20" y1="18" x2="36" y2="34" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="leafGrad" x1="32" y1="8" x2="32" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4ade80" />
          <stop offset="70%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#14532d" />
        </linearGradient>
        <filter id="tomDrop" x="6" y="10" width="52" height="50" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="#7a090e" floodOpacity="0.3" />
        </filter>
      </defs>
      {/* Tomato Base Form */}
      <g filter="url(#tomDrop)">
        <path
          d="M32 18 C22 18 10 24 10 38 C10 51 21 58 32 58 C43 58 54 51 54 38 C54 24 42 18 32 18 Z"
          fill="url(#tomBody)"
        />
        {/* Natural fruit indentations */}
        <path
          d="M24 20 C18 25 12 33 12 40 C12 49 19 55 27 57 C22 53 19 46 19 39 C19 31 23 23 26 20 Z"
          fill="#d32f2f"
          opacity="0.4"
        />
        {/* Gloss highlight */}
        <ellipse cx="24" cy="28" rx="8" ry="4" transform="rotate(-30 24 28)" fill="url(#tomGloss)" />
      </g>
      {/* Stem and Calyx */}
      <path
        d="M32 8 C33 12 33 15 32 18"
        stroke="#15803d"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      {/* Leaves */}
      <path
        d="M32 18 C28 14 20 16 18 19 C22 20 28 19 32 18 Z
           M32 18 C36 14 44 16 46 19 C42 20 36 19 32 18 Z
           M32 18 C29 23 23 27 21 29 C24 27 29 23 32 18 Z
           M32 18 C35 23 41 27 43 29 C40 27 35 23 32 18 Z
           M32 18 C33 22 32 26 31 28 C32 25 32.5 21 32 18 Z"
        fill="url(#leafGrad)"
      />
    </svg>
  );
}

export function PaddyIcon({ size = 40, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="stalkGrad" x1="20" y1="58" x2="44" y2="12" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4d7c0f" />
          <stop offset="60%" stopColor="#84cc16" />
          <stop offset="100%" stopColor="#eab308" />
        </linearGradient>
        <linearGradient id="grainGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
      </defs>
      {/* Main Arching Stem */}
      <path d="M22 58 C24 45 28 32 38 18 C42 12 48 8 52 8" stroke="url(#stalkGrad)" strokeWidth="2.5" strokeLinecap="round" />
      {/* Grains / Husks along the arch */}
      <g fill="url(#grainGrad)">
        {/* Left cluster */}
        <path d="M25 38 C22 36 20 33 22 30 C25 31 27 34 26 37 Z" />
        <path d="M28 32 C24 30 22 26 24 23 C27 25 29 28 29 31 Z" />
        <path d="M32 26 C28 23 27 19 30 16 C32 18 34 22 33 25 Z" />
        <path d="M37 20 C34 16 33 12 36 9 C38 11 40 15 39 19 Z" />
        {/* Right cluster */}
        <path d="M30 42 C33 40 37 41 38 44 C36 45 32 45 30 42 Z" />
        <path d="M34 35 C38 33 42 34 43 37 C41 38 37 38 34 35 Z" />
        <path d="M39 28 C43 26 47 27 48 30 C46 31 42 31 39 28 Z" />
        <path d="M44 21 C48 19 51 20 53 23 C50 24 47 24 44 21 Z" />
        {/* Tip grains */}
        <path d="M49 14 C52 11 56 12 58 14 C55 16 52 16 49 14 Z" />
        <path d="M52 8 C55 6 58 7 60 9 C57 10 54 10 52 8 Z" />
      </g>
      {/* Leaf support */}
      <path d="M22 58 C16 48 14 36 12 28 C16 34 20 44 23 52" fill="#65a30d" opacity="0.85" />
    </svg>
  );
}

export function PotatoIcon({ size = 40, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="potBody" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#e8c89b" />
          <stop offset="45%" stopColor="#c59b63" />
          <stop offset="85%" stopColor="#966b35" />
          <stop offset="100%" stopColor="#6f481a" />
        </radialGradient>
      </defs>
      {/* Tuber Organic Shape */}
      <path
        d="M18 22 C26 14 42 16 50 24 C56 30 55 42 48 49 C40 56 24 55 16 48 C9 41 10 30 18 22 Z"
        fill="url(#potBody)"
      />
      {/* Soil eyes and dimples */}
      <g fill="#5c3a13" opacity="0.65">
        <ellipse cx="26" cy="24" rx="2" ry="1.2" transform="rotate(-15 26 24)" />
        <ellipse cx="42" cy="28" rx="2.5" ry="1" transform="rotate(20 42 28)" />
        <ellipse cx="32" cy="38" rx="2" ry="1" transform="rotate(5 32 38)" />
        <ellipse cx="22" cy="42" rx="1.8" ry="1" transform="rotate(-20 22 42)" />
        <ellipse cx="44" cy="42" rx="2" ry="1" transform="rotate(10 44 42)" />
      </g>
      {/* Soft highlight */}
      <ellipse cx="28" cy="26" rx="9" ry="5" fill="#fdf2e9" opacity="0.25" transform="rotate(-20 28 26)" />
    </svg>
  );
}

export function OnionIcon({ size = 40, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="onionBody" cx="40%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#e99b7b" />
          <stop offset="50%" stopColor="#c25350" />
          <stop offset="85%" stopColor="#8d2938" />
          <stop offset="100%" stopColor="#5c1522" />
        </radialGradient>
        <linearGradient id="onionShoot" x1="32" y1="6" x2="32" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#86efac" />
          <stop offset="100%" stopColor="#22c55e" />
        </linearGradient>
      </defs>
      {/* Bulb Body */}
      <path
        d="M32 18 C20 20 12 30 12 42 C12 53 21 58 32 58 C43 58 52 53 52 42 C52 30 44 20 32 18 Z"
        fill="url(#onionBody)"
      />
      {/* Skin Ridges */}
      <path d="M32 18 C25 26 22 38 22 49 C22 54 26 57 32 58" stroke="#fbcfe8" strokeWidth="1.2" opacity="0.4" fill="none" />
      <path d="M32 18 C39 26 42 38 42 49 C42 54 38 57 32 58" stroke="#fbcfe8" strokeWidth="1.2" opacity="0.4" fill="none" />
      {/* Root Whiskers */}
      <path d="M29 58 L27 62 M32 58 L32 63 M35 58 L37 62" stroke="#d4a373" strokeWidth="1.5" strokeLinecap="round" />
      {/* Green Neck Shoots */}
      <path d="M32 18 C31 13 28 8 26 6 C29 9 32 14 32 18 Z" fill="url(#onionShoot)" />
      <path d="M32 18 C33 12 36 7 39 5 C37 9 34 14 32 18 Z" fill="url(#onionShoot)" />
    </svg>
  );
}

export function WheatIcon({ size = 40, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="wheatGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="40%" stopColor="#eab308" />
          <stop offset="85%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#854d0e" />
        </linearGradient>
      </defs>
      {/* Stem */}
      <path d="M32 60 L32 12" stroke="#a16207" strokeWidth="2.5" strokeLinecap="round" />
      {/* Grains pairs stacked symmetrically with awns */}
      <g fill="url(#wheatGold)" stroke="#ca8a04" strokeWidth="0.8">
        {/* Tier 1 */}
        <path d="M32 46 C26 44 23 39 27 36 C30 38 32 43 32 46 Z" />
        <path d="M32 46 C38 44 41 39 37 36 C34 38 32 43 32 46 Z" />
        {/* Tier 2 */}
        <path d="M32 38 C26 36 23 31 27 28 C30 30 32 35 32 38 Z" />
        <path d="M32 38 C38 36 41 31 37 28 C34 30 32 35 32 38 Z" />
        {/* Tier 3 */}
        <path d="M32 30 C26 28 23 23 27 20 C30 22 32 27 32 30 Z" />
        <path d="M32 30 C38 28 41 23 37 20 C34 22 32 27 32 30 Z" />
        {/* Tier 4 (Top) */}
        <path d="M32 22 C27 20 25 15 28 13 C31 15 32 19 32 22 Z" />
        <path d="M32 22 C37 20 39 15 36 13 C33 15 32 19 32 22 Z" />
        {/* Apex */}
        <path d="M32 15 C30 11 31 7 32 5 C33 7 34 11 32 15 Z" />
      </g>
      {/* Long Bristles (Awns) */}
      <path d="M27 28 L15 14 M37 28 L49 14 M27 20 L18 8 M37 20 L46 8 M32 5 L32 0" stroke="#ca8a04" strokeWidth="1.2" strokeLinecap="round" opacity="0.75" />
    </svg>
  );
}

export function MustardIcon({ size = 40, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="mustardYellow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fffbeb" />
          <stop offset="40%" stopColor="#fde047" />
          <stop offset="85%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#a16207" />
        </radialGradient>
      </defs>
      {/* Green Stem */}
      <path d="M32 60 C32 45 32 30 32 24" stroke="#15803d" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M32 44 C26 40 22 41 18 43" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" />
      <path d="M32 36 C38 32 42 33 46 35" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" />
      {/* Four Petals Cruciform Flower */}
      <g fill="url(#mustardYellow)" stroke="#ca8a04" strokeWidth="0.8">
        <ellipse cx="32" cy="14" rx="7" ry="9" />
        <ellipse cx="32" cy="34" rx="7" ry="9" />
        <ellipse cx="22" cy="24" rx="9" ry="7" />
        <ellipse cx="42" cy="24" rx="9" ry="7" />
      </g>
      {/* Flower Center */}
      <circle cx="32" cy="24" r="4" fill="#65a30d" />
      <circle cx="32" cy="24" r="2" fill="#facc15" />
    </svg>
  );
}

export function RiceIcon({ size = 40, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bowlGrad" x1="12" y1="36" x2="52" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#163a2a" />
          <stop offset="100%" stopColor="#0d261b" />
        </linearGradient>
      </defs>
      {/* Ceramic Bowl */}
      <path d="M12 34 C12 50 22 56 32 56 C42 56 52 50 52 34 Z" fill="url(#bowlGrad)" stroke="#246b45" strokeWidth="1.5" />
      <path d="M26 56 L38 56 L37 59 L27 59 Z" fill="#246b45" />
      {/* Steaming Fragrant White Rice Mound */}
      <path d="M12 34 C12 24 22 20 32 20 C42 20 52 24 52 34 Z" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
      {/* Individual Grains */}
      <ellipse cx="28" cy="27" rx="3" ry="1.5" fill="#e2e8f0" transform="rotate(-15 28 27)" />
      <ellipse cx="36" cy="26" rx="3" ry="1.5" fill="#e2e8f0" transform="rotate(25 36 26)" />
      <ellipse cx="32" cy="30" rx="3" ry="1.5" fill="#cbd5e1" transform="rotate(-5 32 30)" />
      {/* Subtle steam */}
      <path d="M28 16 C26 12 30 10 28 6" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" fill="none" />
      <path d="M35 17 C33 13 37 11 35 7" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" fill="none" />
    </svg>
  );
}

/**
 * Universal Crop Visual Component
 */
export default function CropImage({ crop, size = 44, className = '' }) {
  const normalized = (crop || '').toLowerCase();

  switch (normalized) {
    case 'tomato':
      return <TomatoIcon size={size} className={className} />;
    case 'paddy':
      return <PaddyIcon size={size} className={className} />;
    case 'potato':
      return <PotatoIcon size={size} className={className} />;
    case 'onion':
      return <OnionIcon size={size} className={className} />;
    case 'wheat':
      return <WheatIcon size={size} className={className} />;
    case 'mustard':
      return <MustardIcon size={size} className={className} />;
    case 'rice':
      return <RiceIcon size={size} className={className} />;
    default:
      return <PaddyIcon size={size} className={className} />;
  }
}
