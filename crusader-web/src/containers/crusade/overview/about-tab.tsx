import React from 'react';
import ReactMarkdown from 'react-markdown';

import styles from '../../../styles/markdown.module.scss';
interface Props {
  crusade: Crusader.Crusade;
}

const AboutTab: React.FC<Props> = ({ crusade }) => (
  <ReactMarkdown linkTarget="_blank" className={styles.markdown}>
    {crusade.notes}
  </ReactMarkdown>
);

export default AboutTab;
