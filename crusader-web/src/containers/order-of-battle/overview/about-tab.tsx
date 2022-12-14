import ReactMarkdown from 'react-markdown';
import { Alert } from '@fjlaubscher/matter';

import styles from '../../../styles/markdown.module.scss';

interface Props {
  orderOfBattle: Crusader.OrderOfBattle;
}

const AboutTab = ({ orderOfBattle }: Props) =>
  orderOfBattle.notes ? (
    <ReactMarkdown linkTarget="_blank" className={styles.markdown}>
      {orderOfBattle.notes}
    </ReactMarkdown>
  ) : (
    <Alert variant="warning">This Order of Battle doesn&apos;t have any additional info.</Alert>
  );

export default AboutTab;
