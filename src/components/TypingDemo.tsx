"use client";

import { useEffect, useState } from "react";

type Snippet = {
  code: string;
  render: (typedLen: number) => React.ReactNode;
};

const SNIPPETS: Snippet[] = [
  {
    code: '<button>Level Up</button>',
    render: (n) => {
      const full = '<button>Level Up</button>';
      const done = n >= full.length;
      return done ? (
        <button className="animate-pop-in rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-[var(--accent-foreground)] shadow-lg shadow-[var(--accent)]/20">
          Level Up
        </button>
      ) : null;
    },
  },
  {
    code: '<h1>You can do this</h1>',
    render: (n) => {
      const full = '<h1>You can do this</h1>';
      const done = n >= full.length;
      return done ? (
        <h3 className="animate-pop-in font-display text-lg font-bold text-[var(--foreground)]">
          You can do this
        </h3>
      ) : null;
    },
  },
  {
    code: '<span>🔥 7 day streak</span>',
    render: (n) => {
      const full = '<span>🔥 7 day streak</span>';
      const done = n >= full.length;
      return done ? (
        <span className="animate-pop-in font-code rounded-full bg-[var(--warning-soft)] px-3 py-1 text-sm font-semibold text-[var(--warning-soft-foreground)]">
          🔥 7 day streak
        </span>
      ) : null;
    },
  },
];

export function TypingDemo() {
  const [snippetIndex, setSnippetIndex] = useState(0);
  const [typedLen, setTypedLen] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const snippet = SNIPPETS[snippetIndex];
    let i = 0;

    function tick() {
      if (cancelled) return;
      i += 1;
      setTypedLen(i);
      if (i < snippet.code.length) {
        window.setTimeout(tick, 38);
      } else {
        window.setTimeout(() => {
          if (!cancelled) setSnippetIndex((s) => (s + 1) % SNIPPETS.length);
        }, 1400);
      }
    }

    const startDelay = window.setTimeout(() => {
      setTypedLen(0);
      tick();
    }, 300);
    return () => {
      cancelled = true;
      window.clearTimeout(startDelay);
    };
  }, [snippetIndex]);

  const snippet = SNIPPETS[snippetIndex];
  const typed = snippet.code.slice(0, typedLen);

  return (
    <div className="grid w-full max-w-md grid-cols-1 gap-3 sm:grid-cols-2">
      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
        <div className="mb-2 flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-[var(--danger)]/70" />
          <span className="size-2.5 rounded-full bg-[var(--warning)]/70" />
          <span className="size-2.5 rounded-full bg-[var(--success)]/70" />
          <span className="font-code ml-2 text-[10px] text-[var(--muted)]">index.html</span>
        </div>
        <p className="font-code min-h-[3.5rem] text-sm leading-relaxed break-all text-[var(--tag)] sm:min-h-[1.5rem]">
          {typed}
          <span className="animate-caret text-[var(--muted)]">▌</span>
        </p>
      </div>
      <div className="flex items-center justify-center rounded-xl border border-dashed border-[var(--border)] bg-[var(--surface)]/50 p-4">
        <div className="flex min-h-8 items-center justify-center">{snippet.render(typedLen)}</div>
      </div>
    </div>
  );
}
