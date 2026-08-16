"use client";

import { ProgressBar } from "@heroui/react";
import { levelInfo } from "@/lib/progress";

export function HUD({
  xp,
  streak,
  onHome,
}: {
  xp: number;
  streak: number;
  onHome?: () => void;
}) {
  const { level, xpIntoLevel, xpForNextLevel } = levelInfo(xp);

  return (
    <div className="border-b border-[var(--border)] bg-[var(--surface)]/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-4xl items-center gap-4 px-4 py-3 sm:px-6">
        <button
          onClick={onHome}
          className="font-display flex shrink-0 items-center gap-1.5 text-base font-semibold tracking-tight text-[var(--foreground)] transition-opacity hover:opacity-80"
        >
          <span className="font-code text-[var(--tag)]">&lt;</span>
          Tag Quest
          <span className="font-code text-[var(--tag)]">/&gt;</span>
        </button>

        <div className="flex min-w-0 flex-1 items-center gap-2.5">
          <span className="font-code shrink-0 rounded-md bg-[var(--accent-soft)] px-2 py-0.5 text-xs font-semibold text-[var(--accent-soft-foreground)]">
            Lv {level}
          </span>
          <ProgressBar
            aria-label="Level progress"
            className="w-full min-w-0"
            color="accent"
            size="sm"
            value={xpIntoLevel}
            maxValue={xpForNextLevel}
          >
            <ProgressBar.Track>
              <ProgressBar.Fill />
            </ProgressBar.Track>
          </ProgressBar>
          <span className="font-code hidden shrink-0 text-xs text-[var(--muted)] tabular-nums sm:block">
            {xpIntoLevel}/{xpForNextLevel} XP
          </span>
        </div>

        <div
          className="flex shrink-0 items-center gap-1 rounded-full bg-[var(--warning-soft)] px-2.5 py-1 text-xs font-semibold text-[var(--warning-soft-foreground)]"
          title={`${streak}-day streak`}
        >
          <span>🔥</span>
          <span className="font-code tabular-nums">{streak}</span>
        </div>
      </div>
    </div>
  );
}
