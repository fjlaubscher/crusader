import React from 'react';
import { SimpleGrid, useMediaQuery } from '@chakra-ui/react';
import { useController, useFormContext } from 'react-hook-form';
import { useRecoilValue } from 'recoil';

// components
import InputField from '../field/input';
import SelectField from '../field/select';

// state
import { BattleStatusAtom } from '../../state/config';

interface Props {
  onSubmit: (values: Crusader.Battle) => Promise<void>;
}

const BattleScoreForm: React.FC<Props> = ({ onSubmit }) => {
  const [isTabletOrLarger] = useMediaQuery('(min-width: 767px)');
  const battleStatuses = useRecoilValue(BattleStatusAtom);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useFormContext<Crusader.Battle>();

  const { field: statusField } = useController({
    control,
    name: 'statusId'
  });

  return (
    <form
      id="battle-score-form"
      style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <SelectField
        options={battleStatuses}
        label="Status"
        value={statusField.value}
        onChange={statusField.onChange}
      />
      <SimpleGrid columns={isTabletOrLarger ? 2 : 1} columnGap={4}>
        <InputField
          label="Attacker"
          type="number"
          placeholder="10"
          isRequired
          errorMessage={errors.attackerScore ? 'Required' : undefined}
          {...register('attackerScore', { required: true, valueAsNumber: true })}
        />
        <InputField
          label="Defender"
          type="number"
          placeholder="10"
          isRequired
          errorMessage={errors.defenderScore ? 'Required' : undefined}
          {...register('defenderScore', { required: true, valueAsNumber: true })}
        />
      </SimpleGrid>
    </form>
  );
};

export default BattleScoreForm;
