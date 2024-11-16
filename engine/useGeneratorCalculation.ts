import { BigNumber } from "mathjs";
import { gameMath } from "../gameMath";
import { useGeneratorStore } from "../stores/generatorStore";
import { useMemo } from "react";

export const GENERATOR_MULTIPLIER_BASE = gameMath.bignumber("1");
export const GENERATOR_MULTIPLIER_PER_LEVEL = gameMath.bignumber("0.5");
export const GENERATOR_MULTIPLIER_BASE_COST = gameMath.bignumber("10");
export const GENERATOR_MULTIPLIER_COST_RATE = gameMath.bignumber("1.08");

export const GENERATOR_EXPONENT_BASE = gameMath.bignumber("1");
export const GENERATOR_EXPONENT_PER_LEVEL = gameMath.bignumber("0.02");
export const GENERATOR_EXPONENT_BASE_COST = gameMath.bignumber("10");
export const GENERATOR_EXPONENT_COST_RATE = gameMath.bignumber("1.4");

export function useGeneratorCalculation() {
  const generatorStore = useGeneratorStore();

  const generatorExponent: BigNumber = useMemo(() => {
    return gameMath.evaluate(
      `${GENERATOR_EXPONENT_BASE} + ((${generatorStore.exponentLevel}) * ${GENERATOR_EXPONENT_PER_LEVEL})`
    );
  }, [generatorStore.exponentLevel]);
  const generatorExponentCost: BigNumber = useMemo(() => {
    return (
      gameMath.evaluate(
        `${GENERATOR_EXPONENT_BASE_COST} * (${GENERATOR_EXPONENT_COST_RATE}) ^ ${generatorStore.exponentLevel}`
      ) as BigNumber
    ).ceil();
  }, [generatorStore.exponentLevel]);
  const generatorMultiplier: BigNumber = useMemo(() => {
    return gameMath.evaluate(
      `${GENERATOR_MULTIPLIER_BASE} + ${generatorStore.level} * ${GENERATOR_MULTIPLIER_PER_LEVEL}`
    );
  }, [generatorStore.level]);
  const generatorMultiplierCost: BigNumber = useMemo(() => {
    return (
      gameMath.evaluate(
        `${GENERATOR_MULTIPLIER_BASE_COST} * (${GENERATOR_MULTIPLIER_COST_RATE}) ^ ${generatorStore.level}`
      ) as BigNumber
    ).ceil();
  }, [generatorStore.level]);
  const generatorTickFactor: BigNumber = useMemo(() => {
    return gameMath.evaluate(`${generatorMultiplier} ^ ${generatorExponent}`);
  }, [generatorExponent, generatorMultiplier]);

  return {
    generatorExponent,
    generatorExponentCost,
    generatorMultiplier,
    generatorMultiplierCost,
    generatorTickFactor,
  };
}
