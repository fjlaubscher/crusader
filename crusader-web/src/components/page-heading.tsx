import React from 'react';
import { VStack, Stat, StatLabel, StatNumber, HStack, StatHelpText } from '@chakra-ui/react';

interface Props {
  name: string;
  description?: string;
  children?: React.ReactNode;
}

const PageHeading: React.FC<Props> = ({ name, description, children }) => (
  <VStack alignItems="flex-start" width="100%" mb="0.5rem !important">
    <Stat width="100%">
      <StatLabel>Name</StatLabel>
      <StatNumber>{name}</StatNumber>
      {description && <StatHelpText>{description}</StatHelpText>}
    </Stat>
    {children && <HStack width="100%">{children}</HStack>}
  </VStack>
);

export default PageHeading;
