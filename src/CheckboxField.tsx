import { FC } from "react";
import styles from "./CheckboxField.module.scss";

interface CheckboxFieldProps {
  key: string;
  options: string[];
}

/**
 * A checkbox field.
 */
const CheckboxField: FC<CheckboxFieldProps> = ({ key, options }) => {
  return (
    <div className={styles.CheckboxField}>
      {options.map((option) => (
        <label className={styles.option} key={option.key || option}>
          <input type="checkbox" className={styles.input} />
          <span className={styles.checkmark}></span>
          {option.label || option}
        </label>
      ))}
    </div>
  );
};

export default CheckboxField;
