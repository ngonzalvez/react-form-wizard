import { FC } from "react";
import styles from "./TextField.module.scss";

interface TextFieldProps {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
}

/**
 * A text field.
 */
const TextField: FC<TextFieldProps> = ({ value, onChange, placeholder }) => {
  return <input className={styles.TextField} type="text" value={value} onChange={onChange} placeholder={placeholder} />;
};

export default TextField;
