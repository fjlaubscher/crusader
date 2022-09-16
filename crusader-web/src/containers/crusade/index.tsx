import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Accordion,
  Button,
  Divider,
  IconButton,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  useMediaQuery
} from '@chakra-ui/react';
import { MdAdd, MdEdit, MdPersonAddAlt1 } from 'react-icons/md';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useAsync } from 'react-use';
import { parseISO, format } from 'date-fns';
import ReactMarkdown from 'react-markdown';

// api
import { getCrusadeAsync, getCrusadeBattlesAsync } from '../../api/crusade';
import { getCrusadeOrdersOfBattleAsync } from '../../api/order-of-battle';

// components
import Layout from '../../components/layout';
import OrderOfBattleCard from '../../components/order-of-battle/card';
import PageHeading from '../../components/page-heading';
import Search from '../../components/search';

// state
import { CrusadeAtom } from '../../state/crusade';
import { PlayerAtom } from '../../state/player';

// styles
import styles from '../../styles/markdown.module.css';
import BattleCard from '../../components/battle/card';

const Crusade = () => {
  const { id } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentCrusade, setCurrentCrusade] = useRecoilState(CrusadeAtom);

  const [battles, setBattles] = useState<Crusader.Battle[]>([]);
  const [ordersOfBattle, setOrdersOfBattle] = useState<Crusader.OrderOfBattle[]>([]);
  const [filteredOrdersOfBattle, setFilteredOrdersOfBattle] = useState<Crusader.OrderOfBattle[]>(
    []
  );
  const player = useRecoilValue(PlayerAtom);

  const { loading } = useAsync(async () => {
    const crusade = id ? await getCrusadeAsync(id) : undefined;
    if (crusade) {
      setCurrentCrusade(crusade);

      const [battles, orders] = await Promise.all([
        getCrusadeBattlesAsync(crusade.id),
        getCrusadeOrdersOfBattleAsync(crusade.id)
      ]);

      if (battles) {
        setBattles(battles);
      }

      if (orders) {
        setOrdersOfBattle(orders);
        setFilteredOrdersOfBattle(orders);
      }
    }
  }, [id]);

  const playerId = player ? player.id : 0;
  const hasJoined = playerId
    ? ordersOfBattle.filter((o) => o.playerId === playerId).length > 0
    : false;

  const [isTabletOrLarger] = useMediaQuery('(min-width: 767px)');

  return (
    <Layout
      title="Crusade"
      actionComponent={
        currentCrusade && currentCrusade.createdById === playerId ? (
          <IconButton
            as={Link}
            to={`/crusade/${currentCrusade.id}/edit`}
            aria-label="Edit"
            icon={<MdEdit />}
            colorScheme="blue"
          />
        ) : undefined
      }
      isLoading={loading}
    >
      {currentCrusade && (
        <>
          <PageHeading name={currentCrusade.name}>
            <Tag>{format(parseISO(currentCrusade.createdDate), 'yyyy-MM-dd')}</Tag>
            <Tag as={Link} to={`/player/${currentCrusade.createdById}`} colorScheme="blue">
              @{currentCrusade.createdBy}
            </Tag>
          </PageHeading>
          {!hasJoined && (
            <Button
              leftIcon={<MdPersonAddAlt1 />}
              as={Link}
              to={`/crusade/${id}/join`}
              colorScheme="blue"
              size="lg"
              width="100%"
              mb="0.5rem !important"
            >
              Join Crusade
            </Button>
          )}
          <Tabs width="100%">
            <TabList>
              <Tab>About</Tab>
              <Tab>Battles</Tab>
              <Tab>Crusaders</Tab>
            </TabList>
            <TabPanels>
              <TabPanel width="100%" px={0}>
                <ReactMarkdown linkTarget="_blank" className={styles.markdown}>
                  {currentCrusade.notes}
                </ReactMarkdown>
              </TabPanel>
              <TabPanel width="100%" px={0}>
                {hasJoined && (
                  <>
                    <Button
                      my="0 !important"
                      leftIcon={<MdAdd />}
                      as={Link}
                      to={`/crusade/${id}/battle`}
                      colorScheme="blue"
                      size="lg"
                      width="100%"
                    >
                      New Battle
                    </Button>
                    <Divider my="1rem !important" />
                  </>
                )}
                <SimpleGrid
                  columns={isTabletOrLarger ? 3 : 1}
                  width="100%"
                  mt="0 !important"
                  gap={4}
                >
                  {battles.map((b) => (
                    <BattleCard key={b.id} battle={b} />
                  ))}
                </SimpleGrid>
              </TabPanel>
              <TabPanel width="100%" px={0}>
                <Search
                  value={searchTerm}
                  onChange={(term) => {
                    setSearchTerm(term);
                    setFilteredOrdersOfBattle(
                      ordersOfBattle.filter((c) =>
                        c.name.toLowerCase().includes(term.toLowerCase())
                      )
                    );
                  }}
                />
                <SimpleGrid
                  columns={isTabletOrLarger ? 3 : 1}
                  width="100%"
                  mt="0 !important"
                  gap={4}
                >
                  {filteredOrdersOfBattle.map((oob) => (
                    <OrderOfBattleCard key={oob.id} orderOfBattle={oob} showPlayerName />
                  ))}
                </SimpleGrid>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </>
      )}
    </Layout>
  );
};

export default Crusade;
