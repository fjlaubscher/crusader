import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import {
  Box,
  VStack,
  Tag,
  Text,
  Link,
  useColorModeValue,
  Wrap,
  WrapItem,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  HStack
} from '@chakra-ui/react';
import { format, parseISO } from 'date-fns';

// helpers
import { getBattleStatusColor } from '../../helpers/status';

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
          <HStack width="100%" justifyContent="space-between">
            <Text fontWeight="bold">{battle.name}</Text>
            <Tag size="sm" colorScheme={getBattleStatusColor(battle.statusId)}>
              {battle.status}
            </Tag>
          </HStack>
          <SimpleGrid columns={2} width="100%">
            <Stat>
              <StatLabel>Attacker</StatLabel>
              <StatNumber>{battle.attackerScore}</StatNumber>
              <StatHelpText>{battle.attackerOrderOfBattle}</StatHelpText>
            </Stat>
            <Stat textAlign="right">
              <StatLabel>Defender</StatLabel>
              <StatNumber>{battle.defenderScore}</StatNumber>
              <StatHelpText>{battle.defenderOrderOfBattle}</StatHelpText>
            </Stat>
          </SimpleGrid>
          <Wrap width="100%">
            <WrapItem>
              <Tag size="sm">{format(parseISO(battle.createdDate), 'yyyy-MM-dd')}</Tag>
            </WrapItem>
            <WrapItem>
              <Tag size="sm" colorScheme="green">
                {battle.mission}
              </Tag>
            </WrapItem>
            <WrapItem>
              <Tag size="sm" colorScheme="blue">
                {battle.size}PR
              </Tag>
            </WrapItem>
          </Wrap>
        </VStack>
      </Box>
    </Link>
  );
};

export default BattleCard;
