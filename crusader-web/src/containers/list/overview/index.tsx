import React, { useState } from 'react';
import { FaArrowLeft, FaCalculator, FaPen } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { useAsync } from 'react-use';
import { useRecoilValue } from 'recoil';
import { IconButton, Stat, Tabs, Tag, TagGroup } from '@fjlaubscher/matter';

// api
import { getListAsync, getListCrusadeCardsAsync } from '../../../api/list';

// components
import Layout from '../../../components/layout';

// state
import { PlayerAtom } from '../../../state/player';

// tabs
import CardsTab from './cards-tab';
import NotesTab from './notes-tab';
import SettingsTab from './settings-tab';

import styles from './overview.module.scss';
import LinkButton from '../../../components/button/link';

const List = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const player = useRecoilValue(PlayerAtom);

  const [tabIndex, setTabIndex] = useState(0);

  const { loading: loadingList, value: list } = useAsync(async () => {
    if (id) {
      return await getListAsync(id);
    }

    return undefined;
  }, [id]);

  const { loading: loadingCards, value: cards } = useAsync(async () => {
    if (list) {
      return await getListCrusadeCardsAsync(list.id);
    }

    return undefined;
  }, [list]);

  const isOwner = list && player ? list.playerId === player.id : false;

  return (
    <Layout
      title="List"
      description={list?.name}
      action={
        isOwner && (
          <IconButton onClick={() => navigate(`/list/${id}/edit`)}>
            <FaPen />
          </IconButton>
        )
      }
      isLoading={loadingList || loadingCards}
    >
      {list && cards && (
        <>
          <Stat title={`@${list.player}`} value={list.name} description={list.orderOfBattle} />
          <TagGroup className={styles.tags}>
            <Tag variant="info">{list.size}PR</Tag>
          </TagGroup>
          {isOwner && (
            <LinkButton
              className={styles.postGameButton}
              leftIcon={<FaArrowLeft />}
              rightIcon={<FaCalculator />}
              to={`/list/${list.id}/post-game`}
            >
              Complete Battle
            </LinkButton>
          )}
          <Tabs active={tabIndex} onChange={setTabIndex} tabs={['Cards', 'Notes', 'Settings']}>
            <CardsTab cards={cards} isOwner={isOwner} />
            <NotesTab list={list} />
            <SettingsTab list={list} isOwner={isOwner} />
          </Tabs>
        </>
      )}
    </Layout>
  );
};

export default List;
