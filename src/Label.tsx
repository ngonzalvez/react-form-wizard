import { FC, ReactNode } from "react";
import styles from "./Label.module.scss";

interface LabelProps {
  children: ReactNode;
}

const Label: FC<LabelProps> = ({ children }) => {
  return <label className={styles.Label}>{children}</label>;
};

export default Label;
