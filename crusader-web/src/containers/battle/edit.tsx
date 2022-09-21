import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IconButton, useToast } from '@chakra-ui/react';
import { MdSave } from 'react-icons/md';
import { FormProvider, useForm } from 'react-hook-form';
import { useAsync } from 'react-use';

// api
import { getBattleAsync, updateBattleAsync } from '../../api/battle';
import { getCrusadeOrdersOfBattleAsync } from '../../api/order-of-battle';

// components
import BattleForm from '../../components/battle/form';
import Layout from '../../components/layout';

// helpers
import { SUCCESS_MESSAGE, ERROR_MESSAGE } from '../../helpers/messages';

const EditBattle = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const toast = useToast();

  const form = useForm<Crusader.Battle>({ mode: 'onChange' });
  const {
    reset,
    formState: { isSubmitting, isValid }
  } = form;

  const { loading: loadingBattle, value: battle } = useAsync(async () => {
    if (id) {
      const battle = await getBattleAsync(id);
      if (battle) {
        reset(battle);
        return battle;
      }
    }

    return undefined;
  }, [id, reset]);

  const { loading: loadingOrdersOfBattle, value: ordersOfBattle } = useAsync(async () => {
    if (battle) {
      const ordersOfBattle = await getCrusadeOrdersOfBattleAsync(battle.crusadeId);
      if (ordersOfBattle) {
        return ordersOfBattle.map((oob) => ({ id: oob.id, name: oob.name } as Crusader.ListItem));
      }
    }

    return undefined;
  }, [battle]);

  return (
    <FormProvider {...form}>
      <Layout
        title="Edit Battle"
        actionComponent={
          <IconButton
            aria-label="Save"
            icon={<MdSave />}
            disabled={!isValid || isSubmitting}
            colorScheme="blue"
            isLoading={isSubmitting}
            type="submit"
            form="battle-form"
          />
        }
        isLoading={loadingBattle || loadingOrdersOfBattle}
      >
        {ordersOfBattle && (
          <BattleForm
            ordersOfBattle={ordersOfBattle}
            onSubmit={async (values) => {
              try {
                if (battle) {
                  const updatedBattle = await updateBattleAsync({
                    ...battle,
                    ...values
                  });

                  if (updatedBattle) {
                    toast({
                      status: 'success',
                      title: SUCCESS_MESSAGE,
                      description: 'Battle updated'
                    });
                    navigate(`/battle/${updatedBattle.id}`);
                  }
                }
              } catch (ex: any) {
                toast({
                  status: 'error',
                  title: ERROR_MESSAGE,
                  description: ex.message
                });
              }
            }}
          />
        )}
      </Layout>
    </FormProvider>
  );
};

export default EditBattle;