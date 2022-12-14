import { Link } from 'react-router-dom';
import { Card, Tag, TagGroup } from '@fjlaubscher/matter';

// components
import Avatar from '../avatar';

import styles from './crusade-card.module.scss';

interface Props {
  className?: string;
  crusadeCard: Crusader.CrusadeCard;
  onClick?: () => void;
}

const CrusadeCard = ({ className, crusadeCard, onClick }: Props) => (
  <Card className={className} title={crusadeCard.name} onClick={onClick}>
    {crusadeCard.avatar && (
      <Avatar className={styles.avatar} src={crusadeCard.avatar} alt={crusadeCard.name} />
    )}
    <TagGroup>
      <Tag>{crusadeCard.battlefieldRole}</Tag>
      <Tag variant="info">{crusadeCard.unitType}</Tag>
      <Tag variant="success">{crusadeCard.powerRating}PR</Tag>
      {crusadeCard.experiencePoints > 0 && (
        <Tag variant="accent">{crusadeCard.experiencePoints}XP</Tag>
      )}
      {crusadeCard.crusadePoints > 0 && <Tag variant="warning">{crusadeCard.crusadePoints}CP</Tag>}
    </TagGroup>
  </Card>
);

const WrappedCrusadeCard = ({ className, crusadeCard, onClick }: Props) =>
  onClick ? (
    <CrusadeCard className={className} crusadeCard={crusadeCard} onClick={onClick} />
  ) : (
    <Link className={styles.card} to={`/crusade-card/${crusadeCard.id}`}>
      <CrusadeCard className={className} crusadeCard={crusadeCard} />
    </Link>
  );

export default WrappedCrusadeCard;
