"use client";

import useMoney from "../../../engine/useMoney";
import { useMoneyState } from "../../../engine/useMoneyState";
import useTime from "../../../engine/useTime";
import UpgradeCard from "./upgradeCard";

export default function UpgradesPage() {
  const time = useTime();
  const money = useMoney();
  const { currencyDisplayName: moneyCurrencyDisplayName } = useMoneyState();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl">Upgrades</h1>
      <div className="flex flex-col">
        <h3 className="text-lg">
          Time on Shift (Realtime x {time.upgradeFactor.toFixed(2)})
        </h3>
        <h4 className="text-md font-bold">Make time go by faster</h4>
        <div className="grid grid-cols-1 gap-2 xl:grid-cols-2">
          <UpgradeCard upgrade={time.timeMultiplierUpgrade} />
        </div>
      </div>
      <div className="flex flex-col">
        <h3 className="text-lg">
          Money ({money.tickValuePerHour.toFixed(2)} {moneyCurrencyDisplayName}{" "}
          / Hour Realtime)
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
