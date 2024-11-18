import { createStore } from "zustand";
import { BigNumber } from "mathjs";
import { devtools, persist } from "zustand/middleware";
import { storage } from "./storage";
import { gameMath } from "../gameMath";

type CurrencyProps = {
  amount: BigNumber;
  displayName: string;
};

type CurrencyActions = {
  add: (amount: BigNumber) => void;
  subtract: (amount: BigNumber) => void;
  reset: () => void;
};

export type CurrencyState = CurrencyProps & CurrencyActions;

export type CurrencyStore = ReturnType<typeof createCurrencyStore>;

const createCurrencyStore = (name: string, props: CurrencyProps) =>
  createStore<CurrencyState>()(
    devtools(
      persist(
        (set) => ({
          amount: props.amount,
          add: (amount: BigNumber) =>
            set((state) => ({ amount: state.amount.plus(amount) })),
          subtract: (amount: BigNumber) =>
            set((state) => ({ amount: state.amount.minus(amount) })),
          displayName: props.displayName,
          reset: () =>
            set(() => ({
              amount: gameMath.bignumber("0"),
              displayName: props.displayName,
            })),
        }),
        {
          name: `${name}-currency-state`,
          version: 1,
          storage: storage,
        }
      )
    )
  );

const defaultCurrencyStores = new Map<
  string,
  ReturnType<typeof createCurrencyStore>
>();

const createCurrencyStoreFactory = (
  currencyStores: typeof defaultCurrencyStores
) => {
  return (name: string, currencyProps: CurrencyProps) => {
    if (!currencyStores.has(name)) {
      currencyStores.set(name, createCurrencyStore(name, currencyProps));
    }
    return currencyStores.get(name)!;
  };
};

export const getOrCreateCurrencyStoreByKey = createCurrencyStoreFactory(
  defaultCurrencyStores
);
