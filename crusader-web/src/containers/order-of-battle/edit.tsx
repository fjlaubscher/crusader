import { useNavigate, useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useAsync } from 'react-use';
import { FaSave, FaArrowLeft } from 'react-icons/fa';
import { IconButton, useToast } from '@fjlaubscher/matter';

// api
import { getOrderOfBattleAsync, updateOrderOfBattleAsync } from '../../api/order-of-battle';

// components
import Layout from '../../components/layout';
import LinkButton from '../../components/button/link';
import OrderOfBattleForm from '../../components/order-of-battle/form';

// state
import { PlayerOrdersOfBattleAtom, OrdersOfBattleAtom } from '../../state/order-of-battle';
import { PlayerAtom } from '../../state/player';

import styles from './order-of-battle.module.scss';

const EditOrderOfBattle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const setPlayerOrdersOfBattle = useSetRecoilState(PlayerOrdersOfBattleAtom);
  const setOrdersOfBattle = useSetRecoilState(OrdersOfBattleAtom);
  const player = useRecoilValue(PlayerAtom);

  const form = useForm<Crusader.Crusade>({ mode: 'onChange' });
  const {
    reset,
    formState: { isSubmitting, isValid }
  } = form;

  const { loading, value: orderOfBattle } = useAsync(async () => {
    if (id) {
      const orderOfBattle = await getOrderOfBattleAsync(id);

      if (orderOfBattle) {
        reset(orderOfBattle);
      }

      return orderOfBattle;
    }

    return undefined;
  }, [id, reset]);

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
              if (orderOfBattle && player) {
                const updatedOrderOfBattle = await updateOrderOfBattleAsync({
                  ...orderOfBattle,
                  ...values
                });

                if (updatedOrderOfBattle) {
                  toast({
                    variant: 'success',
                    text: 'Order of Battle updated'
                  });

                  // force a refresh of recoil state
                  setPlayerOrdersOfBattle([]);
                  setOrdersOfBattle([]);

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
