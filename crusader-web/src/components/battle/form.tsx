import React from 'react';
import { SimpleGrid, useMediaQuery } from '@chakra-ui/react';
import { useController, useFormContext } from 'react-hook-form';

// components
import InputField from '../field/input';
import SelectField from '../field/select';
import TextAreaField from '../field/textarea';

interface Props {
  ordersOfBattle: Crusader.ListItem[];
  onSubmit: (values: Crusader.Battle) => Promise<void>;
}

const BattleForm = ({ ordersOfBattle, onSubmit }: Props) => {
  const [isTabletOrLarger] = useMediaQuery('(min-width: 767px)');

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
    <form
      id="battle-form"
      style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <SimpleGrid columns={isTabletOrLarger ? 2 : 1} columnGap={4}>
        <InputField
          label="Mission"
          type="text"
          placeholder="Eg. Core Book - Sweep and Clear"
          isRequired
          errorMessage={errors.mission ? 'Required' : undefined}
          {...register('mission', { required: true })}
        />
        <InputField
          label="Size (Maximum PR)"
          type="number"
          placeholder="25"
          isRequired
          errorMessage={errors.size ? 'Required' : undefined}
          {...register('size', { required: true, valueAsNumber: true })}
        />
        <SelectField
          options={ordersOfBattle}
          label="Attacker"
          value={attackerField.value}
          onChange={attackerField.onChange}
        />
        <SelectField
          options={ordersOfBattle}
          label="Defender"
          value={defenderField.value}
          onChange={defenderField.onChange}
        />
      </SimpleGrid>
      <InputField
        label="Name"
        type="text"
        placeholder="Eg. The Battle of Ultramar"
        isRequired
        errorMessage={errors.name ? 'Required' : undefined}
        {...register('name', { required: true })}
      />
      <TextAreaField
        label="Description"
        isFullHeight
        placeholder="Use Markdown to describe your battle!"
        isRequired
        errorMessage={errors.notes ? 'Required' : undefined}
        {...register('notes', { required: true })}
      />
    </form>
  );
};

export default BattleForm;
