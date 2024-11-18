import { useInterval } from "react-use";
import { useStatsStore } from "../stores/statsStore";
import { useGameEngineStore } from "../stores/gameEngineStore";
import { gameMath } from "../gameMath";
import useTime from "./useTime";
import useMoney from "./useMoney";
import { BigNumber } from "mathjs";

export const MILLISECONDS_PER_TICK = gameMath.bignumber(100);

export default function useGameEngine() {
  const statsStore = useStatsStore();
  const gameEngineStore = useGameEngineStore();
  const { tick: tickTime, tickValue: timeTickValue } = useTime();
  const { tick: tickMoney } = useMoney();

  // Stats update Intervall
  useInterval(() => {
    statsStore.addRealTime(gameMath.bignumber("1000"));
    statsStore.addGameTime(
      gameMath.evaluate(`(${MILLISECONDS_PER_TICK} / ${timeTickValue}) * 1000`)
    );
  }, 1000);

  // Score Update
  useInterval(() => {
    if (gameEngineStore.clockedIn) {
      const lastTick =
        gameEngineStore.lastTick ?? gameMath.bignumber(Date.now());
      const ticksSinceLastTick = (
        gameMath.evaluate(
          `(${gameMath.bignumber(
            Date.now()
          )} - ${lastTick}) / ${MILLISECONDS_PER_TICK}`
        ) as BigNumber
      ).round();
      tickTime(ticksSinceLastTick);
      tickMoney(ticksSinceLastTick);
      gameEngineStore.setLastTick(gameMath.bignumber(Date.now()));
    }
  }, MILLISECONDS_PER_TICK.toNumber());
}
