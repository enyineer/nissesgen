"use client";

import {
  FARMER_UNLOCK_COST,
  useFarmerCalculation,
} from "../../../engine/useFarmerCalculation";
import { useGeneratorCalculation } from "../../../engine/useGeneratorCalculation";
import { gameMath } from "../../../gameMath";
import { useFarmerStore } from "../../../stores/farmerStore";
import { useGeneratorStore } from "../../../stores/generatorStore";
import UnlockGate from "./unlockGate";
import UpgradeButton from "./upgradeButton";

export default function UpgradesPage() {
  const generatorCalculation = useGeneratorCalculation();
  const generatorStore = useGeneratorStore();
  const farmerCalculation = useFarmerCalculation();
  const farmerStore = useFarmerStore();

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl">Upgrades</h1>
      <h2 className="text-xl">Generator</h2>
      <div className="flex justify-between gap-4">
        <div className="flex-grow">
          <UpgradeButton
            name="Gen Multiplier"
            cost={generatorCalculation.generatorMultiplierCost}
            level={generatorStore.level}
            multiplier={generatorCalculation.generatorMultiplier}
            multiplierSign="x"
            onSuccess={() => {
              generatorStore.addLevel(gameMath.bignumber("1"));
            }}
          />
        </div>
        <div className="flex-grow">
          <UpgradeButton
            name="Gen Exponent"
            cost={generatorCalculation.generatorExponentCost}
            level={generatorStore.exponentLevel}
            multiplier={generatorCalculation.generatorExponent}
            multiplierSign="^"
            onSuccess={() => {
              generatorStore.addExponentLevel(gameMath.bignumber("1"));
            }}
          />
        </div>
      </div>
      <h2 className="text-xl">Farmer</h2>
      <UnlockGate
        cost={FARMER_UNLOCK_COST}
        locked={!farmerStore.unlocked}
        name="Farmer"
        onSuccess={() => farmerStore.unlock()}
      >
        <div className="flex justify-between gap-4">
          <div className="flex-grow">
            <UpgradeButton
              name="Farmer Multiplier"
              cost={farmerCalculation.farmerMultiplierCost}
              level={farmerStore.level}
              multiplier={farmerCalculation.farmerMultiplier}
              multiplierSign="x"
              onSuccess={() => {
                farmerStore.addLevel(gameMath.bignumber("1"));
              }}
            />
          </div>
          <div className="flex-grow">
            <UpgradeButton
              name="Farmer Exponent"
              cost={farmerCalculation.farmerExponentCost}
              level={farmerStore.exponentLevel}
              multiplier={farmerCalculation.farmerExponent}
              multiplierSign="^"
              onSuccess={() => {
                farmerStore.addExponentLevel(gameMath.bignumber("1"));
              }}
            />
          </div>
        </div>
      </UnlockGate>
    </div>
  );
}
