import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { Input, useToast, IconButton, Alert, AlertIcon } from '@chakra-ui/react';
import { MdSave } from 'react-icons/md';
import slugify from 'slugify';

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
  const [submitting, setSubmitting] = useState(false);

  async function updatePlayer() {
    try {
      setSubmitting(true);
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

    setSubmitting(false);
  }

  return (
    <Layout
      title="Settings"
      actionComponent={
        <IconButton
          aria-label="Save"
          icon={<MdSave />}
          disabled={playerName.length <= 6}
          onClick={updatePlayer}
          colorScheme="blue"
          isLoading={submitting}
        />
      }
    >
      <Alert mb={4} status="info" variant="left-accent">
        <AlertIcon />
        Update your username here.
      </Alert>
      <Input
        disabled={submitting}
        type="text"
        value={playerName}
        onChange={(e) => setPlayerName(e.currentTarget.value)}
        placeholder="Enter your username"
      />
    </Layout>
  );
};

export default Settings;
