import Button from "../../../components/buttons/button";
import { gameMath } from "../../../gameMath";
import { Upgrade } from "../../../engine/useUpgrade";

type UpgradeButtonProps = {
  label: string;
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
  } = props.upgrade;
  const label = props.label;

  if (!unlocked) {
    return (
      <Button
        className="flex flex-col"
        fullWidth
        disabled={!unlockable}
        onClick={() => unlock()}
      >
        Unlock {label} for {gameMath.format(unlockCost)} Nisses
      </Button>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h3 className="text-lg">{props.label}</h3>
        <div>Level: {level.toString()}</div>
      </div>
      <div className="flex items-center justify-between">
        <div>
          Value: {prefix}
          {value.toFixed(2)}
        </div>
        <div>Cost: {cost.one.toFixed(2)} Nisses</div>
      </div>
      <div className="flex gap-2">
        <Button
          className="flex flex-col"
          fullWidth
          disabled={maxBuyable.lt(1)}
          onClick={() => buy(gameMath.bignumber(1))}
        >
          <div>Buy x1</div>
          <div>{cost.one.toFixed(2)} N</div>
        </Button>
        <Button
          className="flex flex-col"
          fullWidth
          disabled={maxBuyable.lt(5)}
          onClick={() => buy(gameMath.bignumber(5))}
        >
          <div>Buy x5</div>
          <div>{cost.five.toFixed(2)} N</div>
        </Button>
        <Button
          className="flex flex-col"
          fullWidth
          disabled={maxBuyable.lt(25)}
          onClick={() => buy(gameMath.bignumber(25))}
        >
          <div>Buy x25</div>
          <div>{cost.twentyFive.toFixed(2)} N</div>
        </Button>
        <Button
          className="flex flex-col"
          fullWidth
          disabled={maxBuyable.lt(1)}
          onClick={() => buy(maxBuyable)}
        >
          <div>Buy Max (x{gameMath.format(maxBuyable)})</div>
          <div>{cost.maxBuyable.toFixed(2)} N</div>
        </Button>
      </div>
    </div>
  );
}
