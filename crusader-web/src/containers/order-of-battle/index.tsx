import React, { useEffect, useState } from 'react';
import { Link as ReactRouterLink, useNavigate, useParams } from 'react-router-dom';
import {
  Alert,
  AlertIcon,
  Button,
  Divider,
  IconButton,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  useMediaQuery,
  useToast
} from '@chakra-ui/react';
import { MdAdd, MdArrowBack, MdEdit } from 'react-icons/md';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useAsync, useSessionStorage } from 'react-use';
import ReactMarkdown from 'react-markdown';

// api
import { getOrderOfBattleCrusadeCardsAsync } from '../../api/crusade-card';
import {
  deleteOrderOfBattleAsync,
  getOrderOfBattleAsync,
  getOrderOfBattleBattlesAsync
} from '../../api/order-of-battle';

// components
import BattleCard from '../../components/battle/card';
import CrusadeCard from '../../components/crusade-card/card';
import DeleteModal from '../../components/delete-modal';
import Layout from '../../components/layout';
import PageHeading from '../../components/page-heading';

// helpers
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '../../helpers/messages';
import { ORDER_OF_BATTLE_TAB } from '../../helpers/storage';

// state
import { OrderOfBattleAtom } from '../../state/order-of-battle';
import { PlayerAtom } from '../../state/player';

// styles
import styles from '../../styles/markdown.module.css';

const OrderOfBattle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [tabIndex, setTabIndex] = useSessionStorage<number | undefined>(ORDER_OF_BATTLE_TAB);

  const [orderOfBattle, setOrderOfBattle] = useRecoilState(OrderOfBattleAtom);
  const player = useRecoilValue(PlayerAtom);

  const [battles, setBattles] = useState<Crusader.Battle[]>([]);
  const [crusadeCards, setCrusadeCards] = useState<Crusader.CrusadeCard[]>([]);

  const { loading } = useAsync(async () => {
    const oob = id ? await getOrderOfBattleAsync(id) : undefined;
    if (oob) {
      setOrderOfBattle(oob);

      const [battles, cards] = await Promise.all([
        getOrderOfBattleBattlesAsync(oob.id),
        getOrderOfBattleCrusadeCardsAsync(oob.id)
      ]);

      if (battles) {
        setBattles(battles);
      }

      if (cards) {
        setCrusadeCards(cards);
      }
    }
  }, [id]);

  const playerId = player ? player.id : 0;
  const isOwner = orderOfBattle && orderOfBattle.playerId === playerId;

  const [isTabletOrLarger] = useMediaQuery('(min-width: 767px)');

  useEffect(() => {}, []);

  return (
    <Layout
      title="Order of Battle"
      actionComponent={
        isOwner ? (
          <IconButton
            as={ReactRouterLink}
            to={`/order-of-battle/${orderOfBattle.id}/edit`}
            aria-label="Edit"
            icon={<MdEdit />}
            colorScheme="blue"
          />
        ) : undefined
      }
      isLoading={loading}
    >
      {orderOfBattle && (
        <>
          <Button
            leftIcon={<MdArrowBack />}
            as={ReactRouterLink}
            to={`/crusade/${orderOfBattle.crusadeId}`}
          >
            {orderOfBattle.crusade}
          </Button>
          <PageHeading name={orderOfBattle.name} description={orderOfBattle.faction}>
            <Tag as={ReactRouterLink} to={`/player/${orderOfBattle.playerId}`} colorScheme="blue">
              @{orderOfBattle.player}
            </Tag>
          </PageHeading>
          <SimpleGrid width="100%" columns={isTabletOrLarger ? 4 : 2} rowGap={4}>
            <Stat>
              <StatLabel>Power Rating</StatLabel>
              <StatNumber>
                {orderOfBattle.supplyUsed}/{orderOfBattle.supplyLimit}PR
              </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Crusade Points</StatLabel>
              <StatNumber>{orderOfBattle.crusadePoints}CP</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Requisition</StatLabel>
              <StatNumber>{orderOfBattle.requisition}RP</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Battles Won</StatLabel>
              <StatNumber>
                {orderOfBattle.battlesWon}/{orderOfBattle.battles}
              </StatNumber>
            </Stat>
          </SimpleGrid>
          <Tabs index={tabIndex || 0} onChange={setTabIndex} width="100%">
            <TabList>
              <Tab>About</Tab>
              <Tab>Battles</Tab>
              <Tab>Cards</Tab>
              {isOwner && <Tab>Settings</Tab>}
            </TabList>
            <TabPanels>
              <TabPanel width="100%" px={0}>
                {orderOfBattle && orderOfBattle.notes && (
                  <ReactMarkdown linkTarget="_blank" className={styles.markdown}>
                    {orderOfBattle.notes}
                  </ReactMarkdown>
                )}
              </TabPanel>
              <TabPanel width="100%" px={0}>
                {isOwner && (
                  <>
                    <Button
                      my="0 !important"
                      leftIcon={<MdAdd />}
                      as={ReactRouterLink}
                      to={`/crusade/${orderOfBattle.crusadeId}/battle`}
                      colorScheme="blue"
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
                {isOwner && (
                  <>
                    <Button
                      my="0 !important"
                      leftIcon={<MdAdd />}
                      as={ReactRouterLink}
                      to={`/order-of-battle/${id}/crusade-card`}
                      colorScheme="blue"
                      width="100%"
                    >
                      New Crusade Card
                    </Button>
                    <Divider my="1rem !important" />
                  </>
                )}
                {crusadeCards && crusadeCards.length ? (
                  <SimpleGrid
                    columns={isTabletOrLarger ? 3 : 1}
                    width="100%"
                    mt="0 !important"
                    gap={4}
                  >
                    {crusadeCards.map((c) => (
                      <CrusadeCard key={c.id} crusadeCard={c} />
                    ))}
                  </SimpleGrid>
                ) : (
                  <Alert mb={4} status="info" variant="left-accent">
                    <AlertIcon />
                    This Order of Battle doesn&apos;t have any Crusade Cards yet.
                  </Alert>
                )}
              </TabPanel>
              {isOwner && (
                <TabPanel width="100%" px={0}>
                  <DeleteModal
                    title={`Delete ${orderOfBattle.name}`}
                    onDelete={() => deleteOrderOfBattleAsync(orderOfBattle.id)}
                    onDeleteSuccess={() => {
                      toast({
                        status: 'success',
                        title: SUCCESS_MESSAGE,
                        description: `${orderOfBattle.name} deleted.`
                      });

                      navigate(`/`);
                    }}
                    onDeleteError={(errorMessage) => {
                      toast({
                        status: 'error',
                        title: ERROR_MESSAGE,
                        description: errorMessage || `Unable to delete ${orderOfBattle.name}.`
                      });
                    }}
                  />
                </TabPanel>
              )}
            </TabPanels>
          </Tabs>
        </>
      )}
    </Layout>
  );
};

export default OrderOfBattle;
