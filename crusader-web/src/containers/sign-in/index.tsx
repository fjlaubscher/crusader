import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { useForm } from 'react-hook-form';
import { Button, Input, Progress, useToast } from '@chakra-ui/react';
import { MdLogin } from 'react-icons/md';
import slugify from 'slugify';

// api
import { createPlayerAsync, getPlayersAsync } from '../../api/player';

// components
import AuthLayout from '../../components/layout/auth';

// helpers
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '../../helpers/messages';

// state
import { PlayerAtom } from '../../state/player';

// storage
import { PLAYER } from '../../helpers/storage';

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

      toast({
        status: 'success',
        title: SUCCESS_MESSAGE,
        description: 'Signed in'
      });
    } catch (ex: any) {
      toast({
        status: 'error',
        title: ERROR_MESSAGE,
        description: ex.message
      });
    }

    setLoading(false);
  }

  if (player) {
    navigate('/');
  }

  return (
    <AuthLayout title="Sign In">
      {loading ? (
        <Progress isIndeterminate data-testid="loader" />
      ) : (
        <form
          style={{ width: '100%' }}
          onSubmit={handleSubmit(onSubmit)}
          data-testid="sign-in-form"
        >
          <Input
            mb={4}
            type="text"
            placeholder="Enter your username"
            {...register('name', {
              required: true,
              validate: (value) => value.length > 6
            })}
          />
          <Button
            disabled={!formState.isValid}
            type="submit"
            leftIcon={<MdLogin />}
            colorScheme="blue"
            width="100%"
          >
            Sign In
          </Button>
        </form>
      )}
    </AuthLayout>
  );
};

export default SignIn;
