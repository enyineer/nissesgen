"use client";

import Button from "../../../components/buttons/button";
import { useFarmerUpgrade } from "../../../engine/useFarmerUpgrade";
import { useGeneratorUpgrade } from "../../../engine/useGeneratorUpgrade";
import { useScoreStore } from "../../../stores/scoreStore";
import { useStatsStore } from "../../../stores/statsStore";

export default function SettingsPage() {
  const { generatorExponentUpgrade, generatorMultiplierUpgrade } =
    useGeneratorUpgrade();
  const { farmerExponentUpgrade, farmerMultiplierUpgrade } = useFarmerUpgrade();
  const scoreStore = useScoreStore();
  const statsStore = useStatsStore();

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl">Settings</h1>
      <Button
        variant="warning"
        onClick={() => {
          generatorExponentUpgrade.reset();
          generatorMultiplierUpgrade.reset();
          farmerExponentUpgrade.reset();
          farmerMultiplierUpgrade.reset();
          scoreStore.reset();
          statsStore.reset();
        }}
      >
        Reset Game (Can&apos;t be undone!)
      </Button>
    </div>
  );
}
