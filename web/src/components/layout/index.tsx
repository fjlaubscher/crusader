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
import { GiBolterGun } from 'react-icons/gi';
import { Helmet } from 'react-helmet';

interface Props {
  title: string;
  children: React.ReactNode;
  actionComponent?: React.ReactNode;
  isFullHeight?: boolean;
  isLoading?: boolean;
}

const Layout = ({ children, title, actionComponent, isFullHeight, isLoading }: Props) => {
  const background = useColorModeValue('gray.50', 'gray.900');

  return (
    <VStack height="100%">
      <Helmet title={`${title} | Crusader`} />
      <Box width="100%">
        <Container width="100%" maxW="container.xl">
          <Grid alignItems="center" py={4} width="100%" templateColumns="2.5rem auto 2.5rem">
            <GridItem>
              <IconButton
                as={Link}
                to="/"
                aria-label="Home"
                fontSize="1.5rem"
                icon={<GiBolterGun />}
              />
            </GridItem>
            <GridItem alignContent="center">
              <Heading textAlign="center" size="sm">
                {title}
              </Heading>
            </GridItem>
            <GridItem>{actionComponent}</GridItem>
          </Grid>
        </Container>
      </Box>
      <Box
        height={isFullHeight ? '100%' : undefined}
        mt="0 !important"
        width="100%"
        background={background}
        flex={1}
      >
        {isLoading ? (
          <Progress isIndeterminate />
        ) : (
          <Container
            height={isFullHeight ? '100%' : undefined}
            width="100%"
            p={4}
            maxW="container.xl"
          >
            <VStack height={isFullHeight ? '100%' : undefined} width="100%">
              {children}
            </VStack>
          </Container>
        )}
      </Box>
    </VStack>
  );
};

export default Layout;
