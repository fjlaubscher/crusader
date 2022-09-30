import React from 'react';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';

// components
import Card from '../card';
import Tag from '../tag';
import TagGroup from '../tag/group';

import styles from './crusade.module.scss';

interface Props {
  crusade: Crusader.Crusade;
}

const CrusadeCard: React.FC<Props> = ({ crusade }) => (
  <Link className={styles.card} to={`/crusade/${crusade.id}`}>
    <Card title={crusade.name}>
      <TagGroup>
        <Tag>{format(parseISO(crusade.createdDate), 'yyyy-MM-dd')}</Tag>
        <Tag variant="info">{crusade.createdBy}</Tag>
      </TagGroup>
    </Card>
  </Link>
);

export default CrusadeCard;