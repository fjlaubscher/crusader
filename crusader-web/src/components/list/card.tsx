import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Tag, TagGroup } from '@fjlaubscher/matter';

import styles from './list.module.scss';

interface Props {
  list: Crusader.List;
  showPlayerName?: boolean;
}

const ListCard = ({ list, showPlayerName }: Props) => (
  <Link className={styles.card} to={`/list/${list.id}`}>
    <Card title={list.name}>
      <TagGroup>
        {showPlayerName && <Tag variant="info">@{list.player}</Tag>}
        <Tag>{list.orderOfBattle}</Tag>
        <Tag variant="success">{list.size}PR</Tag>
      </TagGroup>
    </Card>
  </Link>
);

export default ListCard;
