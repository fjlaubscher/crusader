import React from 'react';
import { FormControl, FormLabel, Select, useColorModeValue } from '@chakra-ui/react';

interface Props {
  label: string;
  options: Crusader.ListItem[];
  onChange: (value: number) => void;
  value: number;
}

const SelectField = ({ label, value, options, onChange }: Props) => {
  const background = useColorModeValue('white', 'gray.900');
  return (
    <FormControl mb="2">
      <FormLabel>{label}</FormLabel>
      <Select
        background={background}
        placeholder="Select an option"
        value={value}
        onChange={(e) => {
          onChange(parseInt(e.currentTarget.value));
        }}
      >
        {options.map((o, i) => (
          <option key={`option-${i}`} value={`${o.id}`}>
            {o.name}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectField;
