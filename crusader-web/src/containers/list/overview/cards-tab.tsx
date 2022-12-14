import { Alert, Grid } from '@fjlaubscher/matter';

// components
import CrusadeListCard from '../../../components/crusade-card/list-card';

import styles from './overview.module.scss';

interface Props {
  cards: Crusader.CrusadeCard[];
  isOwner: boolean;
}

const CardsTab = ({ cards, isOwner }: Props) => {
  const hasCards = cards.length > 0;

  return hasCards ? (
    <Grid className={isOwner ? styles.cards : undefined}>
      {cards.map((c) => (
        <CrusadeListCard key={c.id} crusadeCard={c} />
      ))}
    </Grid>
  ) : (
    <Alert variant="warning">This List doesn&apos;t have any Cards yet.</Alert>
  );
};

export default CardsTab;
