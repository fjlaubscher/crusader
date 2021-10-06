import React from 'react';
import { Alert, AlertIcon, VStack } from '@chakra-ui/react';
import { GiBolterGun } from 'react-icons/gi';

// components
import Layout from '../components/layout';

import styles from '../styles/not-found.module.css';

const NotFound = () => (
  <Layout title="Not Found" isFullHeight>
    <Alert status="error" variant="left-accent">
      <AlertIcon />
      This page doesn&apos;t exist.
    </Alert>
    <VStack height="100%" justifyContent="center">
      <GiBolterGun fontSize="8rem" className={styles.notFound} />
    </VStack>
  </Layout>
);

export default NotFound;
