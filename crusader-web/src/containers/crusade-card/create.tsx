import React from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useToast, IconButton, Button } from '@chakra-ui/react';
import { useRecoilState } from 'recoil';
import { useAsync } from 'react-use';
import { FormProvider, useForm } from 'react-hook-form';
import { MdArrowBack, MdSave } from 'react-icons/md';

// api
import { createCrusadeCardAsync } from '../../api/crusade-card';
import { getOrderOfBattleAsync } from '../../api/order-of-battle';

// components
import CrusadeCardForm from '../../components/crusade-card/form';
import Layout from '../../components/layout';

// helpers
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '../../helpers/messages';

// state
import { OrderOfBattleAtom } from '../../state/order-of-battle';

const CreateCrusadeCard = () => {
  const { id } = useParams<IdParams>();
  const history = useHistory();
  const toast = useToast();

  const [currentOrderOfBattle, setCurrentOrderOfBattle] = useRecoilState(OrderOfBattleAtom);

  const { loading } = useAsync(async () => {
    if (!currentOrderOfBattle || currentOrderOfBattle.id !== parseInt(id)) {
      const orderOfBattle = await getOrderOfBattleAsync(id);
      if (orderOfBattle) {
        setCurrentOrderOfBattle(orderOfBattle);
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

  return (
    <FormProvider {...form}>
      <Layout
        title="New Crusade Card"
        actionComponent={
          <IconButton
            aria-label="Save"
            icon={<MdSave />}
            disabled={!form.formState.isValid || form.formState.isSubmitting}
            colorScheme="blue"
            isLoading={form.formState.isSubmitting}
            type="submit"
            form="crusade-card-form"
          />
        }
        isLoading={loading}
        isFullHeight
      >
        {currentOrderOfBattle && (
          <Button
            leftIcon={<MdArrowBack />}
            as={Link}
            to={`/order-of-battle/${currentOrderOfBattle.id}`}
          >
            {currentOrderOfBattle.name}
          </Button>
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
                    status: 'success',
                    title: SUCCESS_MESSAGE,
                    description: `Added to ${currentOrderOfBattle.name}`
                  });
                  history.push(`/order-of-battle/${currentOrderOfBattle.id}`);
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

export default CreateCrusadeCard;
