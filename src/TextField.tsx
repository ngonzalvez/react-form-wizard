import { FC, useCallback } from "react";
import classNames from "classnames";
import styles from "./TextField.module.scss";

interface TextFieldProps {
  value: string;
  onChange: (value: string) => void | Promise<void>;
  placeholder?: string;
  className?: string;
  onBlur?: () => void | Promise<void>;
}

/**
 * A text field.
 */
const TextField: FC<TextFieldProps> = ({ value, onChange, onBlur, placeholder, className }) => {
  //--------------------------------------------------------------------------------------------------------------------
  //                                                     CALLBACKS
  //--------------------------------------------------------------------------------------------------------------------
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  //--------------------------------------------------------------------------------------------------------------------
  //                                                   DOM STRUCTURE
  //--------------------------------------------------------------------------------------------------------------------
  return (
    <input
      className={classNames(styles.TextField, className)}
      type="text"
      value={value}
      onChange={handleChange}
      onBlur={onBlur}
      placeholder={placeholder}
    />
  );
};

export default TextField;