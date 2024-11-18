"use client";

import { useCallback, useMemo } from "react";
import { gameMath } from "../gameMath";
import { useUpgrade } from "./useUpgrade";
import { BigNumber } from "mathjs";
import { MILLISECONDS_PER_TICK } from "./useGameEngine";
import useNotification from "./useNotification";
import chronograph from "../images/chronograph.jpg";
import { useMoneyState } from "./useMoneyState";
import { useTimeState } from "./useTimeState";

export const TIME_MULTIPLIER_BASE = gameMath.bignumber("1");
export const TIME_MULTIPLIER_PER_LEVEL = gameMath.bignumber("0.01");
export const TIME_MULTIPLIER_BASE_COST = gameMath.bignumber("1000");
export const TIME_MULTIPLIER_COST_RATE = gameMath.bignumber("1.07");
// Unlock after 30 Minutes
export const TIME_MULTIPLIER_UNLOCK_COST = gameMath.bignumber(1000 * 60 * 5);

export default function useTime() {
  const { scientistMessage } = useNotification();
  const { currencyDisplayName: moneyDisplayName, state: moneyState } =
    useMoneyState();
  const { state: timeState } = useTimeState();

  const timeMultiplierUpgrade = useUpgrade({
    currencyState: moneyState,
    currencyDisplayName: moneyDisplayName,
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
      unlockCost: TIME_MULTIPLIER_UNLOCK_COST,
    },
    displayName: "Time Multiplier",
    onBuy: () => {
      scientistMessage({
        message: "I improved your time machine to be even better!",
      });
    },
    onUnlock: () => {
      scientistMessage({
        message:
          "Have a look at this new device! It makes time go by faster. But be cautious with it...",
      });
    },
    imageSrc: chronograph.src,
  });

  const upgradeFactor = useMemo<BigNumber>(() => {
    return gameMath.evaluate(`${timeMultiplierUpgrade.value}`);
  }, [timeMultiplierUpgrade.value]);

  const tickValue = useMemo<BigNumber>(() => {
    return gameMath.evaluate(`${MILLISECONDS_PER_TICK} * ${upgradeFactor}`);
  }, [upgradeFactor]);

  const tick = useCallback(
    (ticks: BigNumber) => {
      timeState.add(gameMath.evaluate(`${tickValue} * ${ticks}`));
    },
    [tickValue, timeState]
  );

  return {
    tick,
    tickValue,
    reset: () => {
      timeState.reset();
      timeMultiplierUpgrade.reset();
    },
    timeMultiplierUpgrade,
    upgradeFactor,
  };
}
