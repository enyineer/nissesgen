import { useMemo } from "react";
import { gameMath } from "../gameMath";
import { createCurrencyStore } from "../stores/currencyStore";
import { useUpgrade } from "./useUpgrade";

export const TIME_MULTIPLIER_BASE = gameMath.bignumber("1");
export const TIME_MULTIPLIER_PER_LEVEL = gameMath.bignumber("0.01");
export const TIME_MULTIPLIER_BASE_COST = gameMath.bignumber("1000");
export const TIME_MULTIPLIER_COST_RATE = gameMath.bignumber("1.07");
// Unlock after 30 Minutes
export const TIME_MULTIPLIER_UNLOCK_COST = gameMath.bignumber(1000 * 60 * 30);

export default function useTime() {
  const timeStore = createCurrencyStore({
    name: "time",
    displayName: "Milliseconds",
  })();

  const timeMultiplierUpgrade = useUpgrade({
    currencyStore: timeStore,
    initialValues: {
      level: gameMath.bignumber("0"),
      unlocked: false,
    },
    name: "time-multiplier",
    prefix: "x",
    upgradeValues: {
      baseCost: TIME_MULTIPLIER_BASE_COST,
      baseValue: TIME_MULTIPLIER_BASE,
      costRate: TIME_MULTIPLIER_COST_RATE,
      upgradeValue: TIME_MULTIPLIER_PER_LEVEL,
      unlockCost: gameMath.bignumber(TIME_MULTIPLIER_UNLOCK_COST),
    },
    displayName: "Time Multiplier",
  });

  const upgradeFactor = useMemo(() => {
    return gameMath.evaluate(`${timeMultiplierUpgrade.value}`);
  }, [timeMultiplierUpgrade.value]);

  return {
    time: timeStore.amount,
    add: timeStore.add,
    subtract: timeStore.subtract,
    reset: timeStore.reset,
    timeMultiplierUpgrade,
    upgradeFactor,
  };
}
