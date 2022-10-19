import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Tag, TagGroup } from '@fjlaubscher/matter';

import styles from './order-of-battle.module.scss';

interface Props {
  orderOfBattle: Crusader.OrderOfBattle;
  showCrusadeName?: boolean;
  showPlayerName?: boolean;
}

const OrderOfBattleCard = ({ orderOfBattle, showCrusadeName, showPlayerName }: Props) => {
  return (
    <Link className={styles.card} to={`/order-of-battle/${orderOfBattle.id}`}>
      <Card title={orderOfBattle.name}>
        <TagGroup>
          {showPlayerName && <Tag variant="info">@{orderOfBattle.player}</Tag>}
          {showCrusadeName && <Tag variant="info">{orderOfBattle.crusade}</Tag>}
          <Tag>{orderOfBattle.faction}</Tag>
          <Tag variant="success">{orderOfBattle.supplyUsed}PR</Tag>
          {orderOfBattle.crusadePoints > 0 && (
            <Tag variant="warning"> {orderOfBattle.crusadePoints}CP</Tag>
          )}
        </TagGroup>
      </Card>
    </Link>
  );
};

export default OrderOfBattleCard;
