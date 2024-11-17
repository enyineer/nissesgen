"use client";

import { useCallback, useMemo } from "react";
import { gameMath } from "../gameMath";
import { createCurrencyStore } from "../stores/currencyStore";
import { useUpgrade } from "./useUpgrade";
import { BigNumber } from "mathjs";
import { MILLISECONDS_PER_TICK } from "./useGameEngine";
import useNotification from "./useNotification";

export const MULTIPLIER_BASE = gameMath.bignumber("1");

export const CHOCOLATE_MULTIPLIER_PER_LEVEL = gameMath.bignumber("0.05");
export const CHOCOLATE_MULTIPLIER_BASE_COST = gameMath.bignumber("5");
export const CHOCOLATE_MULTIPLIER_COST_RATE = gameMath.bignumber("1.07");

export const CIGAR_MULTIPLIER_PER_LEVEL = gameMath.bignumber("0.15");
export const CIGAR_MULTIPLIER_BASE_COST = gameMath.bignumber("10");
export const CIGAR_MULTIPLIER_COST_RATE = gameMath.bignumber("1.09");

export const BASE_WAGE = gameMath.bignumber("14");

export default function useMoney() {
  const moneyStore = createCurrencyStore({
    name: "money",
    displayName: "N$",
  })();

  const { bossMessage } = useNotification();

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
    onBuy: () => {
      bossMessage({
        message:
          "I love chocolate! How did you know? But now, get back to work!",
      });
    },
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
    onBuy: () => {
      bossMessage({
        message: "Only idiots would not smoke this! Ha!",
      });
    },
  });

  const upgradeFactor = useMemo<BigNumber>(() => {
    return gameMath.evaluate(
      `${chocolateUpgrade.value} + ${cigarUpgrade.value} + 1`
    );
  }, [chocolateUpgrade.value, cigarUpgrade.value]);

  const tickValue = useMemo<BigNumber>(() => {
    // hourFraction is the fraction of an hour that has passed since last tick
    const hourFraction = gameMath.evaluate(
      `${MILLISECONDS_PER_TICK} * 60 * 60`
    );
    return gameMath.evaluate(
      `(${MILLISECONDS_PER_TICK} * ${upgradeFactor}) / ${hourFraction}`
    );
  }, [upgradeFactor]);

  const tick = useCallback(() => {
    moneyStore.add(tickValue);
  }, [moneyStore, tickValue]);

  return {
    money: moneyStore.amount,
    tick,
    tickValue,
    reset: moneyStore.reset,
    chocolateUpgrade,
    cigarUpgrade,
    upgradeFactor,
    displayName: moneyStore.displayName,
  };
}
