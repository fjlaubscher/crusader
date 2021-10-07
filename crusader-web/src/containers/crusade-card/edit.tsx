import React, { useState } from 'react';
import { Link, Redirect, useHistory, useParams } from 'react-router-dom';
import { Button, IconButton, useToast } from '@chakra-ui/react';
import { MdArrowBack, MdSave } from 'react-icons/md';
import { FormProvider, useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import { useAsync } from 'react-use';

// api
import { getCrusadeCardAsync, updateCrusadeCardAsync } from '../../api/crusade-card';
import { getOrderOfBattleAsync } from '../../api/order-of-battle';

// components
import CrusadeCardForm from '../../components/crusade-card/form';
import Layout from '../../components/layout';

// helpers
import { SUCCESS_MESSAGE, ERROR_MESSAGE } from '../../helpers/messages';

// state
import { PlayerAtom } from '../../state/player';

const EditCrusadeCard = () => {
  const { id } = useParams<IdParams>();
  const history = useHistory();
  const toast = useToast();

  const player = useRecoilValue(PlayerAtom);
  const [createdPlayerId, setCreatedPlayerId] = useState<number | undefined>(undefined);

  const form = useForm<Crusader.CrusadeCard>({ mode: 'onChange' });
  const {
    reset,
    formState: { isSubmitting, isValid }
  } = form;

  const { loading, value: crusadeCard } = useAsync(async () => {
    const crusadeCard = await getCrusadeCardAsync(id);

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
    return <Redirect to={`/crusade-care/${id}`} />;
  }

  return (
    <FormProvider {...form}>
      <Layout
        title="Edit Crusade Card"
        actionComponent={
          <IconButton
            aria-label="Save"
            icon={<MdSave />}
            disabled={!isValid || isSubmitting}
            colorScheme="blue"
            isLoading={isSubmitting}
            type="submit"
            form="crusade-card-form"
          />
        }
        isLoading={loading}
      >
        <Button leftIcon={<MdArrowBack />} as={Link} to={`/crusade-card/${id}`}>
          Back
        </Button>
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
                    status: 'success',
                    title: SUCCESS_MESSAGE,
                    description: 'Crusade Card updated.'
                  });

                  history.push(`/crusade-card/${updatedCrusadeCard.id}`);
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

export default EditCrusadeCard;
