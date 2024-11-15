import { GroupBase, SingleValue } from "react-select";

export interface IOption {
  label: string;
  value: string;
}

export interface IOptionGroup extends GroupBase<IOption> {
  label: string;
  options: IOption[];
}

export interface IDropDown {
  options: IOptionGroup[];
  currentValue?: IOption;
  placeholder?: string;
  onChange: (selectedValue: SingleValue<IOption>) => void;
  className?: string;
  label?: string;
  required: boolean;
}
