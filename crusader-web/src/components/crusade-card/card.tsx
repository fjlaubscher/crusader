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
  Wrap,
  WrapItem
} from '@chakra-ui/react';
import { MdVisibility, MdDelete } from 'react-icons/md';

interface Props {
  crusadeCard: Crusader.CrusadeCard;
  onDeleteClick?: () => void;
}

const CrusadeCard = ({ crusadeCard, onDeleteClick }: Props) => {
  const background = useColorModeValue('white', 'gray.800');

  return (
    <Box position="relative" background={background} borderRadius={4} width="100%" p={4} zIndex={1}>
      {onDeleteClick && (
        <IconButton
          position="absolute"
          top={1}
          right={1}
          size="md"
          aria-label="Delete"
          icon={<MdDelete />}
          onClick={onDeleteClick}
          variant="ghost"
          zIndex={2}
        />
      )}
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
        <Button
          type="button"
          as={Link}
          to={`/crusade-card/${crusadeCard.id}`}
          size="sm"
          leftIcon={<MdVisibility />}
        >
          View
        </Button>
      </VStack>
    </Box>
  );
};

export default CrusadeCard;
