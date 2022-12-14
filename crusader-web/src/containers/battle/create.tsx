import { useNavigate, useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import { useAsync } from 'react-use';
import { FaArrowLeft, FaSave } from 'react-icons/fa';
import { IconButton, useToast } from '@fjlaubscher/matter';

// api
import { createBattleAsync } from '../../api/battle';
import { getCrusadeOrdersOfBattleAsync } from '../../api/order-of-battle';

// components
import BattleForm from '../../components/battle/form';
import Layout from '../../components/layout';
import LinkButton from '../../components/button/link';

// state
import { PlayerAtom } from '../../state/player';

import styles from './battle.module.scss';

const CreateBattle = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const toast = useToast();
  const player = useRecoilValue(PlayerAtom);

  const form = useForm<Crusader.Battle>({ mode: 'onChange' });
  const { isValid, isSubmitting } = form.formState;

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
        isLoading={loading}
      >
        <LinkButton className={styles.back} leftIcon={<FaArrowLeft />} to={`/crusade/${id}`}>
          Back
        </LinkButton>
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
                      variant: 'success',
                      text: 'Battle created'
                    });
                    navigate(`/battle/${newBattle.id}`);
                  }
                }
              } catch (ex: any) {
                toast({
                  variant: 'error',
                  text: ex.message || 'Unable to create Battle'
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
