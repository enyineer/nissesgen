"use client";

import { useCallback, useMemo } from "react";
import { gameMath } from "../gameMath";
import { useUpgrade } from "./useUpgrade";
import { BigNumber } from "mathjs";
import { MILLISECONDS_PER_TICK } from "./useGameEngine";
import useNotification from "./useNotification";
import useTime from "./useTime";
import chocolateBar from "../images/chocolate.jpg";
import cigar from "../images/cigar.jpg";
import { useMoneyState } from "./useMoneyState";

export const MULTIPLIER_BASE = gameMath.bignumber("1");

export const CHOCOLATE_MULTIPLIER_PER_LEVEL = gameMath.bignumber("0.25");
export const CHOCOLATE_MULTIPLIER_BASE_COST = gameMath.bignumber("1");
export const CHOCOLATE_MULTIPLIER_COST_RATE = gameMath.bignumber("1.07");

export const CIGAR_MULTIPLIER_PER_LEVEL = gameMath.bignumber("0.5");
export const CIGAR_MULTIPLIER_BASE_COST = gameMath.bignumber("5");
export const CIGAR_MULTIPLIER_COST_RATE = gameMath.bignumber("1.09");

export const BASE_WAGE = gameMath.bignumber("14");

export default function useMoney() {
  const { tickValue: timeTickValue } = useTime();
  const { state, currencyDisplayName } = useMoneyState();

  const { bossMessage } = useNotification();

  const chocolateUpgrade = useUpgrade({
    currencyState: state,
    currencyDisplayName: currencyDisplayName,
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
      unlockCost: gameMath.bignumber("0"),
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
    currencyState: state,
    currencyDisplayName: currencyDisplayName,
    initialValues: {
      level: gameMath.bignumber("0"),
      unlocked: true,
    },
    name: "money-multiplier-cigar",
    prefix: "x",
    upgradeValues: {
      baseCost: CIGAR_MULTIPLIER_BASE_COST,
      baseValue: MULTIPLIER_BASE,
      costRate: CIGAR_MULTIPLIER_COST_RATE,
      upgradeValue: CIGAR_MULTIPLIER_PER_LEVEL,
      unlockCost: gameMath.bignumber("0"),
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
      `${chocolateUpgrade.value} * ${cigarUpgrade.value}`
    );
  }, [chocolateUpgrade.value, cigarUpgrade.value]);

  const tickValue = useMemo<BigNumber>(() => {
    // Calculates base wage per tick
    const wageCoefficient = gameMath.evaluate(
      `${BASE_WAGE} / 60 / 60 / (1000 / ${MILLISECONDS_PER_TICK})`
    );
    // Calculate coefficient based on game time per tick
    const timeTickValueCoefficient = gameMath.evaluate(
      `(${timeTickValue} / ${MILLISECONDS_PER_TICK})`
    );
    return gameMath.evaluate(
      `${timeTickValueCoefficient} * ${wageCoefficient} * ${upgradeFactor}`
    );
  }, [timeTickValue, upgradeFactor]);

  const tickValuePerHour = useMemo<BigNumber>(() => {
    return gameMath.evaluate(
      `(${tickValue} / ${MILLISECONDS_PER_TICK}) * 1000 * 60 * 60`
    );
  }, [tickValue]);

  const tick = useCallback(
    (ticks: BigNumber) => {
      state.add(gameMath.evaluate(`${tickValue} * ${ticks}`));
    },
    [state, tickValue]
  );

  return {
    tick,
    tickValue,
    tickValuePerHour,
    reset: () => {
      state.reset();
      chocolateUpgrade.reset();
      cigarUpgrade.reset();
    },
    chocolateUpgrade,
    cigarUpgrade,
    upgradeFactor,
  };
}
