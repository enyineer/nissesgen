import { BigNumber } from "mathjs";
import { gameMath } from "../gameMath";
import { useFarmerStore } from "../stores/farmerStore";

export const FARMER_UNLOCK_COST = gameMath.bignumber("1e10");
export const FARMER_MULTIPLIER_PER_LEVEL = gameMath.bignumber("1");
export const FARMER_MULTIPLIER_COST_PER_LEVEL = gameMath.bignumber("10");
export const FARMER_EXPONENT_PER_LEVEL = gameMath.bignumber("0.1");
export const FARMER_EXPONENT_COST_PER_LEVEL = gameMath.bignumber("10");

export function useFarmerCalculation() {
  const farmerStore = useFarmerStore();

  const farmerExponent: BigNumber = gameMath.evaluate(
    `1 + ((${farmerStore.exponentLevel} - 1) * ${FARMER_EXPONENT_PER_LEVEL})`
  );
  const farmerExponentCost: BigNumber = gameMath.evaluate(
    `${farmerStore.exponentLevel} * ${FARMER_EXPONENT_COST_PER_LEVEL}`
  );
  const farmerMultiplier: BigNumber = gameMath.evaluate(
    `${farmerStore.level} * ${FARMER_MULTIPLIER_PER_LEVEL}`
  );
  const farmerMultiplierCost: BigNumber = gameMath.evaluate(
    `${farmerStore.level} * ${FARMER_MULTIPLIER_COST_PER_LEVEL}`
  );
  const farmerTickFactor: BigNumber = gameMath.evaluate(
    `${farmerMultiplier} ^ ${farmerExponent}`
  );

  return {
    farmerExponent,
    farmerExponentCost,
    farmerMultiplier,
    farmerMultiplierCost,
    farmerTickFactor,
  };
}
