import classnames from 'classnames';
import { useFormContext, useController } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import { Form, Grid, InputField, SelectField, TextAreaField } from '@fjlaubscher/matter';

// components
import NumberField from '../field/number';

// state
import { FactionAtom } from '../../state/config';

import styles from './order-of-battle.module.scss';

interface Props {
  isCompact?: boolean;
  onSubmit: (values: Crusader.OrderOfBattle) => Promise<void>;
}

const OrderOfBattleForm = ({ isCompact, onSubmit }: Props) => {
  const factions = useRecoilValue(FactionAtom);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors }
  } = useFormContext<Crusader.OrderOfBattle>();

  const { field: factionField } = useController({
    control,
    name: 'factionId'
  });
  const { field: supplyLimitField } = useController({
    control,
    name: 'supplyLimit'
  });
  const { field: requisitionField } = useController({
    control,
    name: 'requisition'
  });
  const { field: battlesField } = useController({
    control,
    name: 'battles'
  });
  const { field: battlesWonField } = useController({
    control,
    name: 'battlesWon'
  });

  return (
    <Form
      id="order-of-battle-form"
      className={classnames(styles.form, isCompact && styles.compact)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputField
        label="Avatar"
        type="url"
        placeholder="https://example.com/image.jpg"
        {...register('avatar')}
      />
      <SelectField
        name="faction"
        options={factions.map((f) => ({ value: f.id, description: f.name }))}
        label="Faction"
        value={factionField.value}
        onChange={factionField.onChange}
      />
      <InputField
        label="Name"
        type="text"
        placeholder="Eg. Crusaders"
        errorMessage={errors.name ? 'Required' : undefined}
        required
        {...register('name', { required: true })}
      />
      {!isCompact && (
        <Grid className={styles.grid}>
          <NumberField
            name="supplyLimit"
            label="Supply Limit"
            errorMessage={errors.supplyLimit ? 'Required' : undefined}
            value={supplyLimitField.value}
            onChange={supplyLimitField.onChange}
            minimum={50}
            step={5}
            required
          />
          <NumberField
            name="requisition"
            label="Requisition"
            errorMessage={errors.requisition ? 'Required' : undefined}
            value={requisitionField.value}
            onChange={requisitionField.onChange}
            maximum={5}
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
            name="battlesWon"
            label="Battles Won"
            errorMessage={errors.battlesWon ? 'Required' : undefined}
            value={battlesWonField.value}
            onChange={battlesWonField.onChange}
            required
            maximum={battlesField.value}
          />
        </Grid>
      )}
      <TextAreaField
        label="Notes"
        isFullHeight={isCompact}
        placeholder="Use Markdown to add some fluff to your Order of Battle!"
        {...register('notes', { required: false })}
      />
    </Form>
  );
};

export default OrderOfBattleForm;
