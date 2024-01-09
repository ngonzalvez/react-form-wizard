import { FC, ReactNode } from "react";
import styles from "./Label.module.scss";

interface LabelProps {
  children: ReactNode;
  text: string;
}

const Label: FC<LabelProps> = ({ text, children }) => {
  return (
    <label className={styles.Label}>
      {text}
      {children}
    </label>
  );
};

export default Label;
