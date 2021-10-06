import React, { forwardRef } from 'react';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Textarea,
  useColorModeValue
} from '@chakra-ui/react';

interface Props {
  label: string;
  name?: string;
  placeholder?: string;
  isFullHeight?: boolean;
  isRequired?: boolean;
  errorMessage?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
}

const TextAreaField = forwardRef<HTMLTextAreaElement, Props>(
  ({ label, name, placeholder, isFullHeight, isRequired, errorMessage, onChange }, ref) => {
    const background = useColorModeValue('white', 'gray.900');
    return (
      <FormControl
        display="flex"
        flexDirection="column"
        height={isFullHeight ? '100%' : undefined}
        mb="2"
        id={name}
        isRequired={isRequired || false}
        isInvalid={!!errorMessage}
      >
        <FormLabel>{label}</FormLabel>
        <Textarea
          flex={isFullHeight ? 1 : undefined}
          background={background}
          resize="vertical"
          onChange={onChange}
          name={name}
          ref={ref as React.ForwardedRef<HTMLTextAreaElement>}
          placeholder={placeholder}
        />
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
      </FormControl>
    );
  }
);

export default TextAreaField;
