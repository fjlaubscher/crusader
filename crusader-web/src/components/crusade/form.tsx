import React from 'react';
import { useFormContext } from 'react-hook-form';

// components
import Form from '../form';
import InputField from '../field/input';
import TextAreaField from '../field/textarea';

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
