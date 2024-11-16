"use client";

import Button from "../../components/buttons/button";
import { useScoreStore } from "../../stores/scoreStore";
import { gameMath } from "../../gameMath";
import { useGeneratorCalculation } from "../../engine/useGeneratorCalculation";
import { useCallback } from "react";
import { useStatsStore } from "../../stores/statsStore";

export default function GamePage() {
  const scoreStore = useScoreStore();
  const statsStore = useStatsStore();
  const { generatorTickFactor } = useGeneratorCalculation();

  const handleClick = useCallback(() => {
    scoreStore.addScore(generatorTickFactor);
    statsStore.incrementClicks(gameMath.bignumber("1"));
  }, [scoreStore, statsStore]);

  return (
    <div className="flex flex-col h-full">
      <h1 className="text-2xl">Generator</h1>
      <div className="flex-grow">
        <Button
          variant="primary"
          className="w-full h-full"
          onClick={() => handleClick()}
        >
          Generate {gameMath.format(generatorTickFactor)} Nisses
        </Button>
      </div>
    </div>
  );
}
