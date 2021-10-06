import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  IconButton,
  VStack,
  Tag,
  Text,
  useColorModeValue,
  HStack
} from '@chakra-ui/react';
import { MdVisibility, MdDelete } from 'react-icons/md';

interface Props {
  orderOfBattle: Crusader.OrderOfBattle;
}

const OrderOfBattleCard = ({ orderOfBattle }: Props) => {
  const background = useColorModeValue('white', 'gray.800');

  return (
    <Box background={background} borderRadius={4} width="100%" p={4}>
      <VStack alignItems="flex-start" width="100%">
        <Text>{orderOfBattle.name}</Text>
        <HStack width="100%">
          <Tag size="sm">{orderOfBattle.player}</Tag>
          <Tag size="sm" colorScheme="blue">
            {orderOfBattle.faction}
          </Tag>
          <Tag size="sm" colorScheme="green">
            {orderOfBattle.supplyUsed}/{orderOfBattle.supplyLimit}
          </Tag>
        </HStack>
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
