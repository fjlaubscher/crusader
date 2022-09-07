import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Divider,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useMediaQuery,
  VStack
} from '@chakra-ui/react';
import { useAsync } from 'react-use';

// api
import { getPlayerOrdersOfBattleAsync } from '../api/order-of-battle';
import { getPlayerByIdAsync } from '../api/player';

// components
import Layout from '../components/layout';
import OrderOfBattleCard from '../components/order-of-battle/card';
import PageHeading from '../components/page-heading';

const Player = () => {
  const { id } = useParams();

  const { loading: loadingPlayer, value: player } = useAsync(async () => id ? getPlayerByIdAsync(id) : undefined, [id]);
  const { loading: loadingOrdersOfBattle, value: ordersOfBattle } = useAsync(
    async () => (id ? getPlayerOrdersOfBattleAsync(id) : undefined),
    [id]
  );

  let totalBattles = 0;
  let totalBattlesWon = 0;
  let highestSupply = 0;
  let playerCrusades: number[] = [];

  if (ordersOfBattle) {
    for (let i = 0; i < ordersOfBattle.length; i++) {
      const orderOfBattle = ordersOfBattle[i];

      if (playerCrusades.indexOf(orderOfBattle.crusadeId) < 0) {
        playerCrusades.push(orderOfBattle.crusadeId);
      }

      totalBattles += orderOfBattle.battles;
      totalBattlesWon += orderOfBattle.battlesWon;

      if (orderOfBattle.supplyUsed > highestSupply) {
        highestSupply = orderOfBattle.supplyUsed;
      }
    }
  }

  const [isTabletOrLarger] = useMediaQuery('(min-width: 767px)');

  return (
    <Layout title="Player" isLoading={loadingPlayer || loadingOrdersOfBattle}>
      {player && ordersOfBattle && (
        <>
          <PageHeading name={player.name} />
          <SimpleGrid width="100%" columns={isTabletOrLarger ? 4 : 2} rowGap={4}>
            <Stat>
              <StatLabel>Crusades</StatLabel>
              <StatNumber>{ordersOfBattle.length}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Orders of Battle</StatLabel>
              <StatNumber>{ordersOfBattle.length}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Largest Force</StatLabel>
              <StatNumber>{highestSupply}PL</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Battles Won</StatLabel>
              <StatNumber>
                {totalBattlesWon}/{totalBattles}
              </StatNumber>
            </Stat>
          </SimpleGrid>
          <Divider my="1rem !important" />
          <VStack mt="0 !important" width="100%">
            {ordersOfBattle.map((oob) => (
              <OrderOfBattleCard key={oob.id} orderOfBattle={oob} showCrusadeName />
            ))}
          </VStack>
        </>
      )}
    </Layout>
  );
};

export default Player;
