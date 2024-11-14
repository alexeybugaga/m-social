import { FC, useCallback, useRef, useState } from "react";
import Select from "react-select/dist/declarations/src/Select";
import { IDropDown } from "./DropDown.props";

const DropDown: FC<IDropDown> = ({
  options,
  currentValue,
  placeholder,
  onChange,
  className,
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");

  const [uniqueId, setUniqueId] = useState(
    () => "select_" + Math.random().toFixed(5).slice(2)
  );
  const selectRef = useRef<any | null>(null);
  const menuListRef = useRef<HTMLDivElement | null>(null);

  const closeMenuHandler = () => {
    const menuEl = document.querySelector<HTMLElement>(
      `#${uniqueId} .custom-select__menu`
    );

    const containerEl = menuEl?.parentElement;
    const clonedMenuEl = menuEl?.cloneNode(true) as HTMLElement;
    if (!clonedMenuEl) return;

    clonedMenuEl.classList.add("menu--close");
    clonedMenuEl.addEventListener("animationend", () => {
      containerEl?.removeChild(clonedMenuEl);
    });

    containerEl?.appendChild(clonedMenuEl!);
  };
  const scrollToSelected = useCallback(() => {
    setTimeout(() => {
      if (selectRef.current && menuListRef.current) {
        const index = options.findIndex(
          (option) =>
            option.label === currentValue || option.value === currentValue
        );
        const menuList = menuListRef.current.querySelector(
          ".custom-select__menu-list"
        );
        if (menuList && index !== -1) {
          //@ts-ignore
          const optionHeight = menuList.children[0]?.offsetHeight || 0;
          menuList.scrollTop = index * optionHeight;
        }
      }
    }, 40);
  }, [currentValue, options]);

  return (
    <Select
      ref={selectRef}
      id={uniqueId}
      value={currentValue}
      placeholder={placeholder ? placeholder : "Выбрать..."}
      classNamePrefix={"custom-select"}
      isSearchable={false}
      noOptionsMessage={() => "Нет доступных опций"}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onChange={onChange}
      minMenuHeight={200}
      maxMenuHeight={200}
      options={options}
      className={className}
      onMenuOpen={scrollToSelected}
      onMenuClose={() => closeMenuHandler()}
      menuShouldScrollIntoView={true}
      inputValue={inputValue}
      onInputChange={(value) => setInputValue(value)}
    />
  );
};
