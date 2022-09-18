import React from 'react';
import { Alert, AlertIcon, AlertTitle, AlertDescription, Box, Link } from '@chakra-ui/react';

interface Props {
  playerName: string
}

const CrusaderAlert: React.FC<Props> = ({ playerName }) => (
  <Alert mb={4} height="auto">
    <AlertIcon alignSelf="flex-start" />
    <Box flex="1">
      <AlertTitle>👋 Hey {playerName}!</AlertTitle>
      <AlertDescription display="block">
        Crusader is a free and open-source Warhammer 40,000 Crusade assistant.
        <br />
        <Link
          textDecoration="underline"
          href="https://github.com/fjlaubscher/crusader"
          target="_blank"
          rel="noopener"
        >
          https://github.com/fjlaubscher/crusader
        </Link>
      </AlertDescription>
    </Box>
  </Alert>
);

export default CrusaderAlert;
