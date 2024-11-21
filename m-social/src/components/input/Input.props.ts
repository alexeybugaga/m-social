import { ChangeEventHandler } from "react";

export interface IInput {
  label: string;
  placeholder?: string;
  type?: string;
  value: string | any;
  onChange: ChangeEventHandler<HTMLInputElement>;
  name?: string;
  className?: string;
  error?: any;
  autofocus?: boolean;
  descr?: string;
  required: boolean;
}
