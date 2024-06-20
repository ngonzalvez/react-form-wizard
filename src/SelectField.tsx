import React, { FC, useCallback, useMemo } from "react";
import styles from "./SelectField.module.scss";
import { getKey } from "./utils";

type DataMap = Record<string, any>;
interface Option {
  value: string;
  label: string;
}

export interface SelectFieldProps {
  options: string[] | Option[] | ((data: DataMap) => string[] | Option[]);
  placeholder: string;
  onChange: (value: string) => void | Promise<void>;
  onBlur: () => void | Promise<void>;
  dependsOn?: string;
  data: DataMap;
}

/**
 * A select field.
 */
const SelectField: FC<SelectFieldProps> = ({ options, placeholder, onChange, data, dependsOn, onBlur }) => {
  const choices = useMemo(() => {
    const optionsData = Array.isArray(options) ? options : options(data);
    return optionsData.map((option) => {
      const value: string = typeof option === "object" ? option.value : option;
      const label: string = typeof option === "object" ? option.label : option;
      return (
        <option key={value} value={value}>
          {label}
        </option>
      );
    });
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
      <select onChange={handleChange} className={styles.select} onBlur={onBlur}>
        <option value="">{placeholder}</option>
        {choices}
      </select>
    </div>
  );
};

export default SelectField;
