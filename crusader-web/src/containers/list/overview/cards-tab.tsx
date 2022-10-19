import React from 'react';
import { Alert, Grid } from '@fjlaubscher/matter';

// components
import CrusadeCard from '../../../components/crusade-card/card';

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
