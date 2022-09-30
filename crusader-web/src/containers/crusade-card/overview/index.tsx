import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaClipboardList, FaPen } from 'react-icons/fa';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useAsync } from 'react-use';

// api
import { getCrusadeCardAsync } from '../../../api/crusade-card';
import { getOrderOfBattleAsync } from '../../../api/order-of-battle';

// components
import IconButton from '../../../components/button/icon';
import Layout from '../../../components/layout';
import LinkButton from '../../../components/button/link';
import Stat from '../../../components/stat';
import Tabs from '../../../components/tabs';

// state
import { OrderOfBattleAtom } from '../../../state/order-of-battle';
import { PlayerAtom } from '../../../state/player';

// tabs
import MarkdownTab from './markdown-tab';
import SettingsTab from './settings-tab';

import styles from './overview.module.scss';

const CrusadeCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tabIndex, setTabIndex] = useState(0);
  const [currentOrderOfBattle, setCurrentOrderOfBattle] = useRecoilState(OrderOfBattleAtom);
  const player = useRecoilValue(PlayerAtom);

  const { loading, value: crusadeCard } = useAsync(async () => {
    const crusadeCard = id ? await getCrusadeCardAsync(id) : undefined;
    const currentOrderOfBattleId = currentOrderOfBattle ? currentOrderOfBattle.id : 0;

    if (crusadeCard && crusadeCard.orderOfBattleId !== currentOrderOfBattleId) {
      const orderOfBattle = await getOrderOfBattleAsync(crusadeCard.orderOfBattleId);
      if (orderOfBattle) {
        setCurrentOrderOfBattle(orderOfBattle);
      }
    }

    return crusadeCard;
  }, [id]);

  const playerId = player ? player.id : 0;
  const isOwner = currentOrderOfBattle ? currentOrderOfBattle.playerId === playerId : false;

  return (
    <Layout
      title="Crusade Card"
      action={
        isOwner && (
          <IconButton onClick={() => navigate(`/crusade-card/${id}/edit`)}>
            <FaPen />
          </IconButton>
        )
      }
      isLoading={loading}
    >
      {crusadeCard && currentOrderOfBattle && (
        <>
          <LinkButton
            className={styles.orderOfBattleButton}
            leftIcon={<FaClipboardList />}
            to={`/order-of-battle/${crusadeCard.orderOfBattleId}`}
          >
            {crusadeCard.orderOfBattle}
          </LinkButton>
          <Stat
            title={crusadeCard.unitType}
            value={crusadeCard.name}
            description={crusadeCard.battlefieldRole}
          />
          <div className={styles.stats}>
            <Stat title="Power Rating" value={crusadeCard.powerRating} />
            <Stat title="Crusade Points" value={crusadeCard.crusadePoints} />
            <Stat title="Experience Points" value={crusadeCard.experiencePoints} />
            <Stat
              title="Battles Survived"
              value={crusadeCard.battlesSurvived}
              description={`Total Battles: ${crusadeCard.battles}`}
            />
            <Stat title="Units Destroyed" value={crusadeCard.unitsDestroyed} />
          </div>
          <Tabs
            active={tabIndex}
            onChange={setTabIndex}
            tabs={[
              crusadeCard.notes ? 'About' : '',
              crusadeCard.abilities ? 'Abilities' : '',
              crusadeCard.battleHonours ? 'Battle Honours' : '',
              crusadeCard.battleScars ? 'Battle Scars' : '',
              crusadeCard.equipment ? 'Equipment' : '',
              crusadeCard.relics ? 'Relics' : '',
              crusadeCard.warlordTraits ? 'Warlord Traits' : '',
              'Settings'
            ]}
          >
            {crusadeCard.notes && <MarkdownTab markdown={crusadeCard.notes} />}
            {crusadeCard.abilities && <MarkdownTab markdown={crusadeCard.abilities} />}
            {crusadeCard.battleHonours && <MarkdownTab markdown={crusadeCard.battleHonours} />}
            {crusadeCard.battleScars && <MarkdownTab markdown={crusadeCard.battleScars} />}
            {crusadeCard.equipment && <MarkdownTab markdown={crusadeCard.equipment} />}
            {crusadeCard.relics && <MarkdownTab markdown={crusadeCard.relics} />}
            {crusadeCard.warlordTraits && <MarkdownTab markdown={crusadeCard.warlordTraits} />}
            <SettingsTab crusadeCard={crusadeCard} isOwner={isOwner} />
          </Tabs>
        </>
      )}
    </Layout>
  );
};

export default CrusadeCard;
