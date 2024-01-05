import { FC, useCallback } from "react";
import styles from "./SelectField.module.scss";

export interface SelectFieldProps {
  options: string[] | Array<{ value: string; label: string }>;
  placeholder: string;
  onChange: React.ChangeEventHandler<any>;
}

/**
 * A select field.
 */
const SelectField: FC<SelectFieldProps> = ({ options, placeholder, onChange }) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  return (
    <div className={styles.wrapper}>
      <select onChange={handleChange} className={styles.select}>
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value || option} value={option.value || option}>
            {option.label || option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;