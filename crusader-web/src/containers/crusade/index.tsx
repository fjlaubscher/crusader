import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
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
  useMediaQuery,
  useToast
} from '@chakra-ui/react';
import { MdAdd, MdEdit, MdPersonAddAlt1, MdShare } from 'react-icons/md';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useAsync, useSessionStorage } from 'react-use';
import { parseISO, format } from 'date-fns';
import ReactMarkdown from 'react-markdown';

// api
import { deleteCrusadeAsync, getCrusadeAsync, getCrusadeBattlesAsync } from '../../api/crusade';
import { getCrusadeOrdersOfBattleAsync } from '../../api/order-of-battle';

// components
import BattleCard from '../../components/battle/card';
import DeleteModal from '../../components/delete-modal';
import Layout from '../../components/layout';
import OrderOfBattleCard from '../../components/order-of-battle/card';
import PageHeading from '../../components/page-heading';

// helpers
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '../../helpers/messages';
import { CRUSADE_TAB } from '../../helpers/storage';

// state
import { CrusadeAtom } from '../../state/crusade';
import { PlayerAtom } from '../../state/player';

// styles
import styles from '../../styles/markdown.module.css';

const Crusade = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [tabIndex, setTabIndex] = useSessionStorage<number | undefined>(CRUSADE_TAB);

  const player = useRecoilValue(PlayerAtom);
  const [currentCrusade, setCurrentCrusade] = useRecoilState(CrusadeAtom);

  const [battles, setBattles] = useState<Crusader.Battle[]>([]);
  const [ordersOfBattle, setOrdersOfBattle] = useState<Crusader.OrderOfBattle[]>([]);

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
      }
    }
  }, [id]);

  const playerId = player ? player.id : 0;
  const isOwner = currentCrusade ? currentCrusade.createdById === playerId : false;
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
          {isOwner && (
            <Button
              leftIcon={<MdShare />}
              colorScheme="blue"
              width="100%"
              onClick={async () => {
                try {
                  const shareLink = `https://crusader.francoislaubscher.dev/crusade/${id}`;
                  if (isTabletOrLarger) {
                    await navigator.clipboard.writeText(shareLink);
                    toast({
                      title: SUCCESS_MESSAGE,
                      description: 'Link copied to your clipboard.',
                      status: 'success',
                      isClosable: true
                    });
                  } else {
                    await navigator.share({
                      title: currentCrusade.name,
                      url: shareLink
                    });
                    toast({
                      title: SUCCESS_MESSAGE,
                      description: 'List shared.',
                      status: 'success',
                      isClosable: true
                    });
                  }
                } catch (ex: any) {
                  toast({
                    status: 'error',
                    title: ERROR_MESSAGE,
                    description: ex.message || 'Unable to share.'
                  });
                }
              }}
            >
              Share
            </Button>
          )}
          {!hasJoined && (
            <Button
              leftIcon={<MdPersonAddAlt1 />}
              as={Link}
              to={`/crusade/${id}/join`}
              colorScheme="blue"
              mb="0.5rem !important"
            >
              Join Crusade
            </Button>
          )}
          <Tabs index={tabIndex || 0} onChange={setTabIndex} width="100%">
            <TabList>
              <Tab>About</Tab>
              <Tab>Battles</Tab>
              <Tab>Crusaders</Tab>
              {isOwner && <Tab>Settings</Tab>}
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
                {ordersOfBattle && ordersOfBattle.length > 0 ? (
                  <SimpleGrid columns={isTabletOrLarger ? 3 : 1} width="100%" gap={4}>
                    {ordersOfBattle.map((oob) => (
                      <OrderOfBattleCard key={oob.id} orderOfBattle={oob} showPlayerName />
                    ))}
                  </SimpleGrid>
                ) : undefined}
              </TabPanel>
              {isOwner && (
                <TabPanel width="100%" px={0}>
                  <DeleteModal
                    title={`Delete ${currentCrusade.name}`}
                    onDelete={() => deleteCrusadeAsync(currentCrusade.id)}
                    onDeleteSuccess={() => {
                      toast({
                        status: 'success',
                        title: SUCCESS_MESSAGE,
                        description: `${currentCrusade.name} deleted.`
                      });

                      navigate(`/`);
                    }}
                    onDeleteError={(errorMessage) => {
                      toast({
                        status: 'error',
                        title: ERROR_MESSAGE,
                        description: errorMessage || `Unable to delete ${currentCrusade.name}.`
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

export default Crusade;
