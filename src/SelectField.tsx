import { FC } from "react";
import styles from "./SelectField.module.scss";

export interface SelectFieldProps {
  options: string[];
  placeholder: string;
  onChange: React.ChangeEventHandler<any>;
}

/**
 * A select field.
 */
const SelectField: FC<SelectFieldProps> = ({ options, placeholder, onChange }) => {
  return (
    <div className={styles.wrapper}>
      <select onChange={onChange} className={styles.select}>
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;