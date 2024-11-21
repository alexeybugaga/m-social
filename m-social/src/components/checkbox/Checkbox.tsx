import { FC } from "react";
import { ICheckbox } from "./Checkbox.props";
import styles from "./Checkbox.module.scss";
import classNames from "classnames";

const Checkbox: FC<ICheckbox> = ({
  label,
  value,
  onChange,
  required,
  className,
  error,
  name,
  agreementText,
}) => {
  return (
    <div className={classNames([styles.checkboxWrap, className || ""])}>
      <label htmlFor={name}>
        <span className={styles.labelText}>
          {label}
          {required && <span className={styles.labelTextRequired}>*</span>}
        </span>
        <div className={styles.checkboxAndAgreement}>
          <span
            className={classNames(styles.checkboxContent, {
              [styles.error]: error,
            })}
          >
            <input
              type={"checkbox"}
              id={name}
              name={name}
              checked={value}
              onChange={onChange}
              className={styles.checkboxInput}
            />
            <span className={styles.customCheckbox}>
              <svg
                width="8"
                height="7"
                viewBox="0 0 8 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.5 2.5L0.5 3.5L3.5 6.5L7.5 1.5L6 0L3.5 4.5L1.5 2.5Z"
                  fill="currentColor"
                />
              </svg>
            </span>
          </span>
          <p className={styles.agreementText}>{agreementText}</p>
        </div>
      </label>
    </div>
  );
};

export default Checkbox;
