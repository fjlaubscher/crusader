import React from 'react';
import { useFormContext, useController } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import { Form, InputField, SelectField } from '@fjlaubscher/matter';

// state
import { FactionAtom } from '../../state/config';

interface Props {
  onSubmit: (values: Crusader.OrderOfBattle) => Promise<void>;
}

const JoinCrusadeForm = ({ onSubmit }: Props) => {
  const factions = useRecoilValue(FactionAtom);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors }
  } = useFormContext<Crusader.OrderOfBattle>();

  const { field: factionField } = useController({
    control,
    name: 'factionId'
  });

  return (
    <Form id="join-crusade-form" onSubmit={handleSubmit(onSubmit)}>
      <SelectField
        name="faction"
        options={factions.map((f) => ({ value: f.id, description: f.name }))}
        label="Faction"
        value={factionField.value}
        onChange={factionField.onChange}
      />
      <InputField
        label="Username"
        type="text"
        placeholder="Your username"
        errorMessage={errors.player ? 'Required' : undefined}
        required
        {...register('player', { required: true, validate: (value) => value.length > 6 })}
      />
      <InputField
        label="Order of Battle"
        type="text"
        placeholder="Eg. The Sons of Gulliman"
        required
        errorMessage={errors.name ? 'Required' : undefined}
        {...register('name', { required: true })}
      />
    </Form>
  );
};

export default JoinCrusadeForm;
