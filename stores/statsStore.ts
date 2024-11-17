import { create } from "zustand";
import { BigNumber } from "mathjs";
import { devtools, persist } from "zustand/middleware";
import { storage } from "./storage";
import { gameMath } from "../gameMath";

interface StatsState {
  realTime: BigNumber;
  addRealTime: (ms: BigNumber) => void;
  gameTime: BigNumber;
  addGameTime: (ms: BigNumber) => void;
  reset: () => void;
}

export const useStatsStore = create<StatsState>()(
  devtools(
    persist(
      (set) => ({
        realTime: gameMath.bignumber("0"),
        addRealTime: (ms: BigNumber) =>
          set((state) => ({ realTime: state.realTime.plus(ms) })),
        gameTime: gameMath.bignumber("0"),
        addGameTime: (ms: BigNumber) =>
          set((state) => ({ gameTime: state.gameTime.plus(ms) })),
        reset: () =>
          set(() => ({
            realTime: gameMath.bignumber("0"),
            gameTime: gameMath.bignumber("0"),
          })),
      }),
      {
        name: "stats-state",
        version: 1,
        storage: storage,
      }
    )
  )
);
