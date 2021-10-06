import React from 'react';
import { GridItem, SimpleGrid, useMediaQuery } from '@chakra-ui/react';
import { useFormContext, useController } from 'react-hook-form';
import { useRecoilValue } from 'recoil';

// components
import InputField from '../field/input';
import SelectField from '../field/select';
import TextAreaField from '../field/textarea';

// state
import { BattlefieldRoleAtom } from '../../state/config';

interface Props {
  onSubmit: (values: Crusader.CrusadeCard) => Promise<void>;
}

const CrusadeCardForm = ({ onSubmit }: Props) => {
  const battlefieldRoles = useRecoilValue(BattlefieldRoleAtom);
  const [isTabletOrLarger] = useMediaQuery('(min-width: 767px)');

  const { control, register, handleSubmit } = useFormContext<Crusader.CrusadeCard>();

  const { field: battlefieldRoleField } = useController({
    control,
    name: 'battlefieldRoleId',
    defaultValue: 0
  });

  return (
    <form
      id="crusade-card-form"
      style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <SimpleGrid columns={isTabletOrLarger ? 3 : 1} columnGap={4}>
        <SelectField
          options={battlefieldRoles}
          label="Battlefield Role"
          value={battlefieldRoleField.value}
          onChange={battlefieldRoleField.onChange}
        />
        <InputField
          label="Name"
          type="text"
          placeholder="Eg. Squad Sigvis"
          {...register('name', { required: true })}
        />
        <InputField
          label="Unit Type"
          type="text"
          placeholder="Eg. Intercessor Squad"
          {...register('unitType', { required: true })}
        />
      </SimpleGrid>
      <SimpleGrid columns={isTabletOrLarger ? 3 : 2} columnGap={4}>
        <InputField
          label="Power Rating"
          type="number"
          {...register('powerRating', { required: true, valueAsNumber: true })}
        />
        <InputField
          label="Crusade Points"
          type="number"
          {...register('crusadePoints', { required: true, valueAsNumber: true })}
        />
        <InputField
          label="Experience Points"
          type="number"
          {...register('experiencePoints', { required: true, valueAsNumber: true })}
        />
        <InputField
          label="Battle Tally"
          type="number"
          {...register('battles', { required: true, valueAsNumber: true })}
        />
        <InputField
          label="Battles Survived"
          type="number"
          {...register('battlesSurvived', { required: true, valueAsNumber: true })}
        />
        {isTabletOrLarger && <GridItem />}
      </SimpleGrid>
      <SimpleGrid columns={isTabletOrLarger ? 3 : 2} columnGap={4}>
        <InputField
          label="Units Destroyed (Melee)"
          type="number"
          {...register('unitsDestroyedMelee', { required: true, valueAsNumber: true })}
        />
        <InputField
          label="Units Destroyed (Psychic)"
          type="number"
          {...register('unitsDestroyedPsychic', { required: true, valueAsNumber: true })}
        />
        <InputField
          label="Units Destroyed (Ranged)"
          type="number"
          {...register('unitsDestroyedRanged', { required: true, valueAsNumber: true })}
        />
      </SimpleGrid>
      <SimpleGrid columns={isTabletOrLarger ? 2 : 1} columnGap={4}>
        <TextAreaField
          label="Abilities"
          isFullHeight
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
          {...register('equipment', { required: true })}
        />
        <TextAreaField
          label="Psychic Powers"
          isFullHeight
          placeholder="Use Markdown to describe this unit's Psychic Powers."
          {...register('psychicPowers', { required: false })}
        />
        <TextAreaField
          label="Relics"
          isFullHeight
          placeholder="Use Markdown to describe this unit's Relics."
          {...register('relics', { required: false })}
        />
        <TextAreaField
          label="Warlord Traits"
          isFullHeight
          placeholder="Use Markdown to describe this unit's Warlord Traits."
          {...register('warlordTraits', { required: false })}
        />
        <TextAreaField
          label="Notes"
          isFullHeight
          placeholder="Use Markdown to add some fluff to your unit."
          {...register('notes', { required: false })}
        />
      </SimpleGrid>
    </form>
  );
};

export default CrusadeCardForm;
