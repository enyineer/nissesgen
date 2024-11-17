import { create } from "zustand";
import { BigNumber } from "mathjs";
import { devtools, persist } from "zustand/middleware";
import { storage } from "./storage";
import { gameMath } from "../gameMath";

interface CurrencyState {
  amount: BigNumber;
  add: (amount: BigNumber) => void;
  subtract: (amount: BigNumber) => void;
  displayName: string;
  reset: () => void;
}

// Workaround to export the type of the zustand store
// https://github.com/pmndrs/zustand/issues/736
class Wrapper {
  f() {
    return createCurrencyStore({ name: "test", displayName: "Test" })();
  }
}

export type CurrencyStore = ReturnType<Wrapper["f"]>;

export const createCurrencyStore = (props: {
  name: string;
  displayName: string;
  initialValues?: {
    amount?: BigNumber;
  };
}) =>
  create<CurrencyState>()(
    devtools(
      persist(
        (set) => ({
          amount: props.initialValues?.amount ?? gameMath.bignumber("0"),
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
          name: `${props.name}-currency-state`,
          version: 1,
          storage: storage,
        }
      )
    )
  );
