import ReactMarkdown from 'react-markdown';

import styles from '../../../styles/markdown.module.scss';

interface Props {
  battle: Crusader.Battle;
}

const AboutTab = ({ battle }: Props) => (
  <ReactMarkdown linkTarget="_blank" className={styles.markdown}>
    {battle.notes}
  </ReactMarkdown>
);

export default AboutTab;
