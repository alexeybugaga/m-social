import { ChangeEventHandler } from "react";

export interface ICheckbox {
  label: string;
  value: string | any;
  onChange: ChangeEventHandler<HTMLInputElement>;
  name?: string;
  className?: string;
  error?: any;
  required: boolean;
  agreementText: string;
}
