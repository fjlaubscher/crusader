import React from 'react';
import { Helmet } from 'react-helmet';
import { VStack, Container, Heading, Text } from '@chakra-ui/react';
import { MdListAlt } from 'react-icons/md';

interface Props {
  title: string;
  children: React.ReactNode;
}

const AuthLayout = ({ children, title }: Props) => (
  <VStack height="100%" justifyContent="space-around">
    <Helmet title={`${title} | Crusader`} />
    <VStack justifyContent="center" alignItems="center" width="100%">
      <Heading as="h1" size="3xl" fontWeight="semibold" textAlign="center">
        Crusader
      </Heading>
      <MdListAlt fontSize="5rem" />
    </VStack>
    <Container mt="0 !important" maxW="xl">
      {children}
    </Container>
    <VStack mt="0 !important">
      <Text mt="0" textAlign="center" fontSize="xs">
        francoislaubscher.dev
      </Text>
      <Text mt="0" textAlign="center" fontSize="xs">
        &copy; 2022
      </Text>
    </VStack>
  </VStack>
);

export default AuthLayout;
