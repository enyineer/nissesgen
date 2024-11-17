"use client";

import useTime from "../../../engine/useTime";
import UpgradeButton from "./upgradeButton";

export default function UpgradesPage() {
  const time = useTime();

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl">Upgrades</h1>
      <h2 className="text-xl">
        Time (x{time.upgradeFactor.toFixed(2)} / Tick)
      </h2>
      <div className="flex justify-between gap-4 xl:flex-row flex-col">
        <div className="flex-grow">
          <UpgradeButton upgrade={time.timeMultiplierUpgrade} />
        </div>
      </div>
    </div>
  );
}
