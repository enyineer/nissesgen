import { BigNumber } from "mathjs";
import Button from "../../../components/buttons/button";
import { useScoreStore } from "../../../stores/scoreStore";
import { useCallback, useMemo } from "react";
import { gameMath } from "../../../gameMath";

type UpgradeButtonProps = {
  name: string;
  level: BigNumber;
  multiplier: BigNumber;
  multiplierSign: "x" | "^";
  cost: BigNumber;
  onSuccess: () => void;
};

export default function UpgradeButton(props: UpgradeButtonProps) {
  const scoreStore = useScoreStore();

  const disabled = useMemo(() => {
    return scoreStore.score.lt(props.cost);
  }, [scoreStore.score, props.cost]);

  const handleUpgrade = useCallback(() => {
    if (!disabled) {
      scoreStore.removeScore(props.cost);
      props.onSuccess();
    }
  }, [scoreStore]);

  return (
    <Button
      className="flex flex-col"
      fullWidth
      disabled={disabled}
      onClick={handleUpgrade}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg">{props.name}</h3>
        <div>Level: {props.level.toString()}</div>
      </div>
      <div className="flex items-center justify-between">
        <div>
          Value: {props.multiplierSign}
          {props.multiplier.toString()}
        </div>
        <div>Cost: {gameMath.format(props.cost)} Nisses</div>
      </div>
    </Button>
  );
}
