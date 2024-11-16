"use client";

import Menu from "./menu";
import ScoreDisplay from "./scoreDisplay";
import useGameEngine from "../../engine/useGameEngine";

export default function GameLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useGameEngine();

  return (
    <div className="h-screen w-screen flex">
      <div className="min-w-[200px]">
        <Menu />
      </div>
      <div className="flex flex-col flex-grow h-screen">
        <div className="p-6 flex-grow overflow-y-auto">{children}</div>
        <div className="bg-gray-800 p-4">
          <ScoreDisplay />
        </div>
      </div>
    </div>
  );
}
