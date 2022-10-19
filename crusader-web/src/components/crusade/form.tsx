import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Form, InputField, TextAreaField } from '@fjlaubscher/matter';

interface Props {
  onSubmit: (values: Crusader.Crusade) => Promise<void>;
}

const CrusadeForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useFormContext<Crusader.Crusade>();

  return (
    <Form id="crusade-form" onSubmit={handleSubmit(onSubmit)}>
      <InputField
        label="Name"
        type="text"
        placeholder="Eg. My FLGS Crusade"
        required
        errorMessage={errors.name ? 'Required' : undefined}
        {...register('name', { required: true })}
      />
      <TextAreaField
        label="Description"
        isFullHeight
        placeholder="Use Markdown to describe your Crusade!"
        required
        errorMessage={errors.notes ? 'Required' : undefined}
        {...register('notes', { required: true })}
      />
    </Form>
  );
};

export default CrusadeForm;
