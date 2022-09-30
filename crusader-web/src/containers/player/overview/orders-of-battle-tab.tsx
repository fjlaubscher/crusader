import React from 'react';

// components
import Alert from '../../../components/alert';
import Grid from '../../../components/grid';
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
