import { useStore } from "zustand";
import { gameMath } from "../gameMath";
import { getOrCreateCurrencyStoreByKey } from "../stores/currencyStore";
import { CurrencyStores } from "../stores/currencyStores";

export const useTimeState = () => {
  const timeStore = getOrCreateCurrencyStoreByKey(CurrencyStores.TIME, {
    amount: gameMath.bignumber("0"),
  });

  const timeState = useStore(timeStore);

  return {
    state: timeState,
    currencyDisplayName: "ms",
  };
};
