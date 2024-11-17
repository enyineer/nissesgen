import { useMemo } from "react";
import { gameMath } from "../gameMath";
import { useUpgrade } from "./useUpgrade";

export const FARMER_UNLOCK_COST = gameMath.bignumber("1e5");

export const FARMER_MULTIPLIER_BASE = gameMath.bignumber("1");
export const FARMER_MULTIPLIER_PER_LEVEL = gameMath.bignumber("0.2");
export const FARMER_MULTIPLIER_BASE_COST = gameMath.bignumber("10");
export const FARMER_MULTIPLIER_COST_RATE = gameMath.bignumber("1.14");

export const FARMER_EXPONENT_BASE = gameMath.bignumber("1");
export const FARMER_EXPONENT_PER_LEVEL = gameMath.bignumber("0.02");
export const FARMER_EXPONENT_BASE_COST = gameMath.bignumber("10");
export const FARMER_EXPONENT_COST_RATE = gameMath.bignumber("1.4");

export function useFarmerUpgrade() {
  const farmerMultiplierUpgrade = useUpgrade({
    name: "farmer-multiplier",
    prefix: "x",
    initialValues: {
      unlocked: false,
      level: gameMath.bignumber("0"),
    },
    upgradeValues: {
      unlockCost: FARMER_UNLOCK_COST,
      baseCost: FARMER_MULTIPLIER_BASE_COST,
      costRate: FARMER_MULTIPLIER_COST_RATE,
      baseValue: FARMER_MULTIPLIER_BASE,
      upgradeValue: FARMER_MULTIPLIER_PER_LEVEL,
    },
  });

  const farmerExponentUpgrade = useUpgrade({
    name: "farmer-exponent",
    prefix: "^",
    initialValues: {
      unlocked: false,
      level: gameMath.bignumber("0"),
    },
    upgradeValues: {
      unlockCost: FARMER_UNLOCK_COST,
      baseCost: FARMER_EXPONENT_BASE_COST,
      costRate: FARMER_EXPONENT_COST_RATE,
      baseValue: FARMER_EXPONENT_BASE,
      upgradeValue: FARMER_EXPONENT_PER_LEVEL,
    },
  });

  const tickFactor = useMemo(() => {
    return gameMath.evaluate(
      `${farmerMultiplierUpgrade.value} ^ ${farmerExponentUpgrade.value}`
    );
  }, [farmerExponentUpgrade.value, farmerMultiplierUpgrade.value]);

  return {
    farmerExponentUpgrade,
    farmerMultiplierUpgrade,
    tickFactor,
  };
}
