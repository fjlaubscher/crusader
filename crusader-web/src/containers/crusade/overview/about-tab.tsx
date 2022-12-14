import ReactMarkdown from 'react-markdown';

import styles from '../../../styles/markdown.module.scss';
interface Props {
  crusade: Crusader.Crusade;
}

const AboutTab = ({ crusade }: Props) => (
  <ReactMarkdown linkTarget="_blank" className={styles.markdown}>
    {crusade.notes}
  </ReactMarkdown>
);

export default AboutTab;
