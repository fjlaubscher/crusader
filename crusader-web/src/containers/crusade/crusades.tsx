import { useRecoilValue } from 'recoil';
import { FaPlus } from 'react-icons/fa';
import { useAsync } from 'react-use';
import { useNavigate } from 'react-router-dom';
import { Alert, Grid, IconButton } from '@fjlaubscher/matter';

// api
import { getPlayerCrusadesAsync } from '../../api/crusade';

// components
import CrusadeCard from '../../components/crusade/card';
import Layout from '../../components/layout';

// state
import { PlayerAtom } from '../../state/player';

const Crusades = () => {
  const navigate = useNavigate();
  const player = useRecoilValue(PlayerAtom);

  const { loading, value: crusades } = useAsync(async () => {
    if (player) {
      return await getPlayerCrusadesAsync(player.id);
    }

    return undefined;
  }, [player]);

  const hasCrusades = crusades ? crusades.length > 0 : false;

  return (
    <Layout
      title="Crusades"
      action={
        <IconButton onClick={() => navigate('/crusade')}>
          <FaPlus />
        </IconButton>
      }
      isLoading={loading}
    >
      {!hasCrusades && (
        <Alert variant="warning">
          You haven't joined any Crusades yet.
          <br />
          Create one to get started!
        </Alert>
      )}
      {hasCrusades && (
        <Grid>
          {crusades?.map((c) => (
            <CrusadeCard key={`crusade-${c.id}`} crusade={c} />
          ))}
        </Grid>
      )}
    </Layout>
  );
};

export default Crusades;
