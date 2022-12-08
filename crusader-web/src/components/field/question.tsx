import React from 'react';
import classnames from 'classnames';
import { Button, Field } from '@fjlaubscher/matter';

import styles from './field.module.scss';

interface Props {
  placeholder?: string;
  errorMessage?: string;
  onChange: (value: boolean) => void;
  label: string;
  name: string;
  value?: boolean;
}

const QuestionField: React.FC<Props> = ({ errorMessage, onChange, label, name, value }) => (
  <Field error={errorMessage}>
    <label htmlFor={name}>{label}</label>
    <div className={classnames(styles.buttons, styles.yesNo)}>
      <Button
        className={value !== true ? styles.button : undefined}
        variant={value === true ? 'success' : undefined}
        onClick={() => onChange(true)}
      >
        Yes
      </Button>
      <Button
        className={value !== false ? styles.button : undefined}
        variant={value === false ? 'error' : undefined}
        onClick={() => onChange(false)}
      >
        No
      </Button>
    </div>
  </Field>
);

export default QuestionField;
