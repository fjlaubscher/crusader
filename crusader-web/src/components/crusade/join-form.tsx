import React from 'react';
import { useFormContext, useController } from 'react-hook-form';
import { useRecoilValue } from 'recoil';

// components
import InputField from '../field/input';
import SelectField from '../field/select';

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
    <form
      id="join-crusade-form"
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <SelectField
        options={factions}
        label="Faction"
        value={factionField.value}
        onChange={factionField.onChange}
      />
      <InputField
        label="Username"
        type="text"
        placeholder="Your username"
        isRequired
        errorMessage={errors.player ? 'Required' : undefined}
        {...register('player', { required: true, validate: (value) => value.length > 6 })}
      />
      <InputField
        label="Name"
        type="text"
        placeholder="Eg. Crusaders"
        isRequired
        errorMessage={errors.name ? 'Required' : undefined}
        {...register('name', { required: true })}
      />
    </form>
  );
};

export default JoinCrusadeForm;
