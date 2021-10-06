import React, { useState } from 'react';
import { Button, Input, InputGroup, InputRightElement, useColorModeValue } from '@chakra-ui/react';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const Search = ({ value, onChange }: Props) => {
  const background = useColorModeValue('white', 'gray.900');
  return (
    <InputGroup mt="0 !important">
      <Input
        background={background}
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
        pr="4.5rem"
        name="search"
        type="text"
        placeholder="Search"
      />
      {!!value && (
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={() => onChange('')}>
            Clear
          </Button>
        </InputRightElement>
      )}
    </InputGroup>
  );
};

export default Search;