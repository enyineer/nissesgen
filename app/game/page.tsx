"use client";

import { useCallback, useState } from "react";
import { useInterval } from "react-use";
import { DateTime } from "luxon";
import Button from "../../components/buttons/button";
import { useGameEngineStore } from "../../stores/gameEngineStore";
import useNotification from "../../engine/useNotification";

export default function GamePage() {
  const gameEngineStore = useGameEngineStore();

  const getTimeString = useCallback(
    () =>
      DateTime.now().toLocaleString({
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    []
  );

  const getDateString = useCallback(
    () =>
      DateTime.now().toLocaleString({
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
    []
  );

  const [timeString, setTimeString] = useState(getTimeString());
  const [dateString, setDateString] = useState(getDateString());

  const { bossMessage } = useNotification();

  useInterval(() => {
    setTimeString(getTimeString());
    setDateString(getDateString());
  }, 1000);

  const handleClick = useCallback(() => {
    if (!gameEngineStore.clockedIn) {
      bossMessage({ message: "Welcome to work, wageslave!" });
      gameEngineStore.setClockIn(true);
    } else {
      bossMessage({ message: "Come back soon!" });
      gameEngineStore.setClockIn(false);
    }
  }, [bossMessage, gameEngineStore]);

  return (
    <div className="flex flex-col h-full items-center justify-center gap-4">
      <h1 className="text-4xl flex">
        <div className="text-red-600">N</div>isses Corporation
      </h1>
      <h3 className="text-lg">
        {dateString} {timeString}
      </h3>
      <div className="flex gap-4">
        <Button onClick={handleClick} disabled={gameEngineStore.clockedIn}>
          Clock In
        </Button>
        <Button onClick={handleClick} disabled={!gameEngineStore.clockedIn}>
          Clock Out
        </Button>
      </div>
    </div>
  );
}
