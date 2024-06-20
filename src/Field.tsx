import { FC, useMemo } from "react";
import SelectField from "./SelectField";
import TextField from "./TextField";
import CheckboxField from "./CheckboxField";
import DateField from "./DateField";
import Label from "./Label";

import styles from "./Field.module.scss";
import { ZodTypeAny } from "zod";
import classNames from "classnames";

interface Option {
  value: string;
  label: string;
}

export interface FieldConfig {
  key: string;
  type: "select" | "text" | "checkboxes" | "date";
  label: string;
  value?: string | number | boolean | Date | Array<string> | null;
  placeholder?: string;
  options?: Array<Option> | ((data: Record<string, any>) => Array<Option>);
  dependsOn?: string;
  className?: string;
  required?: boolean;
  schema?: ZodTypeAny;
}

interface FieldProps extends Exclude<FieldConfig, "key"> {
  isDirty?: boolean;
  error?: string;
  data: Record<string, any>;
  onBlur?: () => void;
  onChange?: (value: any) => void;
}

const typeToComponentMap = {
  select: SelectField,
  text: TextField,
  checkboxes: CheckboxField,
  date: DateField,
};

const Field: FC<FieldProps> = ({
  type,
  label,
  value,
  onChange,
  onBlur,
  className,
  placeholder,
  isDirty,
  options,
  dependsOn,
  data,
  error,
}) => {
  const Component = typeToComponentMap[type] as any;
  const errorMessage = useMemo(() => {
    if (!error || !isDirty) return null;
    return (
      <span className={styles.Error} title={error}>
        {error}
      </span>
    );
  }, [error, isDirty]);

  return (
    <Label text={label} right={errorMessage}>
      <Component
        data={data}
        onChange={onChange}
        value={value}
        className={classNames(styles.Field, className, { [styles.error]: Boolean(error) })}
        placeholder={placeholder}
        onBlur={onBlur}
        options={options}
        dependsOn={dependsOn}
      />
    </Label>
  );
};

export default Field;