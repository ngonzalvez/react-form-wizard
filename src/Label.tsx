import { FC, ReactNode } from "react";
import styles from "./Label.module.scss";
import Flex from "./Flex";

interface LabelProps {
  children: ReactNode;
  text: string;
  right?: ReactNode;
}

const Label: FC<LabelProps> = ({ text, children, right }) => {
  return (
    <label className={styles.Label}>
      <Flex justify="space-between">
        {text}
        {right}
      </Flex>
      {children}
    </label>
  );
};

export default Label;
