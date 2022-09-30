import React from 'react';
import classnames from 'classnames';
import ReactMarkdown from 'react-markdown';

// components
import Alert from '../../../components/alert';

import styles from '../../../styles/markdown.module.scss';

interface Props {
  orderOfBattle: Crusader.OrderOfBattle;
}

const AboutTab: React.FC<Props> = ({ orderOfBattle }) =>
  orderOfBattle.notes ? (
    <ReactMarkdown linkTarget="_blank" className={styles.markdown}>
      {orderOfBattle.notes}
    </ReactMarkdown>
  ) : (
    <Alert variant="warning">This Order of Battle doesn&apos;t have any additional info.</Alert>
  );

export default AboutTab;
