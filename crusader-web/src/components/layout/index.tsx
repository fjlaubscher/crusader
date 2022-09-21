import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  IconButton,
  Grid,
  GridItem,
  VStack,
  Container,
  Heading,
  Progress,
  useColorModeValue
} from '@chakra-ui/react';
import { Helmet } from 'react-helmet';
import { MdHome } from 'react-icons/md';

export interface Props {
  title: string;
  children: React.ReactNode;
  actionComponent?: React.ReactNode;
  isLoading?: boolean;
}

const Layout = ({ children, title, actionComponent, isLoading }: Props) => {
  const background = useColorModeValue('gray.50', 'gray.900');

  return (
    <VStack display="flex" flexDirection="column" minHeight="100%">
      <Helmet title={`${isLoading ? 'Loading' : title} | Crusader`} />
      <Container width="100%" maxW="container.xl">
        <Grid alignItems="center" py={4} width="100%" templateColumns="2.5rem auto 2.5rem">
          <GridItem>
            <IconButton as={Link} to="/" aria-label="Home" icon={<MdHome />} />
          </GridItem>
          <GridItem alignContent="center">
            <Heading textAlign="center" size="sm" data-testid="title">
              {title}
            </Heading>
          </GridItem>
          <GridItem>{actionComponent}</GridItem>
        </Grid>
      </Container>
      <Box mt="0 !important" width="100%" background={background} display="flex" flex={1}>
        {isLoading ? (
          <Progress width="100%" isIndeterminate data-testid="loader" />
        ) : (
          <Container display="flex" flex={1} width="100%" p={4} maxW="container.xl">
            <VStack alignItems="flex-start" width="100%">
              {children}
            </VStack>
          </Container>
        )}
      </Box>
    </VStack>
  );
};

export default Layout;
