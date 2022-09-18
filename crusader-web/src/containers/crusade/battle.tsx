import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, IconButton, useToast } from '@chakra-ui/react';
import { MdArrowBack, MdSave } from 'react-icons/md';
import { FormProvider, useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import { useAsync } from 'react-use';

// api
import { createBattleAsync } from '../../api/battle';
import { getCrusadeOrdersOfBattleAsync } from '../../api/order-of-battle';

// components
import BattleForm from '../../components/battle/form';
import Layout from '../../components/layout';

// helpers
import { SUCCESS_MESSAGE, ERROR_MESSAGE } from '../../helpers/messages';

// state
import { PlayerAtom } from '../../state/player';

const CreateBattle = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const toast = useToast();
  const player = useRecoilValue(PlayerAtom);

  const form = useForm<Crusader.Battle>({ mode: 'onChange' });

  const { loading, value: ordersOfBattle } = useAsync(async () => {
    if (id) {
      const ordersOfBattle = await getCrusadeOrdersOfBattleAsync(id);
      if (ordersOfBattle) {
        return ordersOfBattle.map((oob) => ({ id: oob.id, name: oob.name } as Crusader.ListItem));
      }
    }

    return undefined;
  }, [id]);

  return (
    <FormProvider {...form}>
      <Layout
        title="New Battle"
        actionComponent={
          <IconButton
            aria-label="Save"
            icon={<MdSave />}
            disabled={!form.formState.isValid || form.formState.isSubmitting}
            colorScheme="blue"
            isLoading={form.formState.isSubmitting}
            type="submit"
            form="battle-form"
          />
        }
        isLoading={loading}
      >
        <Button leftIcon={<MdArrowBack />} as={Link} to={`/crusade/${id}`}>
          Back
        </Button>
        {ordersOfBattle && (
          <BattleForm
            ordersOfBattle={ordersOfBattle}
            onSubmit={async (values) => {
              try {
                if (player) {
                  const newBattle = await createBattleAsync({
                    ...values,
                    crusadeId: id ? parseInt(id) : 0,
                    createdDate: new Date().toISOString()
                  });

                  if (newBattle) {
                    toast({
                      status: 'success',
                      title: SUCCESS_MESSAGE,
                      description: 'Battle created'
                    });
                    navigate(`/battle/${newBattle.id}`);
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

export default CreateBattle;
