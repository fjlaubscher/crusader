import React from 'react';
import { useFormContext, useController } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import { Form, Grid, InputField, SelectField, TextAreaField } from '@fjlaubscher/matter';

// components
import NumberField from '../field/number';

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
  const { field: powerRatingField } = useController({
    control,
    name: 'powerRating'
  });
  const { field: crusadePointsField } = useController({
    control,
    name: 'crusadePoints'
  });
  const { field: experiencePointsField } = useController({
    control,
    name: 'experiencePoints'
  });
  const { field: battlesField } = useController({
    control,
    name: 'battles'
  });
  const { field: battlesSurvivedField } = useController({
    control,
    name: 'battlesSurvived'
  });
  const { field: unitsDestroyedMeleeField } = useController({
    control,
    name: 'unitsDestroyedMelee'
  });
  const { field: unitsDestroyedPsychicField } = useController({
    control,
    name: 'unitsDestroyedPsychic'
  });
  const { field: unitsDestroyedRangedField } = useController({
    control,
    name: 'unitsDestroyedRanged'
  });

  return (
    <Form id="crusade-card-form" onSubmit={handleSubmit(onSubmit)}>
      <InputField
        label="Avatar"
        type="url"
        placeholder="https://example.com/image.jpg"
        required
        {...register('avatar')}
      />
      <Grid className={styles.noMargin}>
        <SelectField
          name="battlefieldRole"
          options={battlefieldRoles.map((b) => ({ value: b.id, description: b.name }))}
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
        <NumberField
          name="powerRating"
          label="Power Rating"
          errorMessage={errors.powerRating ? 'Required' : undefined}
          value={powerRatingField.value}
          onChange={powerRatingField.onChange}
          required
        />
        <NumberField
          name="crusadePoints"
          label="Crusade Points"
          errorMessage={errors.crusadePoints ? 'Required' : undefined}
          value={crusadePointsField.value}
          onChange={crusadePointsField.onChange}
          required
        />
        <NumberField
          name="experiencePoints"
          label="Experience Points"
          errorMessage={errors.experiencePoints ? 'Required' : undefined}
          value={experiencePointsField.value}
          onChange={experiencePointsField.onChange}
          required
        />
        <NumberField
          name="battles"
          label="Battle Tally"
          errorMessage={errors.battles ? 'Required' : undefined}
          value={battlesField.value}
          onChange={battlesField.onChange}
          required
        />
        <NumberField
          name="battlesSurvived"
          label="Battles Survived"
          errorMessage={errors.battlesSurvived ? 'Required' : undefined}
          value={battlesSurvivedField.value}
          onChange={battlesSurvivedField.onChange}
          required
        />
      </Grid>
      <Grid className={styles.grid}>
        <NumberField
          name="unitsDestroyedMelee"
          label="Units Destroyed (Melee)"
          errorMessage={errors.unitsDestroyedMelee ? 'Required' : undefined}
          value={unitsDestroyedMeleeField.value}
          onChange={unitsDestroyedMeleeField.onChange}
          required
        />
        <NumberField
          name="unitsDestroyedPsychic"
          label="Units Destroyed (Psychic)"
          errorMessage={errors.unitsDestroyedPsychic ? 'Required' : undefined}
          value={unitsDestroyedPsychicField.value}
          onChange={unitsDestroyedPsychicField.onChange}
          required
        />
        <NumberField
          name="unitsDestroyedRanged"
          label="Units Destroyed (Ranged)"
          errorMessage={errors.unitsDestroyedRanged ? 'Required' : undefined}
          value={unitsDestroyedRangedField.value}
          onChange={unitsDestroyedRangedField.onChange}
          required
        />
      </Grid>
      <Grid className={styles.noMargin} simple>
        <TextAreaField
          label="Abilities"
          placeholder="Use Markdown to describe this unit's Abilities that must be selected before the game."
          required
          {...register('abilities', { required: true })}
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
