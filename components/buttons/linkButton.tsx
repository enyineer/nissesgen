import { HTMLAttributeAnchorTarget, PropsWithChildren } from "react";
import Button, { ButtonProps } from "./button";
import Link from "next/link";

export type LinkButtonProps = ButtonProps & {
  href: string;
  target?: HTMLAttributeAnchorTarget;
};

export default function LinkButton(props: PropsWithChildren<LinkButtonProps>) {
  return (
    <Link href={props.href} target={props.target}>
      <Button {...props} />
    </Link>
  );
}
