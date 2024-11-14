interface IOption {
  label: string;
  value: any;
}

export interface IDropDown {
  options: any[];
  currentValue?: any;
  placeholder?: string;
  onChange: (selectedValue: any) => void;
  className?: string;
}
