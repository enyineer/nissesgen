import { create } from "zustand";
import { BigNumber } from "mathjs";
import { devtools, persist } from "zustand/middleware";
import { storage } from "./storage";
import { gameMath } from "../gameMath";

interface UpgradeState {
  unlocked: boolean;
  unlock: () => void;
  level: BigNumber;
  addLevel: (levelToAdd: BigNumber) => void;
  reset: () => void;
}

export const createUpgradeStore = (props: {
  name: string;
  initialValues?: {
    level?: BigNumber;
    unlocked?: boolean;
  };
}) =>
  create<UpgradeState>()(
    devtools(
      persist(
        (set) => ({
          unlocked: props.initialValues?.unlocked ?? false,
          unlock: () => set(() => ({ unlocked: true })),
          level: props.initialValues?.level ?? gameMath.bignumber("0"),
          addLevel: (levelToAdd: BigNumber) =>
            set((state) => ({ level: state.level.plus(levelToAdd) })),
          reset: () =>
            set(() => ({
              level: props.initialValues?.level ?? gameMath.bignumber("0"),
              exponentLevel: gameMath.bignumber("0"),
              unlocked: props.initialValues?.unlocked ?? false,
            })),
        }),
        {
          name: `${props.name}-upgrade-state`,
          version: 1,
          storage: storage,
        }
      )
    )
  );
