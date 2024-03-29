import { FaMinus, FaPlus } from 'react-icons/fa';
import { Button, Field } from '@fjlaubscher/matter';

import styles from './field.module.scss';

interface Props {
  placeholder?: string;
  errorMessage?: string;
  onChange: (value: number) => void;
  label: string;
  name: string;
  value: number;
  required?: boolean;
  step?: number;
  minimum?: number;
  maximum?: number;
}

const NumberField = ({
  placeholder,
  errorMessage,
  onChange,
  label,
  name,
  value,
  required,
  step = 1,
  minimum = 0,
  maximum = -1
}: Props) => (
  <Field error={errorMessage}>
    <label htmlFor={name}>{`${label} ${!required ? '(optional)' : ''}`}</label>
    <input
      id={name}
      onChange={(e) => onChange(e.currentTarget.valueAsNumber)}
      name={name}
      type="number"
      placeholder={placeholder}
      required={required}
      value={value}
    />
    <div className={styles.buttons}>
      <Button disabled={value === minimum} onClick={() => onChange(value - step)}>
        <FaMinus />
      </Button>
      <Button disabled={value === maximum} onClick={() => onChange(value + step)}>
        <FaPlus />
      </Button>
    </div>
  </Field>
);

export default NumberField;
