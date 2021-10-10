import React from 'react';
import {
  Accordion,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber
} from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';

// components
import AccordionItem from '../accordion-item';

// styles
import styles from '../../styles/markdown.module.css';

interface Props {
  crusadeCard: Crusader.CrusadeCard;
  isTabletOrLarger?: boolean;
}

const CrusadeCardAccordion = ({ crusadeCard, isTabletOrLarger }: Props) => (
  <Accordion width="100%" allowMultiple allowToggle>
    <AccordionItem title="Units Destroyed">
      <SimpleGrid width="100%" columns={isTabletOrLarger ? 3 : 2} rowGap={4}>
        <Stat>
          <StatLabel>Melee</StatLabel>
          <StatNumber>{crusadeCard.unitsDestroyedMelee}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Psychic</StatLabel>
          <StatNumber>{crusadeCard.unitsDestroyedPsychic}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Ranged</StatLabel>
          <StatNumber>{crusadeCard.unitsDestroyedRanged}</StatNumber>
        </Stat>
      </SimpleGrid>
    </AccordionItem>
    {crusadeCard.abilities && (
      <AccordionItem title="Abilities">
        <ReactMarkdown className={styles.markdown}>{crusadeCard.abilities}</ReactMarkdown>
      </AccordionItem>
    )}
    {crusadeCard.battleHonours && (
      <AccordionItem title="Battle Honours">
        <ReactMarkdown className={styles.markdown}>{crusadeCard.battleHonours}</ReactMarkdown>
      </AccordionItem>
    )}
    {crusadeCard.battleScars && (
      <AccordionItem title="Battle Scars">
        <ReactMarkdown className={styles.markdown}>{crusadeCard.battleScars}</ReactMarkdown>
      </AccordionItem>
    )}
    {crusadeCard.equipment && (
      <AccordionItem title="Equipment">
        <ReactMarkdown className={styles.markdown}>{crusadeCard.equipment}</ReactMarkdown>
      </AccordionItem>
    )}
    {crusadeCard.relics && (
      <AccordionItem title="Relics">
        <ReactMarkdown className={styles.markdown}>{crusadeCard.relics}</ReactMarkdown>
      </AccordionItem>
    )}
    {crusadeCard.warlordTraits && (
      <AccordionItem title="Warlord Traits">
        <ReactMarkdown className={styles.markdown}>{crusadeCard.warlordTraits}</ReactMarkdown>
      </AccordionItem>
    )}
    {crusadeCard.notes && (
      <AccordionItem title="Notes">
        <ReactMarkdown className={styles.markdown}>{crusadeCard.notes}</ReactMarkdown>
      </AccordionItem>
    )}
  </Accordion>
);

export default CrusadeCardAccordion;
