import React from 'react';

// components
import Field from '.';

interface Props {
  label: string;
  options: Crusader.ListItem[];
  onChange: (value: number) => void;
  name: string;
  value: number;
}

const SelectField = ({ label, name, value, options, onChange }: Props) => (
  <Field>
    <label htmlFor={name}>{label}</label>
    <select
      id={name}
      placeholder="Select an option"
      value={value}
      onChange={(e) => {
        onChange(parseInt(e.currentTarget.value));
      }}
    >
      <option>Select an option</option>
      {options.map((o, i) => (
        <option key={`option-${i}`} value={`${o.id}`}>
          {o.name}
        </option>
      ))}
    </select>
  </Field>
);

export default SelectField;
