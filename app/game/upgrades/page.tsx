"use client";

import { MILLISECONDS_PER_TICK } from "../../../engine/useGameEngine";
import useMoney from "../../../engine/useMoney";
import useTime from "../../../engine/useTime";
import { gameMath } from "../../../gameMath";
import UpgradeButton from "./upgradeButton";

export default function UpgradesPage() {
  const time = useTime();
  const money = useMoney();

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl">Upgrades</h1>
      <h2 className="text-xl">
        Time ({gameMath.format(time.tickValue)}ms /{" "}
        {gameMath.format(MILLISECONDS_PER_TICK)}ms)
      </h2>
      <div className="flex justify-between gap-4 xl:flex-row flex-col">
        <div className="flex-grow">
          <UpgradeButton upgrade={time.timeMultiplierUpgrade} />
        </div>
      </div>
      <h2 className="text-xl">
        Wage ({money.tickValue.toFixed(4)} N$ /{" "}
        {gameMath.format(MILLISECONDS_PER_TICK)}ms)
      </h2>
      <div className="flex justify-between gap-4 xl:flex-row flex-col">
        <div className="flex-grow">
          <UpgradeButton upgrade={money.chocolateUpgrade} />
        </div>
        <div className="flex-grow">
          <UpgradeButton upgrade={money.cigarUpgrade} />
        </div>
      </div>
    </div>
  );
}
