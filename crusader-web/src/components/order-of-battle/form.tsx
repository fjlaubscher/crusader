import React from 'react';
import { useFormContext, useController } from 'react-hook-form';
import { useRecoilValue } from 'recoil';

// components
import InputField from '../field/input';
import Grid from '../grid';
import SelectField from '../field/select';
import TextAreaField from '../field/textarea';

// state
import { FactionAtom } from '../../state/config';

import styles from './order-of-battle.module.scss';

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
      style={{
        height: !isCompact ? '100%' : undefined,
        width: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <SelectField
        name="faction"
        options={factions}
        label="Faction"
        value={factionField.value}
        onChange={factionField.onChange}
      />
      <InputField
        label="Name"
        type="text"
        placeholder="Eg. Crusaders"
        errorMessage={errors.name ? 'Required' : undefined}
        required
        {...register('name', { required: true })}
      />
      {!isCompact && (
        <Grid className={styles.grid}>
          <InputField
            label="Supply Limit"
            type="tel"
            errorMessage={errors.supplyLimit ? 'Required' : undefined}
            required
            {...register('supplyLimit', { required: true, valueAsNumber: true })}
          />
          <InputField
            label="Requisition"
            type="tel"
            errorMessage={errors.requisition ? 'Required' : undefined}
            required
            {...register('requisition', { required: true, valueAsNumber: true })}
          />
          <InputField
            label="Battle Tally"
            type="tel"
            errorMessage={errors.battles ? 'Required' : undefined}
            required
            {...register('battles', { required: true, valueAsNumber: true })}
          />
          <InputField
            label="Battles Won"
            type="tel"
            errorMessage={errors.battlesWon ? 'Required' : undefined}
            required
            {...register('battlesWon', { required: true, valueAsNumber: true })}
          />
        </Grid>
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
