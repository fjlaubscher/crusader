import React from 'react';
import { Link } from 'react-router-dom';

// components
import Card from '../card';
import Tag from '../tag';
import TagGroup from '../tag/group';

import styles from './crusade-card.module.scss';

interface Props {
  crusadeCard: Crusader.CrusadeCard;
}

const CrusadeCard = ({ crusadeCard }: Props) => (
  <Link className={styles.card} to={`/crusade-card/${crusadeCard.id}`}>
    <Card title={crusadeCard.name}>
      <TagGroup>
        <Tag>{crusadeCard.battlefieldRole}</Tag>
        <Tag variant="info">{crusadeCard.unitType}</Tag>
        <Tag variant="success">{crusadeCard.powerRating}PR</Tag>
        {crusadeCard.crusadePoints > 0 && (
          <Tag variant="warning">{crusadeCard.crusadePoints}CP</Tag>
        )}
      </TagGroup>
    </Card>
  </Link>
);

export default CrusadeCard;
