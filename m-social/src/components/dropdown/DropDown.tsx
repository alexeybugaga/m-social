import { FC, useCallback, useRef, useState } from "react";
import { IDropDown, IOption } from "./DropDown.props";
import classNames from "classnames";
import Select, { components } from "react-select";
import styles from "./DropDown.module.scss";

const DropdownIndicator = (props: any) => {
  return (
    <components.DropdownIndicator className={styles.dropdownArrow} {...props}>
      <svg
        width="14"
        height="9"
        viewBox="0 0 14 9"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          x1="0.707107"
          y1="1.29289"
          x2="7.70711"
          y2="8.29289"
          stroke="currentColor"
          strokeWidth="2"
        />
        <line
          y1="-1"
          x2="9.8995"
          y2="-1"
          transform="matrix(-0.707107 0.707107 0.707107 0.707107 14 2)"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    </components.DropdownIndicator>
  );
};

const DropDown: FC<IDropDown> = ({
  options,
  currentValue,
  placeholder,
  onChange,
  className,
  label,
  required,
  descr,
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
            option.label === currentValue?.label ||
            option.value === currentValue?.value
        );
        const menuList = menuListRef.current.querySelector(
          ".custom-select__menu-list"
        );
        if (menuList && index !== -1) {
          //@ts-expect-error attr menuList.children[0]?.offsetHeight
          const optionHeight = menuList.children[0]?.offsetHeight || 0;
          menuList.scrollTop = index * optionHeight;
        }
      }
    }, 40);
  }, [currentValue, options]);

  return (
    <div className={styles.container}>
      <div className={styles.dropdownWrapper}>
        {label && (
          <span className={styles.dropdownLabel}>
            {label}
            {required && <span className={styles.labelTextRequired}>*</span>}
          </span>
        )}
        <Select<IOption, false>
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
          components={{
            DropdownIndicator,
          }}
          className={classNames([
            className ? className : "",
            styles.customSelectWrapper,
          ])}
          onMenuOpen={scrollToSelected}
          onMenuClose={() => closeMenuHandler()}
          menuShouldScrollIntoView={true}
          inputValue={inputValue}
          onInputChange={(value) => setInputValue(value)}
        />
      </div>
      {descr && <span className={styles.descr}>{descr}</span>}
    </div>
  );
};

export default DropDown;
