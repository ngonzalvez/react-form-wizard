import React, { FC, useCallback, useMemo } from "react";
import styles from "./SelectField.module.scss";

export interface SelectFieldProps {
  options: string[] | Array<{ value: string; label: string }> | Function;
  placeholder: string;
  onChange: (value: string) => void | Promise<void>;
  dependsOn?: string;
  data: Record<string, any>;
}

/**
 * A select field.
 */
const SelectField: FC<SelectFieldProps> = ({ options, placeholder, onChange, data, dependsOn }) => {
  const choices = useMemo(() => {
    const optionsData = Array.isArray(options) ? options : options(data);
    return optionsData.map((option) => (
      <option key={option.value || option} value={option.value || option}>
        {option.label || option}
      </option>
    ));
  }, [options, data[dependsOn || ""]]);

  //--------------------------------------------------------------------------------------------------------------------
  //                                                     CALLBACKS
  //--------------------------------------------------------------------------------------------------------------------
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  //--------------------------------------------------------------------------------------------------------------------
  //                                                   DOM STRUCTURE
  //--------------------------------------------------------------------------------------------------------------------
  return (
    <div className={styles.wrapper}>
      <select onChange={handleChange} className={styles.select} key={name}>
        <option value="">{placeholder}</option>
        {choices}
      </select>
    </div>
  );
};

export default SelectField;
