import { FaPlus } from 'react-icons/fa';
import { useRecoilValue } from 'recoil';
import { Alert, Grid } from '@fjlaubscher/matter';

// components
import CrusadeCard from '../../../components/crusade-card/card';
import LinkButton from '../../../components/button/link';

// state
import { PlayerAtom } from '../../../state/player';

import styles from './overview.module.scss';

interface Props {
  cards: Crusader.CrusadeCard[];
  orderOfBattle: Crusader.OrderOfBattle;
}

const CardsTab = ({ cards, orderOfBattle }: Props) => {
  const player = useRecoilValue(PlayerAtom);

  const isOwner = orderOfBattle.playerId === player?.id;
  const hasCards = cards.length > 0;
  return (
    <div>
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
        <Grid className={isOwner ? styles.cards : undefined}>
          {cards.map((c) => (
            <CrusadeCard key={c.id} crusadeCard={c} />
          ))}
        </Grid>
      )}
    </div>
  );
};

export default CardsTab;
