import { useMemo } from "react";
import { gameMath } from "../gameMath";
import { useUpgrade } from "./useUpgrade";

export const MULTIPLIER_MULTIPLIER_BASE = gameMath.bignumber("1");
export const MULTIPLIER_MULTIPLIER_PER_LEVEL = gameMath.bignumber("0.2");
export const MULTIPLIER_MULTIPLIER_BASE_COST = gameMath.bignumber("10");
export const MULTIPLIER_MULTIPLIER_COST_RATE = gameMath.bignumber("1.14");

export const MULTIPLIER_EXPONENT_BASE = gameMath.bignumber("1");
export const MULTIPLIER_EXPONENT_PER_LEVEL = gameMath.bignumber("0.02");
export const MULTIPLIER_EXPONENT_BASE_COST = gameMath.bignumber("10");
export const MULTIPLIER_EXPONENT_COST_RATE = gameMath.bignumber("1.4");

export function useGeneratorUpgrade() {
  const generatorMultiplierUpgrade = useUpgrade({
    name: "generator-multiplier",
    prefix: "x",
    initialValues: {
      unlocked: true,
      level: gameMath.bignumber("0"),
    },
    upgradeValues: {
      unlockCost: gameMath.bignumber(0),
      baseCost: MULTIPLIER_MULTIPLIER_BASE_COST,
      costRate: MULTIPLIER_MULTIPLIER_COST_RATE,
      baseValue: MULTIPLIER_MULTIPLIER_BASE,
      upgradeValue: MULTIPLIER_MULTIPLIER_PER_LEVEL,
    },
  });

  const generatorExponentUpgrade = useUpgrade({
    name: "generator-exponent",
    prefix: "^",
    initialValues: {
      unlocked: true,
      level: gameMath.bignumber("0"),
    },
    upgradeValues: {
      unlockCost: gameMath.bignumber(0),
      baseCost: MULTIPLIER_EXPONENT_BASE_COST,
      costRate: MULTIPLIER_EXPONENT_COST_RATE,
      baseValue: MULTIPLIER_EXPONENT_BASE,
      upgradeValue: MULTIPLIER_EXPONENT_PER_LEVEL,
    },
  });

  const tickFactor = useMemo(() => {
    return gameMath.evaluate(
      `${generatorMultiplierUpgrade.value} ^ ${generatorExponentUpgrade.value}`
    );
  }, [generatorExponentUpgrade.value, generatorMultiplierUpgrade.value]);

  return {
    generatorExponentUpgrade,
    generatorMultiplierUpgrade,
    tickFactor,
  };
}
