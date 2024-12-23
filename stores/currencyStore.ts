import { createStore } from "zustand";
import { BigNumber } from "mathjs";
import { devtools, persist } from "zustand/middleware";
import { storage } from "./storage";
import { gameMath } from "../gameMath";
import { CurrencyStores } from "./currencyStores";

/**
 * According to https://zustand.docs.pmnd.rs/hooks/use-store#using-dynamic-global-vanilla-stores-in-react
 */

type CurrencyProps = {
  amount: BigNumber;
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
          reset: () =>
            set(() => ({
              amount: gameMath.bignumber("0"),
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
  return (key: CurrencyStores, currencyProps: CurrencyProps) => {
    if (!currencyStores.has(key)) {
      currencyStores.set(key, createCurrencyStore(key, currencyProps));
    }
    return currencyStores.get(key)!;
  };
};

export const getOrCreateCurrencyStoreByKey = createCurrencyStoreFactory(
  defaultCurrencyStores
);
