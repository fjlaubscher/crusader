import React, { useState } from 'react';
import { Link as ReactRouterLink, useParams } from 'react-router-dom';
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
  Tag,
  useMediaQuery,
  VStack
} from '@chakra-ui/react';
import { MdAdd, MdArrowBack, MdEdit } from 'react-icons/md';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useAsync } from 'react-use';
import ReactMarkdown from 'react-markdown';

// api
import { getOrderOfBattleCrusadeCardsAsync } from '../../api/crusade-card';
import { getOrderOfBattleAsync } from '../../api/order-of-battle';

// components
import CrusadeCard from '../../components/crusade-card/card';
import Layout from '../../components/layout';
import PageHeading from '../../components/page-heading';
import Search from '../../components/search';

// state
import { OrderOfBattleAtom } from '../../state/order-of-battle';
import { PlayerAtom } from '../../state/player';

// styles
import styles from '../../styles/markdown.module.css';

const OrderOfBattle = () => {
  const { id } = useParams();

  const [currentOrderOfBattle, setCurrentOrderOfBattle] = useRecoilState(OrderOfBattleAtom);
  const player = useRecoilValue(PlayerAtom);

  const [searchTerm, setSearchTerm] = useState('');
  const [crusadeCards, setCrusadeCards] = useState<Crusader.CrusadeCard[]>([]);
  const [filteredCrusadeCards, setFilteredCrusadeCards] = useState<Crusader.CrusadeCard[]>([]);

  const { loading } = useAsync(async () => {
    const orderOfBattle = id ? await getOrderOfBattleAsync(id) : undefined;
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
      title="Order of Battle"
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
          <Button
            leftIcon={<MdArrowBack />}
            as={ReactRouterLink}
            to={`/crusade/${currentOrderOfBattle.crusadeId}`}
          >
            {currentOrderOfBattle.crusade}
          </Button>
          <PageHeading name={currentOrderOfBattle.name}>
            <Tag
              as={ReactRouterLink}
              to={`/player/${currentOrderOfBattle.playerId}`}
              colorScheme="blue"
            >
              @{currentOrderOfBattle.player}
            </Tag>
            <Tag>{currentOrderOfBattle.faction}</Tag>
            <Tag colorScheme="green">{currentOrderOfBattle.supplyUsed}PR</Tag>
          </PageHeading>
          <SimpleGrid width="100%" columns={isTabletOrLarger ? 4 : 2} rowGap={4}>
            <Stat>
              <StatLabel>Supply Limit</StatLabel>
              <StatNumber>{currentOrderOfBattle.supplyLimit}PR</StatNumber>
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
            </>
          )}
          {isOwner && (
            <>
              <Divider my="1rem !important" />
              <Button
                my="0 !important"
                leftIcon={<MdAdd />}
                as={ReactRouterLink}
                to={`/order-of-battle/${id}/crusade-card`}
                colorScheme="blue"
                size="lg"
                width="100%"
              >
                New Crusade Card
              </Button>
            </>
          )}
          {crusadeCards && crusadeCards.length ? (
            <>
              <Divider my="1rem !important" />
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
                  <CrusadeCard key={c.id} crusadeCard={c} />
                ))}
              </VStack>
            </>
          ) : (
            <Alert mb={4} status="info" variant="left-accent">
              <AlertIcon />
              This Order of Battle doesn&apos;t have any Crusade Cards yet.
            </Alert>
          )}
        </>
      )}
    </Layout>
  );
};

export default OrderOfBattle;
