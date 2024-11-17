import { toast, ToastOptions } from "react-toastify";

import bossYelling from "../images/boss_yelling.jpg";
import Image from "next/image";

export default function useNotification() {
  const bossMessage = (options: {
    type?: ToastOptions["type"];
    message: string;
  }) => {
    const { type, message } = options;

    toast(
      ({}) => (
        <div className="flex gap-4">
          <div className="flex items-center">
            <Image
              src={bossYelling.src}
              width={60}
              height={60}
              alt="Yelling Boss Pixelart"
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-lg">Boss</div>
            <div>{message}</div>
          </div>
        </div>
      ),
      {
        type,
        theme: "dark",
        icon: false,
      }
    );
  };

  return {
    bossMessage,
  };
}
