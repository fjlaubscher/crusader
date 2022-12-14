import { Grid } from '@fjlaubscher/matter';

// components
import OrderOfBattleCard from '../../../components/order-of-battle/card';

interface Props {
  ordersOfBattle: Crusader.OrderOfBattle[];
}

const OrdersOfBattleTab = ({ ordersOfBattle }: Props) => (
  <Grid>
    {ordersOfBattle.map((oob) => (
      <OrderOfBattleCard key={oob.id} orderOfBattle={oob} showPlayerName />
    ))}
  </Grid>
);

export default OrdersOfBattleTab;
