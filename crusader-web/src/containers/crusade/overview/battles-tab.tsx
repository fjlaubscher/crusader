import React from 'react';
import { FaPlus } from 'react-icons/fa';

// components
import BattleCard from '../../../components/battle/card';
import Grid from '../../../components/grid';
import LinkButton from '../../../components/button/link';

import styles from './overview.module.scss';

interface Props {
  battles: Crusader.Battle[];
  crusade: Crusader.Crusade;
  hasJoinedCrusade: boolean;
}

const BattlesTab: React.FC<Props> = ({ battles, crusade, hasJoinedCrusade }) => (
  <div className={styles.battles}>
    {hasJoinedCrusade && (
      <LinkButton
        className={styles.newBattle}
        leftIcon={<FaPlus />}
        to={`/crusade/${crusade.id}/battle`}
      >
        New Battle
      </LinkButton>
    )}
    {battles.length > 0 && (
      <Grid>
        {battles.map((b) => (
          <BattleCard key={b.id} battle={b} />
        ))}
      </Grid>
    )}
  </div>
);

export default BattlesTab;
