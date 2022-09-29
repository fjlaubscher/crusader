import React from 'react';

// components
import Alert from '../../components/alert';
import Grid from '../../components/grid';
import OrderOfBattleCard from '../../components/order-of-battle/card';

interface Props {
  ordersOfBattle: Crusader.OrderOfBattle[] | null;
}

const OrdersOfBattleTab: React.FC<Props> = ({ ordersOfBattle }) => {
  const hasOrdersOfBattle = ordersOfBattle ? ordersOfBattle.length > 0 : false;

  return hasOrdersOfBattle ? (
    <Grid>
      {ordersOfBattle?.map((oob) => (
        <OrderOfBattleCard key={oob.id} orderOfBattle={oob} showCrusadeName />
      ))}
    </Grid>
  ) : (
    <Alert variant="warning">
      You don't have any Orders of Battle yet.
      <br />
      Join a Crusade to get started!
    </Alert>
  );
};

export default OrdersOfBattleTab;
