import { FC } from "react";
import classNames from "classnames";
import styles from "./Progress.module.scss";

interface ProgressProps {
  total: number;
  current: number;
}

/**
 * Discrete progress component.
 */
const Progress: FC<ProgressProps> = ({ total, current }) => {
  const components = [];

  if (total < 2) return null;

  for (let i = 0; i < total; i++) {
    if (i > 0) components.push(<div className={styles.Line} key={`step_${i + 1}_line`}></div>);
    components.push(
      <div
        className={classNames(styles.Circle, {
          [styles.current]: i === current,
          [styles.done]: i < current,
        })}
        key={`step_${i + 1}`}
      >
        {i + 1}
      </div>
    );
  }

  return <div className={styles.Progress}>{components}</div>;
};

export default Progress;
