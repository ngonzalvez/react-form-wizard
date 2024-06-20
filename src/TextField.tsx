import { FC, useCallback } from "react";
import classNames from "classnames";
import styles from "./TextField.module.scss";
import { ZodTypeAny } from "zod";
import { DataMap } from "./SelectField";

export interface TextInputConfig {
  key: string;
  type: "text";
  label: string;
  placeholder?: string;
  className?: string;
  required?: boolean;
  schema?: ZodTypeAny;
}

interface TextFieldProps {
  config: TextInputConfig;
  onChange: (value: string) => void | Promise<void>;
  onBlur?: () => void | Promise<void>;
  data: DataMap;
}

/**
 * A text field.
 */
const TextField: FC<TextFieldProps> = ({ data, onChange, onBlur, config }) => {
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
      className={classNames(styles.TextField, config.className)}
      type="text"
      value={data[config.key] || ""}
      onChange={handleChange}
      onBlur={onBlur}
      placeholder={config.placeholder}
    />
  );
};

export default TextField;