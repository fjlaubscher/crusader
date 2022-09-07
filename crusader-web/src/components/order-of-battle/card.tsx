import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  VStack,
  Tag,
  Text,
  useColorModeValue,
  Wrap,
  WrapItem
} from '@chakra-ui/react';
import { MdVisibility } from 'react-icons/md';

interface Props {
  orderOfBattle: Crusader.OrderOfBattle;
  showCrusadeName?: boolean;
  showPlayerName?: boolean;
}

const OrderOfBattleCard = ({ orderOfBattle, showCrusadeName, showPlayerName }: Props) => {
  const background = useColorModeValue('white', 'gray.800');

  return (
    <Box background={background} borderRadius={4} width="100%" p={4}>
      <VStack alignItems="flex-start" width="100%">
        <Text>{orderOfBattle.name}</Text>
        <Wrap width="100%">
          {showPlayerName && (
            <WrapItem>
              <Tag size="sm" colorScheme="blue">
                @{orderOfBattle.player}
              </Tag>
            </WrapItem>
          )}
          {showCrusadeName && (
            <WrapItem>
              <Tag size="sm" colorScheme="blue">
                {orderOfBattle.crusade}
              </Tag>
            </WrapItem>
          )}
          <WrapItem>
            <Tag size="sm">{orderOfBattle.faction}</Tag>
          </WrapItem>
          <WrapItem>
            <Tag size="sm" colorScheme="green">
              {orderOfBattle.supplyUsed}PR
            </Tag>
          </WrapItem>
          {orderOfBattle.crusadePoints > 0 && (
            <WrapItem>
              <Tag size="sm" colorScheme="yellow">
                {orderOfBattle.crusadePoints}CP
              </Tag>
            </WrapItem>
          )}
        </Wrap>
        <Button
          size="sm"
          as={Link}
          to={`/order-of-battle/${orderOfBattle.id}`}
          leftIcon={<MdVisibility />}
        >
          View
        </Button>
      </VStack>
    </Box>
  );
};

export default OrderOfBattleCard;
