import { PropsWithChildren } from "react";

export interface IButton extends PropsWithChildren {
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}
