import { useInterval } from "react-use";
import { useStatsStore } from "../stores/statsStore";
import { useGameEngineStore } from "../stores/gameEngineStore";
import { gameMath } from "../gameMath";
import useTime from "./useTime";
import useMoney from "./useMoney";

export const MILLISECONDS_PER_TICK = gameMath.bignumber(100);

export default function useGameEngine() {
  const statsStore = useStatsStore();
  const gameEngineStore = useGameEngineStore();
  const { tick: tickTime } = useTime();
  const { tick: tickMoney } = useMoney();

  // Stats update Intervall
  useInterval(() => {
    statsStore.addRealTime(gameMath.bignumber("1000"));
    // TODO: Add Time Gain Multiplier here
    statsStore.addGameTime(gameMath.bignumber("1000"));
  }, 1000);

  // Score Update
  useInterval(() => {
    if (gameEngineStore.clockedIn) {
      tickTime();
      tickMoney();
    }
  }, MILLISECONDS_PER_TICK.toNumber());
}
