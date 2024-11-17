"use client";

import { useCallback, useMemo } from "react";
import { gameMath } from "../gameMath";
import { createCurrencyStore } from "../stores/currencyStore";
import { useUpgrade } from "./useUpgrade";
import { BigNumber } from "mathjs";

export const MULTIPLIER_BASE = gameMath.bignumber("1");

export const CHOCOLATE_MULTIPLIER_PER_LEVEL = gameMath.bignumber("0.05");
export const CHOCOLATE_MULTIPLIER_BASE_COST = gameMath.bignumber("5");
export const CHOCOLATE_MULTIPLIER_COST_RATE = gameMath.bignumber("1.10");

export const CIGAR_MULTIPLIER_PER_LEVEL = gameMath.bignumber("0.10");
export const CIGAR_MULTIPLIER_BASE_COST = gameMath.bignumber("10");
export const CIGAR_MULTIPLIER_COST_RATE = gameMath.bignumber("1.20");

export const BASE_WAGE = gameMath.bignumber("14");

export default function useMoney() {
  const moneyStore = createCurrencyStore({
    name: "money",
    displayName: "N$",
  })();

  const chocolateUpgrade = useUpgrade({
    currencyStore: moneyStore,
    initialValues: {
      level: gameMath.bignumber("0"),
      unlocked: true,
    },
    name: "money-multiplier-chocolate",
    prefix: "x",
    upgradeValues: {
      baseCost: CHOCOLATE_MULTIPLIER_BASE_COST,
      baseValue: MULTIPLIER_BASE,
      costRate: CHOCOLATE_MULTIPLIER_COST_RATE,
      upgradeValue: CHOCOLATE_MULTIPLIER_PER_LEVEL,
      unlockCost: gameMath.bignumber(0),
    },
    displayName: "Chocolate Bars for Boss",
  });

  const cigarUpgrade = useUpgrade({
    currencyStore: moneyStore,
    initialValues: {
      level: gameMath.bignumber("0"),
      unlocked: true,
    },
    name: "money-multiplier-chocolate",
    prefix: "x",
    upgradeValues: {
      baseCost: CIGAR_MULTIPLIER_BASE_COST,
      baseValue: MULTIPLIER_BASE,
      costRate: CIGAR_MULTIPLIER_COST_RATE,
      upgradeValue: CIGAR_MULTIPLIER_PER_LEVEL,
      unlockCost: gameMath.bignumber(0),
    },
    displayName: "Cigar for Boss",
  });

  const upgradeFactor = useMemo(() => {
    return gameMath.evaluate(`${chocolateUpgrade.value}`);
  }, [chocolateUpgrade.value]);

  const tick = useCallback(
    (msPerTick: BigNumber) => {
      // hourFraction is the fraction of an hour that has passed since last tick
      const hourFraction = gameMath.evaluate(`${msPerTick} * 60 * 60`);
      moneyStore.add(
        gameMath.evaluate(`(${BASE_WAGE} * ${upgradeFactor}) / ${hourFraction}`)
      );
    },
    [upgradeFactor]
  );

  return {
    money: moneyStore.amount,
    tick,
    reset: moneyStore.reset,
    chocolateUpgrade,
    cigarUpgrade,
    upgradeFactor,
  };
}
