import { BigNumber } from "mathjs";
import { createUpgradeStore } from "../stores/upgradeStore";
import { useCallback, useMemo } from "react";
import { gameMath } from "../gameMath";
import { useScoreStore } from "../stores/scoreStore";

type UseUpgradeProps = {
  name: string;
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
};

export type Upgrade = ReturnType<typeof useUpgrade>;

export function useUpgrade(props: UseUpgradeProps) {
  const { initialValues, upgradeValues, name } = props;
  const scoreStore = useScoreStore();

  const upgradeStore = createUpgradeStore({
    initialValues,
    name,
  })();

  const value = useMemo(() => {
    return gameMath.evaluate(
      `${upgradeValues.baseValue} + ${upgradeStore.level} * ${upgradeValues.upgradeValue}`
    );
  }, [upgradeValues.baseValue, upgradeStore.level, upgradeValues.upgradeValue]);

  const calculateCost = useCallback(
    (amount: BigNumber = gameMath.bignumber("1")) => {
      if (upgradeValues.costRate.eq(1)) {
        return upgradeValues.baseCost.times(amount);
      }
      let totalCost = gameMath.bignumber(0);
      for (let i = 0; i < amount.toNumber(); i++) {
        totalCost = totalCost.plus(
          gameMath.evaluate(
            `${upgradeValues.baseCost} * (${
              upgradeValues.costRate
            } ^ ${upgradeStore.level.plus(i)})`
          )
        );
      }
      return totalCost;
    },
    [upgradeValues.baseCost, upgradeValues.costRate, upgradeStore.level]
  );

  const costForOne = useMemo(() => {
    return calculateCost(gameMath.bignumber("1"));
  }, [calculateCost]);

  const costForFive = useMemo(() => {
    return calculateCost(gameMath.bignumber("5"));
  }, [calculateCost]);

  const costForTwentyFive = useMemo(() => {
    return calculateCost(gameMath.bignumber("25"));
  }, [calculateCost]);

  const maxBuyable = useMemo(() => {
    if (upgradeValues.costRate.eq(1)) {
      return scoreStore.score.div(upgradeValues.baseCost).floor();
    }
    let max = gameMath.bignumber(0);
    let currentCost = gameMath.bignumber(0);
    for (let i = 0; ; i++) {
      currentCost = gameMath.evaluate(
        `${upgradeValues.baseCost} * (${
          upgradeValues.costRate
        } ^ ${upgradeStore.level.plus(i)})`
      );
      if (scoreStore.score.gte(currentCost)) {
        max = gameMath.bignumber(i + 1);
      } else {
        break;
      }
    }
    return max;
  }, [
    scoreStore.score,
    upgradeValues.baseCost,
    upgradeValues.costRate,
    upgradeStore.level,
  ]);

  const costForMaxBuyable = useMemo(() => {
    return calculateCost(maxBuyable);
  }, [calculateCost, maxBuyable]);

  const buy = useCallback(
    (amount: BigNumber = gameMath.bignumber("1")) => {
      const cost = calculateCost(amount);
      if (scoreStore.score.gte(cost)) {
        scoreStore.removeScore(cost);
        upgradeStore.addLevel(amount);
      }
    },
    [calculateCost, scoreStore, upgradeStore]
  );

  const unlock = useCallback(() => {
    if (
      !upgradeStore.unlocked &&
      scoreStore.score.gte(upgradeValues.unlockCost)
    ) {
      scoreStore.removeScore(upgradeValues.unlockCost);
      upgradeStore.unlock();
    }
  }, [scoreStore, upgradeStore]);

  const unlockable = useMemo(() => {
    return scoreStore.score.gte(upgradeValues.unlockCost);
  }, [scoreStore, upgradeValues.unlockCost]);

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
  };
}
