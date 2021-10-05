import React, { useState } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Divider,
  Heading,
  IconButton,
  Link,
  useDisclosure,
  VStack
} from '@chakra-ui/react';
import { MdMenu, MdChevronRight, MdAdd } from 'react-icons/md';

// components
import Layout from '../components/layout';
import Search from '../components/search';
import Sidebar from '../components/sidebar';

// state
import { CrusadesAtom } from '../state/crusade';
import { PlayerAtom } from '../state/player';

const Home = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const crusades = useRecoilValue(CrusadesAtom);
  const player = useRecoilValue(PlayerAtom);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCrusades, setFilteredCrusades] = useState(crusades);

  return (
    <>
      <Sidebar isOpen={isOpen} onClose={onClose} />
      <Layout
        title="Crusader"
        actionComponent={
          <IconButton aria-label="Settings" fontSize="1.5rem" icon={<MdMenu />} onClick={onOpen} />
        }
      >
        <Alert mb={4} height="auto" status="info">
          <AlertIcon alignSelf="flex-start" />
          <Box flex="1">
            <AlertTitle>👋 Hey {player ? player.name : ''}!</AlertTitle>
            <AlertDescription display="block">
              Crusader is a free and open-source Warhammer 40,000 Crusade assistant.
              <br />
              <Link
                textDecoration="underline"
                href="https://github.com/fjlaubscher/crusader"
                target="_blank"
                rel="noopener"
              >
                https://github.com/fjlaubscher/crusader
              </Link>
            </AlertDescription>
          </Box>
        </Alert>
        <Heading mb="1rem !important">Your Crusades</Heading>
        <Button
          leftIcon={<MdAdd />}
          colorScheme="blue"
          size="lg"
          as={ReactRouterLink}
          to="/crusade/"
          isFullWidth
        >
          New Crusade
        </Button>
        {crusades.length && (
          <>
            <Divider my="1rem !important" />
            <Search
              value={searchTerm}
              onChange={(term) => {
                setSearchTerm(term);
                setFilteredCrusades(
                  crusades.filter((c) => c.name.toLowerCase().includes(term.toLowerCase()))
                );
              }}
            />
            <Divider my="1rem !important" />
            <VStack width="100%">
              {filteredCrusades.map((c) => (
                <Button
                  rightIcon={<MdChevronRight />}
                  key={c.id}
                  as={ReactRouterLink}
                  to={`/crusade/${c.id}`}
                  size="lg"
                  isFullWidth
                  justifyContent="space-between"
                >
                  {c.name}
                </Button>
              ))}
            </VStack>
          </>
        )}
      </Layout>
    </>
  );
};

export default Home;
