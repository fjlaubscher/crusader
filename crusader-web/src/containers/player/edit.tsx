import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaSave } from 'react-icons/fa';
import { FormProvider, useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { IconButton, useToast } from '@fjlaubscher/matter';

// api
import { updatePlayerAsync } from '../../api/player';

// components
import Layout from '../../components/layout';
import LinkButton from '../../components/button/link';
import PlayerForm from '../../components/player/form';

// state
import { PlayerAtom } from '../../state/player';

import styles from './player.module.scss';

const EditPlayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const [player, setPlayer] = useRecoilState(PlayerAtom);
  const [hasFilled, setHasFilled] = useState(false);

  const form = useForm<Crusader.Player>({ mode: 'onChange' });
  const {
    reset,
    formState: { isSubmitting, isValid }
  } = form;

  const isCurrentPlayer = player && id ? player.id === parseInt(id) : false;

  useEffect(() => {
    if (!hasFilled && player && isCurrentPlayer) {
      reset(player);
      setHasFilled(true);
    }
  }, [isCurrentPlayer, player, reset, hasFilled, setHasFilled]);

  if (!isCurrentPlayer) {
    return <Navigate to="/" />;
  }

  return (
    <FormProvider {...form}>
      <Layout
        title="Edit Player"
        action={
          <IconButton
            disabled={!isValid || isSubmitting}
            loading={isSubmitting}
            type="submit"
            form="player-form"
            variant="info"
          >
            <FaSave />
          </IconButton>
        }
      >
        <LinkButton className={styles.back} leftIcon={<FaArrowLeft />} to={`/player/${id}`}>
          Back
        </LinkButton>
        <PlayerForm
          onSubmit={async (values) => {
            try {
              if (player) {
                const updatedPlayer = await updatePlayerAsync({
                  ...player,
                  ...values
                });

                if (updatedPlayer) {
                  toast({
                    variant: 'success',
                    text: 'Profile updated'
                  });

                  setPlayer(updatedPlayer);
                  navigate(`/player/${updatedPlayer.id}`);
                }
              }
            } catch (ex: any) {
              toast({
                variant: 'error',
                text: ex.message || 'Unable to update Profile'
              });
            }
          }}
        />
      </Layout>
    </FormProvider>
  );
};

export default EditPlayer;
