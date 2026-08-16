"use client";

import { useState } from "react";

const COLORS = ["var(--tag)", "var(--attr)", "var(--str)", "var(--accent)"];

type Piece = {
  id: number;
  dx: number;
  dy: number;
  color: string;
  delay: number;
  size: number;
  rotate: number;
};

function generatePieces(): Piece[] {
  const count = 22;
  return Array.from({ length: count }).map((_, i) => {
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4;
    const distance = 60 + Math.random() * 70;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;
    const color = COLORS[i % COLORS.length];
    const delay = Math.random() * 0.08;
    const size = 5 + Math.random() * 5;
    const rotate = Math.random() * 360;
    return { id: i, dx, dy, color, delay, size, rotate };
  });
}

/**
 * Mounted fresh on every correct answer (parent renders it conditionally),
 * so a lazy initial state is enough — no need to react to `seed` changing
 * while already mounted.
 */
export function ConfettiBurst({ seed }: { seed: number }) {
  const [pieces] = useState(generatePieces);

  return (
    <div
      key={seed}
      className="pointer-events-none absolute inset-0 z-50 overflow-visible"
      aria-hidden="true"
    >
      {pieces.map((p) => (
        <span
          key={p.id}
          className="animate-confetti absolute top-1/2 left-1/2 rounded-[2px]"
          style={
            {
              width: p.size,
              height: p.size * 0.6,
              backgroundColor: p.color,
              animationDelay: `${p.delay}s`,
              "--dx": `${p.dx}px`,
              "--dy": `${p.dy}px`,
              "--rot": `${p.rotate}deg`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
