"use client";

import { Duration } from "luxon";
import useTime from "../../engine/useTime";
import useMoney from "../../engine/useMoney";
import { gameMath } from "../../gameMath";

export default function ScoreDisplay() {
  const { time, displayName: timeDisplayName } = useTime();
  const { money, displayName: moneyDisplayName } = useMoney();

  return (
    <div className="flex justify-around">
      <div className="text-xl">
        Money: {money.toFixed(2)} {moneyDisplayName}
      </div>
      <div className="text-xl">
        Time on Shift:{" "}
        {Duration.fromMillis(time.toNumber()).toFormat(
          "dd'd' hh'h' mm'm' ss's'"
        )}{" "}
        ({gameMath.format(time)} {timeDisplayName})
      </div>
    </div>
  );
}
