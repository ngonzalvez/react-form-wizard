import { FC, useState, useMemo, useCallback } from "react";
import Progress from "./Progress";
import styles from "./Wizard.module.scss";
import Form from "./Form";
import { FieldProps } from "./Field";
import Button from "./Button";

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

  const handleChange = useCallback(
    (stepData: Record<string, any>) => {
      setData((data) => ({ ...data, [step.key]: stepData }));
    },
    [step]
  );

  //--------------------------------------------------------------------------------------------------------------------
  //                                                   DOM STRUCTURE
  //--------------------------------------------------------------------------------------------------------------------
  const additionalButtons = currentStepIdx > 0 ? <Button onClick={goToPreviousStep}>Previous</Button> : null;
  const isLastStep = currentStepIdx === steps.length - 1;
  const buttonLabel = isLastStep ? "Submit" : "Next";
  const buttonAction = isLastStep ? submit : goToNextStep;

  return (
    <div className={styles.Wizard}>
      <Progress total={steps.length} current={currentStepIdx} />
      <Form
        title={step.title}
        instructions={step.instructions}
        fields={step.fields}
        onChange={handleChange}
        submitLabel={buttonLabel}
        onSubmit={buttonAction}
        buttons={additionalButtons}
      />
    </div>
  );
};

export default Wizard;
