import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import { useAsync } from 'react-use';
import { FaArrowLeft, FaSave } from 'react-icons/fa';
import { IconButton, useToast } from '@fjlaubscher/matter';

// api
import { createListAsync } from '../../api/list';
import { getPlayerOrdersOfBattleAsync } from '../../api/order-of-battle';

// components
import Layout from '../../components/layout';
import LinkButton from '../../components/button/link';
import ListForm from '../../components/list/form';

// state
import { PlayerAtom } from '../../state/player';

import styles from './list.module.scss';

const CreateList = () => {
  const navigate = useNavigate();

  const toast = useToast();
  const player = useRecoilValue(PlayerAtom);

  const form = useForm<Crusader.List>({ mode: 'onChange' });
  const { isValid, isSubmitting } = form.formState;

  const { loading, value: ordersOfBattle } = useAsync(async () => {
    if (player) {
      const ordersOfBattle = await getPlayerOrdersOfBattleAsync(player.id);
      if (ordersOfBattle) {
        return ordersOfBattle.map((oob) => ({ id: oob.id, name: oob.name } as Crusader.ListItem));
      }
    }

    return undefined;
  }, [player]);

  return (
    <FormProvider {...form}>
      <Layout
        title="New List"
        action={
          <IconButton
            disabled={!isValid || isSubmitting}
            loading={isSubmitting}
            type="submit"
            form="list-form"
            variant="info"
          >
            <FaSave />
          </IconButton>
        }
        isLoading={loading}
      >
        <LinkButton className={styles.back} leftIcon={<FaArrowLeft />} to="/lists">
          Back
        </LinkButton>
        {ordersOfBattle && (
          <ListForm
            ordersOfBattle={ordersOfBattle}
            onSubmit={async (values) => {
              try {
                if (player) {
                  const newBattle = await createListAsync({
                    ...values,
                    size: 0
                  });

                  if (newBattle) {
                    navigate(`/list/${newBattle.id}/edit`);
                  }
                }
              } catch (ex: any) {
                toast({
                  variant: 'error',
                  text: ex.message || 'Unable to create List'
                });
              }
            }}
          />
        )}
      </Layout>
    </FormProvider>
  );
};

export default CreateList;
