import React from 'react';
import ReactMarkdown from 'react-markdown';

import styles from '../../../styles/markdown.module.scss';

interface Props {
  markdown: string;
}

const MarkdownTab: React.FC<Props> = ({ markdown }) => (
  <ReactMarkdown linkTarget="_blank" className={styles.markdown}>
    {markdown}
  </ReactMarkdown>
);

export default MarkdownTab;
