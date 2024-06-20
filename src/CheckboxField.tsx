import { FC, useCallback, useState } from "react";
import styles from "./CheckboxField.module.scss";
import { ZodTypeAny } from "zod";

interface Option {
  value: string;
  label: string;
  checked?: boolean;
}

export interface CheckboxConfig {
  type: "checkbox";
  key: string;
  label: string;
  options: Option[];
  placeholder?: string;
  required?: boolean;
  schema?: ZodTypeAny;
  className?: string;
}

interface CheckboxFieldProps {
  config: CheckboxConfig;
  onChange: (values: Record<string, boolean>) => any;
  onBlur?: () => void | Promise<void>;
}

/**
 * A checkbox field.
 */
const CheckboxField: FC<CheckboxFieldProps> = ({ config, onChange, onBlur }) => {
  //--------------------------------------------------------------------------------------------------------------------
  //                                                       STATE
  //--------------------------------------------------------------------------------------------------------------------
  const [values, setValues] = useState(
    config.options.reduce(
      (values, option) => ({
        ...values,
        [typeof option === "string" ? option : option.value]: typeof option === "string" ? false : !!option.checked,
      }),
      {}
    )
  );

  //--------------------------------------------------------------------------------------------------------------------
  //                                                     CALLBACKS
  //--------------------------------------------------------------------------------------------------------------------
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = { ...values, [e.target.name]: e.target.checked };
      setValues(newValue);
      onChange(newValue);
      onBlur?.();
    },
    [onChange]
  );

  //--------------------------------------------------------------------------------------------------------------------
  //                                                   DOM STRUCTURE
  //--------------------------------------------------------------------------------------------------------------------
  return (
    <div className={styles.CheckboxField}>
      {config.options.map((option) => (
        <label className={styles.option} key={option.value}>
          <input
            type="checkbox"
            name={option.value}
            checked={option.checked}
            className={styles.input}
            onChange={handleChange}
          />
          <span className={styles.checkmark}></span>
          {option.label}
        </label>
      ))}
    </div>
  );
};

export default CheckboxField;