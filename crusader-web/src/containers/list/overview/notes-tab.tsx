import React from 'react';
import ReactMarkdown from 'react-markdown';

// components
import Alert from '../../../components/alert';

import styles from '../../../styles/markdown.module.scss';

interface Props {
  list: Crusader.List;
}

const NotesTab: React.FC<Props> = ({ list }) =>
  list.notes ? (
    <ReactMarkdown linkTarget="_blank" className={styles.markdown}>
      {list.notes}
    </ReactMarkdown>
  ) : (
    <Alert variant="warning">This List doesn&apos;t have any additional info.</Alert>
  );

export default NotesTab;
