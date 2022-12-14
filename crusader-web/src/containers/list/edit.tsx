import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAsync } from 'react-use';
import { FaArrowLeft, FaSave } from 'react-icons/fa';
import { Alert, Grid, IconButton, Stat, useToast } from '@fjlaubscher/matter';

// api
import { getListAsync, getListCardsAsync, updateListAsync } from '../../api/list';
import { getOrderOfBattleCrusadeCardsAsync } from '../../api/crusade-card';
import { createListCard, deleteListCardAsync } from '../../api/list-card';

// components
import CrusadeCard from '../../components/crusade-card/card';
import Layout from '../../components/layout';
import LinkButton from '../../components/button/link';

import styles from './list.module.scss';

const EditListCards = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);

  const { loading: loadingList, value: list } = useAsync(async () => {
    if (id) {
      return getListAsync(id);
    }

    return undefined;
  }, [id]);

  const { loading: loadingCards, value: cards } = useAsync(async () => {
    if (id) {
      const cards = await getListCardsAsync(id);
      if (cards) {
        const ids = cards.map((c) => c.crusadeCardId);
        setSelectedCards(ids);
      }

      return cards;
    }

    return undefined;
  }, [id, setSelectedCards]);

  const { loading: loadingCrusadeCards, value: crusadeCards } = useAsync(async () => {
    if (list) {
      return getOrderOfBattleCrusadeCardsAsync(list.orderOfBattleId);
    }

    return undefined;
  }, [list]);

  const listSize = useMemo(() => {
    if (crusadeCards) {
      return crusadeCards
        .filter((c) => selectedCards.includes(c.id))
        .map((c) => c.powerRating)
        .reduce((prev, current) => prev + current, 0);
    }

    return 0;
  }, [selectedCards, crusadeCards]);

  const handleSave = useCallback(async () => {
    setIsSubmitting(true);

    try {
      if (list && cards) {
        // first delete all list cards
        const listCards = await getListCardsAsync(list.id);
        if (listCards) {
          const deletePromises = listCards.map((lc) => deleteListCardAsync(lc.id));
          await Promise.all(deletePromises);
        }
        // create list cards
        const createPromises = selectedCards.map((id) =>
          createListCard({ id: 0, crusadeCard: '', crusadeCardId: id, list: '', listId: list.id })
        );
        await Promise.all(createPromises);

        // update list
        const updatedList = await updateListAsync({ ...list, size: listSize });
        if (updatedList) {
          toast({
            variant: 'success',
            text: 'List updated'
          });
          navigate(`/list/${updatedList.id}`);
        }
      }
    } catch (ex: any) {
      toast({
        variant: 'error',
        text: ex.message || 'Unable to update List'
      });
    }

    setIsSubmitting(false);
  }, [setIsSubmitting, list, cards, selectedCards, listSize, navigate]);

  const handleSelect = useCallback(
    (id: number) => {
      if (selectedCards.includes(id)) {
        setSelectedCards(selectedCards.filter((selectedId) => selectedId !== id));
      } else {
        setSelectedCards([...selectedCards, id]);
      }
    },
    [selectedCards, setSelectedCards]
  );

  const hasCards = crusadeCards ? crusadeCards.length > 0 : false;
  const isLoading = loadingList || loadingCards || loadingCrusadeCards;

  useEffect(() => {
    if (!isLoading && hasCards && selectedCards.length === 0) {
      toast({
        variant: 'info',
        text: `Select the Crusade Cards below that you'd like to add to this List.`
      });
    }
  }, [isLoading, hasCards, selectedCards]);

  return (
    <Layout
      title="Edit List"
      action={
        <IconButton
          disabled={isSubmitting}
          loading={isSubmitting}
          variant="info"
          onClick={handleSave}
        >
          <FaSave />
        </IconButton>
      }
      isLoading={loadingList || loadingCards || loadingCrusadeCards}
    >
      <LinkButton className={styles.back} leftIcon={<FaArrowLeft />} to={`/list/${id}`}>
        Back
      </LinkButton>
      {list && (
        <div className={styles.stats}>
          <Stat title={`@${list.player}`} value={list.name} description={list.orderOfBattle} />
          <Stat
            title="Power Rating"
            value={listSize}
            description={`Total cards: ${selectedCards.length}`}
          />
        </div>
      )}
      {!hasCards && (
        <Alert variant="warning">
          The Order of Battle linked to this list doesn&apos;t have any Crusade Cards.
        </Alert>
      )}
      {hasCards && crusadeCards && (
        <Grid>
          {crusadeCards.map((c) => (
            <CrusadeCard
              className={selectedCards.includes(c.id) ? styles.selected : undefined}
              key={c.id}
              crusadeCard={c}
              onClick={() => handleSelect(c.id)}
            />
          ))}
        </Grid>
      )}
    </Layout>
  );
};

export default EditListCards;
