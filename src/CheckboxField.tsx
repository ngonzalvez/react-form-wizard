import { FC, useCallback, useState } from "react";
import styles from "./CheckboxField.module.scss";

interface CheckboxFieldProps {
  name: string;
  options: string[] | Array<{ value: string; label: string }>;
  onChange: (values: Record<string, boolean>) => any;
}

/**
 * A checkbox field.
 */
const CheckboxField: FC<CheckboxFieldProps> = ({ name, options, onChange }) => {
  //--------------------------------------------------------------------------------------------------------------------
  //                                                       STATE
  //--------------------------------------------------------------------------------------------------------------------
  const [values, setValues] = useState(
    options.reduce((values, option) => ({ ...values, [option.value]: !!option.checked }), {})
  );

  //--------------------------------------------------------------------------------------------------------------------
  //                                                     CALLBACKS
  //--------------------------------------------------------------------------------------------------------------------
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = { ...values, [e.target.name]: e.target.checked };
      setValues(newValue);
      onChange(newValue);
      console.log("Handle checkbox change", newValue);
    },
    [onChange]
  );

  //--------------------------------------------------------------------------------------------------------------------
  //                                                   DOM STRUCTURE
  //--------------------------------------------------------------------------------------------------------------------
  return (
    <div className={styles.CheckboxField}>
      {options.map((option) => (
        <label className={styles.option} key={name + "_" + option.value}>
          <input
            type="checkbox"
            name={option.value}
            checked={option.checked}
            className={styles.input}
            onChange={handleChange}
          />
          <span className={styles.checkmark}></span>
          {option.label || option}
        </label>
      ))}
    </div>
  );
};

export default CheckboxField;