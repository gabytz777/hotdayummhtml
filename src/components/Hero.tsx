"use client";

import { Button } from "@heroui/react";
import { TypingDemo } from "./TypingDemo";

export function Hero({
  onStart,
  hasProgress,
}: {
  onStart: () => void;
  hasProgress: boolean;
}) {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center gap-10 px-6 py-16 text-center sm:py-24">
      <div className="font-code flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-xs text-[var(--muted)]">
        <span className="size-1.5 animate-pulse rounded-full bg-[var(--success)]" />
        24 lessons · instant feedback · zero penalties
      </div>

      <h1 className="font-display max-w-2xl text-4xl leading-[1.05] font-bold tracking-tight text-[var(--foreground)] sm:text-6xl">
        Learn HTML like it&apos;s{" "}
        <span className="text-[var(--tag)]">&lt;</span>
        <span className="text-[var(--str)]">a game</span>
        <span className="text-[var(--tag)]">/&gt;</span>
      </h1>

      <p className="max-w-lg text-base text-[var(--muted)] sm:text-lg">
        Type real tags, watch them render instantly, and level up with every
        correct answer. No lectures — just quick wins, stacked one on top of
        the other.
      </p>

      <TypingDemo />

      <div className="flex flex-col items-center gap-3">
        <Button size="lg" onPress={onStart} className="px-8">
          {hasProgress ? "Continue your quest" : "Start learning — it's free"}
        </Button>
        <p className="font-code text-xs text-[var(--muted)]">
          &lt;/&gt; 24 lessons · 6 units · runs entirely in your browser
        </p>
      </div>
    </div>
  );
}
