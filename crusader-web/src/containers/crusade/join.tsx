import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  useToast,
  IconButton,
  Alert,
  AlertIcon,
  Box,
  AlertTitle,
  AlertDescription,
  Divider
} from '@chakra-ui/react';
import { useRecoilState } from 'recoil';
import { FormProvider, useForm } from 'react-hook-form';
import { MdSave } from 'react-icons/md';
import { useAsync, useMount } from 'react-use';
import ReactMarkdown from 'react-markdown';
import slugify from 'slugify';

// api
import { getCrusadeAsync } from '../../api/crusade';
import { createOrderOfBattleAsync } from '../../api/order-of-battle';
import { getPlayersAsync, createPlayerAsync } from '../../api/player';

// components
import Layout from '../../components/layout';
import JoinCrusadeForm from '../../components/crusade/join-form';

// helpers
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '../../helpers/messages';
import { PLAYER } from '../../helpers/storage';

// state
import { CrusadeAtom } from '../../state/crusade';
import { PlayerAtom } from '../../state/player';

// styles
import styles from '../../styles/markdown.module.css';

const JoinCrusade = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const [currentCrusade, setCurrentCrusade] = useRecoilState(CrusadeAtom);
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

  useMount(() => {
    if (player) {
      form.reset({
        player: player.name
      });
    }
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
            form="join-crusade-form"
          />
        }
        isLoading={loading}
      >
        <Alert status="info">
          <AlertIcon alignSelf="flex-start" />
          <Box flex="1">
            <AlertTitle>😎 You&apos;re invited!</AlertTitle>
            <AlertDescription display="block">
              Please read through the description of this Crusade and complete the form below.
            </AlertDescription>
          </Box>
        </Alert>
        {currentCrusade && currentCrusade.notes && (
          <ReactMarkdown linkTarget="_blank" className={styles.markdown}>
            {currentCrusade.notes}
          </ReactMarkdown>
        )}
        <Divider />
        <Alert status="info">
          <AlertIcon alignSelf="flex-start" />
          <Box flex="1">
            <AlertTitle>📝 Create your Order of Battle!</AlertTitle>
            <AlertDescription display="block">
              You&apos;ll get to adding your Crusade Cards in a bit.
            </AlertDescription>
          </Box>
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
                      status: 'success',
                      title: SUCCESS_MESSAGE,
                      description: `Joined ${currentCrusade.name}`
                    });
                    navigate(`/order-of-battle/${newOrderOfBattle.id}`);
                  }
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
