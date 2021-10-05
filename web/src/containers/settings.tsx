import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  Button,
  Input,
  Progress,
  Heading,
  useToast,
  IconButton,
  Alert,
  AlertIcon
} from '@chakra-ui/react';
import slugify from 'slugify';
import { MdSave } from 'react-icons/md';

// api
import { updatePlayerAsync } from '../api/player';

// components
import Layout from '../components/layout';

// helpers
import { SUCCESS_MESSAGE, ERROR_MESSAGE } from '../helpers/messages';
import { PLAYER } from '../helpers/storage';

// state
import { PlayerAtom } from '../state/player';

const Settings = () => {
  const toast = useToast();

  const [player, setPlayer] = useRecoilState(PlayerAtom);
  const [playerName, setPlayerName] = useState(player ? player.name : '');
  const [loading, setLoading] = useState(false);

  async function updatePlayer() {
    try {
      setLoading(true);
      const sluggedName = slugify(playerName);
      if (player) {
        const updatedPlayer = await updatePlayerAsync({ id: player.id, name: sluggedName });

        if (updatedPlayer) {
          localStorage.setItem(PLAYER, JSON.stringify(updatedPlayer));
          setPlayer(updatedPlayer);

          toast({
            status: 'success',
            title: SUCCESS_MESSAGE,
            description: 'Settings updated.'
          });
        }
      }
    } catch (ex: any) {
      toast({
        status: 'error',
        title: ERROR_MESSAGE,
        description: ex.message
      });
    }

    setLoading(false);
  }

  return (
    <Layout
      title="Settings"
      actionComponent={
        <IconButton
          aria-label="Save"
          fontSize="1.5rem"
          icon={<MdSave />}
          disabled={playerName.length <= 6}
          onClick={updatePlayer}
          colorScheme="blue"
          isLoading={loading}
        />
      }
    >
      <Alert mb={4} status="info" variant="left-accent">
        <AlertIcon />
        Update your username here.
      </Alert>
      <Input
        disabled={loading}
        type="text"
        value={playerName}
        onChange={(e) => setPlayerName(e.currentTarget.value)}
        placeholder="Enter your username"
      />
    </Layout>
  );
};

export default Settings;
