import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaPen, FaUsers } from 'react-icons/fa';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useAsync, useSessionStorage } from 'react-use';
import { IconButton, Tabs, Stat } from '@fjlaubscher/matter';

// api
import { getCrusadeOrdersOfBattleAsync } from '../../../api/order-of-battle';
import { getOrderOfBattleCrusadeCardsAsync } from '../../../api/crusade-card';
import { getOrderOfBattleAsync } from '../../../api/order-of-battle';

// components
import Avatar from '../../../components/avatar';
import Layout from '../../../components/layout';
import LinkButton from '../../../components/button/link';

// helpers
import { ORDER_OF_BATTLE_TAB } from '../../../helpers/storage';
import useSwipeNavigation from '../../../helpers/use-swipe-navigation';

// state
import { CrusadeCardsAtom } from '../../../state/crusade-card';
import { OrdersOfBattleAtom } from '../../../state/order-of-battle';
import { PlayerAtom } from '../../../state/player';

// tabs
import AboutTab from './about-tab';
import CardsTab from './cards-tab';
import SettingsTab from './settings-tab';

import styles from './overview.module.scss';

const OrderOfBattle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useSessionStorage<number | undefined>(
    `${ORDER_OF_BATTLE_TAB}-${id}`
  );

  const [crusadeCards, setCrusadeCards] = useRecoilState(CrusadeCardsAtom);
  const [ordersOfBattle, setOrdersOfBattle] = useRecoilState(OrdersOfBattleAtom);
  const player = useRecoilValue(PlayerAtom);

  const orderOfBattle = useMemo(() => {
    if (id && ordersOfBattle.length) {
      const filteredOrders = ordersOfBattle.filter((o) => o.id === parseInt(id));
      return filteredOrders.length ? filteredOrders[0] : undefined;
    }

    return undefined;
  }, [id, ordersOfBattle]);

  const { loading } = useAsync(async () => {
    if (id) {
      const oob = orderOfBattle || (await getOrderOfBattleAsync(id));

      if (oob) {
        const [cards, orders] = await Promise.all([
          getOrderOfBattleCrusadeCardsAsync(oob.id),
          getCrusadeOrdersOfBattleAsync(oob.crusadeId)
        ]);

        setCrusadeCards(cards || []);
        setOrdersOfBattle(orders || []);
      }
    }
  }, [id]);

  const playerId = player ? player.id : 0;
  const isOwner = orderOfBattle ? orderOfBattle.playerId === playerId : false;

  const { ref } = useSwipeNavigation('order-of-battle', ordersOfBattle, id);

  return (
    <Layout
      title="Order of Battle"
      description={
        orderOfBattle
          ? `${orderOfBattle.faction} - ${orderOfBattle.name} (${orderOfBattle.supplyLimit}PR)`
          : undefined
      }
      image={orderOfBattle?.avatar}
      action={
        isOwner && (
          <IconButton onClick={() => navigate(`/order-of-battle/${id}/edit`)}>
            <FaPen />
          </IconButton>
        )
      }
      isLoading={loading}
    >
      {orderOfBattle && (
        <>
          <LinkButton
            className={styles.crusadeButton}
            leftIcon={<FaArrowLeft />}
            rightIcon={<FaUsers />}
            to={`/crusade/${orderOfBattle.crusadeId}`}
          >
            {orderOfBattle.crusade}
          </LinkButton>
          <div ref={ref}>
            <Stat
              title={`@${orderOfBattle.player}'s`}
              value={orderOfBattle.name}
              description={orderOfBattle.faction}
            />
            {orderOfBattle.avatar && (
              <Avatar
                className={styles.avatar}
                src={orderOfBattle.avatar}
                alt={orderOfBattle.name}
              />
            )}
            <div className={styles.stats}>
              <Stat
                title="Power Rating"
                value={`${orderOfBattle.supplyUsed}PR`}
                description={`Supply Limit: ${orderOfBattle.supplyLimit}PR`}
              />
              <Stat title="Crusade Points" value={`${orderOfBattle.crusadePoints}CP`} />
              <Stat title="Requisition" value={`${orderOfBattle.requisition}RP`} />
              <Stat
                title="Battles Won"
                value={orderOfBattle.battlesWon}
                description={`Total Battles: ${orderOfBattle.battles}`}
              />
            </div>
          </div>
          <Tabs active={tabIndex || 0} onChange={setTabIndex} tabs={['About', 'Cards', 'Settings']}>
            <AboutTab orderOfBattle={orderOfBattle} />
            <CardsTab cards={crusadeCards} orderOfBattle={orderOfBattle} />
            <SettingsTab orderOfBattle={orderOfBattle} />
          </Tabs>
        </>
      )}
    </Layout>
  );
};

export default OrderOfBattle;
