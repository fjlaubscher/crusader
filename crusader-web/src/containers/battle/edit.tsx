import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { useAsync } from 'react-use';
import { FaArrowLeft, FaSave } from 'react-icons/fa';
import { IconButton, useToast } from '@fjlaubscher/matter';

// api
import { getBattleAsync, updateBattleAsync } from '../../api/battle';
import { getCrusadeOrdersOfBattleAsync } from '../../api/order-of-battle';

// components
import BattleForm from '../../components/battle/form';
import Layout from '../../components/layout';
import LinkButton from '../../components/button/link';

import styles from './battle.module.scss';

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
        action={
          <IconButton
            disabled={!isValid || isSubmitting}
            loading={isSubmitting}
            type="submit"
            form="battle-form"
            variant="info"
          >
            <FaSave />
          </IconButton>
        }
        isLoading={loadingBattle || loadingOrdersOfBattle}
      >
        <LinkButton className={styles.back} leftIcon={<FaArrowLeft />} to={`/battle/${id}`}>
          Back
        </LinkButton>
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
                      variant: 'success',
                      text: 'Battle updated'
                    });
                    navigate(`/battle/${updatedBattle.id}`);
                  }
                }
              } catch (ex: any) {
                toast({
                  variant: 'error',
                  text: ex.message || 'Unable to update Battle'
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
