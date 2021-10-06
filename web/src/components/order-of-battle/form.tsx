import React from 'react';
import { useFormContext, useController } from 'react-hook-form';
import { useRecoilValue } from 'recoil';

// components
import InputField from '../field/input';
import SelectField from '../field/select';
import TextAreaField from '../field/textarea';

// state
import { FactionAtom } from '../../state/config';

interface Props {
  onSubmit: (values: Crusader.OrderOfBattle) => Promise<void>;
}

const OrderOfBattleForm = ({ onSubmit }: Props) => {
  const factions = useRecoilValue(FactionAtom);

  const { control, register, handleSubmit } = useFormContext<Crusader.OrderOfBattle>();

  const { field: factionField } = useController({
    control,
    name: 'factionId',
    defaultValue: 0
  });

  return (
    <form
      id="order-of-battle-form"
      style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <SelectField
        options={factions}
        label="Faction"
        value={factionField.value}
        onChange={factionField.onChange}
      />
      <InputField
        label="Name"
        type="input"
        placeholder="Eg. Crusaders"
        {...register('name', { required: true })}
      />
      <TextAreaField
        label="Notes"
        placeholder="Use Markdown to add some fluff to your Order of Battle!"
        {...register('notes', { required: false })}
      />
    </form>
  );
};

export default OrderOfBattleForm;
