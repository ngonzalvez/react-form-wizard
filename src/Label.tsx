import { FC, ReactNode } from "react";
import styles from "./Label.module.scss";

interface LabelProps {
  children: ReactNode;
  text: string;
}

const Label: FC<LabelProps> = ({ text, children }) => {
  return (
    <div className={styles.Container}>
      <label className={styles.Label}>{text}</label>
      {children}
    </div>
  );
};

export default Label;