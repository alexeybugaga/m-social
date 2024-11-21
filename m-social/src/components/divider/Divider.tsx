import { FC } from "react";
import { IDivider } from "./Divider.props";
import styles from "./Divider.module.scss";

const Divider: FC<IDivider> = ({ color, height, marginBottom, marginTop }) => {
  return (
    <div
      className={styles.divider}
      style={{
        height: height || "1px",
        backgroundColor: color || "#E5E4E4",
        marginBottom: marginBottom || "40px",
        marginTop: marginTop || "40px",
      }}
    ></div>
  );
};

export default Divider;
