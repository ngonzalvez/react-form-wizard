import React, { FC, useState, useMemo, useCallback } from "react";
import classNames from "classnames";
import SelectField from "./SelectField";
import TextField from "./TextField";
import CheckboxField from "./CheckboxField";
import Label from "./Label";
import styles from "./Wizard.module.scss";

const typeToComponentdMap = {
  select: SelectField,
  text: TextField,
  checkbox: CheckboxField,
};

interface WizardProps {
  title: string;
  submitLabel?: string;
  steps: Array<{
    title: string;
    fields: Array<{
      key: string;
      type: string;
      label: string;
      value?: any;
      onChange?: React.ChangeEventHandler<any>;
    }>;
  }>;
}

/**
 * Creates a wizard with the given steps.
 */
const Wizard: FC<WizardProps> = ({ title, steps, submitLabel }) => {
  //--------------------------------------------------------------------------------------------------------------------
  //                                                       STATE
  //--------------------------------------------------------------------------------------------------------------------
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const { title: stepTitle, fields: fieldsData } = useMemo(() => steps[currentStepIdx], [steps, currentStepIdx]);

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
    console.log("Form submitted");
  }, []);

  //--------------------------------------------------------------------------------------------------------------------
  //                                                   DOM STRUCTURE
  //--------------------------------------------------------------------------------------------------------------------
  const progress = useMemo(
    () => (
      <div className={styles.progress}>
        {steps.map((step, i) => (
          <>
            {i > 0 && <div className={styles.line} key={`step_${i + 1}_line`}></div>}
            <div
              className={classNames(styles.circle, {
                [styles.current]: i === currentStepIdx,
                [styles.done]: i < currentStepIdx,
              })}
              key={`step_${i + 1}`}
              title={step.title}
            >
              {i + 1}
            </div>
          </>
        ))}
      </div>
    ),
    [steps, currentStepIdx]
  );

  const fields = useMemo(() => {
    return steps[currentStepIdx].fields.map(({ label, ...field }) => {
      const Component = typeToComponentdMap[field.type];
      return (
        <>
          <Label>{label}</Label>
          <Component {...field} />
        </>
      );
    });
  }, [fieldsData]);

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
      {progress}
      {title && <h1 className={styles.title}>{title}</h1>}
      {stepTitle && <h3 className={styles.stepTitle}>{stepTitle}</h3>}
      {fields}
      {footer}
    </div>
  );
};

export default Wizard;
