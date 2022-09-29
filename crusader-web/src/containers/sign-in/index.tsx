import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { useForm } from 'react-hook-form';
import { FaKey } from 'react-icons/fa';
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

const SignIn = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [player, setPlayer] = useRecoilState(PlayerAtom);
  const [loading, setLoading] = useState(false);

  const { formState, handleSubmit, register } = useForm<Crusader.ListItem>({
    mode: 'onChange',
    defaultValues: {
      name: ''
    }
  });

  async function onSubmit(player: Crusader.ListItem) {
    try {
      setLoading(true);
      const sluggedName = slugify(player.name);
      const players = await getPlayersAsync(sluggedName);
      let crusaderPlayer: Crusader.ListItem | undefined = undefined;

      if (players && players.length) {
        crusaderPlayer = players[0];
      } else {
        crusaderPlayer = await createPlayerAsync(sluggedName);
      }

      if (crusaderPlayer) {
        localStorage.setItem(PLAYER, JSON.stringify(crusaderPlayer));
        setPlayer(crusaderPlayer);
      }

      toast({ text: 'Signed in', variant: 'success' });
    } catch (ex: any) {
      toast({ text: ex.message || 'Error signing in', variant: 'error' });
    }

    setLoading(false);
  }

  if (player) {
    navigate('/');
  }

  return (
    <Layout title="Sign In" isLoading={loading}>
      <Form onSubmit={handleSubmit(onSubmit)} testId="sign-in-form">
        <InputField
          label="Enter your username"
          type="text"
          placeholder="eg. Player69"
          {...register('name', {
            required: true,
            validate: (value) => value.length > 3
          })}
        />
        <Button disabled={!formState.isValid} type="submit" variant="success" leftIcon={<FaKey />}>
          Sign In
        </Button>
      </Form>
    </Layout>
  );
};

export default SignIn;
