import React, { useState } from 'react';
import classnames from 'classnames';

// components
import Container from '../container';

import styles from './tabs.module.scss';

interface Props {
  content: React.ReactNode[];
  tabs: string[];
  active: number;
  onChange: (index: number) => void;
}

const Tabs: React.FC<Props> = ({ content, tabs, active, onChange }) => {
  return (
    <>
      <Container className={styles.container}>
        <div className={styles.tabs}>
          {tabs.map((t, i) => (
            <button
              key={`tab-${i}`}
              className={classnames(styles.tab, i === active && styles.active)}
              onClick={() => onChange(i)}
            >
              {t}
            </button>
          ))}
        </div>
      </Container>
      {content[active]}
    </>
  );
};

export default Tabs;
