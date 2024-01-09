import React, { FC, useState, useMemo, useCallback, useEffect } from "react";
import classNames from "classnames";
import SelectField from "./SelectField";
import TextField from "./TextField";
import CheckboxField from "./CheckboxField";
import DateField from "./DateField";
import Label from "./Label";
import Progress from "./Progress";
import Flex from "./Flex";
import styles from "./Wizard.module.scss";

const typeToComponentMap = {
  select: SelectField,
  text: TextField,
  checkboxes: CheckboxField,
  date: DateField,
};

interface Field {
  key: string;
  type: string;
  label: string;
  value?: any;
  onChange?: (value: any) => void;
  className?: string;
}

interface Step {
  title: string;
  instructions?: string;
  fields: Array<Field | Field[]>;
}

interface WizardProps {
  submitLabel?: string;
  steps: Step[];
  onChange?: (data: Record<string, any>) => void | Promise<void>;
  onSubmit?: (data: Record<string, any>) => void | Promise<void>;
}

/**
 * Creates a wizard with the given steps.
 */
const Wizard: FC<WizardProps> = ({ steps, submitLabel, onChange, onSubmit }) => {
  //--------------------------------------------------------------------------------------------------------------------
  //                                                       STATE
  //--------------------------------------------------------------------------------------------------------------------
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const step = useMemo(() => steps[currentStepIdx], [steps, currentStepIdx]);
  const [data, setData] = useState({});

  //--------------------------------------------------------------------------------------------------------------------
  //                                                     CALLBACKS
  //--------------------------------------------------------------------------------------------------------------------
  /**
   * Navigates to the previous step.
   */
  const goToPreviousStep = useCallback(() => {
    if (currentStepIdx > 0) setCurrentStepIdx(currentStepIdx - 1);
  }, [currentStepIdx]);

  /**
   * Navigates to the next step.
   */
  const goToNextStep = useCallback(() => {
    if (currentStepIdx < steps.length - 1) setCurrentStepIdx(currentStepIdx + 1);
  }, [currentStepIdx, steps.length]);

  /**
   * Submits the form.
   */
  const submit = useCallback(() => {
    onSubmit?.(data);
  }, [onSubmit, data]);

  /**
   * Sets the value of a field.
   */
  const setFieldValue = (field: Field, value: any) => {
    const newData = { ...data, [field.key]: value };

    setData(newData);
    onChange?.(newData);
  };

  //--------------------------------------------------------------------------------------------------------------------
  //                                                   DOM STRUCTURE
  //--------------------------------------------------------------------------------------------------------------------
  const fields = useMemo(() => {
    return steps[currentStepIdx].fields.map((fields, rowIndex) => {
      const rowFields = Array.isArray(fields) ? fields : [fields];
      return (
        <Flex className={styles.row} key={"row_" + rowIndex}>
          {rowFields.map((field) => {
            const Component = typeToComponentMap[field.type];
            return (
              <Label text={field.label} key={field.key + "_label"}>
                <Component {...field} onChange={(value) => setFieldValue(field, value)} data={data} />
              </Label>
            );
          })}
        </Flex>
      );
    });
  }, [step.fields, data]);

  const footer = useMemo(() => {
    return (
      <footer className={styles.footer}>
        {currentStepIdx > 0 && (
          <button className={styles.button} onClick={goToPreviousStep}>
            Previous
          </button>
        )}
        {currentStepIdx < steps.length - 1 && (
          <button className={styles.button} onClick={goToNextStep}>
            Next
          </button>
        )}
        {currentStepIdx === steps.length - 1 && (
          <button className={styles.button} onClick={submit}>
            {submitLabel || "Submit"}
          </button>
        )}
      </footer>
    );
  }, [currentStepIdx, steps.length]);

  return (
    <div className={styles.Wizard}>
      <Progress total={steps.length} current={currentStepIdx} />
      {step.title && <h1 className={styles.title}>{step.title}</h1>}
      {step.instructions && <h3 className={styles.instructions}>{step.instructions}</h3>}
      {fields}
      {footer}
    </div>
  );
};

export default Wizard;