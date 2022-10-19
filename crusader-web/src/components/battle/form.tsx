import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { Form, Grid, InputField, SelectField, TextAreaField } from '@fjlaubscher/matter';

// components
import NumberField from '../field/number';

import styles from './battle.module.scss';

interface Props {
  ordersOfBattle: Crusader.ListItem[];
  onSubmit: (values: Crusader.Battle) => Promise<void>;
}

const BattleForm = ({ ordersOfBattle, onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useFormContext<Crusader.Battle>();

  const { field: attackerField } = useController({
    control,
    name: 'attackerOrderOfBattleId'
  });
  const { field: defenderField } = useController({
    control,
    name: 'defenderOrderOfBattleId'
  });
  const { field: sizeField } = useController({
    control,
    name: 'size'
  });

  return (
    <Form id="battle-form" onSubmit={handleSubmit(onSubmit)}>
      <Grid className={styles.formGrid} simple>
        <NumberField
          name="size"
          label="Size (Maximum PR)"
          errorMessage={errors.size ? 'Required' : undefined}
          value={sizeField.value}
          onChange={sizeField.onChange}
          required
        />
        <SelectField
          name="attacker"
          options={ordersOfBattle}
          label="Attacker"
          value={attackerField.value}
          onChange={attackerField.onChange}
        />
        <SelectField
          name="defender"
          options={ordersOfBattle}
          label="Defender"
          value={defenderField.value}
          onChange={defenderField.onChange}
        />
      </Grid>
      <InputField
        label="Mission"
        type="text"
        placeholder="Eg. Core Book - Sweep and Clear"
        errorMessage={errors.mission ? 'Required' : undefined}
        {...register('mission', { required: true })}
        required
      />
      <InputField
        label="Name"
        type="text"
        placeholder="Eg. The Battle of Ultramar"
        errorMessage={errors.name ? 'Required' : undefined}
        {...register('name', { required: true })}
        required
      />
      <TextAreaField
        label="Description"
        isFullHeight
        placeholder="Use Markdown to describe your battle!"
        {...register('notes', { required: false })}
      />
    </Form>
  );
};

export default BattleForm;
