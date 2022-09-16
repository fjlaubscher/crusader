import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Box, VStack, Tag, Text, Link, useColorModeValue, Wrap, WrapItem } from '@chakra-ui/react';
import { format, parseISO } from 'date-fns';

import styles from './card.module.css';

interface Props {
  battle: Crusader.Battle;
}

const BattleCard = ({ battle }: Props) => {
  const background = useColorModeValue('white', 'gray.800');

  return (
    <Link className={styles.card} as={ReactRouterLink} to={`/battle/${battle.id}`} width="100%">
      <Box background={background} borderRadius={4} width="100%" p={4}>
        <VStack alignItems="flex-start" width="100%">
          <Text>{battle.name}</Text>
          <Wrap width="100%">
            <WrapItem>
              <Tag size="sm" colorScheme="red">
                {battle.attackerOrderOfBattle}
              </Tag>
            </WrapItem>
            <WrapItem>
              <Tag size="sm" colorScheme="blue">
                {battle.defenderOrderOfBattle}
              </Tag>
            </WrapItem>
          </Wrap>
        </VStack>
      </Box>
    </Link>
  );
};

export default BattleCard;
