import Button from "../../../components/buttons/button";
import { gameMath } from "../../../gameMath";
import { Upgrade } from "../../../engine/useUpgrade";

type UpgradeButtonProps = {
  upgrade: Upgrade;
};

export default function UpgradeButton(props: UpgradeButtonProps) {
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
  } = props.upgrade;

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
  }

  return (
    <div className="flex flex-col gap-2 border border-gray-800 p-2">
      <div className="flex items-center justify-between">
        <h3 className="text-lg">{displayName}</h3>
        <div>Level: {level.toString()}</div>
      </div>
      <div className="flex items-center justify-between">
        <div>
          Value: {prefix}
          {value.toFixed(2)}
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          className="flex flex-col"
          fullWidth
          disabled={maxBuyable.lt(1)}
          onClick={() => buy(gameMath.bignumber(1))}
        >
          <div>Buy x1</div>
          <div>{gameMath.format(cost.one, { precision: 4 })} N</div>
        </Button>
        <Button
          className="flex flex-col"
          fullWidth
          disabled={maxBuyable.lt(5)}
          onClick={() => buy(gameMath.bignumber(5))}
        >
          <div>Buy x5</div>
          <div>{gameMath.format(cost.five, { precision: 4 })} N</div>
        </Button>
        <Button
          className="flex flex-col"
          fullWidth
          disabled={maxBuyable.lt(25)}
          onClick={() => buy(gameMath.bignumber(25))}
        >
          <div>Buy x25</div>
          <div>{gameMath.format(cost.twentyFive, { precision: 4 })} N</div>
        </Button>
        <Button
          className="flex flex-col"
          fullWidth
          disabled={maxBuyable.lt(1)}
          onClick={() => buy(maxBuyable)}
        >
          <div>Buy Max (x{gameMath.format(maxBuyable)})</div>
          <div>{gameMath.format(cost.maxBuyable, { precision: 4 })} N</div>
        </Button>
      </div>
    </div>
  );
}
