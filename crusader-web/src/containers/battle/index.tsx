import React, { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Accordion,
  Button,
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
  Wrap,
  WrapItem
} from '@chakra-ui/react';
import { MdArrowBack, MdEdit } from 'react-icons/md';
import { useRecoilValue } from 'recoil';
import { useAsync } from 'react-use';
import { parseISO, format } from 'date-fns';
import ReactMarkdown from 'react-markdown';

// api
import { getBattleAsync } from '../../api/battle';
import { getOrderOfBattleAsync } from '../../api/order-of-battle';

// components
import AccordionItem from '../../components/accordion-item';
import Layout from '../../components/layout';
import OrderOfBattleCard from '../../components/order-of-battle/card';
import PageHeading from '../../components/page-heading';

// state
import { PlayerOrdersOfBattleAtom } from '../../state/order-of-battle';

// styles
import styles from '../../styles/markdown.module.css';
import crusadeCard from '../crusade-card';

const Battle = () => {
  const { id } = useParams();
  const [isTabletOrLarger] = useMediaQuery('(min-width: 767px)');

  const playerOrdersOfBattle = useRecoilValue(PlayerOrdersOfBattleAtom);

  const { loading: loadingBattle, value: battle } = useAsync(async () => {
    if (id) {
      return await getBattleAsync(id);
    }

    return undefined;
  }, [id]);

  const { loading: loadingAttacker, value: attacker } = useAsync(async () => {
    if (battle) {
      return await getOrderOfBattleAsync(battle.attackerOrderOfBattleId);
    }

    return undefined;
  }, [battle]);
  const { loading: loadingDefender, value: defender } = useAsync(async () => {
    if (battle) {
      return await getOrderOfBattleAsync(battle.defenderOrderOfBattleId);
    }

    return undefined;
  }, [battle]);

  const isPlayerBattle = useMemo(() => {
    if (battle && playerOrdersOfBattle) {
      return (
        playerOrdersOfBattle.filter(
          (oob) =>
            oob.id === battle.attackerOrderOfBattleId || oob.id === battle.defenderOrderOfBattleId
        ).length > 0
      );
    }
  }, [battle, playerOrdersOfBattle]);
  const hasEnded = battle ? battle.statusId === 3 : false;

  return (
    <Layout
      title="Battle"
      actionComponent={
        isPlayerBattle && !hasEnded ? (
          <IconButton
            as={Link}
            to={`/battle/${id}/edit`}
            aria-label="Edit"
            icon={<MdEdit />}
            colorScheme="blue"
          />
        ) : undefined
      }
      isLoading={loadingBattle || loadingAttacker || loadingDefender}
    >
      {battle && attacker && defender && (
        <>
          <Button leftIcon={<MdArrowBack />} as={Link} to={`/crusade/${battle.crusadeId}`}>
            {battle.crusade}
          </Button>
          <PageHeading name={battle.name}>
            <Wrap width="100%">
              <WrapItem>
                <Tag>{format(parseISO(battle.createdDate), 'yyyy-MM-dd')}</Tag>
              </WrapItem>
              <WrapItem>
                <Tag colorScheme="green">{battle.mission}</Tag>
              </WrapItem>
              <WrapItem>
                <Tag colorScheme="blue">{battle.size}PR</Tag>
              </WrapItem>
              <WrapItem>
                <Tag colorScheme="yellow">{battle.status}</Tag>
              </WrapItem>
            </Wrap>
          </PageHeading>
          <SimpleGrid columns={2} gap={4}>
            <Stat>
              <StatLabel>{battle.attackerOrderOfBattle}</StatLabel>
              <StatNumber>{battle.attackerScore}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>{battle.defenderOrderOfBattle}</StatLabel>
              <StatNumber>{battle.defenderScore}</StatNumber>
            </Stat>
          </SimpleGrid>
          <Tabs width="100%">
            <TabList>
              <Tab>About</Tab>
              <Tab>Crusaders</Tab>
            </TabList>
            <TabPanels>
              <TabPanel width="100%" px={0}>
                <ReactMarkdown linkTarget="_blank" className={styles.markdown}>
                  {battle.notes}
                </ReactMarkdown>
              </TabPanel>
              <TabPanel width="100%" px={0}>
                <SimpleGrid
                  columns={isTabletOrLarger ? 2 : 1}
                  width="100%"
                  mt="0 !important"
                  gap={4}
                >
                  <OrderOfBattleCard orderOfBattle={attacker} showPlayerName />
                  <OrderOfBattleCard orderOfBattle={defender} showPlayerName />
                </SimpleGrid>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </>
      )}
    </Layout>
  );
};

export default Battle;
