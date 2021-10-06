import React from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import { useFormContext, useController } from 'react-hook-form';
import { useRecoilValue } from 'recoil';

// components
import InputField from '../field/input';
import SelectField from '../field/select';
import TextAreaField from '../field/textarea';

// state
import { FactionAtom } from '../../state/config';

interface Props {
  isCompact?: boolean;
  onSubmit: (values: Crusader.OrderOfBattle) => Promise<void>;
}

const OrderOfBattleForm = ({ isCompact, onSubmit }: Props) => {
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
        type="text"
        placeholder="Eg. Crusaders"
        {...register('name', { required: true })}
      />
      {!isCompact && (
        <SimpleGrid columns={2} columnGap={4}>
          <InputField
            label="Supply Limit"
            type="number"
            {...register('supplyLimit', { required: true, valueAsNumber: true })}
          />
          <InputField
            label="Requisition"
            type="number"
            {...register('requisition', { required: true, valueAsNumber: true })}
          />
          <InputField
            label="Battle Tally"
            type="number"
            {...register('battles', { required: true, valueAsNumber: true })}
          />
          <InputField
            label="Battles Won"
            type="number"
            {...register('battlesWon', { required: true, valueAsNumber: true })}
          />
        </SimpleGrid>
      )}
      <TextAreaField
        label="Notes"
        isFullHeight
        placeholder="Use Markdown to add some fluff to your Order of Battle!"
        {...register('notes', { required: false })}
      />
    </form>
  );
};

export default OrderOfBattleForm;
