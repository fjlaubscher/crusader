import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Alert } from '@fjlaubscher/matter';

import styles from '../../../styles/markdown.module.scss';

interface Props {
  player: Crusader.Player;
}

const AboutTab: React.FC<Props> = ({ player }) =>
  player.notes ? (
    <ReactMarkdown linkTarget="_blank" className={styles.markdown}>
      {player.notes}
    </ReactMarkdown>
  ) : (
    <Alert variant="warning">{player.name} doesn&apos;t have any additional info.</Alert>
  );

export default AboutTab;
