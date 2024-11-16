"use client";

import { gameMath } from "../../gameMath";
import { useScoreStore } from "../../stores/scoreStore";

export default function ScoreDisplay() {
  const scoreStore = useScoreStore();
  return (
    <div className="text-xl text-right">
      Current Nisses: {gameMath.format(scoreStore.score)} Nisses
    </div>
  );
}
