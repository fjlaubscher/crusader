import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Divider, IconButton, Progress, VStack } from '@chakra-ui/react';
import { MdEdit } from 'react-icons/md';
import { useRecoilState, useRecoilValue } from 'recoil';
import ReactMarkdown from 'react-markdown';
import { useAsync } from 'react-use';

// api
import { getCrusadeAsync } from '../../api/crusade';
import { getCrusadeOrdersOfBattleAsync } from '../../api/order-of-battle';

// components
import Layout from '../../components/layout';
import OrderOfBattleCard from '../../components/order-of-battle/card';
import Search from '../../components/search';

// state
import { CurrentCrusadeAtom } from '../../state/crusade';
import { PlayerAtom } from '../../state/player';

const Crusade = () => {
  const { id } = useParams<IdParams>();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentCrusade, setCurrentCrusade] = useRecoilState(CurrentCrusadeAtom);
  const [ordersOfBattle, setOrdersOfBattle] = useState<Crusader.OrderOfBattle[]>([]);
  const [filteredOrdersOfBattle, setFilteredOrdersOfBattle] = useState<Crusader.OrderOfBattle[]>(
    []
  );
  const player = useRecoilValue(PlayerAtom);

  const { loading } = useAsync(async () => {
    const crusade = await getCrusadeAsync(id);
    if (crusade) {
      setCurrentCrusade(crusade);

      const orders = await getCrusadeOrdersOfBattleAsync(crusade.id);
      if (orders) {
        setOrdersOfBattle(orders);
        setFilteredOrdersOfBattle(orders);
      }
    }
  }, [id]);

  const playerId = player ? player.id : 0;

  return (
    <Layout
      title={currentCrusade ? currentCrusade.name : 'Loading'}
      actionComponent={
        currentCrusade && currentCrusade.id === playerId ? (
          <IconButton
            as={Link}
            to={`/crusade/${currentCrusade.id}/edit`}
            aria-label="Invite"
            fontSize="1.5rem"
            icon={<MdEdit />}
            colorScheme="blue"
          />
        ) : undefined
      }
    >
      {loading ? (
        <Progress isIndeterminate />
      ) : (
        <>
          <ReactMarkdown linkTarget="_blank" className="markdown">
            {currentCrusade ? currentCrusade.notes : ''}
          </ReactMarkdown>
          <Divider my="1rem !important" />
          <Search
            value={searchTerm}
            onChange={(term) => {
              setSearchTerm(term);
              setFilteredOrdersOfBattle(
                ordersOfBattle.filter((c) => c.name.toLowerCase().includes(term.toLowerCase()))
              );
            }}
          />
          <Divider my="1rem !important" />
          <VStack width="100%">
            {filteredOrdersOfBattle.map((oob) => (
              <OrderOfBattleCard key={oob.id} orderOfBattle={oob} />
            ))}
          </VStack>
        </>
      )}
    </Layout>
  );
};

export default Crusade;
