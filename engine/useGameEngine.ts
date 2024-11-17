import { useInterval } from "react-use";
import { useStatsStore } from "../stores/statsStore";
import { useScoreStore } from "../stores/scoreStore";
import { useGameEngineStore } from "../stores/gameEngineStore";
import { gameMath } from "../gameMath";
import { BigNumber } from "mathjs";
import { useCallback } from "react";
import { useFarmerUpgrade } from "./useFarmerUpgrade";

const millisecondsPerTick = gameMath.bignumber(100);

export default function useGameEngine() {
  const statsStore = useStatsStore();
  const scoreStore = useScoreStore();
  const { tickFactor, farmerExponentUpgrade, farmerMultiplierUpgrade } =
    useFarmerUpgrade();
  const gameEngineStore = useGameEngineStore();

  // Stats time update Intervall
  useInterval(() => {
    statsStore.incrementTotalTime(gameMath.bignumber("1"));
  }, 1000);

  const tickFarmer = useCallback(
    (ticks: BigNumber) => {
      if (farmerExponentUpgrade.unlocked && farmerMultiplierUpgrade.unlocked) {
        scoreStore.addScore(gameMath.evaluate(`${tickFactor} * ${ticks}`));
      }
    },
    [
      farmerExponentUpgrade.unlocked,
      farmerMultiplierUpgrade.unlocked,
      scoreStore,
      tickFactor,
    ]
  );

  // Game Tick Intervall
  useInterval(() => {
    const currentTimeMillis = gameMath.bignumber(Date.now());
    const ticks = (
      gameMath.evaluate(
        `(${currentTimeMillis} - ${gameEngineStore.lastTick}) / ${millisecondsPerTick}`
      ) as BigNumber
    ).round();

    tickFarmer(ticks);

    gameEngineStore.tick();
  }, millisecondsPerTick.toNumber());
}
