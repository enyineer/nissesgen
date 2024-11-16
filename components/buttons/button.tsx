import clsx from "clsx/lite";
import { ButtonHTMLAttributes, PropsWithChildren } from "react";

export type ButtonProps = {
  variant?: "primary" | "secondary" | "unstyled" | "warning";
  disabled?: boolean;
  fullWidth?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button(props: PropsWithChildren<ButtonProps>) {
  let { variant } = props;

  if (!variant) {
    variant = "primary";
  }

  const classNames = clsx(
    "px-3 py-2",
    variant === "primary" &&
      "border border-gray-800 rounded hover:border-gray-400 disabled:border-gray-600 disabled:text-gray-600",
    variant === "secondary" &&
      "border border-blue-800 rounded hover:border-blue-400 disabled:border-gray-600 disabled:text-gray-600",
    variant === "warning" &&
      "border border-yellow-800 rounded hover:border-yellow-400 disabled:border-gray-600 disabled:text-gray-600",
    props.fullWidth && "w-full",
    props.disabled && "cursor-not-allowed",
    props.className
  );

  return <button {...props} className={classNames} />;
}
