import { FC } from "react";
import SelectField from "./SelectField";
import TextField from "./TextField";
import CheckboxField from "./CheckboxField";
import DateField from "./DateField";
import Label from "./Label";

interface Option {
  value: string;
  label: string;
}

export interface FieldConfig {
  key: string;
  type: "select" | "text" | "checkboxes" | "date";
  data: Record<string, any>;
  label: string;
  value?: any;
  onChange?: (value: any) => void;
  placeholder?: string;
  options?: Array<Option> | ((data: Record<string, any>) => Array<Option>);
  dependsOn?: string;
  className?: string;
}

interface FieldProps extends Exclude<FieldConfig, "key"> {}

const typeToComponentMap = {
  select: SelectField,
  text: TextField,
  checkboxes: CheckboxField,
  date: DateField,
};

const Field: FC<FieldProps> = ({ type, label, value, onChange, className, placeholder, options, dependsOn, data }) => {
  const Component = typeToComponentMap[type] as any;
  return (
    <Label text={label}>
      <Component
        data={data}
        onChange={onChange}
        value={value}
        className={className}
        placeholder={placeholder}
        options={options}
        dependsOn={dependsOn}
      />
    </Label>
  );
};

export default Field;
