import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  useToast,
  IconButton,
  Alert,
  AlertIcon,
  Box,
  AlertTitle,
  AlertDescription
} from '@chakra-ui/react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useAsync } from 'react-use';
import { FormProvider, useForm } from 'react-hook-form';
import { MdSave } from 'react-icons/md';

// api
import { getCrusadeAsync } from '../../api/crusade';
import { createOrderOfBattleAsync } from '../../api/order-of-battle';

// components
import Layout from '../../components/layout';
import OrderOfBattleForm from '../../components/order-of-battle/form';

// helpers
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '../../helpers/messages';

// state
import { CrusadeAtom } from '../../state/crusade';
import { PlayerAtom } from '../../state/player';

const JoinCrusade = () => {
  const { id } = useParams<IdParams>();
  const history = useHistory();
  const toast = useToast();

  const [currentCrusade, setCurrentCrusade] = useRecoilState(CrusadeAtom);
  const player = useRecoilValue(PlayerAtom);

  const { loading } = useAsync(async () => {
    const crusade = await getCrusadeAsync(id);
    if (crusade) {
      setCurrentCrusade(crusade);
    }
  }, [id]);

  const form = useForm<Crusader.OrderOfBattle>({
    mode: 'onChange'
  });

  return (
    <FormProvider {...form}>
      <Layout
        title="Join Crusade"
        actionComponent={
          <IconButton
            aria-label="Save"
            icon={<MdSave />}
            disabled={!form.formState.isValid || form.formState.isSubmitting}
            colorScheme="blue"
            isLoading={form.formState.isSubmitting}
            type="submit"
            form="order-of-battle-form"
          />
        }
        isLoading={loading}
        isFullHeight
      >
        <Alert mb={4} status="info">
          <AlertIcon alignSelf="flex-start" />
          <Box flex="1">
            <AlertTitle>😎 You&apos;re invited!</AlertTitle>
            <AlertDescription display="block">
              Enter some basic details of your Order of Battle.
              <br />
              <br />
              You&apos;ll get to adding your Crusade Cards in a bit.
            </AlertDescription>
          </Box>
        </Alert>
        <OrderOfBattleForm
          isCompact
          onSubmit={async (values) => {
            try {
              if (currentCrusade && player) {
                const newOrderOfBattle = await createOrderOfBattleAsync({
                  ...values,
                  playerId: player.id,
                  crusadeId: currentCrusade.id,
                  supplyLimit: 50,
                  requisition: 5,
                  battles: 0,
                  battlesWon: 0
                });

                if (newOrderOfBattle) {
                  toast({
                    status: 'success',
                    title: SUCCESS_MESSAGE,
                    description: `Joined ${currentCrusade.name}`
                  });
                  history.push(`/order-of-battle/${newOrderOfBattle.id}/edit`);
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

export default JoinCrusade;
