import { create } from "zustand";
import { BigNumber } from "mathjs";
import { devtools, persist } from "zustand/middleware";
import { storage } from "./storage";
import { gameMath } from "../gameMath";

interface ScoreState {
  score: BigNumber;
  addScore: (scoreToAdd: BigNumber) => void;
  removeScore: (scoreToRemove: BigNumber) => void;
  reset: () => void;
}

export const useScoreStore = create<ScoreState>()(
  devtools(
    persist(
      (set) => ({
        score: gameMath.bignumber("0"),
        addScore: (scoreToAdd: BigNumber) =>
          set((state) => ({ score: state.score.plus(scoreToAdd) })),
        removeScore: (scoreToRemove: BigNumber) =>
          set((state) => ({ score: state.score.minus(scoreToRemove) })),
        reset: () => set(() => ({ score: gameMath.bignumber("0") })),
      }),
      {
        name: "score-state",
        version: 1,
        storage: storage,
      }
    )
  )
);
