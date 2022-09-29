import React from 'react';
import ReactMarkdown from 'react-markdown';

import markdownStyles from '../../../styles/markdown.module.scss';
import styles from './overview.module.scss';

interface Props {
  crusade: Crusader.Crusade;
}

const AboutTab: React.FC<Props> = ({ crusade }) => (
  <div className={styles.about}>
    <ReactMarkdown linkTarget="_blank" className={markdownStyles.markdown}>
      {crusade.notes}
    </ReactMarkdown>
  </div>
);

export default AboutTab;
