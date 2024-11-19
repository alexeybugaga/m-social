import { FC } from "react";
import { IButton } from "./Button.props";
import styles from "./Button.module.scss";
import classNames from "classnames";

const Button: FC<IButton> = ({ className, onClick, disabled, children }) => {
  return (
    <button
      className={classNames([styles.button, className])}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
