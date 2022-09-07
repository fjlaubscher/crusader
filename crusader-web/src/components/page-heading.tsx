import React from 'react';
import { VStack, Stat, StatLabel, StatNumber, HStack } from '@chakra-ui/react';

interface Props {
  name: string;
  children?: React.ReactNode;
}

const PageHeading = ({ name, children }: Props) => (
  <VStack alignItems="flex-start" width="100%" mb="0.5rem !important">
    <Stat width="100%">
      <StatLabel>Name</StatLabel>
      <StatNumber>{name}</StatNumber>
    </Stat>
    {children && <HStack width="100%">{children}</HStack>}
  </VStack>
);

export default PageHeading;
