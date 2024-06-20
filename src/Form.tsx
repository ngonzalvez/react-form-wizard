import { FC, ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import styles from "./Form.module.scss";
import Flex from "./Flex";
import Field, { FieldConfig } from "./Field";
import Button from "./Button";

type FormData = Record<string, any>;
type ErrorData = Record<string, string>;

interface FormProps {
  fields: Array<FieldConfig | FieldConfig[]>;
  title?: string;
  instructions?: string;
  onChange?: (data: FormData) => void;
  onSubmit: () => void;
  submitLabel?: string;
  buttons: ReactNode;
}

const Form: FC<FormProps> = ({ fields, title, instructions, onChange, buttons, submitLabel = "Submit", onSubmit }) => {
  const [data, setData] = useState<FormData>({});
  const [errors, setErrors] = useState<ErrorData>({});
  const [isDirtyMap, setIsDirtyMap] = useState<Record<string, boolean>>({});

  //--------------------------------------------------------------------------------------------------------------------
  //                                                 CALLBACKS
  //--------------------------------------------------------------------------------------------------------------------
  /**
   * Updates the state and validates the field value when it changes.
   * @param field - The field that changed.
   * @param value - The new value for the field.
   */
  const handleChange = (field: FieldConfig, value: string) => {
    setData((state) => ({ ...state, [field.key]: value }));
    validate(field, value);
  };

  /**
   * Set the field as dirty when it loses focus.
   * @param field - The field that lost focus.
   */
  const handleBlur = (field: FieldConfig) => {
    setIsDirtyMap((state) => ({ ...state, [field.key]: true }));
  };

  /**
   * Validates the field value.
   * @param field - The field to validate.
   * @param value - The value to validate.
   * @returns True if the field has an error, false otherwise.
   */
  const validate = useCallback((field: FieldConfig, value: string) => {
    let error = "";

    const validation = ("schema" in field && field.schema?.safeParse(value)) || { success: true };
    if ("required" in field && field.required && !value) error = "This field is required.";
    else if (value && !validation.success) error = validation.error.errors[0].message;

    setErrors((state) => ({ ...state, [field.key]: error }));
    return error;
  }, []);

  /**
   * Validates all fields and calls the onSubmit callback if there are no errors.
   */
  const handleSubmit = useCallback(() => {
    let isDirtyMap: Record<string, boolean> = {};
    let hasError = false;
    for (const field of fields.flat()) {
      if (validate(field, data[field.key])) hasError = true;
      isDirtyMap[field.key] = true;
    }
    setIsDirtyMap(isDirtyMap);
    if (!hasError) onSubmit();
  }, [data, onSubmit, validate]);

  //--------------------------------------------------------------------------------------------------------------------
  //                                                SIDE EFFECTS
  //--------------------------------------------------------------------------------------------------------------------
  /**
   * Calls the onChange callback when the data changes.
   **/
  useEffect(() => {
    onChange?.(data);
  }, [data, onChange]);

  //--------------------------------------------------------------------------------------------------------------------
  //                                                DOM RENDERING
  //--------------------------------------------------------------------------------------------------------------------
  const fieldElts = useMemo(() => {
    return fields.map((fields, rowIndex) => {
      const rowFields = Array.isArray(fields) ? fields : [fields];
      return (
        <Flex className={styles.Row} key={"row_" + rowIndex}>
          {rowFields.map((field) => (
            <Field
              key={field.key}
              config={field}
              onChange={handleChange.bind(null, field)}
              data={data}
              error={errors[field.key]}
              isDirty={isDirtyMap[field.key]}
              onBlur={handleBlur.bind(null, field)}
            />
          ))}
        </Flex>
      );
    });
  }, [fields, data, errors]);

  return (
    <div className={styles.Form}>
      {title && <h1 className={styles.Title}>{title}</h1>}
      {instructions && <h3 className={styles.Instructions}>{instructions}</h3>}
      {fieldElts}
      <footer className={styles.Footer}>
        {buttons}
        <Button onClick={handleSubmit}>{submitLabel}</Button>
      </footer>
    </div>
  );
};

export default Form;
