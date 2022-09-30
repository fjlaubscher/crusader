import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { useForm } from 'react-hook-form';
import { FaHammer, FaKey } from 'react-icons/fa';
import slugify from 'slugify';

// api
import { createPlayerAsync, getPlayersAsync } from '../../api/player';

// components
import Button from '../../components/button';
import Form from '../../components/form';
import InputField from '../../components/field/input';
import Layout from '../../components/layout';

// helpers
import { PLAYER } from '../../helpers/storage';

// hooks
import useToast from '../../hooks/use-toast';

// state
import { PlayerAtom } from '../../state/player';

import styles from './sign-in.module.scss';

const SignIn = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const setPlayer = useSetRecoilState(PlayerAtom);

  const { formState, handleSubmit, register } = useForm<Crusader.ListItem>({
    mode: 'onChange'
  });

  const onSubmit = useCallback(
    async (player: Crusader.ListItem) => {
      try {
        const sluggedName = slugify(player.name);
        const players = await getPlayersAsync(sluggedName);
        let crusaderPlayer: Crusader.Player | undefined = undefined;

        if (players && players.length) {
          crusaderPlayer = players[0];
        } else {
          crusaderPlayer = await createPlayerAsync(sluggedName);
        }

        if (crusaderPlayer) {
          localStorage.setItem(PLAYER, JSON.stringify(crusaderPlayer));
          setPlayer(crusaderPlayer);
          navigate('/');
        }

        toast({ variant: 'success', text: 'Signed in' });
      } catch (ex: any) {
        toast({ variant: 'error', text: ex.message || 'Error signing in' });
      }
    },
    [setPlayer, toast, navigate]
  );

  return (
    <div className={styles.page}>
      <div className={styles.logo}>
        <FaHammer />
        <span className={styles.title}>Crusader</span>
      </div>
      <Form className={styles.form} onSubmit={handleSubmit(onSubmit)} testId="sign-in-form">
        <InputField
          type="text"
          placeholder="Username"
          {...register('name', {
            required: true,
            validate: (value) => value.length > 3
          })}
        />
        <Button
          disabled={!formState.isValid}
          loading={formState.isSubmitting}
          type="submit"
          variant="info"
          leftIcon={<FaKey />}
        >
          Sign In
        </Button>
      </Form>
    </div>
  );
};

export default SignIn;
