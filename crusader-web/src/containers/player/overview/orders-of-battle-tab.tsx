import React from 'react';
import { Alert, Grid } from '@fjlaubscher/matter';

// components
import OrderOfBattleCard from '../../../components/order-of-battle/card';

interface Props {
  player: Crusader.Player;
  ordersOfBattle: Crusader.OrderOfBattle[];
}

const OrdersOfBattleTab: React.FC<Props> = ({ player, ordersOfBattle }) => {
  const hasOrdersOfBattle = ordersOfBattle.length > 0;

  return hasOrdersOfBattle ? (
    <Grid>
      {ordersOfBattle.map((oob) => (
        <OrderOfBattleCard key={oob.id} orderOfBattle={oob} showCrusadeName />
      ))}
    </Grid>
  ) : (
    <Alert variant="warning">{player.name} hasn&apos;t created any Orders of Battle yet.</Alert>
  );
};

export default OrdersOfBattleTab;
