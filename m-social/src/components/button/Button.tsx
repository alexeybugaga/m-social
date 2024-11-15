import { FC } from "react";
import { IButton } from "./Button.props";
import styles from "./Button.module.scss";

const Button: FC<IButton> = ({ text, className, onClick, disabled }) => {
  return (
    <button className={styles.button} disabled={disabled}>
      {text}
    </button>
  );
};

export default Button;
