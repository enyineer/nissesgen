"use client";

import Button from "../../components/buttons/button";
import { useScoreStore } from "../../stores/scoreStore";
import { gameMath } from "../../gameMath";
import { useCallback } from "react";
import { useStatsStore } from "../../stores/statsStore";
import { useKeyPressEvent } from "react-use";
import { useGeneratorUpgrade } from "../../engine/useGeneratorUpgrade";

export default function GamePage() {
  const scoreStore = useScoreStore();
  const statsStore = useStatsStore();
  const { tickFactor } = useGeneratorUpgrade();

  const handleClick = useCallback(() => {
    scoreStore.addScore(tickFactor);
    statsStore.incrementClicks(gameMath.bignumber("1"));
  }, [tickFactor, scoreStore, statsStore]);

  useKeyPressEvent(
    " ",
    (e) => {
      if (e !== null) {
        e.preventDefault();
        handleClick();
      }
    },
    (e) => {
      if (e !== null) {
        e.preventDefault();
      }
    }
  );

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
              Generate {gameMath.format(tickFactor, 4)} Nisses
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
