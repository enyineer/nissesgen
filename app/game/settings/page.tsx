"use client";

import Button from "../../../components/buttons/button";
import useNotification from "../../../engine/useNotification";
import useTime from "../../../engine/useTime";
import { useStatsStore } from "../../../stores/statsStore";

export default function SettingsPage() {
  const time = useTime();
  const statsStore = useStatsStore();
  const { bossMessage } = useNotification();

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl">Settings</h1>
      <Button
        variant="warning"
        onClick={() => {
          time.reset();
          statsStore.reset();
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
