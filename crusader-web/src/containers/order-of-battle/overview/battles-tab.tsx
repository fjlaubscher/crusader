import React from 'react';
import { useRecoilValue } from 'recoil';
import { FaPlus } from 'react-icons/fa';

// components
import Alert from '../../../components/alert';
import BattleCard from '../../../components/battle/card';
import Grid from '../../../components/grid';
import LinkButton from '../../../components/button/link';

// state
import { PlayerAtom } from '../../../state/player';

import styles from './overview.module.scss';

interface Props {
  battles: Crusader.Battle[];
  orderOfBattle: Crusader.OrderOfBattle;
}

const BattlesTab: React.FC<Props> = ({ battles, orderOfBattle }) => {
  const player = useRecoilValue(PlayerAtom);
  const isOwner = orderOfBattle.playerId === player?.id;
  const hasBattles = battles.length > 0;

  return (
    <div className={styles.battles}>
      {!hasBattles && (
        <Alert variant="warning">This Order of Battle hasn&apos;t fought any battles yet.</Alert>
      )}
      {isOwner && (
        <LinkButton className={styles.newBattle} leftIcon={<FaPlus />} to={`/crusade/${orderOfBattle.crusadeId}/battle`}>
          New Battle
        </LinkButton>
      )}
      {hasBattles && (
        <Grid>
          {battles.map((b) => (
            <BattleCard key={b.id} battle={b} />
          ))}
        </Grid>
      )}
    </div>
  );
};

export default BattlesTab;
