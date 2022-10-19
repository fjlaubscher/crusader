import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import { Form, Grid, SelectField } from '@fjlaubscher/matter';

// components
import NumberField from '../field/number';

// state
import { BattleStatusAtom } from '../../state/config';

import styles from './battle.module.scss';

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
  const { field: attackerScoreField } = useController({
    control,
    name: 'attackerScore'
  });
  const { field: defenderScoreField } = useController({
    control,
    name: 'defenderScore'
  });

  return (
    <Form id="battle-score-form" onSubmit={handleSubmit(onSubmit)}>
      <SelectField
        name="status"
        options={battleStatuses}
        label="Status"
        value={statusField.value}
        onChange={statusField.onChange}
      />
      <Grid className={styles.formGrid} simple>
        <NumberField
          name="attackerScore"
          label="Attacker"
          errorMessage={errors.attackerScore ? 'Required' : undefined}
          value={attackerScoreField.value}
          onChange={attackerScoreField.onChange}
          required
        />
        <NumberField
          name="defenderScore"
          label="Defender"
          errorMessage={errors.defenderScore ? 'Required' : undefined}
          value={defenderScoreField.value}
          onChange={defenderScoreField.onChange}
          required
        />
      </Grid>
    </Form>
  );
};

export default BattleScoreForm;
