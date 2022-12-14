import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaSave } from 'react-icons/fa';
import { FormProvider, useForm } from 'react-hook-form';
import { useAsync } from 'react-use';
import { IconButton, useToast } from '@fjlaubscher/matter';

// api
import { getBattleAsync, updateBattleAsync } from '../../api/battle';

// components
import BattleScoreForm from '../../components/battle/score-form';
import Layout from '../../components/layout';
import LinkButton from '../../components/button/link';

import styles from './battle.module.scss';

const EditBattleScore = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const form = useForm<Crusader.Battle>({ mode: 'onChange' });
  const {
    reset,
    formState: { isSubmitting, isValid }
  } = form;

  const { loading, value: battle } = useAsync(async () => {
    if (id) {
      const battle = await getBattleAsync(id);
      if (battle) {
        reset(battle);
        return battle;
      }
    }

    return undefined;
  }, [id, reset]);

  return (
    <FormProvider {...form}>
      <Layout
        title="Edit Battle"
        action={
          <IconButton
            disabled={!isValid || isSubmitting}
            loading={isSubmitting}
            type="submit"
            form="battle-score-form"
            variant="info"
          >
            <FaSave />
          </IconButton>
        }
        isLoading={loading}
      >
        <LinkButton className={styles.back} leftIcon={<FaArrowLeft />} to={`/battle/${id}`}>
          Back
        </LinkButton>
        <BattleScoreForm
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
      </Layout>
    </FormProvider>
  );
};

export default EditBattleScore;
