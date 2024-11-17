"use client";

import { toast, ToastOptions } from "react-toastify";

import bossYelling from "../images/boss_yelling.jpg";
import cashier from "../images/cashier.jpg";
import scientist from "../images/scientist.jpg";
import Image from "next/image";

type MessageOptions = {
  type?: ToastOptions["type"];
  message: string;
};

export default function useNotification() {
  const message = (options: {
    type?: ToastOptions["type"];
    name: string;
    imgSrc: string;
    message: string;
  }) => {
    const { type, message, imgSrc, name } = options;

    toast(
      ({}) => (
        <div className="flex gap-4">
          <div className="flex items-center">
            <Image
              src={imgSrc}
              width={60}
              height={60}
              alt={`Image of ${name}`}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-lg">{name}</div>
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

  const bossMessage = (options: MessageOptions) => {
    message({
      type: options.type,
      name: "Boss",
      imgSrc: bossYelling.src,
      message: options.message,
    });
  };

  const cashierMessage = (options: MessageOptions) => {
    message({
      type: options.type,
      name: "Cashier",
      imgSrc: cashier.src,
      message: options.message,
    });
  };

  const scientistMessage = (options: MessageOptions) => {
    message({
      type: options.type,
      name: "Scientist",
      imgSrc: scientist.src,
      message: options.message,
    });
  };

  return {
    bossMessage,
    cashierMessage,
    scientistMessage,
  };
}
