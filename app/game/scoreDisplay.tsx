"use client";

import { Duration } from "luxon";
import { gameMath } from "../../gameMath";
import { useTimeState } from "../../engine/useTimeState";
import { useMoneyState } from "../../engine/useMoneyState";

export default function ScoreDisplay() {
  const { state: timeState, currencyDisplayName: timeDisplayName } =
    useTimeState();
  const { state: moneyState, currencyDisplayName: moneyDisplayName } =
    useMoneyState();

  return (
    <div className="grid lg:grid-cols-2">
      <div className="text-xl">
        Money: {moneyState.amount.toFixed(2)} {moneyDisplayName}
      </div>
      <div className="text-xl">
        Time on Shift:{" "}
        {Duration.fromMillis(timeState.amount.toNumber()).toFormat(
          "dd'd' hh'h' mm'm' ss's'"
        )}{" "}
        ({gameMath.format(timeState.amount, { upperExp: 4, precision: 5 })}{" "}
        {timeDisplayName})
      </div>
    </div>
  );
}
