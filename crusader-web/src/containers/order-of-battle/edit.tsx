import React from 'react';
import { Link, Redirect, useHistory, useParams } from 'react-router-dom';
import { Button, IconButton, useToast } from '@chakra-ui/react';
import { MdArrowBack, MdSave } from 'react-icons/md';
import { FormProvider, useForm } from 'react-hook-form';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useAsync } from 'react-use';

// api
import { getOrderOfBattleAsync, updateOrderOfBattleAsync } from '../../api/order-of-battle';

// components
import Layout from '../../components/layout';
import OrderOfBattleForm from '../../components/order-of-battle/form';

// helpers
import { SUCCESS_MESSAGE, ERROR_MESSAGE } from '../../helpers/messages';

// state
import { OrderOfBattleAtom } from '../../state/order-of-battle';
import { PlayerAtom } from '../../state/player';

const EditOrderOfBattle = () => {
  const { id } = useParams<IdParams>();
  const history = useHistory();
  const toast = useToast();

  const [currentOrderOfBattle, setCurrentOrderOfBattle] = useRecoilState(OrderOfBattleAtom);
  const player = useRecoilValue(PlayerAtom);

  const form = useForm<Crusader.Crusade>({ mode: 'onChange' });
  const {
    reset,
    formState: { isSubmitting, isValid }
  } = form;

  const { loading } = useAsync(async () => {
    if (!currentOrderOfBattle || currentOrderOfBattle.id !== parseInt(id)) {
      const orderOfBattle = await getOrderOfBattleAsync(id);

      if (orderOfBattle) {
        setCurrentOrderOfBattle(orderOfBattle);
        reset(orderOfBattle);
      }
    } else if (currentOrderOfBattle) {
      reset(currentOrderOfBattle);
    }
  }, [id, currentOrderOfBattle, reset]);

  const playerId = player ? player.id : 0;
  const createdById = currentOrderOfBattle ? currentOrderOfBattle.playerId : 0;
  const isOwner = playerId && createdById && playerId === createdById;

  if (!loading && !isOwner) {
    return <Redirect to={`/order-of-battle/${id}`} />;
  }

  return (
    <FormProvider {...form}>
      <Layout
        title="Edit Order of Battle"
        actionComponent={
          <IconButton
            aria-label="Save"
            icon={<MdSave />}
            disabled={!isValid || isSubmitting}
            colorScheme="blue"
            isLoading={isSubmitting}
            type="submit"
            form="order-of-battle-form"
          />
        }
        isFullHeight
        isLoading={loading}
      >
        <Button leftIcon={<MdArrowBack />} as={Link} to={`/order-of-battle/${id}`}>
          Back
        </Button>
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
                    status: 'success',
                    title: SUCCESS_MESSAGE,
                    description: 'Order of Battle updated.'
                  });

                  setCurrentOrderOfBattle(updatedOrderOfBattle);
                  history.push(`/order-of-battle/${updatedOrderOfBattle.id}`);
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
      </Layout>
    </FormProvider>
  );
};

export default EditOrderOfBattle;
