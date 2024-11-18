import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { storage } from "./storage";
import { BigNumber } from "mathjs";

type GameEnginePropsV1 = {
  clockedIn: boolean;
};

type GameEnginePropsV2 = {
  clockedIn: boolean;
  lastTick: BigNumber | null;
};

type GameEngineActions = {
  setClockIn: (clockedIn: boolean) => void;
  setLastTick: (lastTick: BigNumber) => void;
  reset: () => void;
};

type GameEngineState = GameEnginePropsV2 & GameEngineActions;

const migrateToV2 = (persistedState: GameEnginePropsV1) => {
  return {
    lastTick: null,
    clockedIn: persistedState.clockedIn,
  };
};

export const useGameEngineStore = create<GameEngineState>()(
  devtools(
    persist(
      (set) => ({
        lastTick: null,
        clockedIn: false,
        setClockIn: (clockedIn: boolean) =>
          set(() => ({ clockedIn: clockedIn })),
        setLastTick: (lastTick: BigNumber) =>
          set(() => ({ lastTick: lastTick })),
        reset: () =>
          set(() => ({
            lastTick: null,
            clockedIn: false,
          })),
      }),
      {
        name: "game-engine-state",
        version: 2,
        storage: storage,
        migrate: (persistedState, version) => {
          if (version === 1) {
            const v1State = persistedState as GameEnginePropsV1;
            return migrateToV2(v1State);
          }
        },
      }
    )
  )
);
