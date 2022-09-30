import React from 'react';
import { useFormContext } from 'react-hook-form';

// components
import Form from '../form';
import InputField from '../field/input';
import TextAreaField from '../field/textarea';

interface Props {
  onSubmit: (values: Crusader.Player) => Promise<void>;
}

const PlayerForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useFormContext<Crusader.Player>();

  return (
    <Form id="player-form" onSubmit={handleSubmit(onSubmit)}>
      <InputField
        label="Username"
        type="text"
        placeholder="Eg. Player69"
        required
        errorMessage={errors.name ? 'Required' : undefined}
        {...register('name', { required: true })}
      />
      <TextAreaField
        label="About"
        isFullHeight
        placeholder="Use Markdown to describe yourself!"
        required
        errorMessage={errors.notes ? 'Required' : undefined}
        {...register('notes', { required: true })}
      />
    </Form>
  );
};

export default PlayerForm;