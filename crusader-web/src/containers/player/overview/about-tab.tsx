import React from 'react';
import classnames from 'classnames';
import ReactMarkdown from 'react-markdown';

// components
import Alert from '../../../components/alert';

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
