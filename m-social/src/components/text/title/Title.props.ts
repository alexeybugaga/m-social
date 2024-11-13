import { TitleType } from "@/types/TextTypes";
import { PropsWithChildren } from "react";

export interface ITitle extends PropsWithChildren {
  tag?: TitleType;
  className?: string;
}
