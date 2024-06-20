import { FC } from "react";
import styles from "./Flex.module.scss";
import classNames from "classnames";

interface FlexProps {
  children: React.ReactNode;
  className?: string;
  justify?: "center" | "flex-start" | "flex-end" | "space-between" | "space-around" | "space-evenly";
  align?: "center" | "flex-start" | "flex-end" | "stretch" | "baseline";
  vertical?: boolean;
}

const Flex: FC<FlexProps> = ({ children, className, justify, align, vertical }) => {
  return (
    <div
      className={classNames(styles.Flex, className)}
      style={{
        justifyContent: justify,
        alignItems: align,
        flexDirection: vertical ? "column" : "row",
      }}
    >
      {children}
    </div>
  );
};

export default Flex;
