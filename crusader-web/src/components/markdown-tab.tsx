import ReactMarkdown from 'react-markdown';

import styles from '../styles/markdown.module.scss';

interface Props {
  markdown: string;
}

const MarkdownTab = ({ markdown }: Props) => (
  <ReactMarkdown linkTarget="_blank" className={styles.markdown}>
    {markdown}
  </ReactMarkdown>
);

export default MarkdownTab;
