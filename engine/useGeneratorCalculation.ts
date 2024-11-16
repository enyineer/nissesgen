import { BigNumber } from "mathjs";
import { gameMath } from "../gameMath";
import { useGeneratorStore } from "../stores/generatorStore";

export const GENERATOR_MULTIPLIER_PER_LEVEL = gameMath.bignumber("1");
export const GENERATOR_MULTIPLIER_COST_PER_LEVEL = gameMath.bignumber("10");
export const GENERATOR_EXPONENT_PER_LEVEL = gameMath.bignumber("0.1");
export const GENERATOR_EXPONENT_COST_PER_LEVEL = gameMath.bignumber("10");

export function useGeneratorCalculation() {
  const generatorStore = useGeneratorStore();

  const generatorExponent: BigNumber = gameMath.evaluate(
    `1 + ((${generatorStore.exponentLevel} - 1) * ${GENERATOR_EXPONENT_PER_LEVEL})`
  );
  const generatorExponentCost: BigNumber = gameMath.evaluate(
    `${generatorStore.exponentLevel} * ${GENERATOR_EXPONENT_COST_PER_LEVEL}`
  );
  const generatorMultiplier: BigNumber = gameMath.evaluate(
    `${generatorStore.level} * ${GENERATOR_MULTIPLIER_PER_LEVEL}`
  );
  const generatorMultiplierCost: BigNumber = gameMath.evaluate(
    `${generatorStore.level} * ${GENERATOR_MULTIPLIER_COST_PER_LEVEL}`
  );
  const generatorTickFactor: BigNumber = gameMath.evaluate(
    `${generatorMultiplier} ^ ${generatorExponent}`
  );

  return {
    generatorExponent,
    generatorExponentCost,
    generatorMultiplier,
    generatorMultiplierCost,
    generatorTickFactor,
  };
}
