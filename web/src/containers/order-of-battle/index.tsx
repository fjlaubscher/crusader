import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Alert, AlertIcon, Divider, IconButton, Progress, VStack } from '@chakra-ui/react';
import { MdEdit } from 'react-icons/md';
import { useRecoilState, useRecoilValue } from 'recoil';
import ReactMarkdown from 'react-markdown';
import { useAsync } from 'react-use';

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

  return (
    <Layout
      title={currentOrderOfBattle ? currentOrderOfBattle.name : 'Loading'}
      actionComponent={
        isOwner ? (
          <IconButton
            as={Link}
            to={`/order-of-battle/${currentOrderOfBattle.id}/edit`}
            aria-label="Edit"
            fontSize="1.5rem"
            icon={<MdEdit />}
            colorScheme="blue"
          />
        ) : undefined
      }
      isLoading={loading}
    >
      {currentOrderOfBattle && currentOrderOfBattle.notes && (
        <>
          <ReactMarkdown linkTarget="_blank" className="markdown">
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
    </Layout>
  );
};

export default OrderOfBattle;
