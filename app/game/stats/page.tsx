"use client";

import { Duration } from "luxon";
import { useStatsStore } from "../../../stores/statsStore";

export default function StatsPage() {
  const { gameTime, realTime } = useStatsStore();

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl">Stats</h1>
      <div className="flex flex-col">
        <h3 className="text-lg">Real Time spent</h3>
        <div>
          {Duration.fromMillis(realTime.toNumber()).toFormat(
            "dd'd' hh'h' mm'm' ss's'"
          )}
        </div>
      </div>
      <div className="flex flex-col">
        <h3 className="text-lg">Game Time spent</h3>
        <div>
          {Duration.fromMillis(gameTime.toNumber()).toFormat(
            "dd'd' hh'h' mm'm' ss's'"
          )}
        </div>
      </div>
    </div>
  );
}
