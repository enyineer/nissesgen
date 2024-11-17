"use client";

import { Duration } from "luxon";
import useTime from "../../engine/useTime";

export default function ScoreDisplay() {
  const { time } = useTime();

  return (
    <div className="text-xl text-right">
      Time on Shift:{" "}
      {Duration.fromMillis(time.toNumber()).toFormat("dd'd' hh'h' mm'm' ss's'")}
    </div>
  );
}
