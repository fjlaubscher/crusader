import { useRecoilValue } from 'recoil';
import { FaCog } from 'react-icons/fa';
import { useAsync } from 'react-use';
import { useNavigate } from 'react-router-dom';
import { Alert, Grid, IconButton } from '@fjlaubscher/matter';

// api
import { getPlayerOrdersOfBattleAsync } from '../api/order-of-battle';

// components
import Layout from '../components/layout';
import OrderOfBattleCard from '../components/order-of-battle/card';

// state
import { PlayerAtom } from '../state/player';

const Home = () => {
  const navigate = useNavigate();
  const player = useRecoilValue(PlayerAtom);
  const { loading, value: ordersOfBattle } = useAsync(async () => {
    if (player) {
      return getPlayerOrdersOfBattleAsync(player.id);
    }

    return undefined;
  }, [player]);

  const hasOrdersOfBattle = ordersOfBattle ? ordersOfBattle.length > 0 : false;

  return (
    <Layout
      title="Home"
      action={
        <IconButton onClick={() => navigate(`/player/${player?.id}/edit`)}>
          <FaCog />
        </IconButton>
      }
      isLoading={loading}
    >
      {hasOrdersOfBattle ? (
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
      )}
    </Layout>
  );
};

export default Home;
