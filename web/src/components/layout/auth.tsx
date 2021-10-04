import React from 'react';
import { Helmet } from 'react-helmet';
import { VStack, Container, Heading, Text, Image } from '@chakra-ui/react';

interface Props {
  title: string;
  children: React.ReactNode;
}

const AuthLayout = ({ children, title }: Props) => (
  <VStack height="100%" justifyContent="space-around">
    <Helmet title={`${title} | Crusader`} />
    <Heading as="h1" size="xl" fontWeight="semibold" textAlign="center">
      Crusader
    </Heading>
    <Container maxW="xl">{children}</Container>
    <VStack>
      <Text mt="0" textAlign="center" fontSize="xs">
        francois.codes
      </Text>
      <Text mt="0" textAlign="center" fontSize="xs">
        &copy; {new Date().getFullYear()}
      </Text>
    </VStack>
  </VStack>
);

export default AuthLayout;
