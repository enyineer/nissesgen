import { create } from "zustand";
import { BigNumber } from "mathjs";
import { devtools, persist } from "zustand/middleware";
import { storage } from "./storage";
import { gameMath } from "../gameMath";

interface GeneratorState {
  level: BigNumber;
  addLevel: (levelToAdd: BigNumber) => void;
  exponentLevel: BigNumber;
  addExponentLevel: (levelToAdd: BigNumber) => void;
  reset: () => void;
}

export const useGeneratorStore = create<GeneratorState>()(
  devtools(
    persist(
      (set) => ({
        level: gameMath.bignumber("0"),
        addLevel: (levelToAdd: BigNumber) =>
          set((state) => ({ level: state.level.plus(levelToAdd) })),
        exponentLevel: gameMath.bignumber("0"),
        addExponentLevel: (levelToAdd: BigNumber) =>
          set((state) => ({
            exponentLevel: state.exponentLevel.plus(levelToAdd),
          })),
        reset: () =>
          set(() => ({
            level: gameMath.bignumber("0"),
            exponentLevel: gameMath.bignumber("0"),
          })),
      }),
      {
        name: "generator-state",
        version: 1,
        storage: storage,
      }
    )
  )
);
