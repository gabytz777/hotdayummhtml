"use client";

import { ALL_LESSON_IDS, LESSONS, UNITS } from "@/lib/curriculum";

type LessonProgress = Record<string, { perfect: boolean; completedAt: string }>;

export function LevelMap({
  completedLessons,
  onSelectLesson,
}: {
  completedLessons: LessonProgress;
  onSelectLesson: (lessonId: string) => void;
}) {
  const firstIncompleteIndex = ALL_LESSON_IDS.findIndex((id) => !completedLessons[id]);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-8 sm:px-6">
      <div>
        <h2 className="font-display text-2xl font-bold text-[var(--foreground)]">
          Your quest map
        </h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Clear each unit in order. Every correct answer earns XP right away.
        </p>
      </div>

      {UNITS.map((unit, unitIdx) => {
        const unitCompletedCount = unit.lessonIds.filter((id) => completedLessons[id]).length;
        const unitDone = unitCompletedCount === unit.lessonIds.length;

        return (
          <section
            key={unit.id}
            className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"
          >
            <div className="mb-4 flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <span className="font-code flex size-10 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-base text-[var(--accent-soft-foreground)]">
                  {unit.icon}
                </span>
                <div>
                  <h3 className="font-display text-base font-semibold text-[var(--foreground)]">
                    Unit {unitIdx + 1} · {unit.title}
                  </h3>
                  <p className="text-sm text-[var(--muted)]">{unit.description}</p>
                </div>
              </div>
              <span className="font-code shrink-0 rounded-full bg-[var(--surface-secondary)] px-2.5 py-1 text-xs text-[var(--muted)] tabular-nums">
                {unitCompletedCount}/{unit.lessonIds.length}
                {unitDone ? " ✓" : ""}
              </span>
            </div>

            <div className="flex flex-wrap gap-3">
              {unit.lessonIds.map((lessonId) => {
                const lesson = LESSONS[lessonId];
                const globalIdx = ALL_LESSON_IDS.indexOf(lessonId);
                const completed = completedLessons[lessonId];
                const isNext = globalIdx === firstIncompleteIndex;
                const isLocked = firstIncompleteIndex !== -1 && globalIdx > firstIncompleteIndex;
                const isUnlocked = !isLocked;

                return (
                  <button
                    key={lessonId}
                    disabled={isLocked}
                    onClick={() => isUnlocked && onSelectLesson(lessonId)}
                    className={[
                      "group flex w-[104px] flex-col items-center gap-2 rounded-xl border px-2 py-3 text-center transition-all",
                      completed
                        ? "border-[var(--success)]/40 bg-[var(--success-soft)] hover:bg-[var(--success-soft-hover)]"
                        : isNext
                          ? "border-[var(--accent)]/60 bg-[var(--accent-soft)] shadow-[0_0_0_3px_var(--accent-soft)] hover:bg-[var(--accent-soft-hover)]"
                          : isLocked
                            ? "cursor-not-allowed border-[var(--border)] bg-[var(--surface-secondary)]/60 opacity-50"
                            : "border-[var(--border)] bg-[var(--surface-secondary)] hover:bg-[var(--surface-tertiary)]",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "flex size-9 items-center justify-center rounded-full text-sm font-bold",
                        completed
                          ? "bg-[var(--success)] text-[var(--success-foreground)]"
                          : isNext
                            ? "bg-[var(--accent)] text-[var(--accent-foreground)]"
                            : "bg-[var(--default)] text-[var(--muted)]",
                      ].join(" ")}
                    >
                      {completed ? (completed.perfect ? "★" : "✓") : isLocked ? "🔒" : globalIdx + 1}
                    </span>
                    <span className="line-clamp-2 text-[11px] leading-tight font-medium text-[var(--foreground)]">
                      {lesson.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
