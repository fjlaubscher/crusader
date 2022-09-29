import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { useRecoilValue } from 'recoil';
import Alert from '../../../components/alert';
import LinkButton from '../../../components/button/link';

// components
import CrusadeCard from '../../../components/crusade-card/card';
import Grid from '../../../components/grid';

// state
import { PlayerAtom } from '../../../state/player';

import styles from './overview.module.scss';

interface Props {
  cards: Crusader.CrusadeCard[];
  orderOfBattle: Crusader.OrderOfBattle;
}

const CardsTab: React.FC<Props> = ({ cards, orderOfBattle }) => {
  const player = useRecoilValue(PlayerAtom);

  const isOwner = orderOfBattle.playerId === player?.id;
  const hasCards = cards.length > 0;
  return (
    <div className={styles.cards}>
      {!hasCards && (
        <Alert variant="warning">
          This Order of Battle doesn&apos;t have any Crusade Cards yet.
        </Alert>
      )}
      {isOwner && (
        <LinkButton leftIcon={<FaPlus />} to={`/order-of-battle/${orderOfBattle.id}/crusade-card`}>
          New Crusade Card
        </LinkButton>
      )}
      {hasCards && (
        <Grid>
          {cards.map((c) => (
            <CrusadeCard key={c.id} crusadeCard={c} />
          ))}
        </Grid>
      )}
    </div>
  );
};

export default CardsTab;
