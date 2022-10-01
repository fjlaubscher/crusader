import React from 'react';
import { useParams } from 'react-router-dom';

// components
import Alert from '../../../components/alert';
import Layout from '../../../components/layout';

const List = () => {
  const { id } = useParams();

  return (
    <Layout title="List">
      <Alert variant="warning">Coming soon!</Alert>
    </Layout>
  );
};

export default List;
