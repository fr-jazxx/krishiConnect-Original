import { useRef } from 'react';
import './LiquidGlass.css';

/**
 * High-Performance LiquidGlass Component
 * Ultra-smooth, responsive glassmorphism with specular refraction and ambient lighting.
 * 100% resilient to window resize, zero html2canvas distortion or memory leaks.
 */
export default function LiquidGlass({
  children,
  type = 'rounded',
  borderRadius = 16,
  variant = 'card', // 'card', 'panel', 'accent', 'gold'
  className = '',
  style = {},
  onClick = null,
  interactiveSheen = true,
  ...props
}) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!interactiveSheen || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`liquid-glass-wrapper liquid-glass--${variant} liquid-glass--${type} ${className}`}
      style={{
        borderRadius: `${borderRadius}px`,
        ...style,
      }}
      onClick={onClick}
      {...props}
    >
      <div className="liquid-glass__sheen" aria-hidden="true" />
      <div className="liquid-glass__content">{children}</div>
    </div>
  );
}
