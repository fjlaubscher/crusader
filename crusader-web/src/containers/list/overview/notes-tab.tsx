import ReactMarkdown from 'react-markdown';
import { Alert } from '@fjlaubscher/matter';

import styles from '../../../styles/markdown.module.scss';

interface Props {
  list: Crusader.List;
}

const NotesTab = ({ list }: Props) =>
  list.notes ? (
    <ReactMarkdown linkTarget="_blank" className={styles.markdown}>
      {list.notes}
    </ReactMarkdown>
  ) : (
    <Alert variant="warning">This List doesn&apos;t have any additional info.</Alert>
  );

export default NotesTab;
