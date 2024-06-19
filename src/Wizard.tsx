import { FC, useState, useMemo, useCallback } from "react";
import Progress from "./Progress";
import styles from "./Wizard.module.scss";
import Form from "./Form";
import { FieldProps } from "./Field";

export interface WizardStep {
  title?: string;
  instructions?: string;
  fields: Array<FieldProps | FieldProps[]>;
}

interface WizardProps {
  submitLabel?: string;
  steps: WizardStep[];
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
  const setFieldValue = (field: string, value: any) => {
    const newData = { ...data, [field]: value };

    setData(newData);
    onChange?.(newData);
  };

  //--------------------------------------------------------------------------------------------------------------------
  //                                                   DOM STRUCTURE
  //--------------------------------------------------------------------------------------------------------------------
  const footer = useMemo(() => {
    return (
      <footer className={styles.Footer}>
        {currentStepIdx > 0 && (
          <button className={styles.Button} onClick={goToPreviousStep}>
            Previous
          </button>
        )}
        {currentStepIdx < steps.length - 1 && (
          <button className={styles.Button} onClick={goToNextStep}>
            Next
          </button>
        )}
        {currentStepIdx === steps.length - 1 && (
          <button className={styles.Button} onClick={submit}>
            {submitLabel || "Submit"}
          </button>
        )}
      </footer>
    );
  }, [currentStepIdx, steps.length]);

  return (
    <div className={styles.Wizard}>
      <Progress total={steps.length} current={currentStepIdx} />
      <Form
        title={step.title}
        instructions={step.instructions}
        fields={step.fields}
        setFieldValue={setFieldValue}
        data={data}
      />
      {footer}
    </div>
  );
};

export default Wizard;
