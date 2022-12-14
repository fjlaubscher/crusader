import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaClipboardList, FaPen } from 'react-icons/fa';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useAsync, useSessionStorage } from 'react-use';
import { IconButton, Stat, Tabs } from '@fjlaubscher/matter';

// api
import { getCrusadeCardAsync, getOrderOfBattleCrusadeCardsAsync } from '../../../api/crusade-card';
import { getOrderOfBattleAsync } from '../../../api/order-of-battle';

// components
import Avatar from '../../../components/avatar';
import Layout from '../../../components/layout';
import LinkButton from '../../../components/button/link';
import MarkdownTab from '../../../components/markdown-tab';

// helpers
import { CRUSADE_CARD_TAB } from '../../../helpers/storage';
import useSwipeNavigation from '../../../helpers/use-swipe-navigation';

// state
import { CrusadeCardsAtom } from '../../../state/crusade-card';
import { PlayerAtom } from '../../../state/player';

// tabs
import SettingsTab from './settings-tab';

import styles from './overview.module.scss';

const CrusadeCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useSessionStorage<number | undefined>(
    `${CRUSADE_CARD_TAB}-${id}`
  );
  const [isOwner, setIsOwner] = useState(false);

  const [crusadeCards, setCrusadeCards] = useRecoilState(CrusadeCardsAtom);
  const player = useRecoilValue(PlayerAtom);

  const crusadeCard = useMemo(() => {
    if (id && crusadeCards.length) {
      const filteredCards = crusadeCards.filter((c) => c.id === parseInt(id));
      return filteredCards.length ? filteredCards[0] : undefined;
    }

    return undefined;
  }, [id, crusadeCards]);

  const { loading } = useAsync(async () => {
    if (id) {
      const card = crusadeCard || (await getCrusadeCardAsync(id));

      if (card) {
        const orderOfBattle = await getOrderOfBattleAsync(card.orderOfBattleId);
        if (orderOfBattle && player) {
          setIsOwner(orderOfBattle.playerId === player.id);
        }

        const cards = await getOrderOfBattleCrusadeCardsAsync(card.orderOfBattleId);
        if (cards) {
          setCrusadeCards(cards);
        }
      }
    }
  }, []);

  const { ref } = useSwipeNavigation('crusade-card', crusadeCards, id);

  return (
    <Layout
      title="Crusade Card"
      description={crusadeCard?.name}
      image={crusadeCard?.avatar}
      action={
        isOwner && (
          <IconButton onClick={() => navigate(`/crusade-card/${id}/edit`)}>
            <FaPen />
          </IconButton>
        )
      }
      isLoading={loading}
    >
      {crusadeCard && (
        <>
          <LinkButton
            className={styles.orderOfBattleButton}
            leftIcon={<FaArrowLeft />}
            rightIcon={<FaClipboardList />}
            to={`/order-of-battle/${crusadeCard.orderOfBattleId}`}
          >
            {crusadeCard.orderOfBattle}
          </LinkButton>
          <div ref={ref}>
            <Stat
              title={crusadeCard.unitType}
              value={crusadeCard.name}
              description={crusadeCard.battlefieldRole}
            />
            {crusadeCard.avatar && (
              <Avatar className={styles.avatar} src={crusadeCard.avatar} alt={crusadeCard.name} />
            )}
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
          </div>
          <Tabs
            active={tabIndex || 0}
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
