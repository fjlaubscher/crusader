import React, { useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import { useAsync } from 'react-use';

// api
import { getCrusadeCardAsync, updateCrusadeCardAsync } from '../../api/crusade-card';
import { getOrderOfBattleAsync } from '../../api/order-of-battle';

// components
import CrusadeCardForm from '../../components/crusade-card/form';
import Layout from '../../components/layout';
import LinkButton from '../../components/button/link';

// hooks
import useToast from '../../hooks/use-toast';

// state
import { PlayerAtom } from '../../state/player';

import styles from './crusade-card.module.scss';
import IconButton from '../../components/button/icon';
import { FaArrowLeft, FaSave } from 'react-icons/fa';

const EditCrusadeCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const player = useRecoilValue(PlayerAtom);
  const [createdPlayerId, setCreatedPlayerId] = useState<number | undefined>(undefined);

  const form = useForm<Crusader.CrusadeCard>({ mode: 'onChange' });
  const {
    reset,
    formState: { isSubmitting, isValid }
  } = form;

  const { loading, value: crusadeCard } = useAsync(async () => {
    const crusadeCard = id ? await getCrusadeCardAsync(id) : undefined;

    if (crusadeCard) {
      reset(crusadeCard);
      const orderOfBattle = await getOrderOfBattleAsync(crusadeCard.orderOfBattleId);
      setCreatedPlayerId(orderOfBattle ? orderOfBattle.playerId : undefined);
    }

    return crusadeCard;
  }, [id, setCreatedPlayerId, reset]);

  const playerId = player ? player.id : 0;
  const isOwner = playerId && createdPlayerId && playerId === createdPlayerId;

  if (!loading && !isOwner) {
    return <Navigate to={`/crusade-care/${id}`} />;
  }

  return (
    <FormProvider {...form}>
      <Layout
        title="Edit Crusade Card"
        action={
          <IconButton
            disabled={!isValid || isSubmitting}
            loading={isSubmitting}
            type="submit"
            form="crusade-card-form"
            variant="info"
          >
            <FaSave />
          </IconButton>
        }
        isLoading={loading}
      >
        <LinkButton className={styles.back} leftIcon={<FaArrowLeft />} to={`/crusade-card/${id}`}>
          Back
        </LinkButton>
        <CrusadeCardForm
          onSubmit={async (values) => {
            try {
              if (crusadeCard) {
                const updatedCrusadeCard = await updateCrusadeCardAsync({
                  ...crusadeCard,
                  ...values
                });

                if (updatedCrusadeCard) {
                  toast({
                    variant: 'success',
                    text: 'Crusade Card updated'
                  });

                  navigate(`/crusade-card/${updatedCrusadeCard.id}`);
                }
              }
            } catch (ex: any) {
              toast({
                variant: 'error',
                text: ex.message || 'Unable to update Crusade Card'
              });
            }
          }}
        />
      </Layout>
    </FormProvider>
  );
};

export default EditCrusadeCard;
