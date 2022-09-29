import React from 'react';
import { useController, useFormContext } from 'react-hook-form';

// components
import Form from '../form';
import Grid from '../grid';
import InputField from '../field/input';
import SelectField from '../field/select';
import TextAreaField from '../field/textarea';

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

  return (
    <Form id="battle-form" onSubmit={handleSubmit(onSubmit)}>
      <Grid simple>
        <InputField
          label="Mission"
          type="text"
          placeholder="Eg. Core Book - Sweep and Clear"
          errorMessage={errors.mission ? 'Required' : undefined}
          {...register('mission', { required: true })}
        />
        <InputField
          label="Size (Maximum PR)"
          type="number"
          placeholder="25"
          errorMessage={errors.size ? 'Required' : undefined}
          {...register('size', { required: true, valueAsNumber: true })}
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
        label="Name"
        type="text"
        placeholder="Eg. The Battle of Ultramar"
        errorMessage={errors.name ? 'Required' : undefined}
        {...register('name', { required: true })}
      />
      <TextAreaField
        label="Description"
        isFullHeight
        placeholder="Use Markdown to describe your battle!"
        errorMessage={errors.notes ? 'Required' : undefined}
        {...register('notes', { required: true })}
      />
    </Form>
  );
};

export default BattleForm;
