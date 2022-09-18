import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import {
  Alert,
  AlertIcon,
  Button,
  IconButton,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
  useMediaQuery,
  VStack
} from '@chakra-ui/react';
import { MdMenu, MdChevronRight, MdAdd } from 'react-icons/md';
import { useAsync } from 'react-use';

// api
import { getPlayerCrusadesAsync } from '../api/crusade';

// components
import CrusaderAlert from '../components/crusader-alert';
import Layout from '../components/layout';
import OrderOfBattleCard from '../components/order-of-battle/card';
import Sidebar from '../components/sidebar';

// state
import { PlayerAtom } from '../state/player';
import { PlayerOrdersOfBattleAtom } from '../state/order-of-battle';

const Home = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const player = useRecoilValue(PlayerAtom);
  const ordersOfBattle = useRecoilValue(PlayerOrdersOfBattleAtom);

  const { loading, value: crusades } = useAsync(async () => {
    if (player) {
      return await getPlayerCrusadesAsync(player.id);
    }

    return undefined;
  }, [player]);

  const [isTabletOrLarger] = useMediaQuery('(min-width: 767px)');

  return (
    <>
      <Sidebar isOpen={isOpen} onClose={onClose} />
      <Layout
        title="Home"
        actionComponent={<IconButton aria-label="Settings" icon={<MdMenu />} onClick={onOpen} />}
        isLoading={loading}
      >
        <CrusaderAlert playerName={player ? player.name : ''} />
        <Tabs width="100%">
          <TabList>
            <Tab>Orders of Battle</Tab>
            <Tab>Your Crusades</Tab>
          </TabList>
          <TabPanels>
            <TabPanel width="100%" px={0}>
              {ordersOfBattle && ordersOfBattle.length > 0 ? (
                <SimpleGrid columns={isTabletOrLarger ? 3 : 1} width="100%" gap={4}>
                  {ordersOfBattle.map((oob) => (
                    <OrderOfBattleCard key={oob.id} orderOfBattle={oob} showCrusadeName />
                  ))}
                </SimpleGrid>
              ) : (
                <Alert status="info" variant="left-accent">
                  <AlertIcon />
                  You don't have any Orders of Battle yet.
                  <br />
                  Join a Crusade to get started!
                </Alert>
              )}
            </TabPanel>
            <TabPanel width="100%" px={0}>
              {crusades && crusades.length > 0 ? (
                <SimpleGrid columns={isTabletOrLarger ? 3 : 1} width="100%" gap={4}>
                  {crusades.map((c) => (
                    <Button
                      rightIcon={<MdChevronRight />}
                      key={c.id}
                      as={ReactRouterLink}
                      to={`/crusade/${c.id}`}
                      size="lg"
                      width="100%"
                      justifyContent="space-between"
                    >
                      {c.name}
                    </Button>
                  ))}
                </SimpleGrid>
              ) : (
                <VStack width="100%">
                  <Alert status="info" variant="left-accent">
                    <AlertIcon />
                    You haven't joined any Crusades yet.
                    <br />
                    Create one to get started!
                  </Alert>
                  <Button
                    leftIcon={<MdAdd />}
                    as={ReactRouterLink}
                    to={`/crusade`}
                    colorScheme="blue"
                    size="lg"
                    width="100%"
                    mb="0.5rem !important"
                  >
                    New Crusade
                  </Button>
                </VStack>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Layout>
    </>
  );
};

export default Home;
