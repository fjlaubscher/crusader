import React from 'react';
import { Link } from 'react-router-dom';

// components
import Card from '../card';
import Tag from '../tag';
import TagGroup from '../tag/group';

import styles from './crusade-card.module.scss';

interface Props {
  className?: string;
  crusadeCard: Crusader.CrusadeCard;
  onClick?: () => void;
}

const CrusadeCard: React.FC<Props> = ({ className, crusadeCard, onClick }) => (
  <Card className={className} title={crusadeCard.name} onClick={onClick}>
    <TagGroup>
      <Tag>{crusadeCard.battlefieldRole}</Tag>
      <Tag variant="info">{crusadeCard.unitType}</Tag>
      <Tag variant="success">{crusadeCard.powerRating}PR</Tag>
      {crusadeCard.crusadePoints > 0 && <Tag variant="warning">{crusadeCard.crusadePoints}CP</Tag>}
    </TagGroup>
  </Card>
);

const WrappedCrusadeCard: React.FC<Props> = ({ className, crusadeCard, onClick }) =>
  onClick ? (
    <CrusadeCard className={className} crusadeCard={crusadeCard} onClick={onClick} />
  ) : (
    <Link className={styles.card} to={`/crusade-card/${crusadeCard.id}`}>
      <CrusadeCard className={className} crusadeCard={crusadeCard} />
    </Link>
  );

export default WrappedCrusadeCard;
