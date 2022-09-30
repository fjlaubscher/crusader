import React from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useAsync } from 'react-use';
import { FaSave, FaArrowLeft } from 'react-icons/fa';

// api
import { getOrderOfBattleAsync, updateOrderOfBattleAsync } from '../../api/order-of-battle';

// components
import IconButton from '../../components/button/icon';
import Layout from '../../components/layout';
import LinkButton from '../../components/button/link';
import OrderOfBattleForm from '../../components/order-of-battle/form';

// hooks
import useToast from '../../hooks/use-toast';

// state
import { OrderOfBattleAtom } from '../../state/order-of-battle';
import { PlayerAtom } from '../../state/player';

import styles from './order-of-battle.module.scss';

const EditOrderOfBattle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const [currentOrderOfBattle, setCurrentOrderOfBattle] = useRecoilState(OrderOfBattleAtom);
  const player = useRecoilValue(PlayerAtom);

  const form = useForm<Crusader.Crusade>({ mode: 'onChange' });
  const {
    reset,
    formState: { isSubmitting, isValid }
  } = form;

  const { loading } = useAsync(async () => {
    if (id) {
      if (!currentOrderOfBattle || currentOrderOfBattle.id !== parseInt(id)) {
        const orderOfBattle = await getOrderOfBattleAsync(id);

        if (orderOfBattle) {
          setCurrentOrderOfBattle(orderOfBattle);
          reset(orderOfBattle);
        }
      } else if (currentOrderOfBattle) {
        reset(currentOrderOfBattle);
      }
    }
  }, [id, currentOrderOfBattle, reset]);

  const playerId = player ? player.id : 0;
  const createdById = currentOrderOfBattle ? currentOrderOfBattle.playerId : 0;
  const isOwner = playerId && createdById && playerId === createdById;

  if (!loading && !isOwner) {
    return <Navigate to={`/order-of-battle/${id}`} />;
  }

  return (
    <FormProvider {...form}>
      <Layout
        title="Edit Order of Battle"
        action={
          <IconButton
            disabled={!isValid || isSubmitting}
            loading={isSubmitting}
            type="submit"
            form="order-of-battle-form"
            variant="info"
          >
            <FaSave />
          </IconButton>
        }
        isLoading={loading}
      >
        <LinkButton
          className={styles.back}
          leftIcon={<FaArrowLeft />}
          to={`/order-of-battle/${id}`}
        >
          Back
        </LinkButton>
        <OrderOfBattleForm
          onSubmit={async (values) => {
            try {
              if (currentOrderOfBattle && player) {
                const updatedOrderOfBattle = await updateOrderOfBattleAsync({
                  ...currentOrderOfBattle,
                  ...values
                });

                if (updatedOrderOfBattle) {
                  toast({
                    variant: 'success',
                    text: 'Order of Battle updated'
                  });

                  setCurrentOrderOfBattle(updatedOrderOfBattle);
                  navigate(`/order-of-battle/${updatedOrderOfBattle.id}`);
                }
              }
            } catch (ex: any) {
              toast({
                variant: 'error',
                text: ex.message || 'Unable to edit Order of Battle'
              });
            }
          }}
        />
      </Layout>
    </FormProvider>
  );
};

export default EditOrderOfBattle;
