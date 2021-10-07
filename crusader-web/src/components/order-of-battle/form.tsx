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
        isRequired
        errorMessage={errors.name ? 'Required' : undefined}
        {...register('name', { required: true })}
      />
      {!isCompact && (
        <SimpleGrid columns={2} columnGap={4}>
          <InputField
            label="Supply Limit"
            type="tel"
            isRequired
            errorMessage={errors.supplyLimit ? 'Required' : undefined}
            {...register('supplyLimit', { required: true, valueAsNumber: true })}
          />
          <InputField
            label="Requisition"
            type="tel"
            isRequired
            errorMessage={errors.requisition ? 'Required' : undefined}
            {...register('requisition', { required: true, valueAsNumber: true })}
          />
          <InputField
            label="Battle Tally"
            type="tel"
            isRequired
            errorMessage={errors.battles ? 'Required' : undefined}
            {...register('battles', { required: true, valueAsNumber: true })}
          />
          <InputField
            label="Battles Won"
            type="tel"
            isRequired
            errorMessage={errors.battlesWon ? 'Required' : undefined}
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
