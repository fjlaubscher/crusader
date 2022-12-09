import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Form, InputField, TextAreaField } from '@fjlaubscher/matter';

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
        label="Avatar"
        type="url"
        placeholder="https://example.com/image.jpg"
        {...register('avatar')}
      />
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
        {...register('notes', { required: false })}
      />
    </Form>
  );
};

export default PlayerForm;
