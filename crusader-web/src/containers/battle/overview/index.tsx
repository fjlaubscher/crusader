import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useAsync } from 'react-use';
import { parseISO, format } from 'date-fns';
import { FaCalculator, FaPen, FaUsers } from 'react-icons/fa';

// api
import { getBattleAsync } from '../../../api/battle';
import { getOrderOfBattleAsync } from '../../../api/order-of-battle';

// components
import IconButton from '../../../components/button/icon';
import Layout from '../../../components/layout';
import LinkButton from '../../../components/button/link';
import Stat from '../../../components/stat';
import Tabs from '../../../components/tabs';
import Tag from '../../../components/tag';
import TagGroup from '../../../components/tag/group';

// helpers
import { getBattleStatusColor } from '../../../helpers/status';

// state
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
  const [tabIndex, setTabIndex] = useState(0);
  const playerOrdersOfBattle = useRecoilValue(PlayerOrdersOfBattleAtom);

  const { loading: loadingBattle, value: battle } = useAsync(async () => {
    if (id) {
      return await getBattleAsync(id);
    }

    return undefined;
  }, [id]);

  const { loading: loadingAttacker, value: attacker } = useAsync(async () => {
    if (battle) {
      return await getOrderOfBattleAsync(battle.attackerOrderOfBattleId);
    }

    return undefined;
  }, [battle]);
  const { loading: loadingDefender, value: defender } = useAsync(async () => {
    if (battle) {
      return await getOrderOfBattleAsync(battle.defenderOrderOfBattleId);
    }

    return undefined;
  }, [battle]);

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

  return (
    <Layout
      title="Battle"
      action={
        isPlayerBattle && (
          <IconButton onClick={() => navigate(`/battle/${id}/edit`)}>
            <FaPen />
          </IconButton>
        )
      }
      isLoading={loadingBattle || loadingAttacker || loadingDefender}
    >
      {battle && attacker && defender && (
        <>
          <LinkButton
            className={styles.crusadeButton}
            leftIcon={<FaUsers />}
            to={`/crusade/${battle.crusadeId}`}
          >
            {battle.crusade}
          </LinkButton>
          <Stat
            title={battle.mission}
            value={battle.name}
            description={format(parseISO(battle.createdDate), 'yyyy-MM-dd')}
          />
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
          <Tabs active={tabIndex} onChange={setTabIndex} tabs={['About', 'Crusaders', 'Settings']}>
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
