"use client";

import { useEffect, useState } from "react";
import { ALL_LESSON_IDS, LESSONS } from "@/lib/curriculum";
import { ACHIEVEMENTS, useProgress } from "@/lib/progress";
import { Hero } from "@/components/Hero";
import { HUD } from "@/components/HUD";
import { LevelMap } from "@/components/LevelMap";
import { LessonView } from "@/components/LessonView";

type Screen = { name: "hero" } | { name: "map" } | { name: "lesson"; lessonId: string };

export default function Home() {
  const progress = useProgress();
  const [screen, setScreen] = useState<Screen>({ name: "hero" });

  const hasProgress = Object.keys(progress.state.completedLessons).length > 0;

  // Returning learner: skip the pitch and drop them on the map once progress
  // has hydrated from localStorage, without forcing a setState-in-effect.
  const effectiveScreen: Screen =
    screen.name === "hero" && progress.state.hydrated && hasProgress
      ? { name: "map" }
      : screen;

  const activeAchievementId = progress.state.achievementQueue[0];
  const activeAchievement = activeAchievementId
    ? ACHIEVEMENTS.find((a) => a.id === activeAchievementId)
    : undefined;

  useEffect(() => {
    if (!activeAchievement) return;
    const t = window.setTimeout(() => progress.dequeueAchievement(), 3200);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeAchievement?.id]);

  return (
    <div className="flex min-h-screen flex-1 flex-col bg-[var(--background)]">
      {effectiveScreen.name !== "hero" && (
        <HUD
          xp={progress.state.xp}
          streak={progress.state.streak}
          onHome={() => setScreen({ name: "map" })}
        />
      )}

      {effectiveScreen.name === "hero" && (
        <Hero hasProgress={hasProgress} onStart={() => setScreen({ name: "map" })} />
      )}

      {effectiveScreen.name === "map" && (
        <LevelMap
          completedLessons={progress.state.completedLessons}
          onSelectLesson={(lessonId) => setScreen({ name: "lesson", lessonId })}
        />
      )}

      {effectiveScreen.name === "lesson" &&
        (() => {
          const lesson = LESSONS[effectiveScreen.lessonId];
          const idx = ALL_LESSON_IDS.indexOf(effectiveScreen.lessonId);
          const nextLessonId = ALL_LESSON_IDS[idx + 1];
          return (
            <LessonView
              key={lesson.id}
              lesson={lesson}
              onExit={() => setScreen({ name: "map" })}
              onAnswerCorrect={progress.answerCorrect}
              onCompleteLesson={progress.completeLesson}
              hasNextLesson={Boolean(nextLessonId)}
              onNextLesson={() =>
                nextLessonId
                  ? setScreen({ name: "lesson", lessonId: nextLessonId })
                  : setScreen({ name: "map" })
              }
              alreadyCompleted={Boolean(progress.state.completedLessons[lesson.id])}
              answeredChallengeIds={new Set(progress.state.correctChallengeIds)}
            />
          );
        })()}

      {activeAchievement && (
        <div className="animate-xp-toast pointer-events-none fixed inset-x-0 top-4 z-[100] flex justify-center px-4">
          <div className="pointer-events-auto flex items-center gap-3 rounded-2xl border border-[var(--accent)]/40 bg-[var(--surface)] px-4 py-3 shadow-2xl">
            <span className="text-2xl">{activeAchievement.icon}</span>
            <div>
              <p className="text-xs font-semibold tracking-wide text-[var(--accent)] uppercase">
                Achievement unlocked
              </p>
              <p className="font-display text-sm font-bold text-[var(--foreground)]">
                {activeAchievement.title}
              </p>
              <p className="text-xs text-[var(--muted)]">{activeAchievement.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
