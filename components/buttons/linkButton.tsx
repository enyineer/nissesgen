import { PropsWithChildren } from "react";
import Button, { ButtonProps } from "./button";
import Link from "next/link";

export type LinkButtonProps = ButtonProps & {
  href: string;
};

export default function LinkButton(props: PropsWithChildren<LinkButtonProps>) {
  return (
    <Link href={props.href}>
      <Button {...props} />
    </Link>
  );
}
