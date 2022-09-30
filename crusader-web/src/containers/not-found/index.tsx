import React, { useEffect } from 'react';
import { FaBiohazard } from 'react-icons/fa';

// components
import Layout from '../../components/layout';

// hooks
import useToast from '../../hooks/use-toast';

import styles from './not-found.module.scss';

const NotFound = () => {
  const toast = useToast();

  useEffect(() => {
    toast({
      variant: 'error',
      text: `The page you're looking for doesn't exist!`
    });
  }, []);

  return (
    <Layout title="Not Found">
      <div className={styles.content}>
        <FaBiohazard className={styles.notFound} />
      </div>
    </Layout>
  );
};

export default NotFound;
