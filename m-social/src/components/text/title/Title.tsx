import { TitleType } from "@/types/TextTypes";
import { FC } from "react";
import { ITitle } from "@/components/text/title/Title.props";
import styles from "./Title.module.scss";

const Title: FC<ITitle> = ({ tag = TitleType.H2, children, className }) => {
  const Tag = tag as keyof JSX.IntrinsicElements;
  const classNameFinal = className
    ? `${className} ${styles.title}`
    : styles.title;

  return <Tag className={classNameFinal}>{children}</Tag>;
};

export default Title;
