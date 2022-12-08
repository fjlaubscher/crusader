import React, { useCallback, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAsync } from 'react-use';
import { FaChevronLeft, FaUndo } from 'react-icons/fa';
import { Alert, Button, IconButton, Stat, Tag, TagGroup, useToast } from '@fjlaubscher/matter';

// api
import { getListAsync, getListCardsAsync } from '../../../api/list';
import {
  getOrderOfBattleCrusadeCardsAsync,
  updateCrusadeCardAsync
} from '../../../api/crusade-card';

// components
import Layout from '../../../components/layout';
import CrusadeCardPostGameForm, {
  PostGameAnswers
} from '../../../components/crusade-card/post-game-form';

import styles from './post-game.module.scss';

const ListPostGame = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [updatedCards, setUpdatedCards] = useState<Crusader.CrusadeCard[]>([]);
  const [answers, setAnswers] = useState<PostGameAnswers[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { loading: loadingList, value: list } = useAsync(async () => {
    if (id) {
      return getListAsync(id);
    }

    return undefined;
  }, [id]);

  const { loading: loadingCards, value: cards } = useAsync(async () => {
    if (id) {
      return getListCardsAsync(id);
    }

    return undefined;
  }, [id]);

  const { loading: loadingCrusadeCards, value: crusadeCards } = useAsync(async () => {
    if (list) {
      return getOrderOfBattleCrusadeCardsAsync(list.orderOfBattleId);
    }

    return undefined;
  }, [list]);

  const listCards: Crusader.CrusadeCard[] = useMemo(() => {
    if (cards && crusadeCards) {
      const cardIds = cards.map((card) => card.crusadeCardId);
      return crusadeCards.filter((cc) => cardIds.includes(cc.id));
    }

    return [];
  }, [cards, crusadeCards]);

  const currentCard = useMemo(() => {
    if (updatedCards[currentIndex] !== undefined) {
      return updatedCards[currentIndex];
    }

    return listCards[currentIndex];
  }, [currentIndex, listCards, updatedCards]);

  const currentAnswers = useMemo(() => {
    if (answers[currentIndex] !== undefined) {
      return answers[currentIndex];
    }

    return {};
  }, [currentIndex, answers]);

  const handleSubmit = useCallback(
    async (formValues: Crusader.CrusadeCard, formAnswers: PostGameAnswers) => {
      // i don't even know why
      setTimeout(() => window.scrollTo(0, 0), 0);

      const newCards = [...updatedCards];
      newCards[currentIndex] = { ...formValues };
      setUpdatedCards(newCards);

      const newAnswers = [...answers];
      newAnswers[currentIndex] = { ...formAnswers };
      setAnswers(newAnswers);

      const newIndex = currentIndex + 1;
      if (newIndex < listCards.length) {
        setCurrentIndex(newIndex);
      } else {
        try {
          setIsSubmitting(true);
          const promises = newCards.map((card) => updateCrusadeCardAsync(card));
          await Promise.all(promises);

          toast({
            variant: 'success',
            text: 'Cards updated.'
          });
          navigate(`/list/${id}`);
        } catch (ex: any) {
          toast({
            variant: 'error',
            text: ex.message || 'Unable to update cards.'
          });
        }

        setIsSubmitting(false);
      }
    },
    [
      id,
      currentIndex,
      listCards,
      updatedCards,
      setUpdatedCards,
      answers,
      setAnswers,
      toast,
      navigate,
      window
    ]
  );

  const hasCards = listCards ? listCards.length > 0 : false;
  const isLoading = loadingList || loadingCards || loadingCrusadeCards;

  return (
    <Layout
      title="Complete Battle"
      action={
        <IconButton
          disabled={isSubmitting}
          loading={isSubmitting}
          onClick={() => navigate(`/list/${id}`)}
        >
          <FaUndo />
        </IconButton>
      }
      isLoading={isLoading || isSubmitting}
    >
      {!hasCards && (
        <Alert variant="warning">
          The Order of Battle linked to this list doesn&apos;t have any Crusade Cards.
        </Alert>
      )}
      {currentCard && (
        <>
          {currentIndex > 0 && (
            <Button
              className={styles.backButton}
              leftIcon={<FaChevronLeft />}
              onClick={() => setCurrentIndex(currentIndex - 1)}
            >
              Back
            </Button>
          )}
          <Alert title={`💡 Unit ${currentIndex + 1} / ${listCards.length}`} variant="info">
            Complete the questions below to speed up the post-game admin!
          </Alert>
          <Stat
            className={styles.cardHeader}
            title={currentCard.unitType}
            value={currentCard.name}
            description={currentCard.battlefieldRole}
          />
          <TagGroup className={styles.tags}>
            <Tag variant="success">{currentCard.powerRating}PR</Tag>
            {currentCard.crusadePoints > 0 && (
              <Tag variant="warning">{currentCard.crusadePoints}CP</Tag>
            )}
            {currentCard.experiencePoints > 0 && (
              <Tag variant="info">{currentCard.experiencePoints}XP</Tag>
            )}
          </TagGroup>
          <CrusadeCardPostGameForm
            initialValues={{ card: currentCard, answers: currentAnswers }}
            onSubmit={handleSubmit}
          />
        </>
      )}
    </Layout>
  );
};

export default ListPostGame;
