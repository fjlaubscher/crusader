import React from 'react';
import { useRecoilValue } from 'recoil';
import { useAsync } from 'react-use';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

// api
import { getPlayerListsAsync } from '../../api/list';

// components
import Alert from '../../components/alert';
import IconButton from '../../components/button/icon';
import Grid from '../../components/grid';
import Layout from '../../components/layout';
import ListCard from '../../components/list/card';

// state
import { PlayerAtom } from '../../state/player';

const Lists = () => {
  const navigate = useNavigate();
  const player = useRecoilValue(PlayerAtom);

  const { loading, value: lists } = useAsync(async () => {
    if (player) {
      return getPlayerListsAsync(player.id);
    }

    return undefined;
  }, [player]);

  const hasLists = lists ? lists.length > 0 : false;

  return (
    <Layout
      title="Lists"
      action={
        <IconButton onClick={() => navigate('/list')}>
          <FaPlus />
        </IconButton>
      }
      isLoading={loading}
    >
      {hasLists ? (
        <Grid>
          {lists?.map((list) => (
            <ListCard key={list.id} list={list} />
          ))}
        </Grid>
      ) : (
        <Alert variant="warning">You haven&apos;t created any Lists yet.</Alert>
      )}
    </Layout>
  );
};

export default Lists;
