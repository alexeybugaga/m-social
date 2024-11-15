import { GroupBase, SingleValue } from "react-select";

export interface IOption {
  label: string;
  value: string;
}

export interface IDropDown {
  options: IOption[];
  currentValue?: IOption;
  placeholder?: string;
  onChange: (selectedValue: SingleValue<IOption>) => void;
  className?: string;
  descr?: string;
  label?: string;
  required: boolean;
}
