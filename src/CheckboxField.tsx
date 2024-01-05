import { FC, useCallback, useState } from "react";
import styles from "./CheckboxField.module.scss";

interface CheckboxFieldProps {
  key: string;
  options: string[];
  onChange: (values: Record<string, boolean>) => any;
}

/**
 * A checkbox field.
 */
const CheckboxField: FC<CheckboxFieldProps> = ({ key, options, onChange }) => {
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
      setValues({ ...values, [e.target.name]: e.target.checked });
      onChange(values);
    },
    [onChange]
  );

  //--------------------------------------------------------------------------------------------------------------------
  //                                                   DOM STRUCTURE
  //--------------------------------------------------------------------------------------------------------------------
  return (
    <div className={styles.CheckboxField}>
      {options.map((option) => (
        <label className={styles.option} key={key + "_" + option.value}>
          <input type="checkbox" name={key} checked={option.checked} className={styles.input} onChange={handleChange} />
          <span className={styles.checkmark}></span>
          {option.label || option}
        </label>
      ))}
    </div>
  );
};

export default CheckboxField;