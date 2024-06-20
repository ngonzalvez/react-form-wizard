import React, { FC, useCallback, useMemo } from "react";
import styles from "./SelectField.module.scss";
import { ZodTypeAny } from "zod";

export type DataMap = Record<string, any>;

interface Option {
  value: string;
  label: string;
}

export interface SelectConfig {
  type: "select";
  key: string;
  label: string;
  className?: string;
  placeholder: string;
  options: string[] | Option[] | ((data: DataMap) => string[] | Option[]);
  dependsOn?: string;
  required?: boolean;
  schema?: ZodTypeAny;
}

interface SelectFieldProps {
  config: SelectConfig;
  onChange: (value: string) => void | Promise<void>;
  onBlur: () => void | Promise<void>;
  data: DataMap;
}

/**
 * A select field.
 */
const SelectField: FC<SelectFieldProps> = ({ onChange, data, config, onBlur }) => {
  const choices = useMemo(() => {
    const optionsData = Array.isArray(config.options) ? config.options : config.options(data);
    return optionsData.map((option) => {
      const value: string = typeof option === "object" ? option.value : option;
      const label: string = typeof option === "object" ? option.label : option;
      return (
        <option key={value} value={value}>
          {label}
        </option>
      );
    });
  }, [config.options, data[config.dependsOn || ""]]);

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
        <option>{config.placeholder}</option>
        {choices}
      </select>
    </div>
  );
};

export default SelectField;