import { FC, ReactNode } from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  onClick: () => void;
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({ children, className, onClick, disabled }) => {
  return (
    <button className={styles.Button} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
