import Button from "../../../components/buttons/button";
import { gameMath } from "../../../gameMath";
import { Upgrade } from "../../../engine/useUpgrade";
import { useMemo } from "react";
import Image from "next/image";

type UpgradeButtonProps = {
  upgrade: Upgrade;
};

export default function UpgradeCard(props: UpgradeButtonProps) {
  const {
    unlocked,
    unlockable,
    unlock,
    unlockCost,
    maxBuyable,
    buy,
    level,
    value,
    prefix,
    cost,
    currency,
    displayName,
    upgradeValues,
    imageSrc,
  } = props.upgrade;

  const buttons = useMemo(() => {
    if (!unlocked) {
      return (
        <Button
          className="flex flex-col"
          fullWidth
          disabled={!unlockable}
          onClick={() => unlock()}
        >
          Unlock {displayName} for {gameMath.format(unlockCost)}{" "}
          {currency.displayName}
        </Button>
      );
    } else {
      return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          <Button
            className="flex flex-col"
            disabled={maxBuyable.lt(1)}
            onClick={() => buy(gameMath.bignumber(1))}
          >
            <div>Buy 1</div>
            <div>+{upgradeValues.upgradeValue.times(1).toFixed(2)}</div>
            <div>
              {gameMath.format(cost.one, { precision: 4 })}{" "}
              {currency.displayName}
            </div>
          </Button>
          <Button
            className="flex flex-col"
            disabled={maxBuyable.lt(5)}
            onClick={() => buy(gameMath.bignumber(5))}
          >
            <div>Buy 5</div>
            <div>+{upgradeValues.upgradeValue.times(5).toFixed(2)}</div>
            <div>
              {gameMath.format(cost.five, { precision: 4 })}{" "}
              {currency.displayName}
            </div>
          </Button>
          <Button
            className="flex flex-col"
            disabled={maxBuyable.lt(25)}
            onClick={() => buy(gameMath.bignumber(25))}
          >
            <div>Buy 25</div>
            <div>+{upgradeValues.upgradeValue.times(25).toFixed(2)}</div>
            <div>
              {gameMath.format(cost.twentyFive, { precision: 4 })}{" "}
              {currency.displayName}
            </div>
          </Button>
          <Button
            className="flex flex-col"
            disabled={maxBuyable.lt(1)}
            onClick={() => buy(maxBuyable)}
          >
            <div>Buy Max ({gameMath.format(maxBuyable)})</div>
            <div>
              +{upgradeValues.upgradeValue.times(maxBuyable).toFixed(2)}
            </div>
            <div>
              {gameMath.format(cost.maxBuyable, { precision: 4 })}{" "}
              {currency.displayName}
            </div>
          </Button>
        </div>
      );
    }
  }, [
    buy,
    cost.five,
    cost.maxBuyable,
    cost.one,
    cost.twentyFive,
    currency.displayName,
    displayName,
    maxBuyable,
    unlock,
    unlockCost,
    unlockable,
    unlocked,
    upgradeValues.upgradeValue,
  ]);

  return (
    <div className="flex flex-col gap-4 border border-gray-800 p-2">
      <div className="flex gap-2 justify-between">
        <div className="flex flex-col gap-2">
          <h3 className="text-lg">{displayName}</h3>
          <div>
            Value: {prefix}
            {value.toFixed(2)}
          </div>
          <div>Level: {level.toString()}</div>
        </div>
        <Image
          src={imageSrc}
          width={100}
          height={100}
          alt="Image of upgrade"
          className="rounded-full"
        />
      </div>
      {buttons}
    </div>
  );
}
