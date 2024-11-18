"use client";

import { useCallback, useMemo } from "react";
import { gameMath } from "../gameMath";
import { getOrCreateCurrencyStoreByKey } from "../stores/currencyStore";
import { useUpgrade } from "./useUpgrade";
import { BigNumber } from "mathjs";
import { MILLISECONDS_PER_TICK } from "./useGameEngine";
import useNotification from "./useNotification";
import useTime from "./useTime";
import chocolateBar from "../images/chocolate.jpg";
import cigar from "../images/cigar.jpg";
import { useStore } from "zustand";

export const MULTIPLIER_BASE = gameMath.bignumber("1");

export const CHOCOLATE_MULTIPLIER_PER_LEVEL = gameMath.bignumber("0.05");
export const CHOCOLATE_MULTIPLIER_BASE_COST = gameMath.bignumber("5");
export const CHOCOLATE_MULTIPLIER_COST_RATE = gameMath.bignumber("1.07");

export const CIGAR_MULTIPLIER_PER_LEVEL = gameMath.bignumber("0.15");
export const CIGAR_MULTIPLIER_BASE_COST = gameMath.bignumber("10");
export const CIGAR_MULTIPLIER_COST_RATE = gameMath.bignumber("1.09");

export const BASE_WAGE = gameMath.bignumber("14");

const displayName = "N$";

export default function useMoney() {
  const { tickValue: timeTickValue } = useTime();

  const moneyState = useStore(
    getOrCreateCurrencyStoreByKey("money", {
      amount: gameMath.bignumber("0"),
    })
  );

  const { bossMessage } = useNotification();

  const chocolateUpgrade = useUpgrade({
    currencyState: moneyState,
    currencyDisplayName: displayName,
    initialValues: {
      level: gameMath.bignumber("0"),
      unlocked: false,
    },
    name: "money-multiplier-chocolate",
    prefix: "x",
    upgradeValues: {
      baseCost: CHOCOLATE_MULTIPLIER_BASE_COST,
      baseValue: MULTIPLIER_BASE,
      costRate: CHOCOLATE_MULTIPLIER_COST_RATE,
      upgradeValue: CHOCOLATE_MULTIPLIER_PER_LEVEL,
      unlockCost: CHOCOLATE_MULTIPLIER_BASE_COST,
    },
    displayName: "Chocolate Bar",
    onBuy: () => {
      bossMessage({
        message:
          "I love chocolate! How did you know? But now, get back to work!",
      });
    },
    imageSrc: chocolateBar.src,
  });

  const cigarUpgrade = useUpgrade({
    currencyState: moneyState,
    currencyDisplayName: displayName,
    initialValues: {
      level: gameMath.bignumber("0"),
      unlocked: false,
    },
    name: "money-multiplier-chocolate",
    prefix: "x",
    upgradeValues: {
      baseCost: CIGAR_MULTIPLIER_BASE_COST,
      baseValue: MULTIPLIER_BASE,
      costRate: CIGAR_MULTIPLIER_COST_RATE,
      upgradeValue: CIGAR_MULTIPLIER_PER_LEVEL,
      unlockCost: CIGAR_MULTIPLIER_BASE_COST,
    },
    displayName: "Cigar",
    onBuy: () => {
      bossMessage({
        message: "Only idiots would not smoke this! Ha!",
      });
    },
    imageSrc: cigar.src,
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
      `(${timeTickValue} * ${upgradeFactor}) / ${hourFraction}`
    );
  }, [timeTickValue, upgradeFactor]);

  const tick = useCallback(() => {
    moneyState.add(tickValue);
  }, [moneyState, tickValue]);

  return {
    money: moneyState.amount,
    tick,
    tickValue,
    reset: () => {
      moneyState.reset();
      chocolateUpgrade.reset();
      cigarUpgrade.reset();
    },
    chocolateUpgrade,
    cigarUpgrade,
    upgradeFactor,
    displayName,
  };
}
