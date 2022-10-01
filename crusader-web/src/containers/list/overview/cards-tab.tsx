import React from 'react';

// components
import Alert from '../../../components/alert';
import CrusadeCard from '../../../components/crusade-card/card';
import Grid from '../../../components/grid';

import styles from './overview.module.scss';

interface Props {
  cards: Crusader.CrusadeCard[];
  isOwner: boolean;
}

const CardsTab: React.FC<Props> = ({ cards, isOwner }) => {
  const hasCards = cards.length > 0;

  return hasCards ? (
    <Grid className={isOwner ? styles.cards : undefined}>
      {cards.map((c) => (
        <CrusadeCard key={c.id} crusadeCard={c} />
      ))}
    </Grid>
  ) : (
    <Alert variant="warning">This List doesn&apos;t have any Cards yet.</Alert>
  );
};

export default CardsTab;
