import { create } from "zustand";
import { BigNumber } from "mathjs";
import { devtools, persist } from "zustand/middleware";
import { storage } from "./storage";
import { gameMath } from "../gameMath";

interface FarmerState {
  unlocked: boolean;
  unlock: () => void;
  level: BigNumber;
  addLevel: (levelToAdd: BigNumber) => void;
  exponentLevel: BigNumber;
  addExponentLevel: (levelToAdd: BigNumber) => void;
  reset: () => void;
}

export const useFarmerStore = create<FarmerState>()(
  devtools(
    persist(
      (set) => ({
        unlocked: false,
        unlock: () => set(() => ({ unlocked: true })),
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
            unlocked: false,
          })),
      }),
      {
        name: "farmer-state",
        version: 1,
        storage: storage,
      }
    )
  )
);
