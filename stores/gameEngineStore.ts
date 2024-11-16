import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { storage } from "./storage";
import { BigNumber } from "mathjs";
import { gameMath } from "../gameMath";

interface GameEngineState {
  lastTick: BigNumber;
  tick: () => void;
}

export const useGameEngineStore = create<GameEngineState>()(
  devtools(
    persist(
      (set) => ({
        lastTick: gameMath.bignumber(Date.now()),
        tick: () => set(() => ({ lastTick: gameMath.bignumber(Date.now()) })),
      }),
      {
        name: "game-engine-state",
        version: 1,
        storage: storage,
      }
    )
  )
);
