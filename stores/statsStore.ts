import { create } from "zustand";
import { BigNumber } from "mathjs";
import { devtools, persist } from "zustand/middleware";
import { storage } from "./storage";
import { gameMath } from "../gameMath";

interface StatsState {
  totalTime: BigNumber;
  incrementTotalTime: (seconds: BigNumber) => void;
  clicks: BigNumber;
  incrementClicks: (clicks: BigNumber) => void;
  reset: () => void;
}

export const useStatsStore = create<StatsState>()(
  devtools(
    persist(
      (set) => ({
        totalTime: gameMath.bignumber("0"),
        incrementTotalTime: (seconds: BigNumber) =>
          set((state) => ({ totalTime: state.totalTime.plus(seconds) })),
        clicks: gameMath.bignumber("0"),
        incrementClicks: (clicks: BigNumber) =>
          set((state) => ({ clicks: state.clicks.plus(clicks) })),
        reset: () =>
          set(() => ({
            totalTime: gameMath.bignumber("0"),
            clicks: gameMath.bignumber("0"),
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
