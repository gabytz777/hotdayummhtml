"use client";

import { useMemo, useState } from "react";
import { Button } from "@heroui/react";
import type { Challenge, Lesson } from "@/lib/curriculum";
import { isCorrectFill } from "@/lib/curriculum";
import { ConfettiBurst } from "./ConfettiBurst";

const CHALLENGE_XP = 15;
const LESSON_BONUS_XP = 20;

type Stage = "intro" | "challenge" | "summary";

export function LessonView({
  lesson,
  onExit,
  onAnswerCorrect,
  onCompleteLesson,
  onNextLesson,
  hasNextLesson,
  alreadyCompleted,
  answeredChallengeIds,
}: {
  lesson: Lesson;
  onExit: () => void;
  onAnswerCorrect: (challengeId: string, xp: number) => void;
  onCompleteLesson: (lessonId: string, unitId: string, perfect: boolean, xp: number) => void;
  onNextLesson: () => void;
  hasNextLesson: boolean;
  alreadyCompleted: boolean;
  answeredChallengeIds: Set<string>;
}) {
  const [stage, setStage] = useState<Stage>("intro");
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [fillValue, setFillValue] = useState("");
  const [answerState, setAnswerState] = useState<"idle" | "correct" | "incorrect">("idle");
  const [missedAny, setMissedAny] = useState(false);
  const [confettiSeed, setConfettiSeed] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);
  const [shakeKey, setShakeKey] = useState(0);
  const [hintRevealed, setHintRevealed] = useState(false);
  // Snapshot at mount: this component remounts per lesson (parent uses
  // key={lesson.id}), and these props otherwise flip mid-run the instant
  // this very attempt reports progress, which would corrupt the XP summary.
  const [startedAlreadyCompleted] = useState(alreadyCompleted);
  const [startedAnsweredIds] = useState(answeredChallengeIds);

  const challenge: Challenge | undefined = lesson.challenges[index];
  const progressPct = useMemo(
    () => Math.round((index / lesson.challenges.length) * 100),
    [index, lesson.challenges.length],
  );

  function resetChallengeInputs() {
    setSelected(null);
    setFillValue("");
    setAnswerState("idle");
    setHintRevealed(false);
  }

  function startLesson() {
    setStage("challenge");
    setIndex(0);
    setXpEarned(0);
    setMissedAny(false);
    resetChallengeInputs();
  }

  function submit() {
    if (!challenge || answerState === "correct") return;

    let correct = false;
    if (challenge.type === "mc") {
      correct = selected === challenge.correctIndex;
    } else {
      correct = isCorrectFill(challenge, fillValue);
    }

    if (correct) {
      setAnswerState("correct");
      setConfettiSeed((s) => s + 1);
      onAnswerCorrect(challenge.id, CHALLENGE_XP);
      if (!startedAnsweredIds.has(challenge.id)) {
        setXpEarned((x) => x + CHALLENGE_XP);
      }
      window.setTimeout(() => {
        if (index + 1 < lesson.challenges.length) {
          setIndex((i) => i + 1);
          resetChallengeInputs();
        } else {
          const perfect = !missedAny;
          onCompleteLesson(lesson.id, lesson.unitId, perfect, LESSON_BONUS_XP);
          setStage("summary");
        }
      }, 850);
    } else {
      setAnswerState("incorrect");
      setMissedAny(true);
      setShakeKey((k) => k + 1);
    }
  }

  if (stage === "intro") {
    return (
      <div className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center gap-6 px-4 py-10 sm:px-6">
        <button
          onClick={onExit}
          className="w-fit text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
        >
          ← Back to map
        </button>
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
          <p className="font-code mb-2 text-xs text-[var(--accent)]">
            {lesson.challenges.length} quick challenges
          </p>
          <h2 className="font-display text-2xl font-bold text-[var(--foreground)] sm:text-3xl">
            {lesson.title}
          </h2>
          <p className="mt-1 text-sm text-[var(--muted)]">{lesson.blurb}</p>

          <div className="mt-6 flex flex-col gap-3">
            {lesson.explanation.map((p, i) => (
              <p key={i} className="text-sm leading-relaxed text-[var(--foreground)]">
                {p}
              </p>
            ))}
          </div>

          <div className="mt-5 rounded-xl bg-[var(--warning-soft)] p-4">
            <p className="text-sm text-[var(--warning-soft-foreground)]">
              <span className="font-semibold">Tip: </span>
              {lesson.tip}
            </p>
          </div>

          <Button size="lg" fullWidth className="mt-6" onPress={startLesson}>
            Start quest
          </Button>
        </div>
      </div>
    );
  }

  if (stage === "summary") {
    const perfect = !missedAny;
    const bonusXp = startedAlreadyCompleted ? 0 : LESSON_BONUS_XP;
    const totalXp = xpEarned + bonusXp;
    return (
      <div className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center gap-6 px-4 py-10 text-center sm:px-6">
        <div className="animate-pop-in text-6xl">{perfect ? "🏆" : "🎉"}</div>
        <h2 className="font-display text-2xl font-bold text-[var(--foreground)] sm:text-3xl">
          {perfect ? "Flawless run!" : "Lesson complete!"}
        </h2>
        <p className="text-sm text-[var(--muted)]">
          {lesson.title} is in the books.
        </p>

        <div className="flex items-center gap-3">
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-5 py-3">
            <p className="font-code text-xl font-bold text-[var(--success)]">
              {totalXp > 0 ? `+${totalXp} XP` : "Reviewed"}
            </p>
            <p className="text-xs text-[var(--muted)]">
              {totalXp > 0 ? "earned this lesson" : "no new XP — already completed"}
            </p>
          </div>
          {perfect && (
            <div className="rounded-xl border border-[var(--accent)]/40 bg-[var(--accent-soft)] px-5 py-3">
              <p className="text-xl">💎</p>
              <p className="text-xs text-[var(--accent-soft-foreground)]">no mistakes</p>
            </div>
          )}
        </div>

        <div className="mt-2 flex w-full max-w-xs flex-col gap-2">
          {hasNextLesson && (
            <Button size="lg" fullWidth onPress={onNextLesson}>
              Next lesson →
            </Button>
          )}
          <Button size="lg" fullWidth variant="secondary" onPress={onExit}>
            Back to map
          </Button>
        </div>
      </div>
    );
  }

  if (!challenge) return null;

  return (
    <div className="mx-auto flex w-full max-w-xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onExit}
          className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
        >
          ✕
        </button>
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-[var(--surface-secondary)]">
          <div
            className="h-full rounded-full bg-[var(--accent)] transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <span className="font-code text-xs text-[var(--muted)] tabular-nums">
          {index + 1}/{lesson.challenges.length}
        </span>
      </div>

      <div
        key={shakeKey}
        className={[
          "relative rounded-2xl border bg-[var(--surface)] p-6",
          answerState === "incorrect"
            ? "animate-shake border-[var(--danger)]/50"
            : answerState === "correct"
              ? "border-[var(--success)]/50"
              : "border-[var(--border)]",
        ].join(" ")}
      >
        {answerState === "correct" && <ConfettiBurst seed={confettiSeed} />}

        <p className="text-base font-medium text-[var(--foreground)]">{challenge.prompt}</p>

        {challenge.code && (
          <pre className="font-code mt-3 overflow-x-auto rounded-lg bg-[var(--background)] p-3 text-sm text-[var(--tag)]">
            {challenge.code}
          </pre>
        )}

        <div className="mt-3">
          {hintRevealed ? (
            <p className="animate-pop-in flex items-start gap-2 rounded-lg bg-[var(--accent-soft)] px-3 py-2 text-sm text-[var(--accent-soft-foreground)]">
              <span>💡</span>
              <span>{challenge.hint}</span>
            </p>
          ) : (
            answerState !== "correct" && (
              <button
                onClick={() => setHintRevealed(true)}
                className="text-sm font-medium text-[var(--accent)] transition-opacity hover:opacity-80"
              >
                💡 Need a hint?
              </button>
            )
          )}
        </div>

        <div className="mt-5">
          {challenge.type === "mc" ? (
            <div className="flex flex-col gap-2">
              {challenge.options.map((opt, i) => {
                const isSelected = selected === i;
                const isRevealCorrect = answerState === "correct" && i === challenge.correctIndex;
                const isRevealWrong =
                  answerState === "incorrect" && isSelected && i !== challenge.correctIndex;
                return (
                  <button
                    key={i}
                    disabled={answerState === "correct"}
                    onClick={() => {
                      setSelected(i);
                      setAnswerState("idle");
                    }}
                    className={[
                      "font-code rounded-lg border px-4 py-3 text-left text-sm transition-colors",
                      isRevealCorrect
                        ? "border-[var(--success)] bg-[var(--success-soft)] text-[var(--success-soft-foreground)]"
                        : isRevealWrong
                          ? "border-[var(--danger)] bg-[var(--danger-soft)] text-[var(--danger-soft-foreground)]"
                          : isSelected
                            ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--foreground)]"
                            : "border-[var(--border)] bg-[var(--surface-secondary)] text-[var(--foreground)] hover:bg-[var(--surface-tertiary)]",
                    ].join(" ")}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          ) : (
            <input
              type="text"
              value={fillValue}
              disabled={answerState === "correct"}
              onChange={(e) => {
                setFillValue(e.target.value);
                setAnswerState("idle");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") submit();
              }}
              placeholder={challenge.placeholder ?? "your answer"}
              className={[
                "font-code w-full rounded-lg border px-4 py-3 text-sm outline-none transition-colors",
                answerState === "incorrect"
                  ? "border-[var(--danger)] bg-[var(--danger-soft)] text-[var(--foreground)]"
                  : "border-[var(--field-border)] bg-[var(--field-background)] text-[var(--field-foreground)] focus:border-[var(--accent)]",
              ].join(" ")}
              autoFocus
            />
          )}
        </div>

        {answerState === "incorrect" && (
          <p className="mt-3 text-sm text-[var(--danger)]">
            Not quite — give it another shot.
          </p>
        )}
        {answerState === "correct" && (
          <p className="animate-float-up mt-3 text-sm font-semibold text-[var(--success)]">
            Correct! +{CHALLENGE_XP} XP
          </p>
        )}
      </div>

      <Button
        size="lg"
        fullWidth
        isDisabled={
          answerState === "correct" ||
          (challenge.type === "mc" ? selected === null : fillValue.trim() === "")
        }
        onPress={submit}
      >
        {answerState === "correct" ? "Nice!" : "Check answer"}
      </Button>
    </div>
  );
}
