"use client";

import { useEffect, useReducer } from "react";
import { ALL_LESSON_IDS, UNITS } from "./curriculum";

const STORAGE_KEY = "tagquest.progress.v1";

export type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

export const ACHIEVEMENTS: Achievement[] = [
  { id: "first-steps", title: "First Steps", description: "Complete your first lesson", icon: "🌱" },
  { id: "quick-study", title: "Quick Study", description: "Complete 5 lessons", icon: "⚡" },
  { id: "halfway-there", title: "Halfway There", description: "Complete 12 lessons", icon: "🧭" },
  { id: "tag-master", title: "Tag Master", description: "Complete every lesson", icon: "👑" },
  { id: "unit-clear", title: "Unit Cleared", description: "Finish an entire unit", icon: "🏁" },
  { id: "flawless", title: "Flawless Victory", description: "Finish a lesson with zero wrong answers", icon: "💎" },
  { id: "streak-3", title: "On a Roll", description: "3-day learning streak", icon: "🔥" },
  { id: "streak-7", title: "Unstoppable", description: "7-day learning streak", icon: "🔥" },
  { id: "level-5", title: "Level 5", description: "Reach level 5", icon: "⭐" },
  { id: "level-10", title: "Level 10", description: "Reach level 10", icon: "🌟" },
];

type State = {
  xp: number;
  completedLessons: Record<string, { perfect: boolean; completedAt: string }>;
  correctChallengeIds: string[];
  streak: number;
  lastActiveDate: string | null;
  unlockedAchievements: string[];
  achievementQueue: string[];
  hydrated: boolean;
};

const initialState: State = {
  xp: 0,
  completedLessons: {},
  correctChallengeIds: [],
  streak: 0,
  lastActiveDate: null,
  unlockedAchievements: [],
  achievementQueue: [],
  hydrated: false,
};

type Action =
  | { type: "HYDRATE"; state: Partial<State> }
  | { type: "ANSWER_CORRECT"; challengeId: string; xp: number }
  | { type: "COMPLETE_LESSON"; lessonId: string; unitId: string; perfect: boolean; xp: number }
  | { type: "DEQUEUE_ACHIEVEMENT" }
  | { type: "RESET" };

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function bumpStreak(state: State): Pick<State, "streak" | "lastActiveDate"> {
  const today = todayKey();
  if (state.lastActiveDate === today) {
    return { streak: state.streak, lastActiveDate: state.lastActiveDate };
  }
  if (state.lastActiveDate) {
    const prev = new Date(state.lastActiveDate + "T00:00:00Z").getTime();
    const now = new Date(today + "T00:00:00Z").getTime();
    const dayDiff = Math.round((now - prev) / 86400000);
    if (dayDiff === 1) {
      return { streak: state.streak + 1, lastActiveDate: today };
    }
  }
  return { streak: 1, lastActiveDate: today };
}

function checkAchievements(state: State): string[] {
  const unlocked = new Set(state.unlockedAchievements);
  const newly: string[] = [];
  const completedCount = Object.keys(state.completedLessons).length;

  const maybeUnlock = (id: string, condition: boolean) => {
    if (condition && !unlocked.has(id)) {
      newly.push(id);
    }
  };

  maybeUnlock("first-steps", completedCount >= 1);
  maybeUnlock("quick-study", completedCount >= 5);
  maybeUnlock("halfway-there", completedCount >= 12);
  maybeUnlock("tag-master", completedCount >= ALL_LESSON_IDS.length);
  maybeUnlock(
    "unit-clear",
    UNITS.some((u) => u.lessonIds.every((id) => state.completedLessons[id])),
  );
  maybeUnlock(
    "flawless",
    Object.values(state.completedLessons).some((l) => l.perfect),
  );
  maybeUnlock("streak-3", state.streak >= 3);
  maybeUnlock("streak-7", state.streak >= 7);
  maybeUnlock("level-5", levelInfo(state.xp).level >= 5);
  maybeUnlock("level-10", levelInfo(state.xp).level >= 10);

  return newly;
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "HYDRATE":
      return { ...state, ...action.state, hydrated: true };
    case "ANSWER_CORRECT": {
      if (state.correctChallengeIds.includes(action.challengeId)) return state;
      const streakInfo = bumpStreak(state);
      const next: State = {
        ...state,
        xp: state.xp + action.xp,
        correctChallengeIds: [...state.correctChallengeIds, action.challengeId],
        ...streakInfo,
      };
      const newly = checkAchievements(next);
      return {
        ...next,
        unlockedAchievements: [...next.unlockedAchievements, ...newly],
        achievementQueue: [...next.achievementQueue, ...newly],
      };
    }
    case "COMPLETE_LESSON": {
      const existing = state.completedLessons[action.lessonId];
      const streakInfo = bumpStreak(state);
      const xpToAdd = existing ? 0 : action.xp;
      const perfect = existing ? existing.perfect || action.perfect : action.perfect;
      const next: State = {
        ...state,
        xp: state.xp + xpToAdd,
        completedLessons: {
          ...state.completedLessons,
          [action.lessonId]: { perfect, completedAt: new Date().toISOString() },
        },
        ...streakInfo,
      };
      const newly = checkAchievements(next);
      return {
        ...next,
        unlockedAchievements: [...next.unlockedAchievements, ...newly],
        achievementQueue: [...next.achievementQueue, ...newly],
      };
    }
    case "DEQUEUE_ACHIEVEMENT":
      return { ...state, achievementQueue: state.achievementQueue.slice(1) };
    case "RESET":
      return { ...initialState, hydrated: true };
    default:
      return state;
  }
}

export function levelInfo(xp: number) {
  let level = 1;
  let remaining = xp;
  let step = 60;
  while (remaining >= step) {
    remaining -= step;
    level += 1;
    step += 40;
  }
  return {
    level,
    xpIntoLevel: remaining,
    xpForNextLevel: step,
    progress: Math.min(1, remaining / step),
  };
}

export function useProgress() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        dispatch({ type: "HYDRATE", state: parsed });
      } else {
        dispatch({ type: "HYDRATE", state: {} });
      }
    } catch {
      dispatch({ type: "HYDRATE", state: {} });
    }
  }, []);

  useEffect(() => {
    if (!state.hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // storage unavailable — progress just won't persist
    }
  }, [state]);

  const answerCorrect = (challengeId: string, xp = 15) =>
    dispatch({ type: "ANSWER_CORRECT", challengeId, xp });

  const completeLesson = (lessonId: string, unitId: string, perfect: boolean, xp = 20) =>
    dispatch({ type: "COMPLETE_LESSON", lessonId, unitId, perfect, xp });

  const dequeueAchievement = () => dispatch({ type: "DEQUEUE_ACHIEVEMENT" });

  const reset = () => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    dispatch({ type: "RESET" });
  };

  return {
    state,
    level: levelInfo(state.xp),
    answerCorrect,
    completeLesson,
    dequeueAchievement,
    reset,
  };
}
