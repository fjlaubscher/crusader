import { useCallback, useRef, useState } from 'react';
import classnames from 'classnames';
import { Card, Tag, TagGroup } from '@fjlaubscher/matter';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';

// components
import Avatar from '../avatar';

import markdownStyles from '../../styles/markdown.module.scss';
import styles from './crusade-card.module.scss';

interface Props {
  className?: string;
  crusadeCard: Crusader.CrusadeCard;
}

const CrusadeListCard = ({ className, crusadeCard }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleExpand = useCallback(() => {
    setIsExpanded((expanded) => !expanded);

    if (ref.current) {
      window.scrollTo(0, ref.current.offsetTop - 32);
    }
  }, [ref, setIsExpanded]);

  return (
    <Card className={classnames(styles.listCard, className)} onClick={handleToggleExpand}>
      <div ref={ref} className={styles.heading}>
        <span className={styles.title}>{crusadeCard.name}</span>
        {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      {crusadeCard.avatar && (
        <Avatar className={styles.avatar} src={crusadeCard.avatar} alt={crusadeCard.name} />
      )}
      {isExpanded && (
        <div className={styles.info}>
          {crusadeCard.abilities && (
            <>
              <h4>Abilities</h4>
              <ReactMarkdown linkTarget="_blank" className={markdownStyles.markdown}>
                {crusadeCard.abilities}
              </ReactMarkdown>
            </>
          )}
          {crusadeCard.battleHonours && (
            <>
              <h4>Battle Honours</h4>
              <ReactMarkdown linkTarget="_blank" className={markdownStyles.markdown}>
                {crusadeCard.battleHonours}
              </ReactMarkdown>
            </>
          )}
          {crusadeCard.battleScars && (
            <>
              <h4>Battle Scars</h4>
              <ReactMarkdown linkTarget="_blank" className={markdownStyles.markdown}>
                {crusadeCard.battleScars}
              </ReactMarkdown>
            </>
          )}
          {crusadeCard.equipment && (
            <>
              <h4>Equipment</h4>
              <ReactMarkdown linkTarget="_blank" className={markdownStyles.markdown}>
                {crusadeCard.equipment}
              </ReactMarkdown>
            </>
          )}
          {crusadeCard.relics && (
            <>
              <h4>Relics</h4>
              <ReactMarkdown linkTarget="_blank" className={markdownStyles.markdown}>
                {crusadeCard.relics}
              </ReactMarkdown>
            </>
          )}
          {crusadeCard.warlordTraits && (
            <>
              <h4>Warlord Traits</h4>
              <ReactMarkdown linkTarget="_blank" className={markdownStyles.markdown}>
                {crusadeCard.warlordTraits}
              </ReactMarkdown>
            </>
          )}
        </div>
      )}
      <TagGroup>
        <Tag>{crusadeCard.battlefieldRole}</Tag>
        <Tag variant="info">{crusadeCard.unitType}</Tag>
        <Tag variant="success">{crusadeCard.powerRating}PR</Tag>
        {crusadeCard.experiencePoints > 0 && (
          <Tag variant="accent">{crusadeCard.experiencePoints}XP</Tag>
        )}
        {crusadeCard.crusadePoints > 0 && (
          <Tag variant="warning">{crusadeCard.crusadePoints}CP</Tag>
        )}
      </TagGroup>
    </Card>
  );
};

export default CrusadeListCard;
