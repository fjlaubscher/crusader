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
        <HStack width="100%">
          <Tag size="sm" colorScheme="blue">
            {crusadeCard.battlefieldRole}
          </Tag>
          <Tag size="sm">{crusadeCard.unitType}</Tag>
          <Tag size="sm" colorScheme="green">
            {crusadeCard.powerRating}PL
          </Tag>
        </HStack>
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
