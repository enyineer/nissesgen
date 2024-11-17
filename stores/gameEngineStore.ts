import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { storage } from "./storage";

interface GameEngineState {
  clockedIn: boolean;
  setClockIn: (clockedIn: boolean) => void;
}

export const useGameEngineStore = create<GameEngineState>()(
  devtools(
    persist(
      (set) => ({
        clockedIn: false,
        setClockIn: (clockedIn: boolean) =>
          set(() => ({ clockedIn: clockedIn })),
      }),
      {
        name: "game-engine-state",
        version: 1,
        storage: storage,
      }
    )
  )
);
