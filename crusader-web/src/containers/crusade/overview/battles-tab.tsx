import { FaPlus } from 'react-icons/fa';
import { Grid } from '@fjlaubscher/matter';

// components
import BattleCard from '../../../components/battle/card';
import LinkButton from '../../../components/button/link';

import styles from './overview.module.scss';

interface Props {
  battles: Crusader.Battle[];
  crusade: Crusader.Crusade;
  hasJoinedCrusade: boolean;
}

const BattlesTab = ({ battles, crusade, hasJoinedCrusade }: Props) => (
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
