import React from 'react';
import { useFormContext } from 'react-hook-form';

// components
import InputField from '../field/input';
import TextAreaField from '../field/textarea';

interface Props {
  onSubmit: (values: Crusader.Crusade) => Promise<void>;
}

const CrusadeForm = ({ onSubmit }: Props) => {
  const { register, handleSubmit } = useFormContext<Crusader.Crusade>();

  return (
    <form
      id="crusade-form"
      style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputField
        label="Name"
        type="input"
        placeholder="Eg. My FLGS Crusade"
        {...register('name', { required: true })}
      />
      <TextAreaField
        label="Notes"
        isFullHeight
        placeholder="Use Markdown to describe your crusade!"
        {...register('notes', { required: false })}
      />
    </form>
  );
};

export default CrusadeForm;
