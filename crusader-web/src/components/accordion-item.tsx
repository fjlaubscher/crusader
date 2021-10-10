import React from 'react';
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem as ChakraAccordionItem,
  AccordionPanel,
  Heading
} from '@chakra-ui/react';

interface Props {
  title: string;
  children: React.ReactNode;
}

const AccordionItem = ({ title, children }: Props) => (
  <ChakraAccordionItem>
    <Heading as="h3">
      <AccordionButton fontSize="lg" justifyContent="space-between" fontWeight="semibold" px={0}>
        {title}
        <AccordionIcon />
      </AccordionButton>
    </Heading>
    <AccordionPanel px={0} pb={4}>
      {children}
    </AccordionPanel>
  </ChakraAccordionItem>
);

export default AccordionItem;