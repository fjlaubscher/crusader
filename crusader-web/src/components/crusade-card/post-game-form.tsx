import React, { useState, useCallback, useEffect } from 'react';
import { useController, useForm } from 'react-hook-form';
import { Button, Card, Form, TextAreaField } from '@fjlaubscher/matter';

// components
import NumberField from '../field/number';
import QuestionField from '../field/question';

// helpers
import { getCrusadePointIncrement } from '../../helpers/crusade-points';

import styles from './crusade-card.module.scss';

export interface PostGameAnswers {
  isCPCorrect?: boolean;
  isXPCorrect?: boolean;
  isMarkedForGreatness?: boolean;
  hasConfirmedCP?: boolean;
  hasConfirmedXP?: boolean;
  hasGainedHonour?: boolean;
  hasGainedScar?: boolean;
  hasGainedAdditionalXP?: boolean;
  hasSurvived?: boolean;
  hasKills?: boolean;
}

interface Props {
  initialValues: { card: Crusader.CrusadeCard; answers: PostGameAnswers };
  onSubmit: (values: Crusader.CrusadeCard, answers: PostGameAnswers) => Promise<void>;
}

const CrusadeCardPostGameForm = ({ initialValues, onSubmit }: Props) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
    reset
  } = useForm<Crusader.CrusadeCard>({ mode: 'onChange' });

  const [isCPCorrect, setIsCPCorrect] = useState<boolean | undefined>(
    initialValues.answers.isCPCorrect
  );
  const [isXPCorrect, setIsXPCorrect] = useState<boolean | undefined>(
    initialValues.answers.isXPCorrect
  );

  const [isMarkedForGreatness, setIsMarkedForGreatness] = useState<boolean | undefined>(
    initialValues.answers.isMarkedForGreatness
  );
  const [hasConfirmedCP, setHasConfirmedCP] = useState<boolean | undefined>(
    initialValues.answers.hasConfirmedCP
  );
  const [hasConfirmedXP, setHasConfirmedXP] = useState<boolean | undefined>(
    initialValues.answers.hasConfirmedXP
  );
  const [hasGainedHonour, setHasGainedHonour] = useState<boolean | undefined>(
    initialValues.answers.hasGainedHonour
  );
  const [hasGainedScar, setHasGainedScar] = useState<boolean | undefined>(
    initialValues.answers.hasGainedScar
  );
  const [hasGainedAdditionalXP, setHasGainedAdditionalXP] = useState<boolean | undefined>(
    initialValues.answers.hasGainedAdditionalXP
  );
  const [hasSurvived, setHasSurvived] = useState<boolean | undefined>(
    initialValues.answers.hasSurvived
  );
  const [hasKills, setHasKills] = useState<boolean | undefined>(initialValues.answers.hasKills);

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

  const handleMarkedForGreatness = useCallback(
    (isMarked: boolean) => {
      const totalXP = isMarked ? 4 : 1;
      const newXP = experiencePointsField.value + totalXP;

      setIsMarkedForGreatness(isMarked);
      experiencePointsField.onChange(newXP);
    },
    [experiencePointsField, crusadePointsField]
  );

  const handleHasSurvived = useCallback(
    (value: boolean) => {
      setHasSurvived(value);
      battlesField.onChange(battlesField.value + 1);
      battlesSurvivedField.onChange(
        value ? battlesSurvivedField.value + 1 : battlesSurvivedField.value
      );
    },
    [setHasSurvived, battlesField, battlesSurvivedField]
  );

  const handleHasGainedHonour = useCallback(
    (value: boolean) => {
      setHasGainedHonour(value);
      crusadePointsField.onChange(
        crusadePointsField.value + getCrusadePointIncrement(powerRatingField.value)
      );
    },
    [crusadePointsField, powerRatingField, setHasGainedHonour]
  );

  const handleHasGainedScar = useCallback(
    (value: boolean) => {
      setHasGainedScar(value);
      crusadePointsField.onChange(crusadePointsField.value - 1);
    },
    [crusadePointsField, setHasGainedScar]
  );

  const handleReset = useCallback(
    (formValues: Crusader.CrusadeCard, answers: PostGameAnswers) => {
      reset(formValues);
      setIsCPCorrect(answers.isCPCorrect);
      setIsMarkedForGreatness(answers.isMarkedForGreatness);
      setIsXPCorrect(answers.isXPCorrect);
      setHasConfirmedCP(answers.hasConfirmedCP);
      setHasConfirmedXP(answers.hasConfirmedXP);
      setHasGainedAdditionalXP(answers.hasGainedAdditionalXP);
      setHasGainedHonour(answers.hasGainedHonour);
      setHasGainedScar(answers.hasGainedScar);
      setHasKills(answers.hasKills);
      setHasSurvived(answers.hasSurvived);
    },
    [
      reset,
      setIsXPCorrect,
      setIsCPCorrect,
      setHasConfirmedCP,
      setHasConfirmedXP,
      setHasGainedAdditionalXP,
      setHasGainedHonour,
      setHasGainedScar,
      setHasKills,
      setHasSurvived,
      setIsMarkedForGreatness
    ]
  );

  const id = getValues('id');
  useEffect(() => {
    if (id !== initialValues.card.id) {
      handleReset(initialValues.card, initialValues.answers);
    }
  }, [id, initialValues, handleReset]);

  return (
    <Form
      onSubmit={handleSubmit((values) =>
        onSubmit(values, {
          hasConfirmedCP,
          hasConfirmedXP,
          hasGainedAdditionalXP,
          hasGainedHonour,
          hasGainedScar,
          hasKills,
          hasSurvived,
          isCPCorrect,
          isMarkedForGreatness,
          isXPCorrect
        })
      )}
    >
      <Card className={styles.question}>
        <QuestionField
          name="isMarkedForGreatness"
          label="Is this unit marked for greatness?"
          value={isMarkedForGreatness}
          onChange={handleMarkedForGreatness}
        />
      </Card>
      <Card className={styles.question}>
        <QuestionField
          name="hasSurvived"
          label="Did this unit survive the battle?"
          value={hasSurvived}
          onChange={handleHasSurvived}
        />
      </Card>
      <Card className={styles.question}>
        <QuestionField
          name="hasKills"
          label="Did this unit destroy any other units during the battle?"
          value={hasKills}
          onChange={setHasKills}
        />
        {hasKills && (
          <>
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
          </>
        )}
      </Card>
      <Card className={styles.question}>
        <QuestionField
          name="hasGainedBattleHonour"
          label="Did this unit gain a battle honour?"
          value={hasGainedHonour}
          onChange={handleHasGainedHonour}
        />
        {hasGainedHonour && (
          <TextAreaField
            label="Battle Honours"
            placeholder="Use Markdown to describe this unit's Battle Honours."
            {...register('battleHonours', { required: true })}
          />
        )}
      </Card>
      <Card className={styles.question}>
        <QuestionField
          name="hasGainedBattleScar"
          label="Did this unit gain a battle scar?"
          value={hasGainedScar}
          onChange={handleHasGainedScar}
        />
        {hasGainedScar && (
          <TextAreaField
            label="Battle Scars"
            placeholder="Use Markdown to describe this unit's Battle Scars."
            {...register('battleScars', { required: true })}
          />
        )}
      </Card>
      <Card className={styles.question}>
        <QuestionField
          name="hasGainedAdditionalXP"
          label="Did this unit gain any additional XP from agendas?"
          value={hasGainedAdditionalXP}
          onChange={setHasGainedAdditionalXP}
        />
        {hasGainedAdditionalXP && (
          <NumberField
            name="experiencePoints"
            label="Experience Points"
            errorMessage={errors.experiencePoints ? 'Required' : undefined}
            value={experiencePointsField.value}
            onChange={experiencePointsField.onChange}
            required
          />
        )}
      </Card>
      <Card className={styles.question}>
        <QuestionField
          name="isXPCorrect"
          label={`This unit should have ${experiencePointsField.value} XP. Is that correct?`}
          value={isXPCorrect}
          onChange={(value) => {
            setIsXPCorrect(value);
            if (value) {
              setHasConfirmedXP(true);
            }
          }}
        />
        {isXPCorrect === false && (
          <NumberField
            name="experiencePoints"
            label="Experience Points"
            errorMessage={errors.experiencePoints ? 'Required' : undefined}
            value={experiencePointsField.value}
            onChange={(value) => {
              setHasConfirmedXP(true);
              experiencePointsField.onChange(value);
            }}
            required
          />
        )}
      </Card>
      <Card className={styles.question}>
        <QuestionField
          name="isCPCorrect"
          label={`This unit should have ${crusadePointsField.value} CP. Is that correct?`}
          value={isCPCorrect}
          onChange={(value) => {
            setIsCPCorrect(value);
            if (value) {
              setHasConfirmedCP(true);
            }
          }}
        />
        {isCPCorrect === false && (
          <NumberField
            name="crusadePoints"
            label="Crusade Points"
            errorMessage={errors.crusadePoints ? 'Required' : undefined}
            value={crusadePointsField.value}
            onChange={(value) => {
              setHasConfirmedCP(true);
              crusadePointsField.onChange(value);
            }}
            required
          />
        )}
      </Card>
      <Button
        disabled={hasConfirmedCP !== true || hasConfirmedXP !== true}
        loading={isSubmitting}
        type="submit"
        variant="info"
      >
        Submit
      </Button>
    </Form>
  );
};

export default CrusadeCardPostGameForm;
