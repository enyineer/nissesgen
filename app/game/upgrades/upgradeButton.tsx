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
    <Button className="flex flex-col" fullWidth disabled={!unlockable}>
      Unlock ${label} for ${gameMath.format(unlockCost)} Nisses
    </Button>;
  }

  return (
    <Button
      className="flex flex-col"
      fullWidth
      disabled={maxBuyable.eq(0)}
      onClick={() => buy()}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg">{props.label}</h3>
        <div>Level: {level.toString()}</div>
      </div>
      <div className="flex items-center justify-between">
        <div>
          Value: {prefix}
          {gameMath.format(value)}
        </div>
        <div>Cost: {gameMath.format(cost.one)} Nisses</div>
      </div>
    </Button>
  );
}
