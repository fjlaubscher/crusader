import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { useAsync } from 'react-use';
import { FormProvider, useForm } from 'react-hook-form';
import { FaArrowLeft, FaSave } from 'react-icons/fa';

// api
import { createCrusadeCardAsync } from '../../api/crusade-card';
import { getOrderOfBattleAsync } from '../../api/order-of-battle';

// components
import CrusadeCardForm from '../../components/crusade-card/form';
import IconButton from '../../components/button/icon';
import Layout from '../../components/layout';

// hooks
import useToast from '../../hooks/use-toast';

// state
import { OrderOfBattleAtom } from '../../state/order-of-battle';

import styles from './crusade-card.module.scss';
import LinkButton from '../../components/button/link';

const CreateCrusadeCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const [currentOrderOfBattle, setCurrentOrderOfBattle] = useRecoilState(OrderOfBattleAtom);

  const { loading } = useAsync(async () => {
    if (id) {
      if (!currentOrderOfBattle || currentOrderOfBattle.id !== parseInt(id)) {
        const orderOfBattle = await getOrderOfBattleAsync(id);
        if (orderOfBattle) {
          setCurrentOrderOfBattle(orderOfBattle);
        }
      }
    }
  }, [id]);

  const form = useForm<Crusader.CrusadeCard>({
    mode: 'onChange',
    defaultValues: {
      battles: 0,
      battlesSurvived: 0,
      crusadePoints: 0,
      experiencePoints: 0,
      powerRating: 0,
      unitsDestroyedMelee: 0,
      unitsDestroyedPsychic: 0,
      unitsDestroyedRanged: 0
    }
  });
  const { isSubmitting, isValid } = form.formState;

  return (
    <FormProvider {...form}>
      <Layout
        title="New Crusade Card"
        action={
          <IconButton
            disabled={!isValid || isSubmitting}
            loading={isSubmitting}
            type="submit"
            form="crusade-card-form"
            variant="accent"
          >
            <FaSave />
          </IconButton>
        }
        isLoading={loading}
      >
        {currentOrderOfBattle && (
          <LinkButton
            className={styles.back}
            leftIcon={<FaArrowLeft />}
            to={`/order-of-battle/${id}`}
          >
            Back
          </LinkButton>
        )}
        <CrusadeCardForm
          onSubmit={async (values) => {
            try {
              if (currentOrderOfBattle) {
                const newCrusadeCard = await createCrusadeCardAsync({
                  ...values,
                  orderOfBattleId: currentOrderOfBattle.id
                });

                if (newCrusadeCard) {
                  toast({
                    variant: 'success',
                    text: `Added to ${currentOrderOfBattle.name}`
                  });
                  navigate(`/order-of-battle/${currentOrderOfBattle.id}`);
                }
              }
            } catch (ex: any) {
              toast({
                variant: 'error',
                text: ex.message || 'Unable to add Crusade Card'
              });
            }
          }}
        />
      </Layout>
    </FormProvider>
  );
};

export default CreateCrusadeCard;
