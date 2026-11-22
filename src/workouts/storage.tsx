import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';

type Exercise = { name: string; weight: number; sets: number; date: string };
type Workout = Exercise & { id: string };
type History =
  | { status: 'loading' | 'error' }
  | { status: 'ready'; entries: Workout[] };

const storageKey = 'workout-logger:history:v1';
const WorkoutContext = createContext<{
  history: History;
  reload: () => void;
  save: (exercise: Exercise) => Promise<void>;
} | null>(null);

function isWorkout(value: unknown): value is Workout {
  if (typeof value !== 'object' || value === null) return false;
  const entry = value as Partial<Workout>;
  return typeof entry.id === 'string' && typeof entry.name === 'string'
    && typeof entry.weight === 'number' && Number.isFinite(entry.weight) && entry.weight >= 0
    && typeof entry.sets === 'number' && Number.isSafeInteger(entry.sets) && entry.sets > 0
    && typeof entry.date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(entry.date);
}

async function readHistory(): Promise<History> {
  try {
    const stored = await AsyncStorage.getItem(storageKey);
    const entries: unknown = stored === null ? [] : JSON.parse(stored);
    if (!Array.isArray(entries) || !entries.every(isWorkout)) {
      return { status: 'error' };
    }
    return { status: 'ready', entries };
  } catch {
    return { status: 'error' };
  }
}

export function WorkoutProvider({ children }: { children: ReactNode }) {
  const [history, setHistory] = useState<History>({ status: 'loading' });
  const pendingWrite = useRef(false);

  useEffect(() => {
    let active = true;
    void readHistory().then((result) => {
      if (active) setHistory(result);
    });
    return () => { active = false; };
  }, []);

  function reload() {
    setHistory({ status: 'loading' });
    void readHistory().then(setHistory);
  }

  async function save(exercise: Exercise) {
    if (history.status !== 'ready' || pendingWrite.current) {
      throw new Error('History unavailable');
    }
    pendingWrite.current = true;
    try {
      const entries = [
        { ...exercise, id: String(history.entries.length + 1) },
        ...history.entries,
      ];
      await AsyncStorage.setItem(storageKey, JSON.stringify(entries));
      setHistory({ status: 'ready', entries });
    } finally {
      pendingWrite.current = false;
    }
  }

  return (
    <WorkoutContext.Provider value={{ history, reload, save }}>
      {children}
    </WorkoutContext.Provider>
  );
}

export function useWorkouts() {
  const workouts = useContext(WorkoutContext);
  if (!workouts) throw new Error('WorkoutProvider is missing');
  return workouts;
}
