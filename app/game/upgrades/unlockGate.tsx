import { PropsWithChildren, useCallback, useMemo } from "react";
import { useScoreStore } from "../../../stores/scoreStore";
import { BigNumber } from "mathjs";
import Button from "../../../components/buttons/button";
import { gameMath } from "../../../gameMath";

type UnlockGateProps = {
  name: string;
  cost: BigNumber;
  onSuccess: () => void;
  locked: boolean;
};

export default function UnlockGate(props: PropsWithChildren<UnlockGateProps>) {
  const scoreStore = useScoreStore();

  const disabled = useMemo(() => {
    return scoreStore.score.lt(props.cost);
  }, [scoreStore.score, props.cost]);

  const handleUnlock = useCallback(() => {
    if (!disabled) {
      scoreStore.removeScore(props.cost);
      props.onSuccess();
    }
  }, [disabled, props, scoreStore]);

  if (!props.locked) {
    return props.children;
  }

  return (
    <Button
      className="flex flex-col"
      fullWidth
      disabled={disabled}
      onClick={handleUnlock}
    >
      <h3 className="text-lg">Unlock {props.name}</h3>
      <div>Cost: {gameMath.format(props.cost)} Nisses</div>
    </Button>
  );
}
