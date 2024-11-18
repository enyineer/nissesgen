import { useStore } from "zustand";
import { gameMath } from "../gameMath";
import { getOrCreateCurrencyStoreByKey } from "../stores/currencyStore";
import { CurrencyStores } from "../stores/currencyStores";

export const useMoneyState = () => {
  const moneyStore = getOrCreateCurrencyStoreByKey(CurrencyStores.MONEY, {
    amount: gameMath.bignumber("0"),
  });

  const moneyState = useStore(moneyStore);

  return {
    state: moneyState,
    currencyDisplayName: "N$",
  };
};
