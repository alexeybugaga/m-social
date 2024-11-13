import { FC } from "react";
import { IInput } from "./Input.props";
import styles from "./Input.module.scss";
import classNames from "classnames";

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
  return (
    <div className={classNames([styles.inputWrap, className || ""])}>
      <label htmlFor={name} className={styles.label}>
        <span className={styles.labelText}>{label}</span>
        <div>
          <input
            id={name}
            name={name}
            type={type ? type : "text"}
            onChange={onChange}
            value={value}
            placeholder={placeholder ? placeholder : "Введите текст..."}
            className={classNames([styles.input])}
          />
          {error && <span>{error}</span>}
        </div>
      </label>
      {descr && <p>{descr}</p>}
    </div>
  );
};

export default Input;
