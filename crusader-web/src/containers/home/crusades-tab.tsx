import React from 'react';
import { Alert, Grid } from '@fjlaubscher/matter';

// components
import CrusadeCard from '../../components/crusade/card';

import styles from './home.module.scss';

interface Props {
  crusades?: Crusader.Crusade[];
}

const CrusadesTab: React.FC<Props> = ({ crusades }) => {
  const hasCrusades = crusades ? crusades.length > 0 : false;

  return (
    <div className={styles.crusades}>
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
    </div>
  );
};

export default CrusadesTab;
