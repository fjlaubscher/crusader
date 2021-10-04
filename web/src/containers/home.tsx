import React from 'react';
import { useRecoilValue } from 'recoil';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Heading,
  IconButton,
  List,
  ListItem,
  useDisclosure
} from '@chakra-ui/react';
import { MdMenu } from 'react-icons/md';

// components
import Layout from '../components/layout';
import Sidebar from '../components/sidebar';

// state
import { CrusadesAtom } from '../state/crusade';
import { PlayerAtom } from '../state/player';

const Home = () => {
  const crusades = useRecoilValue(CrusadesAtom);
  const player = useRecoilValue(PlayerAtom);
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <Sidebar isOpen={isOpen} onClose={onClose} />
      <Layout
        title="Crusader"
        actionComponent={
          <IconButton aria-label="Settings" fontSize="1.5rem" icon={<MdMenu />} onClick={onOpen} />
        }
      >
        <Alert mb={4} status="info">
          <AlertIcon alignSelf="flex-start" />
          <Box flex="1">
            <AlertTitle>Hey {player ? player.name : ''}! 🚀</AlertTitle>
            <AlertDescription display="block">
              Keep your Orders of Battle up to date in your Crusades within the universe of
              Warhammer 40,000.
            </AlertDescription>
          </Box>
        </Alert>
        <Heading mb={4}>Your Crusades</Heading>
        <List>
          {crusades.map((c) => (
            <ListItem key={c.id}>
              {c.name} ({c.createdDate})
            </ListItem>
          ))}
        </List>
      </Layout>
    </>
  );
};

export default Home;
