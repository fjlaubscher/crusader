import React from 'react';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { Card, Tag, TagGroup, Stat } from '@fjlaubscher/matter';

// components
import Avatar from '../avatar';

// helpers
import { getBattleStatusColor } from '../../helpers/status';

import styles from './battle.module.scss';

interface Props {
  battle: Crusader.Battle;
}

const BattleCard: React.FC<Props> = ({ battle }) => (
  <Link className={styles.card} to={`/battle/${battle.id}`}>
    <Card>
      <div className={styles.heading}>
        <span className={styles.title}>{battle.name}</span>
        <Tag variant={getBattleStatusColor(battle.statusId)}>{battle.status}</Tag>
      </div>
      {battle.avatar && <Avatar className={styles.avatar} src={battle.avatar} alt={battle.name} />}
      <div className={styles.grid}>
        <Stat
          description={battle.attackerOrderOfBattle}
          title="Attacker"
          value={battle.attackerScore}
        />
        <Stat
          description={battle.defenderOrderOfBattle}
          title="Defender"
          value={battle.defenderScore}
        />
      </div>
      <TagGroup className={styles.tags}>
        <Tag>{format(parseISO(battle.createdDate), 'yyyy-MM-dd')}</Tag>
        <Tag variant="success">{battle.mission}</Tag>
        <Tag variant="info">{battle.size}PR</Tag>
      </TagGroup>
    </Card>
  </Link>
);

export default BattleCard;
