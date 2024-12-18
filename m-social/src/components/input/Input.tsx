import { FC, useEffect, useState } from "react";
import { IInput } from "./Input.props";
import styles from "./Input.module.scss";
import classNames from "classnames";
import MaskInput from "react-maskinput";
import { phoneMask } from "@/constants/common.const";

const Input: FC<IInput> = ({
  label,
  onChange,
  value,
  placeholder,
  name,
  className,
  error,
  autofocus,
  type,
  descr,
  required,
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [showMask, setShowMask] = useState<boolean>(false);
  useEffect(() => {
    if (autofocus && name) {
      const inpunTel = document.getElementById(name) as HTMLInputElement;
      inpunTel?.focus();
      setIsFocused(true);
    }
  }, [autofocus, name]);

  useEffect(() => {
    if (isFocused && name && type === "tel") {
      const inpunTel = document.getElementById(name) as HTMLInputElement;
      setTimeout(() => {
        if (inpunTel) {
          const firstEmptyIndex = value.indexOf("_");
          if (firstEmptyIndex !== -1) {
            inpunTel.setSelectionRange(firstEmptyIndex, firstEmptyIndex);
          }
        }
      }, 0);
    }
  }, [name, type, isFocused]);

  const handleChange = (e: React.SyntheticEvent) => {
    const target = e.currentTarget as HTMLInputElement;
    if (onChange) {
      let rawValue = target.value;
      if (type === "tel" && rawValue.trim() === phoneMask) {
        rawValue = "";
      }

      onChange({
        ...e,
        target: { ...target, value: rawValue },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  };
  const onBlur = () => {
    const rawValue = value.replace(/\D/g, "");
    if (rawValue.length === 0) {
      setShowMask(false);
    }
    setIsFocused(false);
  };

  const onFocus = () => {
    setShowMask(true);
    setIsFocused(true);
  };
  const getMask = (): string | null => {
    if (type === "tel") {
      return "+7 (000) 000-00-00";
    }
    return null;
  };
  return (
    <div className={classNames([styles.inputWrap, className || ""])}>
      <label htmlFor={name} className={styles.label}>
        <span className={styles.labelText}>
          {label}
          {required && <span className={styles.labelTextRequired}>*</span>}
        </span>
        <div className={styles.inputContainer}>
          {type === "tel" ? (
            <MaskInput
              mask={getMask() || ""}
              showMask={showMask}
              maskChar="_"
              value={showMask ? value : ""}
              onChange={handleChange}
              onFocus={onFocus}
              onBlur={onBlur}
              //@ts-ignore
              size={18}
              id={name}
              name={name}
              placeholder={placeholder || "Введите текст..."}
              className={classNames(styles.input, { [styles.error]: error })}
            />
          ) : (
            <input
              id={name}
              name={name}
              type={type ? type : "text"}
              value={value}
              onChange={onChange}
              onFocus={onFocus}
              onBlur={onBlur}
              placeholder={placeholder || "Введите текст..."}
              className={classNames(styles.input, { [styles.error]: error })}
            />
          )}

          {error && <span className={styles.errorText}>{error}</span>}
        </div>
      </label>
      {descr && <p className={styles.descr}>{descr}</p>}
    </div>
  );
};

export default Input;
