"use client";

import Button from "../../../components/buttons/button";
import { useFarmerStore } from "../../../stores/farmerStore";
import { useGeneratorStore } from "../../../stores/generatorStore";
import { useScoreStore } from "../../../stores/scoreStore";
import { useStatsStore } from "../../../stores/statsStore";

export default function SettingsPage() {
  const farmerStore = useFarmerStore();
  const generatorStore = useGeneratorStore();
  const scoreStore = useScoreStore();
  const statsStore = useStatsStore();

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl">Settings</h1>
      <Button
        variant="warning"
        onClick={() => {
          farmerStore.reset();
          generatorStore.reset();
          scoreStore.reset();
          statsStore.reset();
        }}
      >
        Reset Game (Can&apos;t be undone!)
      </Button>
    </div>
  );
}
