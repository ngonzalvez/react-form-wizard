import { FC, useMemo } from "react";
import SelectField, { SelectConfig } from "./SelectField";
import TextField, { TextInputConfig } from "./TextField";
import CheckboxField, { CheckboxConfig } from "./CheckboxField";
import DateField, { DateInputConfig } from "./DateField";
import Label from "./Label";
import Image, { ImageConfig } from "./Image";

import styles from "./Field.module.scss";
import classNames from "classnames";

export type FieldConfig = DateInputConfig | SelectConfig | TextInputConfig | CheckboxConfig | ImageConfig;

interface FieldProps {
  config: FieldConfig;
  isDirty?: boolean;
  error?: string;
  data: Record<string, any>;
  onBlur?: () => void;
  onChange?: (value: any) => void;
}

const typeToComponentMap = {
  select: SelectField,
  text: TextField,
  checkbox: CheckboxField,
  date: DateField,
  image: Image,
};

const Field: FC<FieldProps> = ({ config, onChange, onBlur, isDirty, data, error }) => {
  const Component = typeToComponentMap[config.type] as any;
  const errorMessage = useMemo(() => {
    if (!error || !isDirty) return null;
    return (
      <span className={styles.Error} title={error}>
        {error}
      </span>
    );
  }, [error, isDirty]);

  return (
    <Label text={config.label || ""} right={errorMessage}>
      <Component
        data={data}
        onChange={onChange}
        config={config}
        className={classNames(styles.Field, config.className, { [styles.error]: Boolean(error) })}
        onBlur={onBlur}
      />
    </Label>
  );
};

export default Field;