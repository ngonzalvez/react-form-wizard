import { FC } from "react";
import styles from "./Flex.module.scss";
import classNames from "classnames";

interface FlexProps {
  children: React.ReactNode;
  className?: string;
}

const Flex: FC<FlexProps> = ({ children, className }) => {
  return <div className={classNames(styles.Flex, className)}>{children}</div>;
};

export default Flex;