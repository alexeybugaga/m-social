import { FC, useEffect, useState } from "react";
import { IInput } from "./Input.props";
import styles from "./Input.module.scss";
import classNames from "classnames";
import MaskInput from "react-maskinput";

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
  const [isFocused, setIsFocused] = useState(false);
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
          inpunTel?.setSelectionRange(3, 3);
        }
      }, 0);
    }
  }, [name, type, isFocused]);

  const handleChange = (e: React.SyntheticEvent) => {
    const target = e.currentTarget as HTMLInputElement;
    if (onChange) {
      onChange({
        ...e,
        target,
      } as React.ChangeEvent<HTMLInputElement>);
    }
  };
  const onBlur = () => {
    setIsFocused(false);
  };

  const onFocus = () => {
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
              // alwaysShowMask
              mask={getMask() || ""}
              showMask
              maskChar="*"
              value={value}
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
