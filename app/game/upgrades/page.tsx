"use client";

import { MILLISECONDS_PER_TICK } from "../../../engine/useGameEngine";
import useMoney from "../../../engine/useMoney";
import { useMoneyState } from "../../../engine/useMoneyState";
import useTime from "../../../engine/useTime";
import { useTimeState } from "../../../engine/useTimeState";
import { gameMath } from "../../../gameMath";
import UpgradeCard from "./upgradeCard";

export default function UpgradesPage() {
  const time = useTime();
  const money = useMoney();
  const { currencyDisplayName: timeCurrencyDisplayName } = useTimeState();
  const { currencyDisplayName: moneyCurrencyDisplayName } = useMoneyState();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl">Upgrades</h1>
      <div className="flex flex-col">
        <h3 className="text-lg">
          Time on Shift ({gameMath.format(time.tickValue)}{" "}
          {timeCurrencyDisplayName} / {gameMath.format(MILLISECONDS_PER_TICK)}{" "}
          ms)
        </h3>
        <h4 className="text-md font-bold">Make time go by faster</h4>
        <div className="grid grid-cols-1 gap-2 xl:grid-cols-2">
          <UpgradeCard upgrade={time.timeMultiplierUpgrade} />
        </div>
      </div>
      <div className="flex flex-col">
        <h3 className="text-lg">
          Wage ({money.tickValue.toFixed(4)} {moneyCurrencyDisplayName} /{" "}
          {gameMath.format(MILLISECONDS_PER_TICK)} ms)
        </h3>
        <h4 className="text-md font-bold">
          Bribe your boss and improve your wage
        </h4>
        <div className="grid grid-cols-1 gap-2 xl:grid-cols-2">
          <UpgradeCard upgrade={money.chocolateUpgrade} />
          <UpgradeCard upgrade={money.cigarUpgrade} />
        </div>
      </div>
      <div className="text-center">
        More Upgrades coming soon! (eg. buy houses / prestige etc.)
      </div>
    </div>
  );
}
