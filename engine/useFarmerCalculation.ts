import { BigNumber } from "mathjs";
import { gameMath } from "../gameMath";
import { useFarmerStore } from "../stores/farmerStore";
import { useMemo } from "react";

export const FARMER_UNLOCK_COST = gameMath.bignumber("1e5");

export const FARMER_MULTIPLIER_BASE = gameMath.bignumber("1");
export const FARMER_MULTIPLIER_PER_LEVEL = gameMath.bignumber("0.1");
export const FARMER_MULTIPLIER_BASE_COST = gameMath.bignumber("10");
export const FARMER_MULTIPLIER_COST_RATE = gameMath.bignumber("1.08");

export const FARMER_EXPONENT_BASE = gameMath.bignumber("1");
export const FARMER_EXPONENT_PER_LEVEL = gameMath.bignumber("0.01");
export const FARMER_EXPONENT_BASE_COST = gameMath.bignumber("10");
export const FARMER_EXPONENT_COST_RATE = gameMath.bignumber("1.09");

export function useFarmerCalculation() {
  const farmerStore = useFarmerStore();

  const farmerExponent: BigNumber = useMemo(() => {
    return gameMath.evaluate(
      `${FARMER_EXPONENT_BASE} + ((${farmerStore.exponentLevel}) * ${FARMER_EXPONENT_PER_LEVEL})`
    );
  }, [farmerStore.exponentLevel]);
  const farmerExponentCost: BigNumber = useMemo(() => {
    return (
      gameMath.evaluate(
        `${FARMER_EXPONENT_BASE_COST} * (${FARMER_EXPONENT_COST_RATE}) ^ ${farmerStore.exponentLevel}`
      ) as BigNumber
    ).ceil();
  }, [farmerStore.exponentLevel]);
  const farmerMultiplier: BigNumber = useMemo(() => {
    return gameMath.evaluate(
      `${FARMER_MULTIPLIER_BASE} + ${farmerStore.level} * ${FARMER_MULTIPLIER_PER_LEVEL}`
    );
  }, [farmerStore.level]);
  const farmerMultiplierCost: BigNumber = useMemo(() => {
    return (
      gameMath.evaluate(
        `${FARMER_MULTIPLIER_BASE_COST} * (${FARMER_MULTIPLIER_COST_RATE}) ^ ${farmerStore.level}`
      ) as BigNumber
    ).ceil();
  }, [farmerStore.level]);
  const farmerTickFactor: BigNumber = useMemo(() => {
    return gameMath.evaluate(`${farmerMultiplier} ^ ${farmerExponent}`);
  }, [farmerExponent, farmerMultiplier]);

  return {
    farmerExponent,
    farmerExponentCost,
    farmerMultiplier,
    farmerMultiplierCost,
    farmerTickFactor,
  };
}
