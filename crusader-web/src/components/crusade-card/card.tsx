import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Box, VStack, Tag, Text, Link, useColorModeValue, Wrap, WrapItem } from '@chakra-ui/react';

import styles from './crusade-card.module.scss';

interface Props {
  crusadeCard: Crusader.CrusadeCard;
}

const CrusadeCard = ({ crusadeCard }: Props) => {
  const background = useColorModeValue('white', 'gray.800');

  return (
    <Link
      className={styles.card}
      as={ReactRouterLink}
      to={`/crusade-card/${crusadeCard.id}`}
      width="100%"
    >
      <Box background={background} borderRadius={4} p={4} width="100%" height="100%">
        <VStack alignItems="flex-start" width="100%">
          <Text>{crusadeCard.name}</Text>
          <Wrap width="100%">
            <WrapItem>
              <Tag size="sm" colorScheme="blue">
                {crusadeCard.battlefieldRole}
              </Tag>
            </WrapItem>
            <WrapItem>
              <Tag size="sm">{crusadeCard.unitType}</Tag>
            </WrapItem>
            <WrapItem>
              <Tag size="sm" colorScheme="green">
                {crusadeCard.powerRating}PR
              </Tag>
            </WrapItem>
            {crusadeCard.crusadePoints > 0 && (
              <WrapItem>
                <Tag size="sm" colorScheme="yellow">
                  {crusadeCard.crusadePoints}CP
                </Tag>
              </WrapItem>
            )}
          </Wrap>
        </VStack>
      </Box>
    </Link>
  );
};

export default CrusadeCard;
