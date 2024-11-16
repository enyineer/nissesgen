"use client";

import Button from "../../components/buttons/button";
import { useScoreStore } from "../../stores/scoreStore";
import { gameMath } from "../../gameMath";
import { useGeneratorCalculation } from "../../engine/useGeneratorCalculation";
import { useCallback } from "react";
import { useStatsStore } from "../../stores/statsStore";
import { useKeyPressEvent } from "react-use";

export default function GamePage() {
  const scoreStore = useScoreStore();
  const statsStore = useStatsStore();
  const { generatorTickFactor } = useGeneratorCalculation();

  const handleClick = useCallback(() => {
    scoreStore.addScore(generatorTickFactor);
    statsStore.incrementClicks(gameMath.bignumber("1"));
  }, [generatorTickFactor, scoreStore, statsStore]);

  useKeyPressEvent(" ", handleClick, undefined);

  return (
    <div className="flex flex-col h-full">
      <h1 className="text-2xl">Generator</h1>
      <div className="flex-grow">
        <Button
          variant="primary"
          className="w-full h-full"
          onClick={() => handleClick()}
        >
          <div className="flex flex-col">
            <div className="font-bold">
              Generate {gameMath.format(generatorTickFactor, 4)} Nisses
            </div>
            <div className="text-sm">
              Click or press SPACE to generate Nisses
            </div>
          </div>
        </Button>
      </div>
    </div>
  );
}
