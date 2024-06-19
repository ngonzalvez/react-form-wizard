import { FC, useMemo } from "react";
import styles from "./Form.module.scss";
import Flex from "./Flex";
import Field, { FieldConfig } from "./Field";

interface FormProps {
  fields: Array<FieldConfig | FieldConfig[]>;
  title?: string;
  instructions?: string;
  setFieldValue: (field: string, value: string) => void | Promise<void>;
  data: Record<string, any>;
}

const Form: FC<FormProps> = ({ fields, title, instructions, data, setFieldValue }) => {
  const fieldElts = useMemo(() => {
    return fields.map((fields, rowIndex) => {
      const rowFields = Array.isArray(fields) ? fields : [fields];
      return (
        <Flex className={styles.Row} key={"row_" + rowIndex}>
          {rowFields.map((field) => (
            <Field {...field} onChange={(value: string) => setFieldValue(field.key, value)} data={data} />
          ))}
        </Flex>
      );
    });
  }, [fields, data]);

  return (
    <div className={styles.Form}>
      {title && <h1 className={styles.Title}>{title}</h1>}
      {instructions && <h3 className={styles.Instructions}>{instructions}</h3>}
      {fieldElts}
    </div>
  );
};

export default Form;