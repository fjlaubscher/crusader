import React from 'react';
import { FaChevronRight, FaPlus } from 'react-icons/fa';

// components
import Alert from '../../components/alert';
import Grid from '../../components/grid';
import LinkButton from '../../components/button/link';

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
      <LinkButton className={styles.newCrusade} variant="accent" to={`/crusade`} leftIcon={<FaPlus />}>
        New Crusade
      </LinkButton>
      {hasCrusades && (
        <Grid>
          {crusades?.map((c) => (
            <LinkButton
              key={c.id}
              to={`/crusade/${c.id}`}
              rightIcon={<FaChevronRight />}
              data-testid="crusade-link"
            >
              {c.name}
            </LinkButton>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default CrusadesTab;
