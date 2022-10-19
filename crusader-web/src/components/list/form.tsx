import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { Form, InputField, SelectField, TextAreaField } from '@fjlaubscher/matter';

interface Props {
  ordersOfBattle: Crusader.ListItem[];
  onSubmit: (values: Crusader.List) => Promise<void>;
}

const ListForm = ({ ordersOfBattle, onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useFormContext<Crusader.List>();

  const { field: orderOfBattleField } = useController({
    control,
    name: 'orderOfBattleId'
  });

  return (
    <Form id="list-form" onSubmit={handleSubmit(onSubmit)}>
      <SelectField
        name="orderOfBattle"
        options={ordersOfBattle}
        label="Order of Battle"
        value={orderOfBattleField.value}
        onChange={orderOfBattleField.onChange}
      />
      <InputField
        label="Name"
        type="text"
        placeholder="Eg. The Sons of Gulliman"
        errorMessage={errors.name ? 'Required' : undefined}
        {...register('name', { required: true })}
        required
      />
      <TextAreaField
        label="Description"
        isFullHeight
        placeholder="Use Markdown to describe your list!"
        {...register('notes', { required: false })}
      />
    </Form>
  );
};

export default ListForm;
