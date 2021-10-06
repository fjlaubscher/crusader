import React, { useState } from 'react';
import { Link as ReactRouterLink, useParams } from 'react-router-dom';
import {
  Alert,
  AlertIcon,
  Button,
  Divider,
  IconButton,
  Link,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useMediaQuery,
  VStack
} from '@chakra-ui/react';
import { MdAdd, MdEdit } from 'react-icons/md';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useAsync } from 'react-use';
import ReactMarkdown from 'react-markdown';

// api
import { getOrderOfBattleCrusadeCardsAsync } from '../../api/crusade-card';
import { getOrderOfBattleAsync } from '../../api/order-of-battle';

// components
import CrusadeCard from '../../components/crusade-card/card';
import Layout from '../../components/layout';
import Search from '../../components/search';

// state
import { OrderOfBattleAtom } from '../../state/order-of-battle';
import { PlayerAtom } from '../../state/player';

// styles
import styles from '../../styles/markdown.module.css';

const OrderOfBattle = () => {
  const { id } = useParams<IdParams>();

  const [currentOrderOfBattle, setCurrentOrderOfBattle] = useRecoilState(OrderOfBattleAtom);
  const player = useRecoilValue(PlayerAtom);

  const [idToDelete, setIdToDelete] = useState<number | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState('');
  const [crusadeCards, setCrusadeCards] = useState<Crusader.CrusadeCard[]>([]);
  const [filteredCrusadeCards, setFilteredCrusadeCards] = useState<Crusader.CrusadeCard[]>([]);

  const { loading } = useAsync(async () => {
    const orderOfBattle = await getOrderOfBattleAsync(id);
    if (orderOfBattle) {
      setCurrentOrderOfBattle(orderOfBattle);

      const cards = await getOrderOfBattleCrusadeCardsAsync(orderOfBattle.id);
      if (cards) {
        setCrusadeCards(cards);
        setFilteredCrusadeCards(cards);
      }
    }
  }, [id]);

  const playerId = player ? player.id : 0;
  const isOwner = currentOrderOfBattle && currentOrderOfBattle.playerId === playerId;

  const [isTabletOrLarger] = useMediaQuery('(min-width: 767px)');

  return (
    <Layout
      title={currentOrderOfBattle ? currentOrderOfBattle.name : 'Loading'}
      actionComponent={
        isOwner ? (
          <IconButton
            as={ReactRouterLink}
            to={`/order-of-battle/${currentOrderOfBattle.id}/edit`}
            aria-label="Edit"
            icon={<MdEdit />}
            colorScheme="blue"
          />
        ) : undefined
      }
      isLoading={loading}
    >
      {currentOrderOfBattle && (
        <>
          <SimpleGrid width="100%" columns={isTabletOrLarger ? 6 : 2} rowGap={4}>
            <Stat>
              <StatLabel>Player</StatLabel>
              <StatNumber color="blue.200">
                <Link
                  textDecoration="underline"
                  as={ReactRouterLink}
                  to={`/player/${currentOrderOfBattle.playerId}`}
                >
                  {currentOrderOfBattle.player}
                </Link>
              </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Faction</StatLabel>
              <StatNumber>{currentOrderOfBattle.faction}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Supply</StatLabel>
              <StatNumber>
                {currentOrderOfBattle.supplyUsed}/{currentOrderOfBattle.supplyLimit}PL
              </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Crusade Points</StatLabel>
              <StatNumber>{currentOrderOfBattle.crusadePoints}CP</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Requisition</StatLabel>
              <StatNumber>{currentOrderOfBattle.requisition}RP</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Battles Won</StatLabel>
              <StatNumber>
                {currentOrderOfBattle.battlesWon}/{currentOrderOfBattle.battles}
              </StatNumber>
            </Stat>
          </SimpleGrid>
          {currentOrderOfBattle && currentOrderOfBattle.notes && (
            <>
              <ReactMarkdown linkTarget="_blank" className={styles.markdown}>
                {currentOrderOfBattle.notes}
              </ReactMarkdown>
              <Divider my="1rem !important" />
            </>
          )}
          {crusadeCards && crusadeCards.length ? (
            <>
              <Search
                value={searchTerm}
                onChange={(term) => {
                  setSearchTerm(term);
                  setFilteredCrusadeCards(
                    crusadeCards.filter((c) => c.name.toLowerCase().includes(term.toLowerCase()))
                  );
                }}
              />
              <VStack mt="0 !important" width="100%">
                {filteredCrusadeCards.map((c) => (
                  <CrusadeCard
                    key={c.id}
                    crusadeCard={c}
                    onClick={() => console.log('click')}
                    onDeleteClick={isOwner ? () => setIdToDelete(c.id) : undefined}
                  />
                ))}
              </VStack>
            </>
          ) : (
            <Alert mb={4} status="info" variant="left-accent">
              <AlertIcon />
              This Order of Battle doesn&apos;t have any Crusade Cards yet.
            </Alert>
          )}
          {crusadeCards && !crusadeCards.length && isOwner && (
            <Button leftIcon={<MdAdd />} colorScheme="blue" size="lg" isFullWidth>
              New Crusade Card
            </Button>
          )}
        </>
      )}
    </Layout>
  );
};

export default OrderOfBattle;
