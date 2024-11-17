"use client";

import { useFarmerUpgrade } from "../../../engine/useFarmerUpgrade";
import { useGeneratorUpgrade } from "../../../engine/useGeneratorUpgrade";
import UpgradeButton from "./upgradeButton";

export default function UpgradesPage() {
  const { generatorExponentUpgrade, generatorMultiplierUpgrade } =
    useGeneratorUpgrade();
  const { farmerExponentUpgrade, farmerMultiplierUpgrade } = useFarmerUpgrade();

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl">Upgrades</h1>
      <h2 className="text-xl">Generator</h2>
      <div className="flex justify-between gap-4 xl:flex-row flex-col">
        <div className="flex-grow">
          <UpgradeButton
            label="Gen Multiplier"
            upgrade={generatorMultiplierUpgrade}
          />
        </div>
        <div className="flex-grow">
          <UpgradeButton
            label="Gen Exponent"
            upgrade={generatorExponentUpgrade}
          />
        </div>
      </div>
      <h2 className="text-xl">Farmer</h2>
      <h3 className="text-lg">
        You need to unlock both upgrades for Farmer to work!
      </h3>
      <div className="flex justify-between gap-4 xl:flex-row flex-col">
        <div className="flex-grow">
          <UpgradeButton
            label="Farmer Multiplier"
            upgrade={farmerMultiplierUpgrade}
          />
        </div>
        <div className="flex-grow">
          <UpgradeButton
            label="Farmer Exponent"
            upgrade={farmerExponentUpgrade}
          />
        </div>
      </div>
    </div>
  );
}
