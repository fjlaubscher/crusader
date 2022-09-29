import React from 'react';
import { useFormContext, useController } from 'react-hook-form';
import { useRecoilValue } from 'recoil';

// components
import Form from '../form';
import Grid from '../grid';
import InputField from '../field/input';
import SelectField from '../field/select';
import TextAreaField from '../field/textarea';

// state
import { BattlefieldRoleAtom } from '../../state/config';

import styles from './crusade-card.module.scss';

interface Props {
  onSubmit: (values: Crusader.CrusadeCard) => Promise<void>;
}

const CrusadeCardForm = ({ onSubmit }: Props) => {
  const battlefieldRoles = useRecoilValue(BattlefieldRoleAtom);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors }
  } = useFormContext<Crusader.CrusadeCard>();

  const { field: battlefieldRoleField } = useController({
    control,
    name: 'battlefieldRoleId'
  });

  return (
    <Form id="crusade-card-form" onSubmit={handleSubmit(onSubmit)}>
      <Grid className={styles.noMargin}>
        <SelectField
          name="battlefieldRole"
          options={battlefieldRoles}
          label="Battlefield Role"
          value={battlefieldRoleField.value}
          onChange={battlefieldRoleField.onChange}
        />
        <InputField
          label="Name"
          type="text"
          placeholder="Eg. Squad Sigvis"
          errorMessage={errors.name ? 'Required' : undefined}
          required
          {...register('name', { required: true })}
        />
        <InputField
          label="Unit Type"
          type="text"
          placeholder="Eg. Intercessor Squad"
          errorMessage={errors.unitType ? 'Required' : undefined}
          required
          {...register('unitType', { required: true })}
        />
      </Grid>
      <Grid className={styles.grid}>
        <InputField
          label="Power Rating"
          type="tel"
          errorMessage={errors.powerRating ? 'Required' : undefined}
          required
          {...register('powerRating', { required: true, valueAsNumber: true })}
        />
        <InputField
          label="Crusade Points"
          type="tel"
          errorMessage={errors.crusadePoints ? 'Required' : undefined}
          required
          {...register('crusadePoints', { required: true, valueAsNumber: true })}
        />
        <InputField
          label="Experience Points"
          type="tel"
          errorMessage={errors.experiencePoints ? 'Required' : undefined}
          required
          {...register('experiencePoints', { required: true, valueAsNumber: true })}
        />
        <InputField
          label="Battle Tally"
          type="tel"
          errorMessage={errors.battles ? 'Required' : undefined}
          required
          {...register('battles', { required: true, valueAsNumber: true })}
        />
        <InputField
          label="Battles Survived"
          type="tel"
          errorMessage={errors.battlesSurvived ? 'Required' : undefined}
          required
          {...register('battlesSurvived', { required: true, valueAsNumber: true })}
        />
      </Grid>
      <Grid className={styles.grid}>
        <InputField
          label="Units Destroyed (Melee)"
          type="tel"
          errorMessage={errors.unitsDestroyedMelee ? 'Required' : undefined}
          required
          {...register('unitsDestroyedMelee', { required: true, valueAsNumber: true })}
        />
        <InputField
          label="Units Destroyed (Psychic)"
          type="tel"
          errorMessage={errors.unitsDestroyedPsychic ? 'Required' : undefined}
          required
          {...register('unitsDestroyedPsychic', { required: true, valueAsNumber: true })}
        />
        <InputField
          label="Units Destroyed (Ranged)"
          type="tel"
          errorMessage={errors.unitsDestroyedRanged ? 'Required' : undefined}
          required
          {...register('unitsDestroyedRanged', { required: true, valueAsNumber: true })}
        />
      </Grid>
      <Grid className={styles.noMargin} simple>
        <TextAreaField
          label="Abilities"
          placeholder="Use Markdown to describe this unit's Abilities that must be selected before the game."
          {...register('abilities', { required: false })}
        />
        <TextAreaField
          label="Battle Honours"
          placeholder="Use Markdown to describe this unit's Battle Honours."
          {...register('battleHonours', { required: false })}
        />
        <TextAreaField
          label="Battle Scars"
          placeholder="Use Markdown to describe this unit's Battle Scars."
          {...register('battleScars', { required: false })}
        />
        <TextAreaField
          label="Equipment"
          placeholder="Use Markdown to describe this unit's Equipment."
          errorMessage={errors.equipment ? 'Required' : undefined}
          required
          {...register('equipment', { required: true })}
        />
        <TextAreaField
          label="Psychic Powers"
          placeholder="Use Markdown to describe this unit's Psychic Powers."
          {...register('psychicPowers', { required: false })}
        />
        <TextAreaField
          label="Relics"
          placeholder="Use Markdown to describe this unit's Relics."
          {...register('relics', { required: false })}
        />
        <TextAreaField
          label="Warlord Traits"
          placeholder="Use Markdown to describe this unit's Warlord Traits."
          {...register('warlordTraits', { required: false })}
        />
        <TextAreaField
          label="Notes"
          placeholder="Use Markdown to add some fluff to your unit."
          {...register('notes', { required: false })}
        />
      </Grid>
    </Form>
  );
};

export default CrusadeCardForm;
