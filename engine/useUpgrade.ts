"use client";

import { BigNumber } from "mathjs";
import { createUpgradeStore } from "../stores/upgradeStore";
import { useCallback, useMemo } from "react";
import { gameMath } from "../gameMath";
import { CurrencyStore } from "../stores/currencyStore";

type UseUpgradeProps = {
  name: string;
  displayName: string;
  imageSrc: string;
  prefix: string;
  initialValues: {
    unlocked: boolean;
    level: BigNumber;
  };
  upgradeValues: {
    unlockCost: BigNumber;
    baseCost: BigNumber;
    costRate: BigNumber;
    baseValue: BigNumber;
    upgradeValue: BigNumber;
  };
  // Takes any CurrencyStore for upgrades to buy with
  currencyStore: CurrencyStore;
  onBuy?: (amount: BigNumber) => void;
  onUnlock?: () => void;
};

export type Upgrade = ReturnType<typeof useUpgrade>;

export function useUpgrade(props: UseUpgradeProps) {
  const { initialValues, upgradeValues, name, currencyStore } = props;

  const upgradeStore = createUpgradeStore({
    initialValues,
    name,
  })();

  const value: BigNumber = useMemo(() => {
    return gameMath.evaluate(
      `${upgradeValues.baseValue} + ${upgradeStore.level} * ${upgradeValues.upgradeValue}`
    );
  }, [upgradeValues.baseValue, upgradeStore.level, upgradeValues.upgradeValue]);

  // According to https://blog.kongregate.com/the-math-of-idle-games-part-i/
  const calculateCost = useCallback(
    (amount: BigNumber): BigNumber => {
      if (amount.eq(0)) {
        return gameMath.bignumber(0);
      }

      if (props.upgradeValues.costRate.eq(1)) {
        return gameMath.evaluate(`${props.upgradeValues.baseCost} * ${amount}`);
      }

      const result = gameMath.evaluate(
        `${props.upgradeValues.baseCost} * ((${props.upgradeValues.costRate} ^ ${upgradeStore.level} * (${props.upgradeValues.costRate} ^ ${amount} - 1)) / (${props.upgradeValues.costRate} - 1))`
      );

      return result as BigNumber;
    },
    [
      props.upgradeValues.baseCost,
      props.upgradeValues.costRate,
      upgradeStore.level,
    ]
  );

  const costForOne: BigNumber = useMemo(() => {
    return calculateCost(gameMath.bignumber("1"));
  }, [calculateCost]);

  const costForFive: BigNumber = useMemo(() => {
    return calculateCost(gameMath.bignumber("5"));
  }, [calculateCost]);

  const costForTwentyFive: BigNumber = useMemo(() => {
    return calculateCost(gameMath.bignumber("25"));
  }, [calculateCost]);

  // According to https://blog.kongregate.com/the-math-of-idle-games-part-i/
  const maxBuyable = useMemo(() => {
    const logInner = gameMath.evaluate(
      `((${currencyStore.amount} * (${props.upgradeValues.costRate} - 1)) / (${props.upgradeValues.baseCost} * (${props.upgradeValues.costRate} ^ ${upgradeStore.level}))) + 1`
    );

    const loggedByCostRate = (
      logInner.log(props.upgradeValues.costRate) as BigNumber
    ).floor();

    return loggedByCostRate;
  }, [
    props.upgradeValues.baseCost,
    props.upgradeValues.costRate,
    currencyStore.amount,
    upgradeStore.level,
  ]);

  const costForMaxBuyable: BigNumber = useMemo(() => {
    return calculateCost(maxBuyable);
  }, [calculateCost, maxBuyable]);

  const buy = useCallback(
    (amount: BigNumber = gameMath.bignumber("1")) => {
      const cost = calculateCost(amount);
      if (currencyStore.amount.gte(cost)) {
        currencyStore.subtract(cost);
        upgradeStore.addLevel(amount);
        if (props.onBuy) {
          props.onBuy(amount);
        }
      }
    },
    [calculateCost, currencyStore, props, upgradeStore]
  );

  const unlock = useCallback(() => {
    if (
      !upgradeStore.unlocked &&
      currencyStore.amount.gte(upgradeValues.unlockCost)
    ) {
      currencyStore.subtract(upgradeValues.unlockCost);
      upgradeStore.unlock();
      if (props.onUnlock) {
        props.onUnlock();
      }
    }
  }, [currencyStore, props, upgradeStore, upgradeValues.unlockCost]);

  const unlockable = useMemo(() => {
    return currencyStore.amount.gte(upgradeValues.unlockCost);
  }, [currencyStore, upgradeValues.unlockCost]);

  return {
    reset: upgradeStore.reset,
    level: upgradeStore.level,
    unlocked: upgradeStore.unlocked,
    unlockable,
    unlockCost: upgradeValues.unlockCost,
    unlock,
    cost: {
      one: costForOne,
      five: costForFive,
      twentyFive: costForTwentyFive,
      maxBuyable: costForMaxBuyable,
    },
    maxBuyable,
    value,
    buy,
    prefix: props.prefix,
    currency: {
      displayName: currencyStore.displayName,
      amount: currencyStore.amount,
    },
    displayName: props.displayName,
    upgradeValues: props.upgradeValues,
    imageSrc: props.imageSrc,
  };
}
