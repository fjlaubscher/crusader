import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useRecoilValue } from 'recoil';

// components
import Form from '../form';
import Grid from '../grid';
import InputField from '../field/input';
import SelectField from '../field/select';

// state
import { BattleStatusAtom } from '../../state/config';

interface Props {
  onSubmit: (values: Crusader.Battle) => Promise<void>;
}

const BattleScoreForm: React.FC<Props> = ({ onSubmit }) => {
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
    <Form
      id="battle-score-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <SelectField
        name="status"
        options={battleStatuses}
        label="Status"
        value={statusField.value}
        onChange={statusField.onChange}
      />
      <Grid simple>
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
      </Grid>
    </Form>
  );
};

export default BattleScoreForm;
