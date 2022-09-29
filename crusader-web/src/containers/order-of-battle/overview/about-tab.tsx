import React from 'react';
import ReactMarkdown from 'react-markdown';
import Alert from '../../../components/alert';

import markdownStyles from '../../../styles/markdown.module.scss';
import styles from './overview.module.scss';

interface Props {
  orderOfBattle: Crusader.OrderOfBattle;
}

const AboutTab: React.FC<Props> = ({ orderOfBattle }) => (
  <div className={styles.about}>
    {orderOfBattle.notes ? (
      <ReactMarkdown linkTarget="_blank" className={markdownStyles.markdown}>
        {orderOfBattle.notes}
      </ReactMarkdown>
    ) : (
      <Alert variant="warning">This Order of Battle doesn&apos;t have any additional info.</Alert>
    )}
  </div>
);

export default AboutTab;
