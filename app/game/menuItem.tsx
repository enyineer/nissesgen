"use client";

import { ReactElement } from "react";
import LinkButton from "../../components/buttons/linkButton";
import { usePathname } from "next/navigation";
import clsx from "clsx/lite";

type MenuItemProps = {
  icon: ReactElement;
  label: string;
  href: string;
};

export default function MenuItem(props: MenuItemProps) {
  const pathname = usePathname();

  const classNames = clsx(
    "flex gap-2 items-center w-full",
    pathname === props.href && "bg-gray-900 rounded"
  );

  return (
    <LinkButton href={props.href} className={classNames}>
      {props.icon}
      <div>{props.label}</div>
    </LinkButton>
  );
}
