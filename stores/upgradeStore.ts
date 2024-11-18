import { createStore } from "zustand";
import { BigNumber } from "mathjs";
import { devtools, persist } from "zustand/middleware";
import { storage } from "./storage";

/**
 * According to https://zustand.docs.pmnd.rs/hooks/use-store#using-dynamic-global-vanilla-stores-in-react
 */

type UpgradeProps = {
  unlocked: boolean;
  level: BigNumber;
};

type UpgradeActions = {
  unlock: () => void;
  addLevel: (levelToAdd: BigNumber) => void;
  reset: () => void;
};

export type UpgradeState = UpgradeProps & UpgradeActions;

export type UpgradeStore = ReturnType<typeof createUpgradeStore>;

const createUpgradeStore = (name: string, props: UpgradeProps) =>
  createStore<UpgradeState>()(
    devtools(
      persist(
        (set) => ({
          unlocked: props.unlocked,
          unlock: () => set(() => ({ unlocked: true })),
          level: props.level,
          addLevel: (levelToAdd: BigNumber) =>
            set((state) => ({ level: state.level.plus(levelToAdd) })),
          reset: () =>
            set(() => ({
              level: props.level,
              unlocked: props.unlocked,
            })),
        }),
        {
          name: `${name}-upgrade-state`,
          version: 1,
          storage: storage,
        }
      )
    )
  );

const defaultUpgradeStores = new Map<
  string,
  ReturnType<typeof createUpgradeStore>
>();

const createUpgradeStoreFactory = (
  upgradeStores: typeof defaultUpgradeStores
) => {
  return (name: string, upgradeProps: UpgradeProps) => {
    if (!upgradeStores.has(name)) {
      upgradeStores.set(name, createUpgradeStore(name, upgradeProps));
    }
    return upgradeStores.get(name)!;
  };
};

export const getOrCreateUpgradeStoreByKey =
  createUpgradeStoreFactory(defaultUpgradeStores);
