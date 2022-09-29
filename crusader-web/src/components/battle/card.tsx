import React from 'react';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';

// components
import Card from '../card';
import Grid from '../grid';
import Stat from '../stat';
import Tag from '../tag';
import TagGroup from '../tag/group';

// helpers
import { getBattleStatusColor } from '../../helpers/status';

import styles from './battle.module.scss';

interface Props {
  battle: Crusader.Battle;
}

const BattleCard = ({ battle }: Props) => {
  return (
    <Link className={styles.card} to={`/battle/${battle.id}`}>
      <Card>
        <div className={styles.heading}>
          <span className={styles.title}>{battle.name}</span>
          <Tag variant={getBattleStatusColor(battle.statusId)}>{battle.status}</Tag>
        </div>
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
};

export default BattleCard;
