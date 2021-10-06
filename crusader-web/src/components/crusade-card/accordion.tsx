import React from 'react';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber
} from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';

// styles
import styles from '../../styles/markdown.module.css';

interface Props {
  crusadeCard: Crusader.CrusadeCard;
  isTabletOrLarger?: boolean;
}

interface ItemProps {
  title: string;
  children: React.ReactNode;
}

const Item = ({ title, children }: ItemProps) => (
  <AccordionItem>
    <Heading as="h3">
      <AccordionButton fontSize="lg" justifyContent="space-between" fontWeight="semibold" px={0}>
        {title}
        <AccordionIcon />
      </AccordionButton>
    </Heading>
    <AccordionPanel px={0} pb={4}>
      {children}
    </AccordionPanel>
  </AccordionItem>
);

const CrusadeCardAccordion = ({ crusadeCard, isTabletOrLarger }: Props) => (
  <Accordion width="100%" allowMultiple allowToggle>
    <Item title="Units Destroyed">
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
    </Item>
    {crusadeCard.abilities && (
      <Item title="Abilities">
        <ReactMarkdown className={styles.markdown}>{crusadeCard.abilities}</ReactMarkdown>
      </Item>
    )}
    {crusadeCard.battleHonours && (
      <Item title="Battle Honours">
        <ReactMarkdown className={styles.markdown}>{crusadeCard.battleHonours}</ReactMarkdown>
      </Item>
    )}
    {crusadeCard.battleScars && (
      <Item title="Battle Scars">
        <ReactMarkdown className={styles.markdown}>{crusadeCard.battleScars}</ReactMarkdown>
      </Item>
    )}
    {crusadeCard.equipment && (
      <Item title="Equipment">
        <ReactMarkdown className={styles.markdown}>{crusadeCard.equipment}</ReactMarkdown>
      </Item>
    )}
    {crusadeCard.relics && (
      <Item title="Relics">
        <ReactMarkdown className={styles.markdown}>{crusadeCard.relics}</ReactMarkdown>
      </Item>
    )}
    {crusadeCard.warlordTraits && (
      <Item title="Warlord Traits">
        <ReactMarkdown className={styles.markdown}>{crusadeCard.warlordTraits}</ReactMarkdown>
      </Item>
    )}
    {crusadeCard.notes && (
      <Item title="Notes">
        <ReactMarkdown className={styles.markdown}>{crusadeCard.notes}</ReactMarkdown>
      </Item>
    )}
  </Accordion>
);

export default CrusadeCardAccordion;
