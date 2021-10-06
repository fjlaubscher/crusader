import React, { useState } from 'react';
import { Divider, IconButton, useDisclosure, VStack } from '@chakra-ui/react';
import { MdMenu } from 'react-icons/md';
import { useAsync } from 'react-use';
import { useRecoilValue } from 'recoil';

// api
import { getPlayerOrdersOfBattleAsync } from '../api/order-of-battle';

// components
import Layout from '../components/layout';
import OrderOfBattleCard from '../components/order-of-battle/card';
import Search from '../components/search';
import Sidebar from '../components/sidebar';

// state
import { PlayerAtom } from '../state/player';

const OrdersOfBattle = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const player = useRecoilValue(PlayerAtom);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOrdersOfBattle, setFilteredOrdersOfBattle] = useState<Crusader.OrderOfBattle[]>(
    []
  );
  const { loading, value: ordersOfBattle } = useAsync(async () => {
    if (player) {
      const ordersOfBattle = await getPlayerOrdersOfBattleAsync(player.id);

      if (ordersOfBattle) {
        setFilteredOrdersOfBattle(ordersOfBattle);
        return ordersOfBattle;
      }
    }

    return undefined;
  }, [player]);

  return (
    <>
      <Sidebar isOpen={isOpen} onClose={onClose} />
      <Layout
        title="Orders of Battle"
        actionComponent={
          <IconButton aria-label="Settings" fontSize="1.5rem" icon={<MdMenu />} onClick={onOpen} />
        }
        isLoading={loading}
      >
        {ordersOfBattle && ordersOfBattle.length && (
          <>
            <Search
              value={searchTerm}
              onChange={(term) => {
                setSearchTerm(term);
                setFilteredOrdersOfBattle(
                  ordersOfBattle.filter((oob) =>
                    oob.name.toLowerCase().includes(term.toLowerCase())
                  )
                );
              }}
            />
            <VStack width="100%">
              {filteredOrdersOfBattle.map((oob) => (
                <OrderOfBattleCard key={oob.id} orderOfBattle={oob} />
              ))}
            </VStack>
          </>
        )}
      </Layout>
    </>
  );
};

export default OrdersOfBattle;
