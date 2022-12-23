import { useNavigate, useParams } from 'react-router-dom';
import { FaPen, FaUserPlus } from 'react-icons/fa';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useAsync, useSessionStorage } from 'react-use';
import { parseISO, format } from 'date-fns';
import { IconButton, Stat, Tabs } from '@fjlaubscher/matter';

// api
import { getCrusadeAsync, getCrusadeBattlesAsync } from '../../../api/crusade';
import { getCrusadeOrdersOfBattleAsync } from '../../../api/order-of-battle';

// components
import Avatar from '../../../components/avatar';
import Layout from '../../../components/layout';
import LinkButton from '../../../components/button/link';

// helpers
import { CRUSADE_TAB } from '../../../helpers/storage';

// state
import { BattlesAtom } from '../../../state/battle';
import { OrdersOfBattleAtom } from '../../../state/order-of-battle';
import { PlayerAtom } from '../../../state/player';

// tabs
import AboutTab from './about-tab';
import BattlesTab from './battles-tab';
import OrdersOfBattleTab from './orders-of-battle-tab';
import SettingsTab from './settings-tab';

import styles from './overview.module.scss';

const Crusade = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useSessionStorage<number | undefined>(`${CRUSADE_TAB}-${id}`);

  const player = useRecoilValue(PlayerAtom);
  const [battles, setBattles] = useRecoilState(BattlesAtom);
  const [ordersOfBattle, setOrdersOfBattle] = useRecoilState(OrdersOfBattleAtom);

  const { loading, value: crusade } = useAsync(async () => {
    const crusade = id ? await getCrusadeAsync(id) : undefined;
    if (crusade) {
      const [battles, orders] = await Promise.all([
        getCrusadeBattlesAsync(crusade.id),
        getCrusadeOrdersOfBattleAsync(crusade.id)
      ]);

      if (battles) {
        setBattles(battles);
      }

      if (orders) {
        setOrdersOfBattle(orders);
      }
    }

    return crusade;
  }, [id]);

  const playerId = player ? player.id : 0;
  const isOwner = crusade ? crusade.createdById === playerId : false;
  const hasJoined = playerId
    ? ordersOfBattle.filter((o) => o.playerId === playerId).length > 0
    : false;

  return (
    <Layout
      title="Crusade"
      description={crusade?.name}
      image={crusade?.avatar}
      action={
        isOwner && (
          <IconButton onClick={() => navigate(`/crusade/${id}/edit`)}>
            <FaPen />
          </IconButton>
        )
      }
      isLoading={loading}
    >
      {crusade && (
        <>
          <Stat
            title={`@${crusade.createdBy}'s`}
            value={crusade.name}
            description={`Created on ${format(parseISO(crusade.createdDate), 'yyyy-MM-dd')}`}
          />
          {crusade.avatar && (
            <Avatar className={styles.avatar} src={crusade.avatar} alt={crusade.name} />
          )}
          {!hasJoined && (
            <LinkButton
              className={styles.join}
              variant="accent"
              leftIcon={<FaUserPlus />}
              to={`/crusade/${id}/join`}
            >
              Join Crusade
            </LinkButton>
          )}
          <Tabs
            className={styles.tabs}
            active={tabIndex || 0}
            onChange={setTabIndex}
            tabs={['About', 'Battles', 'Crusaders', 'Settings']}
          >
            <AboutTab crusade={crusade} />
            <BattlesTab battles={battles} crusade={crusade} hasJoinedCrusade={hasJoined} />
            <OrdersOfBattleTab ordersOfBattle={ordersOfBattle} />
            <SettingsTab crusade={crusade} />
          </Tabs>
        </>
      )}
    </Layout>
  );
};

export default Crusade;
