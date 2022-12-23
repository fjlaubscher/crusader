import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useAsync, useSessionStorage } from 'react-use';
import { parseISO, format } from 'date-fns';
import { FaArrowLeft, FaCalculator, FaPen, FaUsers } from 'react-icons/fa';
import { IconButton, Stat, Tabs, Tag, TagGroup } from '@fjlaubscher/matter';

// api
import { getBattleAsync } from '../../../api/battle';
import { getCrusadeBattlesAsync } from '../../../api/crusade';
import { getOrderOfBattleAsync } from '../../../api/order-of-battle';

// components
import Avatar from '../../../components/avatar';
import Layout from '../../../components/layout';
import LinkButton from '../../../components/button/link';

// helpers
import { BATTLE_TAB } from '../../../helpers/storage';
import { getBattleStatusColor } from '../../../helpers/status';
import useSwipeNavigation from '../../../helpers/use-swipe-navigation';

// state
import { BattlesAtom } from '../../../state/battle';
import { PlayerOrdersOfBattleAtom } from '../../../state/order-of-battle';

// styles
import styles from './overview.module.scss';

// tabs
import AboutTab from './about-tab';
import SettingsTab from './settings-tab';
import OrdersOfBattleTab from './orders-of-battle-tab';

const Battle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useSessionStorage<number | undefined>(`${BATTLE_TAB}-${id}`);

  const [attacker, setAttacker] = useState<Crusader.OrderOfBattle | undefined>(undefined);
  const [defender, setDefender] = useState<Crusader.OrderOfBattle | undefined>(undefined);
  const [battles, setBattles] = useRecoilState(BattlesAtom);
  const playerOrdersOfBattle = useRecoilValue(PlayerOrdersOfBattleAtom);

  const battle = useMemo(() => {
    if (id && battles.length) {
      const filteredBattles = battles.filter((b) => b.id === parseInt(id));
      return filteredBattles.length ? filteredBattles[0] : undefined;
    }

    return undefined;
  }, [id, battles]);

  const { loading } = useAsync(async () => {
    if (id) {
      const currentBattle = battle || (await getBattleAsync(id));

      if (currentBattle) {
        const [battles, attacker, defender] = await Promise.all([
          getCrusadeBattlesAsync(currentBattle.crusadeId),
          getOrderOfBattleAsync(currentBattle.attackerOrderOfBattleId),
          getOrderOfBattleAsync(currentBattle.defenderOrderOfBattleId)
        ]);

        setBattles(battles || []);
        setAttacker(attacker);
        setDefender(defender);
      }
    }

    return undefined;
  }, [id]);

  const isPlayerBattle = useMemo(() => {
    if (battle && playerOrdersOfBattle) {
      return (
        playerOrdersOfBattle.filter(
          (oob) =>
            oob.id === battle.attackerOrderOfBattleId || oob.id === battle.defenderOrderOfBattleId
        ).length > 0
      );
    }
  }, [battle, playerOrdersOfBattle]);

  const { ref } = useSwipeNavigation('battle', battles, id);

  return (
    <Layout
      title="Battle"
      description={battle?.name}
      image={battle?.avatar}
      action={
        isPlayerBattle && (
          <IconButton onClick={() => navigate(`/battle/${id}/edit`)}>
            <FaPen />
          </IconButton>
        )
      }
      isLoading={loading}
    >
      {battle && attacker && defender && (
        <>
          <LinkButton
            className={styles.crusadeButton}
            leftIcon={<FaArrowLeft />}
            rightIcon={<FaUsers />}
            to={`/crusade/${battle.crusadeId}`}
          >
            {battle.crusade}
          </LinkButton>
          <div ref={ref}>
            <Stat
              title={battle.mission}
              value={battle.name}
              description={format(parseISO(battle.createdDate), 'yyyy-MM-dd')}
            />
            {battle.avatar && (
              <Avatar className={styles.avatar} src={battle.avatar} alt={battle.name} />
            )}
            <TagGroup className={styles.tags}>
              <Tag variant="info">{battle.size}PR</Tag>
              <Tag variant={getBattleStatusColor(battle.statusId)}>{battle.status}</Tag>
            </TagGroup>
            <div className={styles.stats}>
              <Stat
                title="Attacker"
                value={battle.attackerScore}
                description={battle.attackerOrderOfBattle}
              />
              <Stat
                title="Defender"
                value={battle.defenderScore}
                description={battle.defenderOrderOfBattle}
              />
            </div>
          </div>
          {isPlayerBattle && (
            <LinkButton
              className={styles.scoreButton}
              leftIcon={<FaCalculator />}
              to={`/battle/${id}/score`}
              variant="accent"
            >
              Update Score
            </LinkButton>
          )}
          <Tabs
            active={tabIndex || 0}
            onChange={setTabIndex}
            tabs={['About', 'Crusaders', 'Settings']}
          >
            <AboutTab battle={battle} />
            <OrdersOfBattleTab ordersOfBattle={[attacker, defender]} />
            <SettingsTab battle={battle} isOwner={isPlayerBattle || false} />
          </Tabs>
        </>
      )}
    </Layout>
  );
};

export default Battle;
