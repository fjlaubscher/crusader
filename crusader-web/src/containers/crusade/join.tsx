import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { FormProvider, useForm } from 'react-hook-form';
import { useAsync } from 'react-use';
import { FaSave } from 'react-icons/fa';
import slugify from 'slugify';

// api
import { getCrusadeAsync } from '../../api/crusade';
import { createOrderOfBattleAsync } from '../../api/order-of-battle';
import { getPlayersAsync, createPlayerAsync } from '../../api/player';

// components
import Alert from '../../components/alert';
import Layout from '../../components/layout';
import IconButton from '../../components/button/icon';
import JoinCrusadeForm from '../../components/crusade/join-form';

// helpers
import { PLAYER } from '../../helpers/storage';

// hooks
import useToast from '../../hooks/use-toast';

// state
import { CrusadeAtom } from '../../state/crusade';
import { PlayerAtom } from '../../state/player';
import { PlayerOrdersOfBattleAtom } from '../../state/order-of-battle';

const JoinCrusade = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const [hasPrefilledForm, setHasPrefilledForm] = useState(false);
  const [currentCrusade, setCurrentCrusade] = useRecoilState(CrusadeAtom);
  const [ordersOfBattle, setOrdersOfBattle] = useRecoilState(PlayerOrdersOfBattleAtom);
  const [player, setPlayer] = useRecoilState(PlayerAtom);

  const { loading } = useAsync(async () => {
    const crusade = id ? await getCrusadeAsync(id) : undefined;
    if (crusade) {
      setCurrentCrusade(crusade);
    }
  }, [id]);

  const form = useForm<Crusader.OrderOfBattle>({
    mode: 'onChange'
  });
  const {
    reset,
    formState: { isValid, isSubmitting }
  } = form;

  useEffect(() => {
    if (!hasPrefilledForm && player) {
      reset({ player: player.name });
      setHasPrefilledForm(true);
    }
  }, [hasPrefilledForm, setHasPrefilledForm, player, reset]);

  return (
    <FormProvider {...form}>
      <Layout
        title="Join Crusade"
        action={
          <IconButton
            disabled={!isValid || isSubmitting}
            loading={isSubmitting}
            type="submit"
            form="join-crusade-form"
            variant="info"
          >
            <FaSave />
          </IconButton>
        }
        isLoading={loading}
      >
        <Alert variant="info" title="😎 You're invited!">
          Complete the form below to join {currentCrusade ? currentCrusade.name : 'the Crusade'}
        </Alert>
        <JoinCrusadeForm
          onSubmit={async (values) => {
            try {
              if (currentCrusade) {
                let playerId = player ? player.id : 0;

                if (!playerId) {
                  // user isn't signed in
                  // look them up, if there's no such user, create an account
                  const sluggedName = slugify(values.player);
                  const players = await getPlayersAsync(sluggedName);

                  if (players && players.length) {
                    playerId = players[0].id;
                    localStorage.setItem(PLAYER, JSON.stringify(players[0]));
                    setPlayer(players[0]);
                  } else {
                    const createdPlayer = await createPlayerAsync(sluggedName);
                    if (createdPlayer) {
                      playerId = createdPlayer.id;
                      localStorage.setItem(PLAYER, JSON.stringify(createdPlayer));
                      setPlayer(createdPlayer);
                    }
                  }
                }

                if (playerId) {
                  const newOrderOfBattle = await createOrderOfBattleAsync({
                    ...values,
                    playerId,
                    crusadeId: currentCrusade.id,
                    supplyLimit: 50,
                    requisition: 5,
                    battles: 0,
                    battlesWon: 0,
                    notes: ''
                  });

                  if (newOrderOfBattle) {
                    toast({
                      variant: 'success',
                      text: `Joined ${currentCrusade.name}`
                    });
                    setOrdersOfBattle(
                      ordersOfBattle ? [...ordersOfBattle, newOrderOfBattle] : [newOrderOfBattle]
                    );
                    navigate(`/order-of-battle/${newOrderOfBattle.id}`);
                  }
                }
              }
            } catch (ex: any) {
              toast({
                variant: 'error',
                text: ex.message || 'Unable to join Crusade'
              });
            }
          }}
        />
      </Layout>
    </FormProvider>
  );
};

export default JoinCrusade;
