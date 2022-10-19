import React from 'react';
import { Grid } from '@fjlaubscher/matter';

// components
import OrderOfBattleCard from '../../../components/order-of-battle/card';

interface Props {
  ordersOfBattle: Crusader.OrderOfBattle[];
}

const OrdersOfBattleTab: React.FC<Props> = ({ ordersOfBattle }) => (
  <Grid>
    {ordersOfBattle.map((oob) => (
      <OrderOfBattleCard key={oob.id} orderOfBattle={oob} showPlayerName />
    ))}
  </Grid>
);

export default OrdersOfBattleTab;
