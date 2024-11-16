"use client";

import { useStatsStore } from "../../../stores/statsStore";

export default function StatsPage() {
  const statsStore = useStatsStore();

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl">Stats</h1>
      <h3 className="text-lg">
        Time spent: {statsStore.totalTime.toString()} seconds
      </h3>
    </div>
  );
}
