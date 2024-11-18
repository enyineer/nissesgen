"use client";

import Button from "../../../components/buttons/button";
import useMoney from "../../../engine/useMoney";
import useNotification from "../../../engine/useNotification";
import useTime from "../../../engine/useTime";
import { useGameEngineStore } from "../../../stores/gameEngineStore";
import { useStatsStore } from "../../../stores/statsStore";

export default function SettingsPage() {
  const time = useTime();
  const money = useMoney();
  const statsStore = useStatsStore();
  const gameEngineStore = useGameEngineStore();
  const { bossMessage } = useNotification();

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl">Settings</h1>
      <Button
        variant="warning"
        onClick={() => {
          time.reset();
          money.reset();
          statsStore.reset();
          gameEngineStore.reset();
          localStorage.clear();
          bossMessage({
            message: "You are fired!",
          });
        }}
      >
        Reset Game (Can&apos;t be undone!)
      </Button>
    </div>
  );
}
