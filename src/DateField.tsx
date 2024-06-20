import { FC, useCallback } from "react";
import classNames from "classnames";
import styles from "./DateField.module.scss";
import { ZodTypeAny } from "zod";
import { DataMap } from "./SelectField";

export interface DateInputConfig {
  key: string;
  label: string;
  type: "date";
  className?: string;
  placeholder?: string;
  required?: boolean;
  schema?: ZodTypeAny;
}

interface DateFieldProps {
  config: DateInputConfig;
  onChange: (value: string) => void | Promise<void>;
  onBlur?: () => void | Promise<void>;
  data: DataMap;
}

/**
 * A date picker component.
 */
const DateField: FC<DateFieldProps> = ({ config, data, onChange, onBlur }) => {
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
      className={classNames(styles.DateField, config.className)}
      type="date"
      value={data[config.key]}
      onChange={handleChange}
      onBlur={onBlur}
    />
  );
};

export default DateField;
