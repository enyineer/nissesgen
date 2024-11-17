import { useMemo } from "react";
import { gameMath } from "../gameMath";
import { useUpgrade } from "./useUpgrade";

export const GENERATOR_MULTIPLIER_BASE = gameMath.bignumber("1");
export const GENERATOR_MULTIPLIER_PER_LEVEL = gameMath.bignumber("0.25");
export const GENERATOR_MULTIPLIER_BASE_COST = gameMath.bignumber("10");
export const GENERATOR_MULTIPLIER_COST_RATE = gameMath.bignumber("1.07");

export const GENERATOR_EXPONENT_BASE = gameMath.bignumber("1");
export const GENERATOR_EXPONENT_PER_LEVEL = gameMath.bignumber("0.02");
export const GENERATOR_EXPONENT_BASE_COST = gameMath.bignumber("10");
export const GENERATOR_EXPONENT_COST_RATE = gameMath.bignumber("1.4");

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
      baseCost: GENERATOR_MULTIPLIER_BASE_COST,
      costRate: GENERATOR_MULTIPLIER_COST_RATE,
      baseValue: GENERATOR_MULTIPLIER_BASE,
      upgradeValue: GENERATOR_MULTIPLIER_PER_LEVEL,
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
      baseCost: GENERATOR_EXPONENT_BASE_COST,
      costRate: GENERATOR_EXPONENT_COST_RATE,
      baseValue: GENERATOR_EXPONENT_BASE,
      upgradeValue: GENERATOR_EXPONENT_PER_LEVEL,
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
